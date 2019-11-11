<template>
    <div style="padding: 16px; margin: 0">
        <div class="row"
             style="background-color: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.17); padding: 16px;">

            <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <v-text-field
                        ref="name"
                        style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                        color="#0045ff"
                        type="text"
                        dir="ltr"
                        :disabled="editing"
                        @change="(secret.name = secret.name.trim())"
                        v-model="secret.name"
                        :hint="secret_obj.name.hint"
                        :label="secret_obj.name.label">

                </v-text-field>

                <popover v-if="!editing" :tooltip="tooltips.secret_name"></popover>

            </div>
            <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <v-text-field
                        ref="type"
                        style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                        color="#0045ff"
                        type="text"
                        dir="ltr"
                        :disabled="true"
                        v-model="secret.type"
                        :hint="secret_obj.type.hint"
                        :label="secret_obj.type.label">

                </v-text-field>

            </div>

            <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <v-text-field
                        ref="value"
                        style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                        color="#0045ff"
                        type="text"
                        dir="ltr"
                        @change="(secret.value = secret.value.trim())"
                        v-model="secret.value"
                        :hint="secret_obj.secret_value.hint"
                        :label="secret_obj.secret_value.label">

                </v-text-field>

                <popover :tooltip="tooltips.secret_name"></popover>

            </div>

        </div>

        <div class="secret-action-container">

            <button v-if="editing" @click="putSecret"
                    class="confirm">تایید ویرایش
            </button>
            <button v-else @click="createSecret"
                    class="confirm">ایجاد سکرت جدید
            </button>

        </div>

    </div>
</template>

<script>
    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";
    import FanCheckbox from "../../../../components/wizard/select-box/fan-checkbox";
    import SecretTable from "../components/secret-table";
    import ErrorReporter from "../../../../utils/ErrorReporter";

    export default {
        name: "environment-secret",
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
        components: {
            Popover,
            ConfigBox,
            FanCheckbox,
            SecretTable

        },
        data() {
            return {
                editing_index: -1,
                isEditing: false,
                allowed_name: null,
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    name_required: value => !!value.trim() || 'نام متغیر نمی‌تواند خالی باشد',
                    value_required: value => !!value.trim() || 'مقدار متغیر نمی‌تواند خالی باشد',
                    no_space: value => !value.toString().includes(' ') || 'فاصله مجاز نیست',
                    regex: value => new RegExp('^[a-zA-Z1-9_]+$').test(value) || 'فقط حروف کوچک، حروف بزرگ، underscore و اعداد معتبر هستند',
                    secret_regex: value => new RegExp('^[a-z0-9]+([-.a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد، خط تیره (-) و (.) معتبر هستند)',
                },
                sections: {
                    create_env: 'ساخت Environment Variable',
                    create_env_tooltip: {
                        title: 'ساخت Environment Variable',
                        text: 'برای آنکه بتوانید از Environment Variableها استفاده نمایید، باید آن‌ها را در مانیفست خود اضافه نمایید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#env'
                    },
                },
                tooltips: {
                    secret_name: {
                        title: 'نام سکرت',
                        text: 'با تعیین نام متغیر می‌توانید در زمان اجرا، به آن متغیر با همان نام دسترسی داشته باشید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#env'
                    },
                    secret_key: {
                        title: 'نام متغیر',
                        text: 'نام متغیری که قصد ساختن آن را دارید',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#env'
                    },
                    secret_value: {
                        title: 'مقدار متغیر',
                        text: 'مقدار متغیری که قصد ساختن آن را دارید',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#env'
                    },
                    secret_type: {
                        title: 'نوع سکرت',
                        text: 'مقداری که قصد دارید به متغیر جدید تعلق گیرد',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#env'
                    }
                },
                secret_obj: {
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
                        value: 'general'
                    },
                    secret_value: {
                        label: 'مقدار متغیر',
                        hint: 'مقدار متغیری که قصد ساختن آن را دارید',
                        default: '',
                        value: null
                    }
                }
            }
        },
        methods: {
            putSecret() {
                this.loading = true;


                if (this.rules.required(this.secret.name) !== true ||
                    this.rules.required(this.secret.type) !== true ||
                    this.rules.required(this.secret.value) !== true) {

                    this.$notify({
                        title: 'از پر بودن همه فیلدها اطمینان حاصل فرمایید!',
                        time: 4000,
                        type: "error"
                    });

                    return
                }


                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                this.$store.dispatch("putSecret", {
                    name: this.secret.name,
                    type: this.secret.type,
                    fields: {SECRET_KEY: this.secret.value}
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
                    this.rules.required(this.secret.value) !== true) {

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


                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                this.$store
                    .dispatch("createSecret", {
                        name: this.secret.name,
                        type: this.secret.type,
                        fields: {SECRET_KEY: this.secret.value}
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

    .create-env-button
        font-size .9em
        color #fefefe
        padding 12px 24px
        border-radius 3px
        font-family iran-yekan
        background-color rgba(79, 204, 84, 1)
        cursor pointer
        user-select none
        box-shadow 0 2px 6px 0 rgba(79, 204, 84, 0.4)
        float: left

    .secret-action-container
        display flex
        margin-top 16px
        width 100%

        button.confirm
            margin-left auto
            margin-right auto
            max-width: 300px;
            background: #00E5FF;
            width: 100%;
            margin-top: auto;
            margin-bottom: auto;
            padding: 12px 0;
            border-radius: 3px;
            box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4);
            outline: none;
            font-family: iran-yekan;
            color: #1d1d1d

        @media only screen and (max-width 992px)
            display flex
            flex-direction column

            div.edit
                margin-left auto
                margin-right auto

            button.confirm
                margin-top 16px
                margin-left auto
                margin-right auto

</style>
