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
                                :rules="[rules.counter, rules.required]"
                                v-model="kong_manifest.pg_host.value"
                                :label="pg_host.label"
                                :hint="pg_host.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.pg_host"></popover>

                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                :rules="[rules.counter, rules.required]"
                                v-model="kong_manifest.dashboard_database.value"
                                :label="dashboard_database.label"
                                :hint="dashboard_database.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.dashboard_database"></popover>

                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                :rules="[rules.counter, rules.required]"
                                v-model="kong_manifest.pg_username.value"
                                :label="pg_username.label"
                                :hint="pg_username.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.pg_username"></popover>
                    </div>


                    <div style="display: flex; margin-top: 12px">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                :rules="[rules.counter, rules.required]"
                                v-model="kong_manifest.pg_password.value"
                                :label="pg_password.label"
                                :hint="pg_password.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.pg_password"></popover>

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

        </div>

    </div>
</template>

<script>

    import ConfigBox from "../../components/wizard/box/config-box";
    import Popover from "../../components/wizard/tooltip/popover";
    import FanCheckbox from "../../components/wizard/select-box/fan-checkbox";

    export default {
        name: "konga",
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
                pg_host: {
                    label: 'نام سرویس PostgreSQL',
                    hint: 'نام سرویس PostgreSQL را وارد نمایید',
                    name: ''

                },
                pg_username: {
                    label: 'نام کاربری سرویس PostgreSQL',
                    hint: 'نام کاربری سرویس را وارد نمایید',
                    name: ''

                },
                pg_password: {
                    label: 'گذرواژه سرویس دیتابیس PostgreSQL',
                    hint: 'گذرواژه سرویس را وارد نمایید',
                    name: ''

                },
                dashboard_database: {
                    label: 'نام دیتابیس داشبورد Kong',
                    hint: 'نام دیتابیسی که باید داخل PostgreSQL ساخته شده تا اطلاعات داشبورد Konga را نگهداری کند را وارد نمایید',
                    name: ''

                },
                kong_manifest: {
                    pg_host: {
                        name: 'kong_pg_host',
                        value: 'postgresql'
                    },
                    pg_username: {
                        name: 'kong_pg_user',
                        value: 'postgres'
                    },
                    pg_password: {
                        name: 'kong_pg_password',
                        value: 'postgres'
                    },
                    dashboard_database: {
                        name: 'dashboard_database',
                        value: 'kong-dashboard-db'
                    }
                },
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    counter: value => value.length <= 100 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    default_memory: value => value >= 50 || 'کمترین میزان رم قابل قبول ۵۰ مگابایت است',
                    regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)'
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
                    pg_host: {
                        title: 'نام سرویس PostgreSQL',
                        text: 'نام سرویس PostgreSQL را باید در این بخش وارد کنید تا سرویس ‌Konga با متصل شدن به آن بتواند اطلاعات خود را، در آن ذخیره کند.',
                        url: '#'
                    },
                    pg_username: {
                        title: 'نام کاربری سرویس PostgreSQL',
                        text: 'نام کاربری که با آن وارد سرویس PostgreSQL می‌شوید را وارد نمایید.',
                        url: '#'
                    },
                    pg_password: {
                        title: 'نام کاربری سرویس PostgreSQL',
                        text: 'گذرواژه‌ای که با آن وارد سرویس PostgreSQL می‌شوید را وارد نمایید.',
                        url: '#'
                    },
                    dashboard_database: {
                        title: 'نام دیتابیس داشبورد aKong',
                        text: 'نام دیتابیسی که از قبل در سرویس PostgreSQL برای داشبورد ‌Konga ایجاد کرده‌اید تا بتواند اطلاعات خود را در آن ذخیره کند. در صورتی که نام دیتابیس را وارد نمایید ولی آن را نساخته باشید سرویس به درستی عمل نخواهد کرد!',
                        url: '#'
                    }
                },
                sections: {
                    service_config: 'تنظیمات سرویس Konga'
                },
            }
        },
        mounted() {


            if (this.manifest_model.memory.amount < 512){
                this.manifest_model.memory.amount = 512;
            }


            if (this.manifest_model.parameters.length !== 0) {
                this.manifest_model.parameters.forEach(param => {

                    switch (param.name) {
                        case 'kong_pg_host':
                            this.kong_manifest.pg_host.value = param.value;
                            break;
                        case 'kong_pg_database':
                            this.kong_manifest.pg_database.value = param.value;
                            break;
                        case 'kong_pg_user':
                            this.kong_manifest.pg_username.value = param.value;
                            break;
                        case 'kong_pg_password':
                            this.kong_manifest.pg_password.value = param.value;
                            break;
                        case 'dashboard_database':
                            this.kong_manifest.dashboard_database.value = param.value;
                            break;
                    }
                })
            }

        },
        watch: {
            'kong_manifest.pg_host': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'kong_pg_host') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'kong_manifest.pg_username': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'kong_pg_user') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'kong_manifest.pg_password': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'kong_pg_password') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'kong_manifest.dashboard_database': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'dashboard_database') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
