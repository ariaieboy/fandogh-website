<template>
    <div>

        <div style="margin-top: 12px;">

            <config-box :section-title="sections.liveness_probe"
                        :tooltip="sections.liveness_probe_tooltip">

                <div style="width: 100%;">

                    <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0;">

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    type="number"
                                    dir="ltr"
                                    min
                                    :rules="[rules.required, rules.min_value]"
                                    prefix="ثانیه"
                                    v-model.number="manifest_model.health_check.liveness_object.initial_delay_seconds"
                                    :hint="health_check_obj.initial_delay_seconds_hint"
                                    :label="health_check_obj.initial_delay_seconds_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.initial_delay_seconds"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    type="number"
                                    dir="ltr"
                                    :rules="[rules.required, rules.min_value]"
                                    prefix="ثانیه"
                                    v-model.number="manifest_model.health_check.liveness_object.period_seconds"
                                    :hint="health_check_obj.period_seconds_hint"
                                    :label="health_check_obj.period_seconds_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.period_seconds"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    type="number"
                                    dir="ltr"
                                    min="1"
                                    :rules="[rules.required, rules.min_value]"
                                    prefix="ثانیه"
                                    v-model.number="manifest_model.health_check.liveness_object.timeout_seconds"
                                    :hint="health_check_obj.timeout_seconds_hint"
                                    :label="health_check_obj.timeout_seconds_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.timeout_seconds"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    type="text"
                                    dir="ltr"
                                    :rules="[rules.required, rules.is_root_addressed, rules.has_space]"
                                    v-model="manifest_model.health_check.liveness_object.http_get.path"
                                    :hint="health_check_obj.http_get_method_hint"
                                    :label="health_check_obj.http_get_method_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.http_get_method"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    type="number"
                                    dir="ltr"
                                    :rules="[rules.required, rules.valid_port]"
                                    v-model.number="manifest_model.health_check.liveness_object.http_get.port"
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
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    dir="ltr"
                                    type="number"
                                    :rules="[rules.required, rules.min_value]"
                                    prefix="ثانیه"
                                    v-model.number="manifest_model.health_check.readiness_object.initial_delay_seconds"
                                    :hint="health_check_obj.initial_delay_seconds_hint"
                                    :label="health_check_obj.initial_delay_seconds_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.initial_delay_seconds"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    dir="ltr"
                                    type="number"
                                    :rules="[rules.required, rules.min_value]"
                                    prefix="ثانیه"
                                    v-model.number="manifest_model.health_check.readiness_object.period_seconds"
                                    :hint="health_check_obj.period_seconds_hint"
                                    :label="health_check_obj.period_seconds_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.period_seconds"></popover>

                        </div>


                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    type="number"
                                    dir="ltr"
                                    min="1"
                                    :rules="[rules.required, rules.min_value]"
                                    prefix="ثانیه"
                                    v-model.number="manifest_model.health_check.readiness_object.timeout_seconds"
                                    :hint="health_check_obj.timeout_seconds_hint"
                                    :label="health_check_obj.timeout_seconds_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.timeout_seconds"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    type="text"
                                    dir="ltr"
                                    :rules="[rules.required, rules.is_root_addressed, rules.has_space]"
                                    v-model="manifest_model.health_check.readiness_object.http_get.path"
                                    :hint="health_check_obj.http_get_method_hint"
                                    :label="health_check_obj.http_get_method_label">

                            </v-text-field>

                            <popover :tooltip="tooltips.http_get_method"></popover>

                        </div>

                        <div style="display: flex;">

                            <v-text-field
                                    ref="key"
                                    style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                    color="#0045ff"
                                    dir="ltr"
                                    type="number"
                                    :rules="[rules.required, rules.valid_port]"
                                    v-model.number="manifest_model.health_check.readiness_object.http_get.port"
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

    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";

    export default {
        name: "health-check-setup",
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
            ConfigBox
        },
        data() {
            return {
                rules: {
                    required: value => !!value || 'مقدار این فیلد اجباری‌ است',
                    min_value: value => value >= 1 || 'کمترین زمان ۱ ثانیه است',
                    is_root_addressed: value => value.toString().startsWith('/') || 'آدرس وارد شده، باید از root (/) شروع شود',
                    valid_port: value => value >= 1 && value <= 65535 || 'مقدار پورت باید بین ۱ تا ۶۵۵۳۵ باشد',
                    has_space: value => !value.toString().includes(' ') || 'فاصله مجاز نیست'
                },
                editing_index: -1,
                isEditing: false,
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
                    timeout_seconds: {
                        title: 'Timeout Seconds',
                        text: 'ُTimeout Seconds به فندق میگوید چند ثاینه برای دریافت پاسخی با کد ۲۰۰ منتظر بماند (در صورتی که مقدار را وارد نکنید، این مقدار به صورت پیش‌فرض ۱ ثانیه خواهد بود)',
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
                    timeout_seconds_label: 'Timeout Seconds',
                    http_get_method_label: 'Http get path',
                    http_get_port_label: 'Http get port',
                    initial_delay_seconds_hint: 'زمان اولیه را به ثانیه وارد کنید',
                    timeout_seconds_hint: 'میزان زمانی که فندق باید منتظر پاسخ سرویس بماند(مقدار پیش فرض ۱ ثانیه است)',
                    period_seconds_hint: 'بازه تکرار زمانی را به ثانیه وارد نمایید',
                    http_get_method_hint: 'نام متدی که باید برای بررسی سرویس صدا زده شود را وارد نمایید',
                    http_get_port_hint: 'پورت مربوط به آدرس http get method را وارد نمایید',
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
        }
    }
</script>

<style lang="stylus" scoped>

</style>
