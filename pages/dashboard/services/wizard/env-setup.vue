<template>

    <div>

        <banner :page="page"></banner>

        <div style="margin-top: 12px">


            <config-box :section-title="sections.create_env" :tooltip="sections.create_env_tooltip">

                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0;">

                    <div style="display: flex;">

                        <v-text-field
                                style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                color="#0093ff"
                                type="text"
                                dir="ltr"
                                v-model="env_obj.key"
                                :hint="env_obj.key_hint"
                                :label="env_obj.key_label">

                        </v-text-field>

                        <popover :tooltip="tooltips.env_key"></popover>

                    </div>

                    <div style="display: flex;">

                        <v-text-field
                                style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                color="#0093ff"
                                type="text"
                                dir="ltr"
                                v-model="env_obj.value"
                                :hint="env_obj.value_hint"
                                :label="env_obj.value_label">

                        </v-text-field>

                        <popover :tooltip="tooltips.env_value"></popover>

                    </div>

                    <div style="display: flex; margin-top: 16px">

                        <fan-checkbox :object="hidden_obj"></fan-checkbox>



                    </div>

                </form>

            </config-box>


        </div>


    </div>

</template>

<script>
    import Banner from "../../../../components/wizard/banner/banner";
    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";
    import FanCheckbox from "../../../../components/wizard/select-box/fan-checkbox";


    export default {
        name: "env-setup",
        components: {
            Banner,
            Popover,
            ConfigBox,
            FanCheckbox

        },
        data() {
            return {

                rules: {
                    required: value => !!value || 'این فیلد اجباری‌ است',
                    is_negative: value => value >= 50 || 'کمترین میزان رم قابل قبول ۵۰ مگابایت است',
                    valid_name: value => !!value || 'این فیلد اجباری‌ است'
                },
                page: {
                    title: 'Environment variables',
                    description: 'برای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند در\n' +
                        '                ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند\n' +
                        '                در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که\n' +
                        '                می‌ماند در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق\n' +
                        '                که می‌ماند در ذهن‌ها'
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
                    env_key: {
                        title: 'نام متغیر',
                        text: 'با تعیین نام متغیر می‌توانید در زمان اجرا، به آن متغیر با همان نام دسترسی داشته باشید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#env'
                    },
                    env_value: {
                        title: 'مقدار متغیر',
                        text: 'مقداری که قصد دارید به متغیر جدید تعلق گیرد',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#env'
                    }
                },
                env_obj: {
                    key_label: 'نام متغیر',
                    value_label: 'مقدار متغیر',
                    key_hint: 'نام متغیر را وارد نمایید',
                    value_hint: 'مقدار متغیر را وارد نمایید',
                    default: '',
                    key: '',
                    value: ''
                },
                hidden_obj: {
                    label: "مقدار محرمانه",
                    value: "hidden",
                    selected: false
                }

            }
        },
        methods: {},
        watch: {},
        computed: {},
        created() {

        },
        mounted() {

        }
    }
</script>

<style lang="stylus" scoped>

</style>