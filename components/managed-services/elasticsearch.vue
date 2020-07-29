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
                                v-model="elasticsearch_manifest.elastic_password.value"
                                :label="elastic_password.label"
                                :hint="elastic_password.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.elastic_password"></popover>

                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                :rules="[rules.counter]"
                                v-model="elasticsearch_manifest.min_memory.value"
                                :label="min_memory.label"
                                :hint="min_memory.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.min_memory"></popover>

                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                :rules="[rules.counter]"
                                v-model="elasticsearch_manifest.max_memory.value"
                                :label="max_memory.label"
                                :hint="max_memory.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.max_memory"></popover>

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

            <config-box :section-title="sections.access_ability_config">

                <form class="col-xs-12" style="padding: 0">

                    <div style="width: 100%">

                        <div style="padding: 12px 0;">
                        <span style="font-size: 0.8em; line-height: 1.75">
                            {{elastic_search_exposed.tooltip}}
                        </span>
                        </div>

                        <div>
                            <fan-checkbox
                                    @click.native="elasticExposionSelected"
                                    :object="elastic_search_exposed">

                            </fan-checkbox>
                        </div>

                    </div>


                </form>

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

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field ref="volume_name_selector"
                                      style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                      dir="ltr"
                                      :disabled="!selected_volume.selected"
                                      color="#0093ff"
                                      :rules="selected_volume.selected? [rules.volume_name_regex, rules.required] : []"
                                      v-model="elasticsearch_manifest.volume_name.value"
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
        name: "elasticsearch",
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
                    tooltip: 'داده‌های شما در پوشه‌ای با نام سرویس فعلی شما در Dedicated Volume ذخیره خواهند شد.'
                },
                elastic_password: {
                    label: 'رمز عبور database',
                    hint: 'رمز عبور سرویس دیتابیس شما',
                    name: ''

                },
                volume_name: {
                    label: 'نام Volume',
                    hint: 'نام volume که قصد دارید داده‌های شما در آن ذخیره شوند.',
                    name: ''
                },
                min_memory: {
                    label: 'Min Memory',
                    hint: 'حداقل رم مصرفی مجاز برای سرویس Elasticsearch',
                    name: ''
                },
                max_memory: {
                    label: 'Max Memory',
                    hint: 'حداکثر رم مصرفی مجاز برای سرویس Elasticsearch',
                    name: ''
                },
                elastic_search_exposed: {
                    label: 'Elasticsearch Exposed',
                    value: "Elasticsearch Exposed",
                    tooltip: 'با فعال/غیر فعال کردن این بخش می‌توانید مشخص کنید که سرویس شما از طریق Browser‌ها در دسترس باشد یا خیر.',
                    selected: true
                },
                elasticsearch_manifest: {
                    elastic_password: {
                        name: 'elastic_password',
                        value: 'changeme'
                    },
                    volume_name: {
                        name: 'volume_name',
                        value: null
                    },
                    min_memory: {
                        name: 'volume_name',
                        value: 512
                    },
                    max_memory: {
                        name: 'max_memory',
                        value: 1024
                    },
                    elastic_search_exposed: {
                        name: 'elastic_search_exposed',
                        value: true
                    }
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
                    elastic_password: {
                        title: 'رمز عبور database',
                        text: 'رمز عبوری که برای database خود انتخاب میکنید،‌در صورتی خالی گذاشتن این بخش، رمز عبوی ساخته نخواهد شد.',
                        url: '#'
                    },
                    min_memory: {
                        title: 'کمینه رم مصرفی',
                        text: 'با تعیین min memory مشخص می‌کنید که سرویس شما حداقل رمی که می‌تواند مصرف کند چه میزان باشد.',
                        url: '#'
                    },
                    max_memory: {
                        title: 'بیشینه رم مصرفی',
                        text: 'با تعیین max memory مشخص می‌کنید که سرویس شما حداکثر رمی که می‌تواند مصرف کند چه میزان باشد.',
                        url: '#'
                    },
                    elastic_search_exposed: {
                        title: 'دسترسی خارجی به Elasticsearch',
                        text: 'با فعال/غیر فعال کردن این بخش می‌توانید مشخص کنید که سرویس شما از طریق Browser‌ها در دسترس باشد یا خیر.',
                        url: '#'
                    }
                },
                sections: {
                    service_config: 'تنظیمات سرویس Elasticsearch',
                    access_ability_config: 'تنظیمات دسترسی Elasticsearch',
                    storage_config: 'تعیین محل ذخیره سازی',
                },
            }
        }, mounted() {

            if (this.manifest_model.memory.amount < 2048) {
                this.manifest_model.memory.amount = 2048
            }

            if (this.manifest_model.parameters.length === 0) {
                this.elasticsearch_manifest.volume_name.value = null
            } else {
                this.manifest_model.parameters.forEach(param => {

                    switch (param.name) {
                        case 'elastic_password':
                            this.elasticsearch_manifest.password.value = param.value;
                            break;
                        case 'elastic_search_exposed':
                            this.elasticsearch_manifest.elastic_search_exposed.value = param.value;
                            this.elastic_search_exposed.selected = param.value;
                            break;
                        case 'volume_name':
                            this.elasticsearch_manifest.volume_name.value = param.value;
                            break;
                        case 'min_memory':
                            this.elasticsearch_manifest.min_memory.value = param.value;
                            break;
                        case 'max_memory':
                            this.elasticsearch_manifest.max_memory.value = param.value;
                            break;

                    }
                })
            }

        }, methods: {
            elasticExposionSelected() {
                this.elastic_search_exposed.selected = !this.elastic_search_exposed.selected;
                this.elasticsearch_manifest.elastic_search_exposed.value = this.elastic_search_exposed.selected;
            }
        },
        watch: {
            'elasticsearch_manifest.elastic_password': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'elastic_password') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            }, 'elasticsearch_manifest.elastic_search_exposed': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'elastic_search_exposed') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'elasticsearch_manifest.volume_name': {
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
            'elasticsearch_manifest.min_memory': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'min_memory') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value !== null)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'elasticsearch_manifest.max_memory': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'max_memory') {
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
