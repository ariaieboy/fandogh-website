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
                                :rules="[rules.required, rules.min_length]"
                                v-model="minio_manifest.access_key.value"
                                :label="access_key.label"
                                :hint="access_key.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.access_key"></popover>

                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                :rules="[rules.required, rules.min_length]"
                                v-model="minio_manifest.secret_key.value"
                                :label="secret_key.label"
                                :hint="secret_key.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.secret_key"></popover>
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
                                      v-model="minio_manifest.volume_name.value"
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
        name: "minio",
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
                secret_key: {
                    label: 'secret key سرویس MinIO',
                    hint: 'برای دسترسی به سرویس MinIO باید یک secret key با طول حداقل ۱۲ کاراکتر انتخاب نمایید',
                    name: ''

                },
                access_key: {
                    label: 'access key سرویس MinIO',
                    hint: 'برای دسترسی به سرویس MinIO باید یک access key با طول حداقل ۱۲ کاراکتر انتخاب نمایید',
                    name: ''

                },
                volume_name: {
                    label: 'نام Volume',
                    hint: 'نام volume که قصد دارید داده‌های شما در آن ذخیره شوند.',
                    name: ''
                },
                minio_manifest: {
                    secret_key: {
                        name: 'minio_secret_key',
                        value: ''
                    },
                    access_key: {
                        name: 'minio_access_key',
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
                    min_length: value => value.length > 11 || 'حداقل طول رشته باید ۱۲ کاراکتر باشد',
                    regex: value => !value || new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
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
                    secret_key: {
                        title: 'secret key سرویس MinIO',
                        text: 'برای دسترسی به سرویس MinIO باید یک secret key با طول حداقل ۱۲ کاراکتر انتخاب نمایید',
                        url: '#'
                    },
                    access_key: {
                        title: 'access key سرویس MinIO',
                        text: 'برای دسترسی به سرویس MinIO باید یک access key با طول حداقل ۱۲ کاراکتر انتخاب نمایید',
                        url: '#'
                    }
                },
                sections: {
                    service_config: 'تنظیمات سرویس MinIO',
                    storage_config: 'تعیین محل ذخیره سازی',
                },
            }
        }, mounted() {

            if (this.manifest_model.parameters.length === 0) {
                this.minio_manifest.volume_name.value = null
            } else {
                this.manifest_model.parameters.forEach(param => {
                    switch (param.name) {

                        case 'minio_secret_key':
                            this.minio_manifest.secret_key.value = param.value;
                            break;
                        case 'minio_access_key':
                            this.minio_manifest.access_key.value = param.value;
                            break;
                        case 'volume_name':
                            this.minio_manifest.volume_name.value = param.value;
                            break;
                    }
                })
            }

        }, watch: {
            'minio_manifest.access_key': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'minio_access_key') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'minio_manifest.secret_key': {
                handler: function (value, oldvalue) {
                    this.manifest_model.parameters.forEach((param, index) => {
                        if (param.name === 'minio_secret_key') {
                            this.manifest_model.parameters.splice(index, 1)
                        }
                    });
                    if (value.value.toString().length > 0)
                        this.manifest_model.parameters.push(value)
                }, deep: true
            },
            'minio_manifest.volume_name': {
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
