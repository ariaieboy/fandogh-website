<template>
    <div style="padding: 16px">
        <div class="row"
             style="background-color: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.17); padding: 16px;">

            <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                              color="#0045ff"
                              type="text"
                              dir="ltr"
                              :disabled="editing"
                              v-model="secret.name"
                              :label="secret_info.name.label">

                </v-text-field>

                <popover :tooltip="tooltips.name"></popover>

            </div>
            <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                              color="#0045ff"
                              type="text"
                              dir="ltr"
                              :disabled="true"
                              v-model="secret.type"
                              :label="secret_info.type.label">

                </v-text-field>

                <popover :tooltip="tooltips.type"></popover>

            </div>
            <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <v-text-field
                        style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; background-color: transparent !important;"
                        color="#0045ff"
                        type="text"
                        dir="ltr"
                        :rules="[rules.required]"
                        v-model="secret.username"
                        :hint="secret_info.username.hint"
                        :label="secret_info.username.label">

                </v-text-field>

                <popover :tooltip="tooltips.username"></popover>

            </div>
            <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                              color="#0045ff"
                              type="text"
                              dir="ltr"
                              :type="'password'"
                              browser-autocomplete="new-password"
                              :rules="[rules.required]"
                              v-model="secret.password"
                              :hint="secret_info.password.hint"
                              :label="secret_info.password.label">

                </v-text-field>

                <popover :tooltip="tooltips.password"></popover>

            </div>
            <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                              color="#0045ff"
                              type="text"
                              dir="ltr"
                              :rules="[rules.required, rules.url_regex]"
                              v-model="secret.server"
                              :hint="secret_info.server.hint"
                              :label="secret_info.server.label">

                </v-text-field>

                <popover :tooltip="tooltips.server"></popover>

            </div>

        </div>

        <div class="row" style="width: 100%; padding: 16px">
            <button v-if="editing" @click="putSecret"
                    class="col-lg-6 col-md-6 col-sm-12 col-xs-12 container-fluid"
                    style="max-width: 300px; background: #00E5FF; width: 100%; margin-top: auto; margin-bottom: auto; padding: 12px 0; border-radius: 3px; box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4);
                                    outline: none; font-family: iran-yekan; color: #1d1d1d">تایید ویرایش
            </button>

            <button v-else @click="createSecret"
                    class="col-lg-6 col-md-6 col-sm-12 col-xs-12 container-fluid"
                    style="max-width: 300px; background: #00E5FF; width: 100%; margin-top: auto; margin-bottom: auto; padding: 12px 0; border-radius: 3px; box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4);
                                    outline: none; font-family: iran-yekan; color: #1d1d1d">
                ایجاد سکرت جدید
            </button>
        </div>

    </div>
</template>

<script>
    import FInput from "~/components/elements/input";
    import FButton from "~/components/elements/button";
    import File from "~/components/elements/file";
    import {formData} from "~/utils/formData";
    import ProgressBar from "~/components/Dashboard/progress-bar";
    import ErrorReporter from "~/utils/ErrorReporter";
    import FormValidator from "~/utils/formValidator";
    import Popover from "../../../../components/wizard/tooltip/popover";

    export default {
        name: "docker-secret",
        props: {
            secret: {
                type: Object,
                required: false
            },
            editing: {
                type: Boolean,
                required: false,
                value: false
            }
        },
        data() {
            return {
                type: "docker-registry",
                loading: false,
                loadingProgress: false,
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    secret_regex: value => new RegExp('^[a-z0-9]+([-.a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد، خط تیره (-) و (.) معتبر هستند)',
                    counter: value => value.length <= 253 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    url_regex: value => new RegExp('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$').test(value) || 'آدرس وارد شده معتبر نیست'
                },
                secret_info: {
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
        components: {
            FInput,
            FButton,
            File,
            ProgressBar,
            Popover
        }, computed: {
            progress() {
                return this.$store.state.progress;
            }
        }, methods: {
            putSecret() {
                this.loading = true;

                if (this.rules.required(this.secret.server) !== true ||
                    this.rules.required(this.secret.username) !== true ||
                    this.rules.required(this.secret.password) !== true) {

                    this.$notify({
                        title: 'از پر بودن همه فیلدها اطمینان حاصل فرمایید!',
                        time: 4000,
                        type: "error"
                    });

                    return
                }


                if (this.rules.url_regex(this.secret.server) !== true) {

                    this.$notify({
                        title: 'آدرس url وارد شده معتبر نیست!',
                        time: 4000,
                        type: "error"
                    });
                    return
                }


                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                this.$store.dispatch("putSecret", {
                    name: this.secret.name,
                    type: this.secret.type,
                    fields: {
                        server: this.secret.server,
                        username: this.secret.username,
                        password: this.secret.password,
                    }
                }).then(res => {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    this.$ga.event({
                        eventCategory: "secret",
                        eventAction: "secret put",
                        eventLabel: "secret name",
                        eventValue: this.name
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
                            eventAction: "fail create  secret",
                            eventLabel: "secret name",
                            eventValue: this.name
                        });
                        ErrorReporter(e, this.$data, true).forEach(error => {
                            this.$notify({
                                title: error,
                                time: 4000,
                                type: "error"
                            });
                        });
                    });
            },
            createSecret() {

                if (this.rules.required(this.secret.name) !== true ||
                    this.rules.required(this.secret.server) !== true ||
                    this.rules.required(this.secret.username) !== true ||
                    this.rules.required(this.secret.password) !== true) {

                    this.$notify({
                        title: 'از پر بودن همه فیلدها اطمینان حاصل فرمایید!',
                        time: 4000,
                        type: "error"
                    });

                    return
                }

                if (this.rules.secret_regex(this.secret.name) !== true) {

                    this.$notify({
                        title: 'نام سکرت صحیح نیست!',
                        time: 4000,
                        type: "error"
                    });

                    return

                }


                if (this.rules.url_regex(this.secret.server) !== true) {

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
                        name: this.secret.name,
                        type: this.secret.type,
                        fields: {
                            server: this.secret.server,
                            username: this.secret.username,
                            password: this.secret.password,
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
    }
</script>

<style lang="stylus" scoped>

</style>
