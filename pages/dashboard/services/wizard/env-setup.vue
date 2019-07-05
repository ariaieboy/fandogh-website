<template>

    <div>

        <banner :page="page"></banner>

        <div style="margin-top: 12px">


            <config-box :section-title="sections.create_env"
                        :tooltip="sections.create_env_tooltip">

                <div style="width: 100%;">

                    <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0;">

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    :rules="[rules.name_required]"
                                    style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0093ff"
                                    type="text"
                                    dir="ltr"
                                    :disabled="isEditing"
                                    v-model="environment_variable.name"
                                    :hint="env_obj.key_hint"
                                    :label="env_obj.key_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.env_name"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="value"
                                    :rules="[rules.value_required]"
                                    style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0093ff"
                                    type="text"
                                    dir="ltr"
                                    v-model="environment_variable.value"
                                    :hint="env_obj.value_hint"
                                    :label="env_obj.value_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.env_value"></popover>

                        </div>

                        <div style="display: inline-block; margin-top: 16px; width: 100%">

                            <fan-checkbox @click.native="onHiddenClicked"
                                          v-tooltip="'در صورت فعال کردن این گزینه، مقدار متغیر در مانیفست hidden خواهد شد'"
                                          :object="hidden_obj"></fan-checkbox>

                            <span class="left create-env-button" @click="onSubmitClicked">{{(isEditing ? 'بروزرسانی متغیر' : 'افزودن به جدول')}}</span>


                        </div>


                    </form>

                </div>

            </config-box>

            <env-table class="row"
                       :titles="titleRow"
                       :items="env_list"
                       :menu="menuList">
                <span style="width: 100%; background-color: #EBF4FF; text-align: center; padding: 43px; font-family: iran-yekan; font-size: 1em;
border-radius: 3px; border: 1px solid #0093FF; color: #3C3C3C">
                متغیری ذخیره نشده است
                    </span>
            </env-table>


        </div>


    </div>

</template>

<script>
    import Banner from "../../../../components/wizard/banner/banner";
    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";
    import FanCheckbox from "../../../../components/wizard/select-box/fan-checkbox";
    import EnvTable from "../../../../components/wizard/table/env-table";


    export default {
        name: "env-setup",
        components: {
            Banner,
            Popover,
            ConfigBox,
            FanCheckbox,
            EnvTable

        },
        data() {
            return {

                isEditing: false,
                environment_variable: {
                    name: '',
                    value: ''
                },
                rules: {
                    name_required: value => value !== '' || 'نام متغیر نمی‌تواند خالی باشد',
                    value_required: value => value !== '' || 'مقدار متغیر نمی‌تواند خالی باشد',
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
                    env_name: {
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
                },
                titleRow: [
                    {title: 'نام متغیر', width: '40%', name: 'key'},
                    {title: 'مقدار متغیر', width: '40%', name: 'value'},
                    {title: 'محرمانه', width: '16%', name: 'hidden'},
                    {title: '', width: '4%', name: ''},

                ],
                menuList: [
                    {method: '', icon: 'ic-logs.svg', title: 'ورژن‌های ایمیج', style: {}},
                    {method: this.editEnv, icon: 'ic-upload.svg', title: 'ویرایش متغیر', style: {}},
                    {method: this.removeEnv, icon: 'ic_delete.svg', title: 'حذف  متغیر', style: {color: '#fd3259'}},
                ],
                env_list: []

            }
        },
        methods: {
            editEnv(index) {
                this.isEditing = true
                this.environment_variable.name = this.env_list[index].name
                this.environment_variable.value = this.env_list[index].value
                this.hidden_obj.selected = this.env_list[index].hidden
            },
            removeEnv(index) {
                this.env_list.splice(index, 1)
            },
            onHiddenClicked() {

                this.hidden_obj.selected = !this.hidden_obj.selected
            },
            addToManifest(value, path) {
                this.$store.dispatch('manifestGenerator', {
                    value: value,
                    path: path
                })
            },
            deleteFromManifest(path) {
                this.$store.dispatch('manifestDeleter', {
                    path: path
                })
            },
            onSubmitClicked() {

                if (this.environment_variable.name === null) {
                    this.$refs.key.focus()
                    return;
                }

                if (this.environment_variable.value === null) {
                    this.$refs.value.focus()
                    return;
                }


                if (this.environment_variable.name.trim().length === 0) {
                    this.$refs.key.focus()
                    return;
                }


                if (this.environment_variable.value.trim().length === 0) {
                    this.$refs.value.focus()
                    return;
                }


                if (this.isEditing) {
                    this.env_list.forEach(env => {
                        if (env.name === this.environment_variable.name) {
                            env.name = this.environment_variable.name
                            env.value = this.environment_variable.value
                            env.hidden = this.hidden_obj.selected
                        }
                    })
                } else {
                    this.env_list.push({
                        name: this.environment_variable.name,
                        value: this.environment_variable.value,
                        hidden: this.hidden_obj.selected
                    })
                }

                this.environment_variable.value = null
                this.environment_variable.name = null
                this.hidden_obj.selected = false
                this.isEditing = false

            }
        },
        watch: {
            env_list: {
                handler: function (value, oldValue) {
                    if (value.length === 0)
                        this.deleteFromManifest('spec.env')
                    else
                        this.addToManifest(value, 'spec.env')

                }, deep: true
            }
        },
        computed: {},
        created() {

            let manifest = JSON.parse(localStorage.getItem('vuex')).manifest;

            if (manifest.hasOwnProperty('spec')) {
                let spec = manifest.spec

                if (spec.hasOwnProperty('env')) {

                    spec.env.forEach(item => {
                        this.env_list.push(item)
                    })
                }
            }
        },
        mounted() {

        }
    }
</script>

<style lang="stylus" scoped>

    .create-env-button
        font-size .9em
        color #fefefe
        padding 8px 16px
        border-radius 3px
        font-family iran-yekan
        background-color #24d5d8
        cursor pointer
        user-select none
        box-shadow 0 1px 3px 0 rgba(36, 213, 216, 0.3), 0 1px 5px 0 rgba(36, 213, 216, 0.6)
        float: left

</style>