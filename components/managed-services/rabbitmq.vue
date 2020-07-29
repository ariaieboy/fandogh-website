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
                                v-model="rabbitmq_manifest.username.value"
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
                                :rules="[rules.counter, rules.required]"
                                v-model="rabbitmq_manifest.password.value"
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
                                @click.native="RabbitmqExposeSelected"
                                v-tooltip="rabbitmq_dashboard.tooltip"
                                :object="rabbitmq_dashboard">

                        </fan-checkbox>
                    </div>
                </div>


            </config-box>

            <config-box :section-title="sections.plugin_config">

                <div style="width: 100%">
                    <div style="padding: 0 0 24px 0;">
                        <span style="font-size: 0.8em; line-height: 1.75">
                            {{plugins_tooltip}}
                        </span>
                    </div>

                    <div>
                        <fan-checkbox v-for="(plugin, index) in plugins"
                                      :key="index"
                                      @click.native="pluginSelected(index)"
                                      style="margin-bottom: 12px"
                                      :object="plugin">

                        </fan-checkbox>
                    </div>

                </div>

            </config-box>
            <config-box :section-title="sections.storage_config">

                <div style="width: 100%">
                    <div>
                        <fan-checkbox v-for="(volume, index) in volumes"
                                      :key="index"
                                      @click.native="checkBoxSelected"
                                      v-tooltip="volume.tooltip"
                                      :object="volume">

                        </fan-checkbox>
                    </div>

                    <div style="padding: 12px 0;">
                        <span style="font-size: 0.8em; line-height: 1.75">
                            {{selected_volume.tooltip}}
                        </span>
                    </div>

                    <div v-if="selected_volume.selected" style="display: flex; margin-top: 12px">

                        <v-text-field ref="volume_name_selector"
                                      style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                      dir="ltr"
                                      color="#0093ff"
                                      :rules="[rules.volume_name_regex, rules.required]"
                                      v-model="rabbitmq_manifest.volume_name.value"
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
        name: "rabbitmq",
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
                plugins_tooltip: 'سرویس RabbitMQ به شما این اجازه را می‌دهد تا برخی Pluginهایی که از پیش در آن تعریف شده است را متناسب با کار خود انتخاب و فعال کنید. در صورتی که با این پلاگین‌ها آشنایی دارید می‌توانید از طریق این بخش هر کدام از پلاگین‌های مورد نظر خود را فعال کنید؛ در غیر این صورت می‌توانید این بخش را نادیده بگیرید.',
                selected_volume: {
                    label: "Dedicated Volume",
                    value: "DedicatedVolume",
                    selected: false,
                    tooltip: 'داده‌های شما در پوشه‌ای با نام سرویس فعلی شما در Dedicated Volume مورد نظر شما ذخیره خواهند شد.'
                },
                rabbitmq_dashboard: {
                    label: "RabbitMQ Dashboard",
                    value: "RabbitMQ Dashboard",
                    selected: false,
                    tooltip: 'با استفاده از این دکمه می‌توانید تعیین کنید رابط ادمین RabbitMQ ساخته شود یا خیر'
                },
                volumes: [
                    {
                        label: "Dedicated Volume",
                        value: "DedicatedVolume",
                        selected: false,
                        tooltip: 'داده‌های شما در پوشه‌ای با نام سرویس فعلی شما در Dedicated Volume مورد نظر شما ذخیره خواهند شد.'
                    }
                ],
                plugins: [

                    {
                        label: "rabbitmq_amqp1_0",
                        value: "rabbitmq_amqp1_0",
                        selected: false
                    },
                    {
                        label: "rabbitmq_auth_backend_cache",
                        value: "rabbitmq_auth_backend_cache",
                        selected: false
                    },
                    {
                        label: "rabbitmq_auth_backend_http",
                        value: "rabbitmq_auth_backend_http",
                        selected: false
                    },
                    {
                        label: "rabbitmq_auth_backend_ldap",
                        value: "rabbitmq_auth_backend_ldap",
                        selected: false
                    },
                    {
                        label: "rabbitmq_auth_backend_oauth2",
                        value: "rabbitmq_auth_backend_oauth2",
                        selected: false
                    },
                    {
                        label: "rabbitmq_auth_mechanism_ssl",
                        value: "rabbitmq_auth_mechanism_ssl",
                        selected: false
                    },
                    {
                        label: "rabbitmq_consistent_hash_exchange",
                        value: "rabbitmq_consistent_hash_exchange",
                        selected: false
                    },
                    {
                        label: "rabbitmq_event_exchange",
                        value: "rabbitmq_event_exchange",
                        selected: false
                    },
                    {
                        label: "rabbitmq_federation",
                        value: "rabbitmq_federation",
                        selected: false
                    },
                    {
                        label: "rabbitmq_federation_management",
                        value: "rabbitmq_federation_management",
                        selected: false
                    },
                    {
                        label: "rabbitmq_jms_topic_exchange",
                        value: "rabbitmq_jms_topic_exchange",
                        selected: false
                    },
                    {
                        label: "rabbitmq_peer_discovery_aws",
                        value: "rabbitmq_peer_discovery_aws",
                        selected: false
                    },
                    {
                        label: "rabbitmq_peer_discovery_common",
                        value: "rabbitmq_peer_discovery_common",
                        selected: false
                    },
                    {
                        label: "rabbitmq_peer_discovery_consul",
                        value: "rabbitmq_peer_discovery_consul",
                        selected: false
                    },
                    {
                        label: "rabbitmq_peer_discovery_etcd",
                        value: "rabbitmq_peer_discovery_etcd",
                        selected: false
                    },
                    {
                        label: "rabbitmq_peer_discovery_k8s",
                        value: "rabbitmq_peer_discovery_k8s",
                        selected: false
                    },
                    {
                        label: "rabbitmq_prometheus",
                        value: "rabbitmq_prometheus",
                        selected: false
                    },
                    {
                        label: "rabbitmq_random_exchange",
                        value: "rabbitmq_random_exchange",
                        selected: false
                    },
                    {
                        label: "rabbitmq_recent_history_exchange",
                        value: "rabbitmq_recent_history_exchange",
                        selected: false
                    },
                    {
                        label: "rabbitmq_sharding",
                        value: "rabbitmq_sharding",
                        selected: false
                    },
                    {
                        label: "rabbitmq_shovel_management",
                        value: "rabbitmq_shovel_management",
                        selected: false
                    },
                    {
                        label: "rabbitmq_stomp",
                        value: "rabbitmq_stomp",
                        selected: false
                    },
                    {
                        label: "rabbitmq_tracing",
                        value: "rabbitmq_tracing",
                        selected: false
                    },
                    {
                        label: "rabbitmq_trust_store",
                        value: "rabbitmq_trust_store",
                        selected: false
                    },
                    {
                        label: "rabbitmq_web_mqtt",
                        value: "rabbitmq_web_mqtt",
                        selected: false
                    },
                    {
                        label: "rabbitmq_web_mqtt_examples",
                        value: "rabbitmq_web_mqtt_examples",
                        selected: false
                    },
                    {
                        label: "rabbitmq_web_stomp",
                        value: "rabbitmq_web_stomp",
                        selected: false
                    },
                    {
                        label: "rabbitmq_web_stomp_examples",
                        value: "rabbitmq_web_stomp_examples",
                        selected: false
                    },
                    {
                        label: "rabbitmq_shovel",
                        value: "rabbitmq_shovel",
                        selected: false
                    },
                    {
                        label: "rabbitmq_mqtt",
                        value: "rabbitmq_mqtt",
                        selected: false
                    },
                    {
                        label: "rabbitmq_top",
                        value: "rabbitmq_top",
                        selected: false
                    }
                ],
                username: {
                    label: 'نام کاربری rabbitmq',
                    hint: 'رمز عبور به صورت پیش فرض rabbitmq است',
                    name: 'rabbitmq'

                },
                password: {
                    label: 'رمز عبور rabbitmq',
                    hint: 'رمز عبور به صورت پیش فرض rabbitmq است',
                    name: 'rabbitmq'

                },
                dashboard_enabled: {
                    label: 'RabbitMQ رابط ادمین',
                    hint: 'در صورتی که نیاز دارید از داشبورد RabbitMQ استفاده کنید، آن را فعال نمایید. این قابلیت به صورت پیش‌فرض انتخاب برای شما ساخته خواهد شد.',
                    name: ''
                },
                volume_name: {
                    label: 'نام Volume',
                    hint: 'نام volume که قصد دارید داده‌های شما در آن ذخیره شوند',
                    name: ''
                },
                rabbitmq_manifest: {
                    username: {
                        name: 'rabbitmq_username',
                        value: 'rabbitmq'
                    },
                    password: {
                        name: 'rabbitmq_password',
                        value: 'rabbitmq'
                    },
                    dashboard_enabled: {
                        name: 'dashboard_enabled',
                        value: false
                    },
                    plugins_list: {
                        name: 'rabbitmq_plugins',
                        value: ''
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
                    username: {
                        title: 'نام کاربری RabbitMQ',
                        text: 'نام کاربری که برای RabbitMQ باید انتخاب کنید.',
                        url: '#'
                    },
                    password: {
                        title: 'رمز عبور RabbitMQ',
                        text: 'رمز عبوری که برای RabbitMQ باید انتخاب کنید.',
                        url: '#'
                    },
                    plugins: {
                        title: 'پلاگین‌های RabbitMQ',
                        text: 'رمز عبوری که برای RabbitMQ باید انتخاب کنید.',
                        url: '#'
                    }
                },
                sections: {
                    service_config: 'تنظیمات سرویس RabbitMQ',
                    storage_config: 'تعیین محل ذخیره سازی',
                    plugin_config: 'پلاگین‌های RabbitMQ',
                    dashboard_config: 'تنظیمات داشبورد RabbitMQ'
                },
            }
        }, methods: {
            checkBoxSelected() {

                if (this.selected_volume.selected) {
                    this.selected_volume.selected = false;
                    this.volumes[0].selected = false;
                    this.rabbitmq_manifest.volume_name.value = null
                } else {
                    this.selected_volume.selected = true;
                    this.volumes[0].selected = true;
                }
            },
            pluginSelected(index) {

                this.plugins.forEach((plugin, it) => {
                    if (index === it) {
                        if (plugin.selected) {
                            plugin.selected = false;
                            this.rabbitmq_manifest.plugins_list.value = this.rabbitmq_manifest.plugins_list.value.replace(plugin.value, '');
                        } else {
                            plugin.selected = true;
                            this.rabbitmq_manifest.plugins_list.value += plugin.value.concat(' ');
                        }
                        this.rabbitmq_manifest.plugins_list.value.trim();
                    }
                });

            },
            RabbitmqExposeSelected() {
                this.rabbitmq_dashboard.selected = !this.rabbitmq_dashboard.selected;
                this.rabbitmq_manifest.dashboard_enabled.value = this.rabbitmq_dashboard.selected;
            }
        },
        mounted() {

            if (this.manifest_model.memory.amount < 512) {
                this.manifest_model.memory.amount = 512
            }

            if (this.manifest_model.parameters.length !== 0) {
                this.manifest_model.parameters.forEach(param => {
                    switch (param.name) {

                        case 'dashboard_enabled':
                            this.rabbitmq_manifest.dashboard_enabled.value = param.value;
                            this.rabbitmq_dashboard.selected = param.value;
                            break;
                        case 'rabbitmq_username':
                            this.rabbitmq_manifest.username.value = param.value;
                            break;
                        case 'rabbitmq_password':
                            this.rabbitmq_manifest.password.value = param.value;
                            break;
                        case 'volume_name':
                            this.rabbitmq_manifest.volume_name.value = param.value;
                            this.selected_volume.selected = true;
                            this.volumes[0].selected = true;
                            break;
                        case 'rabbitmq_plugins':
                            this.plugins.forEach((item, index) => {
                               if (param.value.toString().includes(item.value)){
                                   item.selected = true;
                                   this.rabbitmq_manifest.plugins_list.value += item.value.concat(' ');
                               }
                            });
                            break;
                    }
                })
            }

        }, watch: {
            'rabbitmq_manifest.dashboard_enabled': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'dashboard_enabled') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'rabbitmq_manifest.username': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'rabbitmq_username') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'rabbitmq_manifest.password': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'rabbitmq_password') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'rabbitmq_manifest.volume_name': {
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
            'rabbitmq_manifest.plugins_list': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'rabbitmq_plugins') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value !== null) {
                        if (value.value.trim() !== '') {
                            this.manifest_model.parameters.push(value)
                        }
                    }
                }, deep: true
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>
