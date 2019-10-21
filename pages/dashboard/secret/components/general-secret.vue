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
                        @change="(secret_object.name = secret_object.name.trim())"
                        v-model="secret_object.name"
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
                        v-model="secret_object.type"
                        :hint="secret_obj.type.hint"
                        :label="secret_obj.type.label">

                </v-text-field>

            </div>

            <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <v-text-field
                        ref="key"
                        :rules="[rules.redundant]"
                        style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                        color="#0045ff"
                        type="text"
                        dir="ltr"
                        @change="(secret_field.key = secret_field.key.trim())"
                        v-model="secret_field.key"
                        :hint="secret_obj.secret_key.hint"
                        :label="secret_obj.secret_key.label">

                </v-text-field>

                <popover :tooltip="tooltips.secret_name"></popover>

            </div>

            <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                <v-text-field
                        ref="value"
                        style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                        color="#0045ff"
                        type="text"
                        dir="ltr"
                        @change="(secret_field.value = secret_field.value.trim())"
                        v-model="secret_field.value"
                        :hint="secret_obj.secret_value.hint"
                        :label="secret_obj.secret_value.label">

                </v-text-field>

                <popover :tooltip="tooltips.secret_name"></popover>

            </div>

            <div class="secret-action-container">

                <div class="edit">

                    <span class="right create-env-button" @click="onSubmitClicked">{{(isEditing ? 'بروزرسانی متغیر' : 'افزودن به جدول')}}</span>
                    <span v-if="isEditing" style="margin-left: 16px" @click="cancelEdit"
                          class="left cancel-button">{{'انصراف'}}</span>
                </div>

                <button v-if="editing" @click="putSecret"
                        class="confirm">تایید ویرایش
                </button>
                <button v-else @click="createSecret"
                        class="confirm">ایجاد سکرت جدید
                </button>

            </div>

        </div>

        <div class="row" style="margin-top: 24px">

            <secret-table
                    :titles="titleRow"
                    :items="secret_object.fields"
                    :menu="menuList">
                <span style="width: 100%; background-color: #EBF4FF; text-align: center; padding: 43px; font-family: iran-yekan; font-size: 1em;
border-radius: 3px; border: 1px solid #0045ff; color: #3C3C3C">
                متغیری ذخیره نشده است
                    </span>
            </secret-table>

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
        name: "general-secret",
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
                secret_field: {
                    key: null,
                    value: null
                },
                secret_object: {
                    name: null,
                    type: null,
                    fields: []
                },
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
                    redundant: value => (this.allowed_name === null ? this.secret_object.fields.filter(e => e.key === value).length === 0 : this.allowed_name === value || this.secret_object.fields.filter(e => e.key === value).length === 0) || 'نام متغیر تکراری است',
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
                    secret_key: {
                        label: 'نام متغیر',
                        hint: 'نام متغیری که قصد ساختن آن را دارید',
                        default: '',
                        value: null
                    },
                    secret_value: {
                        label: 'مقدار متغیر',
                        hint: 'مقدار متغیری که قصد ساختن آن را دارید',
                        default: '',
                        value: null
                    }
                },
                titleRow: [
                    {title: 'نام سکرت', width: '48%', name: 'key'},
                    {title: 'مقدار سکرت', width: '48%', name: 'value'},
                    {title: '', width: '4%', name: ''},

                ],
                menuList: [
                    {method: this.editSecret, icon: 'ic-upload.svg', title: 'ویرایش متغیر', style: {}},
                    {method: this.removeSecret, icon: 'ic_delete.svg', title: 'حذف  متغیر', style: {color: '#fd3259'}},
                ]

            }
        },
        methods: {
            editSecret(index) {
                this.isEditing = true;
                this.editing_index = index;
                this.secret_field.key = this.secret_object.fields[index].key;
                this.secret_field.value = this.secret_object.fields[index].value;
                this.allowed_name = this.secret_object.fields[index].key
                this.$refs.key.focus()
            },
            cancelEdit() {
                this.isEditing = false;

                this.secret_field.key = null;
                this.secret_field.value = null;
                this.allowed_name = null
                this.editing_index = -1
            },
            removeSecret(index) {
                this.secret_object.fields.splice(index, 1)
            },
            onHiddenClicked() {

                this.hidden_obj.selected = !this.hidden_obj.selected
            },
            onSubmitClicked() {

                if (this.secret_field.value === null) {
                    this.$refs.value.focus();
                    return;
                }


                if (this.secret_field.key.trim().length === 0) {
                    this.$refs.key.focus();
                    return;
                }


                if (this.secret_field.value.trim().length === 0) {
                    this.$refs.value.focus();
                    return;
                }

                if (this.rules.no_space(this.secret_field.key.trim()) !== true ||
                    this.rules.regex(this.secret_field.key.trim()) !== true ||
                    this.rules.redundant(this.secret_field.key.trim()) !== true) {
                    this.$refs.key.focus();
                    return;
                }


                if (this.isEditing) {
                    this.secret_object.fields.splice(this.editing_index, 1, {
                        key: this.secret_field.key,
                        value: this.secret_field.value
                    })
                } else {
                    this.secret_object.fields.push({
                        key: this.secret_field.key,
                        value: this.secret_field.value
                    })
                }

                this.secret_field.key = null;
                this.secret_field.value = null;
                this.isEditing = false;
                this.allowed_name = null;
                this.editing_index = -1;

            },
            putSecret() {
                this.loading = true;


                if (this.rules.required(this.secret_object.name) !== true ||
                    this.rules.required(this.secret_object.type) !== true) {

                    this.$notify({
                        title: 'از پر بودن همه فیلدها اطمینان حاصل فرمایید!',
                        time: 4000,
                        type: "error"
                    });

                    return
                }

                if (this.secret_object.fields.length === 0) {
                    this.$notify({
                        title: 'برای ساخت سکرت حداقل باید یک فیلد بسازید!',
                        time: 4000,
                        type: "error"
                    });

                    return
                }

                let final_fields = {};

                this.secret_object.fields.forEach(item => {
                    final_fields[item.key] = item.value
                });


                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                this.$store.dispatch("putSecret", {
                    name: this.secret_object.name,
                    type: this.secret_object.type,
                    fields: final_fields
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


                if (this.rules.required(this.secret_object.name) !== true) {

                    this.$notify({
                        title: 'از پر بودن همه فیلدها اطمینان حاصل فرمایید!',
                        time: 4000,
                        type: "error"
                    });

                    return
                }

                if (this.rules.secret_regex(this.secret_object.name) !== true) {

                    this.$notify({
                        title: 'نام سکرت صحیح نیست!',
                        time: 4000,
                        type: "error"
                    });

                    return

                }

                if ([...this.secret_object.fields].length === 0) {
                    this.$notify({
                        title: 'برای ساخت سکرت حداقل باید یک فیلد بسازید!',
                        time: 4000,
                        type: "error"
                    });

                    return
                }

                let final_fields = {};

                this.secret_object.fields.forEach(item => {
                    final_fields[item.key] = item.value
                });


                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                this.$store
                    .dispatch("createSecret", {
                        name: this.secret_object.name,
                        type: this.secret_object.type,
                        fields: final_fields
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
        }, created() {

            this.secret_object.name = this.secret.name;
            this.secret_object.type = this.secret.type;
            Object.keys({...this.secret.fields}).map((key) => {
                let temp = {};
                temp['key'] = key;
                temp['value'] = atob(this.secret.fields[key]);
                this.secret_object.fields.push(temp)
            });

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

        div.edit
            margin-left auto

        button.confirm
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
