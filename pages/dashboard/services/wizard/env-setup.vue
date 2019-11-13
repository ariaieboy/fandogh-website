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
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    type="text"
                                    dir="ltr"
                                    @change="(manifest_model.environment_variable.name = manifest_model.environment_variable.name.trim())"
                                    v-model="manifest_model.environment_variable.name"
                                    :hint="env_obj.key_hint"
                                    :label="env_obj.key_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.env_name"></popover>

                        </div>

                        <div class="env-value-selector-container">
                            <p v-tooltip="'در صورت فعال کردن این گزینه، مقدار متغیر را باید به صورت مستقیم تایپ نمایید.'" @click="onSecretClicked(false)" :class="{'selected' : !secret_obj.selected}">مقدار مستقیم</p>
                            <p v-tooltip="'در صورت فعال کردن این گزینه، مقدار متغیر از سکرتی که اسم آن را تایپ می‌کنید، خوانده می‌شود.'" @click="onSecretClicked(true)" :class="{'selected' : secret_obj.selected}">مقدار سکرت</p>
                            <div></div>
                        </div>

                        <div style="display: flex;"
                             :style="{display: !secret_obj.selected ? 'flex' : 'none'}">

                            <v-text-field
                                    ref="value"
                                    :rules="[rules.value_required]"
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    type="text"
                                    dir="ltr"
                                    v-model="manifest_model.environment_variable.value"
                                    @change="(manifest_model.environment_variable.value = manifest_model.environment_variable.value.trim())"
                                    :hint="env_obj.value_hint"
                                    :label="env_obj.value_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.env_value"></popover>

                        </div>

                        <div style="display: flex;"
                             :style="{display: secret_obj.selected ? 'flex' : 'none'}">

                            <v-text-field
                                    ref="secret"
                                    :rules="[rules.secret_required, rules.secret_regex, rules.no_space]"
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    type="text"
                                    dir="ltr"
                                    @change="(manifest_model.environment_variable.secret = manifest_model.environment_variable.secret.trim())"
                                    v-model="manifest_model.environment_variable.secret"
                                    :hint="env_obj.secret_hint"
                                    :label="env_obj.secret_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.secret"></popover>

                        </div>

                        <div style="display: inline-block; margin-top: 16px; width: 100%">

                            <fan-checkbox @click.native="onHiddenClicked"
                                          :style="{display: secret_obj.selected ? 'none' : 'inline-flex'}"
                                          v-tooltip="'در صورت فعال کردن این گزینه، مقدار متغیر در مانیفست hidden خواهد شد'"
                                          :object="hidden_obj"></fan-checkbox>

                            <span class="left create-env-button" @click="onSubmitClicked">{{(isEditing ? 'بروزرسانی متغیر' : 'افزودن به جدول')}}</span>
                            <span v-if="isEditing" style="margin-left: 16px" @click="cancelEdit"
                                  class="left cancel-button">{{'انصراف'}}</span>

                        </div>


                    </form>

                </div>

            </config-box>

            <env-table class="row"
                       :titles="titleRow"
                       :items="manifest_model.environment_variable.env_list"
                       :menu="menuList">
                <span style="width: 100%; background-color: #EBF4FF; text-align: center; padding: 43px; font-family: iran-yekan; font-size: 1em;
