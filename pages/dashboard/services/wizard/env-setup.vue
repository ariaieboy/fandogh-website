<template>

    <div>

        <div style="margin-top: 12px;">


            <config-box :section-title="sections.create_env"
                        :tooltip="sections.create_env_tooltip">

                <div style="width: 100%;">

                    <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0;">

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    :rules="[rules.name_required, rules.regex, rules.no_space, rules.redundant]"
                                    style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0093ff"
                                    type="text"
                                    dir="ltr"
                                    @change="(manifest_model.environment_variable.name = manifest_model.environment_variable.name.trim())"
                                    v-model="manifest_model.environment_variable.name"
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
                                    v-model="manifest_model.environment_variable.value"
                                    @change="(manifest_model.environment_variable.value = manifest_model.environment_variable.value.trim())"
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
                            <span v-if="isEditing" style="margin-left: 16px" @click="cancelEdit" class="left cancel-button">{{'انصراف'}}</span>

                        </div>


                    </form>

                </div>

            </config-box>

            <env-table class="row"
                       :titles="titleRow"
                       :items="manifest_model.environment_variable.env_list"
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
    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";
    import FanCheckbox from "../../../../components/wizard/select-box/fan-checkbox";
    import EnvTable from "../../../../components/wizard/table/env-table";


    export default {
        name: "env-setup",
        props: {
            manifest_model: {
                type: Object,
                required: true
            }
        },
        model:{
            prop: 'manifest_model',
        },
        components: {
            Popover,
            ConfigBox,
            FanCheckbox,
            EnvTable

        },
        data() {
            return {

                editing_index: -1,
                isEditing: false,
                allowed_name: null,
                rules: {
                    name_required: value => !!value.trim() || 'نام متغیر نمی‌تواند خالی باشد',
                    value_required: value => !!value.trim() || 'مقدار متغیر نمی‌تواند خالی باشد',
                    no_space: value => !value.toString().includes(' ') || 'فاصله مجاز نیست',
                    regex: value => new RegExp('^[a-zA-Z1-9_]+$').test(value) || 'فقط حروف کوچک، حروف بزرگ، underscore و اعداد معتبر هستند',
                    redundant: value => (this.allowed_name === null ? this.manifest_model.environment_variable.env_list.filter(e => e.name === value).length === 0 : this.allowed_name === value || this.manifest_model.environment_variable.env_list.filter(e => e.name === value).length === 0) || 'مقدار تکراری است',
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
                    {method: this.editEnv, icon: 'ic-upload.svg', title: 'ویرایش متغیر', style: {}},
                    {method: this.removeEnv, icon: 'ic_delete.svg', title: 'حذف  متغیر', style: {color: '#fd3259'}},
                ]

            }
        },
        methods: {
            editEnv(index) {
                this.isEditing = true
                this.editing_index = index
                this.manifest_model.environment_variable.name = this.manifest_model.environment_variable.env_list[index].name
                this.manifest_model.environment_variable.value = this.manifest_model.environment_variable.env_list[index].value
                this.hidden_obj.selected = this.manifest_model.environment_variable.env_list[index].hidden

                this.allowed_name =  this.manifest_model.environment_variable.env_list[index].name

                this.$refs.key.focus()
            },
            cancelEdit(){
                this.isEditing = false

                this.manifest_model.environment_variable.name = null;
                this.manifest_model.environment_variable.value = null;
                this.hidden_obj.selected = false;
                this.allowed_name = null

                this.editing_index = -1
            },
            removeEnv(index) {
                this.manifest_model.environment_variable.env_list.splice(index, 1)
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

                if (this.manifest_model.environment_variable.name === null) {
                    this.$refs.key.focus()
                    return;
                }

                if (this.manifest_model.environment_variable.value === null) {
                    this.$refs.value.focus()
                    return;
                }


                if (this.manifest_model.environment_variable.name.trim().length === 0) {
                    this.$refs.key.focus()
                    return;
                }

                if(this.rules.no_space(this.manifest_model.environment_variable.name.trim()) !== true ||
                this.rules.regex(this.manifest_model.environment_variable.name.trim()) !== true ||
                this.rules.redundant(this.manifest_model.environment_variable.name.trim()) !== true){
                    this.$refs.key.focus()
                    return;
                }


                if (this.manifest_model.environment_variable.value.trim().length === 0) {
                    this.$refs.value.focus()
                    return;
                }


                if (this.isEditing) {
                    this.manifest_model.environment_variable.env_list.splice(this.editing_index, 1, {
                        name: this.manifest_model.environment_variable.name.trim(),
                        value: this.manifest_model.environment_variable.value.trim(),
                        hidden: this.hidden_obj.selected
                    })
                } else {
                    this.manifest_model.environment_variable.env_list.push({
                        name: this.manifest_model.environment_variable.name.trim(),
                        value: this.manifest_model.environment_variable.value.trim(),
                        hidden: this.hidden_obj.selected
                    })
                }

                this.manifest_model.environment_variable.value = null
                this.manifest_model.environment_variable.name = null
                this.hidden_obj.selected = false
                this.isEditing = false
                this.editing_index = -1
                this.allowed_name = null

            }
        },
        watch: {
            'manifest_model.environment_variable.env_list': {
                handler: function (value, oldValue) {
                    if (value.length === 0)
                        this.deleteFromManifest('spec.env')
                    else
                        this.addToManifest(value, 'spec.env')

                }, deep: true
            }
        },
        computed: {},
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
