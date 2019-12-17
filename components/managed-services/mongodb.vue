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
                                :rules="[rules.counter, rules.required, rules.regex]"
                                v-model="mongodb_manifest.username.value"
                                :label="username.label"
                                :hint="username.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.username"></popover>

                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                :rules="[rules.counter, rules.required, rules.regex]"
                                v-model="mongodb_manifest.password.value"
                                :label="password.label"
                                :hint="password.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.password"></popover>

                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                :rules="[rules.counter, rules.required, rules.regex]"
                                v-model="mongodb_manifest.init_database.value"
                                :label="init_database.label"
                                :hint="init_database.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.init_database"></popover>

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

            <config-box :section-title="sections.mongo_dashboard_config">

                <div style="width: 100%">

                    <div>
                        <span style="font-size: 0.8em; line-height: 1.75">
                            {{mongo_dashboard_enabled.hint}}
                        </span>
                    </div>

                    <div style="margin-top: 16px">
                        <fan-checkbox
                                @click.native="mongoDashboardSelected"
                                v-tooltip="mongo_dashboard.tooltip"
                                :object="mongo_dashboard">

                        </fan-checkbox>
                    </div>

                    <form v-if="mongo_dashboard.selected" class="col-xs-12" style="padding: 0">

                        <div style="display: flex; margin-top: 12px">

                            <v-text-field
                                    style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                    dir="ltr"
                                    color="#0093ff"
                                    required
                                    :rules="[rules.counter, rules.required, rules.regex]"
                                    v-model="mongodb_manifest.mongo_dashboard_username.value"
                                    :label="mongo_dashboard_username.label"
                                    :hint="mongo_dashboard_username.hint">

                            </v-text-field>

                            <popover :tooltip="tooltips.mongo_dashboard_username"></popover>

                        </div>

                        <div style="display: flex; margin-top: 12px">

                            <v-text-field
                                    style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                    dir="ltr"
                                    color="#0093ff"
                                    required
                                    :rules="[rules.counter, rules.required, rules.regex]"
                                    v-model="mongodb_manifest.mongo_dashboard_password.value"
                                    :label="mongo_dashboard_password.label"
                                    :hint="mongo_dashboard_password.hint">

                            </v-text-field>

                            <popover :tooltip="tooltips.mongo_dashboard_password"></popover>

                        </div>

                    </form>

                </div>


            </config-box>

            <config-box :section-title="sections.storage_config">

                <div style="width: 100%">
                    <div>
                        <fan-checkbox v-for="(volume, index) in volumes"
                                      :key="index"
                                      v-tooltip="volume.tooltip"
                                      :object="volume">

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
                                      v-model="mongodb_manifest.volume_name.value"
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
        name: "mongodb",
        layout: 'dashboard',
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
                mongo_dashboard: {
                    label: "Mongo Dashboard",
                    value: "mongo_dashboard_enabled",
                    selected: false,
                    tooltip: 'با استفاده از این دکمه می‌توانید تعیین کنید رابط ادمین Mongo Dashboard ساخته شود یا خیر'
                },
                volumes: [
                    {
                        label: "Dedicated Volume",
                        value: "DedicatedVolume",
                        selected: true,
                        tooltip: 'داده‌های شما در پوشه‌ای با نام سرویس فعلی شما در Dedicated Volume مورد نظر شما ذخیره خواهند شد.'
                    }
                ],
                username: {
                    label: 'نام کاربری database',
                    hint: 'نام کاربری خود را وارد نمایید',
                    name: ''

                },
                password: {
                    label: 'رمز عبور database',
                    hint: 'رمز عبور خود را وارد نمایید',
                    name: ''

                },
                mongo_dashboard_username: {
                    label: 'نام کاربری mongo dashboard',
                    hint: 'نام کاربری خود را وارد نمایید',
                    name: ''

                },
                mongo_dashboard_password: {
                    label: 'رمز عبور mongo dashboard',
                    hint: 'رمز عبور خود را وارد نمایید',
                    name: ''

                },
                init_database: {
                    label: 'نام database اولیه',
                    hint: 'نام دیتابیس اولیه‌ای که باید هنگام بالا آمدن سرویس ساخته شود',
                    name: ''

                },
                mongo_dashboard_enabled: {
                    label: 'MongoDashboard رابط ادمین',
                    hint: 'در صورتی که نیاز دارید از رابط ادمین Mongo Dashboard استفاده کنید، آن را فعال نمایید. این قابلیت به صورت پیش‌فرض غیر فعال است.',
                    name: ''
                },
                volume_name: {
                    label: 'نام Volume',
                    hint: 'نام volume که قصد دارید داده‌های شما در آن ذخیره شوند',
                    name: ''
                },
                mongodb_manifest: {
                    password: {
                        name: 'mongodb_init_root_password',
                        value: 'mongo'
                    },
                    username: {
                        name: 'mongodb_init_root_username',
                        value: 'mongo'
                    },
                    init_database: {
                        name: 'mongodb_init_database',
                        value: 'main'
                    },
                    mongo_dashboard_enabled: {
                        name: 'mongo_dashboard_enabled',
                        value: false
                    },
                    mongo_dashboard_username: {
                        name: 'mongo_dashboard_username',
                        value: 'root'
                    },
                    mongo_dashboard_password: {
                        name: 'mongo_dashboard_password',
                        value: 'root'
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
                    default_replica: value => value >= 1 || 'کمترین مقدار مجاز ۱ است',
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
                    username: {
                        title: 'نام کاربری database',
                        text: 'نام کاربری که برای database خود انتخاب میکنید.',
                        url: '#'
                    },
                    password: {
                        title: 'رمز عبور database',
                        text: 'رمز عبوری که برای database خود انتخاب میکنید.',
                        url: '#'
                    },
                    mongo_dashboard_username: {
                        title: 'نام کاربری داشبورد',
                        text: 'نام کاربری که برای داشبورد مدیریت خود انتخاب میکنید.',
                        url: '#'
                    },
                    mongo_dashboard_password: {
                        title: 'رمز عبور داشبورد',
                        text: 'رمز عبوری که برای داشبورد مدیریت خود انتخاب میکنید.',
                        url: '#'
                    },
                    init_database: {
                        title: 'نام database اولیه',
                        text: 'نام دیتابیس اولیه‌ای که باید هنگام بالا آمدن سرویس ساخته شود',
                        url: '#'
                    }
                },
                sections: {
                    service_config: 'تنظیمات سرویس MongoDB',
                    storage_config: 'تعیین محل ذخیره سازی',
                    mongo_dashboard_config: 'تنظیمات Mongo Dashboard'
                },
            }
        }, methods: {
            mongoDashboardSelected() {
                this.mongo_dashboard.selected = !this.mongo_dashboard.selected;
                this.mongodb_manifest.mongo_dashboard_enabled.value = this.mongo_dashboard.selected
            }
        },
        mounted() {

            if (this.manifest_model.parameters.length !== 0) {
                this.manifest_model.parameters.forEach(param => {

                    switch (param.name) {
                        case 'mongodb_init_root_username':
                            this.mongodb_manifest.username.value = param.value;
                            break;
                        case 'mongodb_init_root_password':
                            this.mongodb_manifest.password.value = param.value;
                            break;
                        case 'mongodb_init_database':
                            this.mongodb_manifest.init_database.value = param.value;
                            break;
                        case 'mongo_dashboard_enabled':
                            this.mongodb_manifest.mongo_dashboard_enabled.value = param.value;
                            this.mongo_dashboard.selected = param.value;
                            break;
                        case 'mongo_dashboard_username':
                            this.mongodb_manifest.mongo_dashboard_username.value = param.value;
                            break;
                        case 'mongo_dashboard_password':
                            this.mongodb_manifest.mongo_dashboard_password.value = param.value;
                            break;
                        case 'volume_name':
                            this.mongodb_manifest.volume_name.value = param.value;
                            break;
                    }
                })
            }

        }, watch: {
            'mongodb_manifest.mongo_dashboard_enabled': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'mongo_dashboard_enabled') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'mongodb_manifest.mongo_dashboard_username': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'mongo_dashboard_username') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'mongodb_manifest.mongo_dashboard_password': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'mongo_dashboard_password') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'mongodb_manifest.username': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'mongodb_init_root_username') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'mongodb_manifest.password': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'mongodb_init_root_password') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'mongodb_manifest.init_database': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'mongodb_init_database') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'mongodb_manifest.volume_name': {
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

<style scoped>

</style>