border-radius: 3px; border: 1px solid #0045ff; color: #3C3C3C">
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
        model: {
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
                    value_required: value => !!value.trim() || !this.secret_obj.selected || 'مقدار متغیر نمی‌تواند خالی باشد',
                    secret_required: value => !!value.trim() || this.secret_obj.selected || 'مقدار متغیر نمی‌تواند خالی باشد',
                    no_space: value => !value.toString().includes(' ') || 'فاصله مجاز نیست',
                    regex: value => new RegExp('^[a-zA-Z1-9_]+$').test(value) || 'فقط حروف کوچک، حروف بزرگ، underscore و اعداد معتبر هستند',
                    secret_regex: value => new RegExp('^[a-z0-9]+([-.a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد، خط تیره (-) و (.) معتبر هستند)',
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
                    },
                    secret: {
                        title: 'مقدار سکرت',
                        text: 'اگر قصد دارید مقدار env از سکرت خوانده شود و کسی به مقادیر دسترسی نداشته باشد، با گذاشتن نام سکرتی که مقادیر در آن ذخیره شده است می‌توانید این کار را انجام دهید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#env'
                    }
                },
                env_obj: {
                    key_label: 'نام متغیر',
                    value_label: 'مقدار متغیر',
                    secret_label: 'نام سکرت',
                    key_hint: 'نام متغیر را وارد نمایید',
                    secret_hint: 'نام سکرت را وارد نمایید',
                    value_hint: 'مقدار متغیر را وارد نمایید',
                    default: '',
                    key: '',
                    value: '',
                    secret: ''
                },
                hidden_obj: {
                    label: "مقدار محرمانه",
                    value: "hidden",
                    selected: false
                },
                secret_obj: {
                    label: 'سکرت',
                    value: 'secret',
                    selected: false
                },
                titleRow: [
                    {title: 'نام متغیر', width: '28%', name: 'key'},
                    {title: 'مقدار متغیر', width: '28%', name: 'value'},
                    {title: 'نام سکرت', width: '28%', name: 'secret'},
                    {title: 'محرمانه', width: '12%', name: 'hidden'},
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
                this.isEditing = true;
                this.editing_index = index;
                this.manifest_model.environment_variable.name = this.manifest_model.environment_variable.env_list[index].name;
                this.manifest_model.environment_variable.value = this.manifest_model.environment_variable.env_list[index].value;
                let secret = this.manifest_model.environment_variable.env_list[index].secret;
                this.manifest_model.environment_variable.secret = secret ? secret : null;
                this.hidden_obj.selected = this.manifest_model.environment_variable.env_list[index].hidden;
                this.secret_obj.selected = !!this.manifest_model.environment_variable.env_list[index].secret;

                this.allowed_name = this.manifest_model.environment_variable.env_list[index].name;

                this.$refs.key.focus()
            },
            cancelEdit() {
                this.isEditing = false;

                this.manifest_model.environment_variable.name = null;
                this.manifest_model.environment_variable.value = null;
                this.manifest_model.environment_variable.secret = null;
                this.hidden_obj.selected = false;
                this.allowed_name = null;
                this.secret_obj.selected = false;

                this.editing_index = -1
            },
            removeEnv(index) {
                this.manifest_model.environment_variable.env_list.splice(index, 1)
            },
            onHiddenClicked() {
                this.hidden_obj.selected = !this.hidden_obj.selected
            },
            onSecretClicked(activated) {
                if (!activated) {
                    this.manifest_model.environment_variable.value = null;
                } else {
                    this.manifest_model.environment_variable.secret = null;
                }
                this.secret_obj.selected = activated

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
                    this.$refs.key.focus();
                    return;
                }


                if (this.manifest_model.environment_variable.value === null && !this.secret_obj.selected) {
                    this.$refs.value.focus();
                    return;
                }


                if (this.manifest_model.environment_variable.secret === null && this.secret_obj.selected) {
                    this.$refs.secret.focus();
                    return;
                }


                if (this.manifest_model.environment_variable.name.trim().length === 0) {
                    this.$refs.key.focus();
                    return;
                }


                if (this.rules.no_space(this.manifest_model.environment_variable.name.trim()) !== true ||
                    this.rules.regex(this.manifest_model.environment_variable.name.trim()) !== true ||
                    this.rules.redundant(this.manifest_model.environment_variable.name.trim()) !== true) {
                    this.$refs.key.focus();
                    return;
                }


                if (!this.secret_obj.selected) {
                    if (this.manifest_model.environment_variable.value.trim().length === 0) {
                        this.$refs.value.focus();
                        return;
                    }
                }


                if (this.secret_obj.selected) {
                    if (this.manifest_model.environment_variable.secret.trim().length === 0) {
                        this.$refs.secret.focus();
                        return;
                    }
                }


                if (this.isEditing) {
                    if (this.secret_obj.selected) {
                        this.manifest_model.environment_variable.env_list.splice(this.editing_index, 1, {
                            name: this.manifest_model.environment_variable.name.trim(),
                            secret: this.manifest_model.environment_variable.secret,
                            hidden: this.hidden_obj.selected
                        })
                    } else {
                        this.manifest_model.environment_variable.env_list.splice(this.editing_index, 1, {
                            name: this.manifest_model.environment_variable.name.trim(),
                            value: this.manifest_model.environment_variable.value.trim(),
                            hidden: this.hidden_obj.selected
                        })
                    }
                } else {
                    if (this.secret_obj.selected) {
                        this.manifest_model.environment_variable.env_list.push({
                            name: this.manifest_model.environment_variable.name.trim(),
                            secret: this.manifest_model.environment_variable.secret,
                            hidden: this.hidden_obj.selected
                        })
                    } else {
                        this.manifest_model.environment_variable.env_list.push({
                            name: this.manifest_model.environment_variable.name.trim(),
                            value: this.manifest_model.environment_variable.value.trim(),
                            hidden: this.hidden_obj.selected
                        })
                    }
                }

                this.manifest_model.environment_variable.value = null;
                this.manifest_model.environment_variable.name = null;
                this.manifest_model.environment_variable.secret = null;
                this.hidden_obj.selected = false;
                this.secret_obj.selected = false;
                this.isEditing = false;
                this.editing_index = -1;
                this.allowed_name = null

            }
        },
        watch: {
            'manifest_model.environment_variable.env_list': {
                handler: function (value, oldValue) {
                    if (value.length === 0)
                        this.deleteFromManifest('spec.env');
                    else
                        this.addToManifest(value, 'spec.env')

                }, deep: true
            }
        },
        computed: {},
    }
</script>

<style lang="stylus" scoped>

    @import "../../../../assets/css/variables.styl"

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

    .env-value-selector-container
        margin-top 24px
        margin-bottom 16px
        display flex

        div
            background-color $grayMedium
            height 1px
            width 100%
            margin-top auto

        p
            color #7c7c7c
            padding-left 24px
            font-family iran-yekan
            margin-bottom 0
            min-width max-content
            cursor pointer
            font-size .9em
            position relative
            transition all .2s ease-in-out
            border-bottom 1px solid $grayMedium

            &.selected
                color $colorPrimary
                border-bottom 1px solid $colorPrimary

        p:hover
            color $colorPrimary
            border-bottom 1px solid $colorPrimary

</style>
