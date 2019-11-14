<template>
    <div v-if="verifyUserAccess({ADMIN: 'ADMIN'})">
        <div>
            <h2 class="title_header">ساخت سکرت جدید</h2>

            <div class="secret-type-rail">

                <div v-for="(item, index) in secret_types"
                     @click="selectedSecret(index)"
                     :class="[item.selected === true ? 'type-selected' : 'type-unselected']">
                    <span>{{item.title}}</span>
                </div>

            </div>

            <docker-secret :secret="selected_secret_type.secret" :editing="false" v-if="selected_secret_type.type === 'docker-registry'"></docker-secret>
            <environment-secret :secret="selected_secret_type.secret" :editing="false" v-else></environment-secret>
        </div>
    </div>
</template>

<script>
    import {formData} from "~/utils/formData";
    import ProgressBar from "~/components/Dashboard/progress-bar";
    import ErrorReporter from "~/utils/ErrorReporter";
    import Popover from "../../../components/wizard/tooltip/popover";
    import RoleAccessHandler from "../../../utils/RoleAccessHandler";
    import DockerSecret from "./components/docker-secret";
    import EnvironmentSecret from "./components/environment-secret";

    export default {
        layout: "dashboard",
        data() {
            return {
                email: "",
                loading: false,
                loadingProgress: false,
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    secret_regex: value => new RegExp('^[a-z0-9]+([-.a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد، خط تیره (-) و (.) معتبر هستند)',
                    counter: value => value.length <= 253 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    url_regex: value => new RegExp('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$').test(value) || 'آدرس وارد شده معتبر نیست'
                },
                selected_secret_type: {

                    type: 'docker-registry',
                    selected: true,
                    title: 'Docker Registry',
                    secret: {
                        type: 'docker-registry',
                        name: null,
                        server: null,
                        username: null,
                        password: null
                    }

                },
                secret_types: [
                    {
                        type: 'docker-registry',
                        selected: true,
                        title: 'Docker Registry',
                        secret: {
                            type: 'docker-registry',
                            name: null,
                            server: null,
                            username: null,
                            password: null
                        }
                    }, {
                        type: 'environment-secret',
                        selected: false,
                        title: 'Environment',
                        secret: {
                            type: 'environment-secret',
                            name: null,
                            value: null
                        }
                    }
                ],
                secret: {
                    name: {
                        label: 'نام سکرت',
                        hint: 'نام سکرت که قصد ساختن آن را دارید',
                        counter: 253,
                        value: ''
                    },
                    type: {
                        label: 'نوع سکرت',
                        hint: 'نوع سکرتی که قصد ساختن آن را دارید',
                        default: '',
                        value: 'docker-registry'
                    },
                    server: {
                        label: 'آدرس سرور',
                        hint: 'آدرس سرور یا همان URL مربوط به رجیستری',
                        value: ''
                    },
                    username: {
                        label: 'نام کاربری',
                        hint: 'نام کاربری سکرت مورد نظر را وارد نمایید',
                        value: '',
                    },
                    password: {
                        label: 'گذرواژه',
                        hint: 'گذرواژه سکرت مورد نظر را وارد نمایید',
                        value: '',
                    }
                },
                tooltips: {
                    name: {
                        title: 'نام سکرت',
                        text: 'برای مشخص کردن نام Secret، که از طریق این نام مشخص می‌کنید هنگام دریافت تصاویر از یک رجیستری از کدام Secret باید استفاده شود.',
                        url: 'https://docs.fandogh.cloud/docs/secret.html'
                    },
                    type: {
                        title: 'نوع سکرت',
                        text: 'با استفاده از این بخش مشخص میکنید سکرت ساخته شده از چه نوع می‌باشد.',
                        url: 'https://docs.fandogh.cloud/docs/secret.html'
                    },
                    server: {
                        title: 'آدرس سرور',
                        text: 'با مشخص کردن آدرس سرور مربوط به سکرت که در اصل همان آدرس رجیستری است، فندق می‌تواند بفهمد که که این سکرت برای کدام رجیستری استفاده خواهد شد.',
                        url: 'https://docs.fandogh.cloud/docs/secret.html'
                    },
                    username: {
                        title: 'نام کاربری',
                        text: 'منظور از نام کاربری، همان نام کاربری است که همیشه با استفاده از آن وارد رجیستری مورد نظر می‌شوید.',
                        url: 'https://docs.fandogh.cloud/docs/secret.html'
                    },
                    password: {
                        title: 'گذرواژه',
                        text: 'منظور از گذرواژه، همان گذرواژه‌ای است که همیشه با استفاده از آن وارد رجیستری مورد نظر می‌شوید.',
                        url: 'https://docs.fandogh.cloud/docs/secret.html'
                    },
                },
            };
        },
        computed: {
            progress() {
                return this.$store.state.progress;
            }
        },
        components: {
            EnvironmentSecret,
            DockerSecret,
            ProgressBar,
            Popover
        },
        mounted() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
            this.$ga.event({
                eventCategory: "secret",
                eventAction: "add secret"
            });
        },
        methods: {
            selectedSecret(index) {
                this.secret_types.forEach(item => {
                    item.selected = false
                });

                this.secret_types[index].selected = true;
                this.selected_secret_type = this.secret_types[index]
            },
            verifyUserAccess(permitted_roles) {
                return RoleAccessHandler(permitted_roles)
            },
            createSecret() {


                if (this.rules.required(this.secret.name.value) !== true ||
                    this.rules.required(this.secret.server.value) !== true ||
                    this.rules.required(this.secret.username.value) !== true ||
                    this.rules.required(this.secret.password.value) !== true) {

                    this.$notify({
                        title: 'از پر بودن همه فیلدها اطمینان حاصل فرمایید!',
                        time: 4000,
                        type: "error"
                    });

                    return
                }

                if (this.rules.secret_regex(this.secret.name.value) !== true) {

                    this.$notify({
                        title: 'نام سکرت صحیح نیست!',
                        time: 4000,
                        type: "error"
                    });

                    return

                }


                if (this.rules.url_regex(this.secret.server.value) !== true) {

                    this.$notify({
                        title: 'آدرس url وارد شده معتبر نیست!',
                        time: 4000,
                        type: "error"
                    });

                    return

                }


                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                this.$store
                    .dispatch("createSecret", {
                        name: this.secret.name.value,
                        type: this.secret.type.value,
                        fields: {
                            server: this.secret.server.value,
                            username: this.secret.username.value,
                            password: this.secret.password.value,
                        }
                    })
                    .then(res => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        this.$ga.event({
                            eventCategory: "secret",
                            eventAction: "secret create"
                        });
                        this.$notify({
                            title: res.message,
                            time: 3000,
                            type: "success"
                        });
                        this.$router.push(`/dashboard/secret`);
                    })
                    .catch(e => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        this.$ga.event({
                            eventCategory: "secret",
                            eventAction: "fail create  secret"
                        });
                        ErrorReporter(e, this.$data, true).forEach(error => {
                            this.$notify({
                                title: error,
                                time: 4000,
                                type: "error"
                            });
                        });
                    });
            }
        }
    };
</script>

<style lang="stylus" scoped>

    .title_header
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal

    .secret-type-rail
        width 100%
        -ms-overflow-style none
        scrollbar-width none
        white-space nowrap
        display block
        padding-bottom 3px
        overflow-x scroll
        overflow-y hidden

        div.type-selected
            display inline-flex
            overflow-x scroll
            width 200px
            height 50px
            cursor pointer
            background-color #0045ff
            box-shadow 0 2px 6px rgba(0, 69, 255, 0.4)
            border-radius 3px
            margin-left 16px

            span
                font-family "Helvetica Neue"
                font-size 1.2em
                color #fefefe
                width 100%
                cursor pointer
                line-height 50px
                text-align center

        div.type-unselected
            display inline-flex
            overflow-x scroll
            width 200px
            height 50px
            cursor pointer
            background-color #fefefe
            box-shadow 0 2px 6px rgba(0, 0, 0, 0.17)
            border-radius 3px
            margin-left 16px

            span
                width 100%
                font-family "Helvetica Neue"
                font-size 1.2em
                color #3c3c3c
                cursor pointer
                text-align center
                line-height 50px


</style>


<style lang="stylus">

    .v-label
        background transparent !important


</style>
