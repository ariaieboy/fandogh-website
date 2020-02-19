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
                                :rules="[rules.counter]"
                                v-model="redis_manifest.password.value"
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

            <config-box :section-title="sections.dashboard_config">

                <div style="width: 100%">


                    <div>
                        <span style="font-size: 0.8em; line-height: 1.75">
                            {{dashboard_enabled.hint}}
                        </span>
                    </div>

                    <div style="margin-top: 16px">
                        <fan-checkbox
                                @click.native="redisDashboardSelected"
                                v-tooltip="redis_dashboard.tooltip"
                                :object="redis_dashboard">

                        </fan-checkbox>
                    </div>

                    <form v-if="redis_dashboard.selected" class="col-xs-12" style="padding: 0">

                        <div style="display: flex; margin-top: 12px">

                            <v-text-field
                                    style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                    dir="ltr"
                                    color="#0093ff"
                                    required
                                    :rules="[rules.required]"
                                    v-model="redis_manifest.redis_dashboard_username.value"
                                    :label="redis_dashboard_username.label"
                                    :hint="redis_dashboard_username.hint">

                            </v-text-field>

                            <popover :tooltip="tooltips.redis_dashboard_username"></popover>

                        </div>

                        <div style="display: flex; margin-top: 12px">

                            <v-text-field
                                    style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                    dir="ltr"
                                    color="#0093ff"
                                    required
                                    :rules="[rules.required]"
                                    v-model="redis_manifest.redis_dashboard_password.value"
                                    :label="redis_dashboard_password.label"
                                    :hint="redis_dashboard_password.hint">

                            </v-text-field>

                            <popover :tooltip="tooltips.redis_dashboard_password"></popover>

                        </div>

                    </form>

                </div>


            </config-box>

            <config-box :section-title="sections.storage_config">

                <div style="width: 100%">
                    <div>
                        <fan-checkbox @click.native="checkBoxSelected(index)"
                                      v-tooltip="selected_volume.tooltip"
                                      :object="selected_volume">

                        </fan-checkbox>
                    </div>

                    <div style="padding: 12px 0;">
                        <span style="font-size: 0.8em; line-height: 1.75">
                            {{selected_volume.tooltip}}
                        </span>
                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field ref="volume_name_selector"
                                      style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                      dir="ltr"
                                      :disabled="!selected_volume.selected"
                                      color="#0093ff"
                                      :rules="selected_volume.selected? [rules.volume_name_regex, rules.required] : []"
                                      v-model="redis_manifest.volume_name.value"
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
        name: "redis",
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
                    selected: false,
                    tooltip: 'داده‌های شما در پوشه‌ای با نام سرویس فعلی شما در Dedicated Volume ذخیره خواهند شد.'
                },
                redis_dashboard: {
                    label: "Redis Dashboard",
                    value: "redis_dashboard_enabled",
                    selected: false,
                    tooltip: 'با استفاده از این دکمه می‌توانید تعیین کنید رابط ادمین Redis Dashboard ساخته شود یا خیر'
                },
                password: {
                    label: 'رمز عبور database',
                    hint: 'رمز عبور سرویس دیتابیس شما',
                    name: ''

                },
                redis_dashboard_username: {
                    label: 'نام کاربری Redis Dashboard',
                    hint: 'نام کاربری دلخواه خود را وارد نمایید',
                    name: ''

                },
                redis_dashboard_password: {
                    label: 'رمز عبور Redis Dashboard',
                    hint: 'رمز عبور دلخواه خود را وارد نمایید',
                    name: ''

                },
                volume_name: {
                    label: 'نام Volume',
                    hint: 'نام volume که قصد دارید داده‌های شما در آن ذخیره شوند.',
                    name: ''
                },
                dashboard_enabled: {
                    label: 'Redis رابط ادمین',
                    hint: 'در صورتی که نیاز دارید از داشبورد Redis استفاده کنید، آن را فعال نمایید. این قابلیت به صورت پیش‌فرض برای سرویس شما غیرفعال است.',
                    name: ''
                },
                redis_manifest: {
                    password: {
                        name: 'redis_password',
                        value: ''
                    },
                    volume_name: {
                        name: 'volume_name',
                        value: null
                    },
                    redis_dashboard_enabled: {
                        name: 'redis_dashboard_enabled',
                        value: false
                    },
                    redis_dashboard_username: {
                        name: 'redis_dashboard_username',
                        value: null
                    },
                    redis_dashboard_password: {
                        name: 'redis_dashboard_password',
                        value: null
                    },
                },
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    counter: value => value.length <= 100 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    default_memory: value => value >= 50 || 'کمترین میزان رم قابل قبول ۵۰ مگابایت است',
                    regex: value => !value || new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
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
                        text: 'رمز عبوری که برای database خود انتخاب میکنید،‌در صورتی خالی گذاشتن این بخش، رمز عبوی ساخته نخواهد شد.',
                        url: '#'
                    },
                    redis_dashboard_username: {
                        title: 'نام کاربری داشبورد',
                        text: 'نام کاربری که برای داشبورد مدیریت خود انتخاب میکنید.',
                        url: '#'
                    },
                    redis_dashboard_password: {
                        title: 'رمز عبور داشبورد',
                        text: 'رمز عبوری که برای داشبورد مدیریت خود انتخاب میکنید.',
                        url: '#'
                    },
                },
                sections: {
                    service_config: 'تنظیمات سرویس Redis',
                    dashboard_config: 'تنظیمات داشبورد Redis',
                    storage_config: 'تعیین محل ذخیره سازی'
                },
            }
        }, methods: {
            checkBoxSelected() {
                this.selected_volume.selected = !this.selected_volume.selected
                if (!this.selected_volume.selected) {
                    this.redis_manifest.volume_name.value = null
                }
            },
            redisDashboardSelected() {
                this.redis_dashboard.selected = !this.redis_dashboard.selected;
                this.redis_manifest.redis_dashboard_enabled.value = this.redis_dashboard.selected;

                if (!this.redis_dashboard.selected) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'redis_dashboard_username') {
                            this.manifest_model.parameters.splice(index, 1);
                        }
                    });
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'redis_dashboard_password') {
                            this.manifest_model.parameters.splice(index, 1);
                        }
                    })
                }
            }
        }, mounted() {

            if (this.manifest_model.parameters.length === 0) {
                this.redis_manifest.volume_name.value = null
            } else {
                this.manifest_model.parameters.forEach(param => {
                    switch (param.name) {
                        case 'redis_password':
                            this.redis_manifest.password.value = param.value;
                            break;
                        case 'volume_name':
                            this.redis_manifest.volume_name.value = param.value;
                            break;
                        case 'redis_dashboard_enabled':
                            this.redis_manifest.redis_dashboard_enabled.value = param.value;
                            this.redis_dashboard.selected = param.value;
                            break;
                        case 'redis_dashboard_username':
                            this.redis_manifest.redis_dashboard_username.value = param.value;
                            break;
                        case 'redis_dashboard_password':
                            this.redis_manifest.redis_dashboard_password.value = param.value;
                            break;
                    }
                })
            }

        }, watch: {
            'redis_manifest.password': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'redis_password') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'redis_manifest.volume_name': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'volume_name') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value !== null)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            }, 'redis_manifest.redis_dashboard_enabled': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'redis_dashboard_enabled') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'redis_manifest.redis_dashboard_username': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'redis_dashboard_username') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'redis_manifest.redis_dashboard_password': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'redis_dashboard_password') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    this.manifest_model.parameters.push(value)
                }, deep: true
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>
