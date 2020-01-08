<template>
    <div>
        <div>
            <config-box :section-title="sections.service_config">

                <form class="col-xs-12" style="padding: 0">

                    <div style="display: flex">

                        <v-text-field
                                ref="name_selector"
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                :rules="[rules.counter, rules.required, rules.regex]"
                                v-model="manifest_model.name.name"
                                :label="manifest_model.name.label"
                                :counter="manifest_model.name.counter"
                                :maxlength="manifest_model.name.counter"
                                :hint="manifest_model.name.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.name"></popover>

                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                :rules="[rules.counter, rules.required, rules.password_regex]"
                                v-model="mssql_manifest.password.value"
                                :label="password.label"
                                :hint="password.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.password"></popover>

                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field style="font-family: iran-yekan; font-size: 1em; margin-left: -15px"
                                      color="#0093ff"
                                      dir="ltr"
                                      prefix="Mi"
                                      :rules="[rules.default_memory, rules.required]"
                                      type="number"
                                      min="50"
                                      :hint="manifest_model.memory.hint"
                                      v-model.number="manifest_model.memory.amount"
                                      required
                                      @change="(manifest_model.memory.amount < 50 ? manifest_model.memory.amount = 200 : manifest_model.memory.amount)"
                                      :label="manifest_model.memory.label">

                        </v-text-field>


                        <popover :tooltip="tooltips.memory"></popover>


                    </div>

                </form>

            </config-box>

            <config-box :section-title="sections.adminer_config">

                <div style="width: 100%">


                    <div>
                        <span style="font-size: 0.8em; line-height: 1.75">
                            {{adminer_enabled.hint}}
                        </span>
                    </div>

                    <div style="margin-top: 16px">
                        <fan-checkbox
                                @click.native="adminerSelected"
                                v-tooltip="adminer.tooltip"
                                :object="adminer">

                        </fan-checkbox>
                    </div>
                </div>


            </config-box>

            <config-box :section-title="sections.storage_config">

                <div style="width: 100%">
                    <div>
                        <fan-checkbox v-tooltip="selected_volume.tooltip"
                                      :object="selected_volume">

                        </fan-checkbox>
                    </div>

                    <div style="padding: 12px 0;">
                        <span style="font-size: 0.8em; line-height: 1.75">
                            {{selected_volume.tooltip}}
                        </span>
                    </div>

                    <div v-if="selected_volume.value === 'DedicatedVolume'" style="display: flex; margin-top: 12px">

                        <v-text-field ref="volume_name_selector"
                                      style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                      dir="ltr"
                                      color="#0093ff"
                                      :rules="[rules.volume_name_regex, rules.required]"
                                      v-model="mssql_manifest.volume_name.value"
                                      :label="volume_name.label"
                                      :hint="volume_name.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.volume_name"></popover>


                    </div>
                </div>

            </config-box>

        </div>


    </div>
</template>

