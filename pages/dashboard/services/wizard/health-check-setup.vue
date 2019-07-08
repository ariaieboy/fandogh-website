<template>
    <div>

        <banner :page="page"></banner>

        <div style="margin-top: 12px">


            <config-box :section-title="sections.liveness_probe"
                        :tooltip="sections.liveness_probe_tooltip">

                <div style="width: 100%;">

                    <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0;">

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0093ff"
                                    type="number"
                                    dir="ltr"
                                    v-model.number="liveness_object.initial_delay_seconds"
                                    :hint="health_check_obj.initial_delay_seconds_hint"
                                    :label="health_check_obj.initial_delay_seconds_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.initial_delay_seconds"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0093ff"
                                    type="number"
                                    dir="ltr"
                                    v-model.number="liveness_object.period_seconds"
                                    :hint="health_check_obj.period_seconds_hint"
                                    :label="health_check_obj.period_seconds_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.period_seconds"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0093ff"
                                    type="text"
                                    dir="ltr"
                                    v-model="liveness_object.http_get_method"
                                    :hint="health_check_obj.http_get_method_hint"
                                    :label="health_check_obj.http_get_method_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.http_get_method"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0093ff"
                                    type="number"
                                    dir="ltr"
                                    v-model.number="liveness_object.http_get_port"
                                    :hint="health_check_obj.http_get_port_hint"
                                    :label="health_check_obj.http_get_port_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.http_get_port"></popover>

                        </div>

                    </form>

                </div>

            </config-box>
            <config-box :section-title="sections.readiness_probe"
                        :tooltip="sections.readiness_probe_tooltip">

                <div style="width: 100%;">

                    <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0;">

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0093ff"
                                    dir="ltr"
                                    type="number"
                                    v-model.number="readiness_object.initial_delay_seconds"
                                    :hint="health_check_obj.initial_delay_seconds_hint"
                                    :label="health_check_obj.initial_delay_seconds_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.initial_delay_seconds"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0093ff"
                                    dir="ltr"
                                    type="number"
                                    v-model.number="readiness_object.period_seconds"
                                    :hint="health_check_obj.period_seconds_hint"
                                    :label="health_check_obj.period_seconds_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.period_seconds"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0093ff"
                                    type="text"
                                    dir="ltr"
                                    v-model="readiness_object.http_get_method"
                                    :hint="health_check_obj.http_get_method_hint"
                                    :label="health_check_obj.http_get_method_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.http_get_method"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-sans; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0093ff"
                                    dir="ltr"
                                    type="number"
                                    v-model.number="readiness_object.http_get_port"
                                    :hint="health_check_obj.http_get_port_hint"
                                    :label="health_check_obj.http_get_port_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.http_get_port"></popover>

                        </div>

                    </form>

                </div>

            </config-box>

        </div>

    </div>
</template>

<script>

    import Banner from "../../../../components/wizard/banner/banner";
    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";

    export default {
        name: "health-check-setup",
        components: {
            Banner,
            Popover,
            ConfigBox
        },
        data() {
            return {
                editing_index: -1,
                isEditing: false,
                liveness_object:{
                    initial_delay_seconds: null,
                    period_seconds: null,
                    http_get_method: null,
                    http_get_port:null
                },
                readiness_object:{
                    initial_delay_seconds: null,
                    period_seconds: null,
                    http_get_method: null,
                    http_get_port:null
                },
                page: {
                    title: 'Health Check',
                    description: 'برای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند در\n' +
                        '                ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند\n' +
                        '                در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که\n' +
                        '                می‌ماند در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق\n' +
                        '                که می‌ماند در ذهن‌ها'
                },
                sections: {
                    liveness_probe: 'Liveness',
                    liveness_probe_tooltip: {
                        title: 'Liveness',
                        text: 'با استفاده از ویژگی Liveness می‌توانید در بازه‌های زمانی که مشخص می کنید، از سلامت سرویس خود باخبر شوید',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#readiness-probe-%D9%88-liveness-probe'
                    },
                    readiness_probe: 'Readiness',
                    readiness_probe_tooltip: {
                        title: 'Readiness',
                        text: 'با استفاده از دستور Readiness می‌توانید از آماده شدن سرویس خود باخبر شوید و در صورتی که نیاز دارید عملیاتی فقط و فقط در صورت آماده بودن سرویس انجام شود، می‌توانید از این دستور استفاده کنید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#readiness-probe-%D9%88-liveness-probe'
                    },
                },
                tooltips: {
                    initial_delay_seconds: {
                        title: 'Initial Delay Seconds',
                        text: 'Initial Delay Second مدت زمانی است که فندق پیش از آن که سرویس را بررسی کند صبر میکند و بعد از اینکه این مدت تمام شد، بررسی وضعیت سرویس آغاز می‌شود.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#readiness-probe-%D9%88-liveness-probe'
                    },
                    period_seconds: {
                        title: 'Period Seconds',
                        text: 'Period Seconds به فندق میگوید که بعد از هر چند ثانیه وضعیت سرویس را بررسی نماید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#readiness-probe-%D9%88-liveness-probe'
                    },
                    http_get_method: {
                        title: 'Http Get Method',
                        text: 'Http Get Method یک متد یا endpoint از سرویس شما است که آن را برای بررسی وضعیت سرویس مشخص کرده‌اید و فندق با فراخوانی این متد می‌تواند وضعیت سرویس را بررسی نماید',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#readiness-probe-%D9%88-liveness-probe'
                    },
                    http_get_port: {
                        title: 'Http Get Port',
                        text: 'شماره پورت Http Get Method را در این بخش وارد نمایید',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#readiness-probe-%D9%88-liveness-probe'
                    }
                },
                health_check_obj: {
                    initial_delay_seconds_label: 'Initial Delay Seconds',
                    period_seconds_label: 'Period Seconds',
                    http_get_method_label: 'Http get path',
                    http_get_port_label: 'Http get port',
                    initial_delay_seconds_hint: 'زمان اولیه را به ثانیه وارد کنید',
                    period_seconds_hint: 'بازه تکرار زمانی را به ثانیه وارد نمایید',
                    http_get_method_hint: 'نام متدی که باید برای بررسی سرویس صدا زده شود را وارد نمایید',
                    http_get_port_hint: 'پورت مورد نطر برای متدی که صدا زده می‌شود را وارد نمایید',
                },
            }
        },
        methods: {
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
        },
        computed: {},
        watch: {
            liveness_object: {
                handler: function(value, oldValue){
                    let empty = false
                    let keys = Object.keys(value)
                    for(let key of keys){
                        if(value[key] === null || value[key] === ''){
                            this.deleteFromManifest('spec.liveness_probe')
                            empty = true
                            break
                        }
                    }

                    if(!empty){
                        this.addToManifest(value, 'spec.liveness_probe')
                    }

                },deep: true
            },
            readiness_object: {
                handler: function(value, oldValue){
                    let empty = false
                    let keys = Object.keys(value)
                    for(let key of keys){
                        if(value[key] === null || value[key] === ''){
                            this.deleteFromManifest('spec.readiness_probe')
                            empty = true
                            break
                        }
                    }

                    if(!empty){
                        this.addToManifest(value, 'spec.readiness_probe')
                    }
                },deep: true
            }
        },
        created() {
        }, mounted() {
        }
    }
</script>

<style lang="stylus" scoped>

</style>