<script>

    import ConfigBox from "../../components/wizard/box/config-box";
    import Popover from "../../components/wizard/tooltip/popover";
    import FanCheckbox from "../../components/wizard/select-box/fan-checkbox";


    export default {
        name: "mssql",
        components: {
            ConfigBox,
            Popover,
            FanCheckbox
        },
        props: {
            manifest_model: {
                type: Object,
                required: true
            }
        },
        model: {
            prop: 'manifest_model',
        },
        data() {
            return {
                selected_volume: {
                    label: "Dedicated Volume",
                    value: "DedicatedVolume",
                    selected: true,
                    tooltip: 'داده‌های شما در پوشه‌ای با نام سرویس فعلی شما در Dedicated Volume مورد نظر شما ذخیره خواهند شد.'
                },
                adminer: {
                    label: "Adminer",
                    value: "Adminer",
                    selected: true,
                    tooltip: 'با استفاده از این دکمه می‌توانید تعیین کنید رابط ادمین Adminer ساخته شود یا خیر'
                },
                volumes: [
                    {
                        label: "Dedicated Volume",
                        value: "DedicatedVolume",
                        selected: true,
                        tooltip: 'داده‌های شما در پوشه‌ای با نام سرویس فعلی شما در Dedicated Volume مورد نظر شما ذخیره خواهند شد.'
                    }
                ],
                password: {
                    label: 'رمز عبور database',
                    hint: '',
                    name: ''

                },
                adminer_enabled: {
                    label: 'Adminer رابط ادمین',
                    hint: 'در صورتی که نیاز دارید از رابط ادمین Adminer استفاده کنید، آن را فعال نمایید. این قابلیت به صورت پیش‌فرض انتخاب برای شما ساخته خواهد شد.',
                    name: ''
                },
                volume_name: {
                    label: 'نام Volume',
                    hint: 'نام volume که قصد دارید داده‌های شما در آن ذخیره شوند.',
                    name: ''
                },
                mssql_manifest: {
                    password: {
                        name: 'mssql_sa_password',
                        value: ''
                    },
                    adminer_enabled: {
                        name: 'adminer_enabled',
                        value: true
                    },
                    volume_name: {
                        name: 'volume_name',
                        value: null
                    }
                },
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    counter: value => value.length <= 100 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    default_memory: value => value >= 50 || 'کمترین میزان رم قابل قبول ۵۰ مگابایت است',
                    regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                    password_regex: value => new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$').test(value) || 'گذرواژه باید حداق ۸ کاراکتر شامل حروف کوچک و بزرگ، اعداد و سمبل باشد',
                    default_replica: value => value >= 1 || 'کمترین مقدار مجاز ۱ است',
                    valid_port: value => value >= 1 && value <= 65535 || 'مقدار پورت باید بین ۱ تا ۶۵۵۳۵ باشد',
                    volume_name_regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                },
                tooltips: {
                    name: {
                        title: 'نام سرویس',
                        text: 'نامی که برای سرویس خود انتخاب می‌کنید، این نامی است که باقی سرویس‌ها از طریق آن٬ این سرویس را پیدا می‌کنند. این مورد مشابه سوئیچ name-- در دستور fandogh service deploy است.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#name'
                    },
                    memory: {
                        title: 'تعیین رم سرویس',
                        text: 'از طریق این فیلد می‌توانید مشخص کنید که سرویس شما چه مقدار منابع در اختیار داشته باشد.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#resources'
                    },
                    volume_name: {
                        title: 'Volume Name',
                        text: 'نام Dedicated Volume که قصد دارید داده‌ها در آن ذخیره شوند',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#volume-mounts'
                    },
                    password: {
                        title: 'رمز عبور database',
                        text: 'رمز عبوری که برای database خود انتخاب میکنید.',
                        url: '#'
                    }
                },
                sections: {
                    service_config: 'تنظیمات سرویس MSSQL Server',
                    storage_config: 'تعیین محل ذخیره سازی',
                    adminer_config: 'تنظیمات Adminer'
                },
            }
        }, methods: {
            adminerSelected() {
                this.adminer.selected = !this.adminer.selected;
                this.mssql_manifest.adminer_enabled.value = this.adminer.selected
            }
        },
        mounted() {

            if (this.manifest_model.parameters.length !== 0) {
                this.manifest_model.parameters.forEach(param => {

                    switch (param.name) {
                        case 'adminer_enabled':
                            this.mssql_manifest.adminer_enabled.value = param.value;
                            this.adminer.selected = param.value;
                            break;
                        case 'mssql_sa_password':
                            this.mssql_manifest.password.value = param.value;
                            break;
                        case 'volume_name':
                            this.mssql_manifest.volume_name.value = param.value;
                            break;
                    }
                })
            }

        }, watch: {
            'mssql_manifest.adminer_enabled': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'adminer_enabled') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'mssql_manifest.password': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'mssql_sa_password') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'mssql_manifest.volume_name': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'volume_name') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value !== null)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>
