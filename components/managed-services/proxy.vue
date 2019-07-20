<template>

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

</template>

<script>

    import ConfigBox from "../../components/wizard/box/config-box";
    import Popover from "../../components/wizard/tooltip/popover";

    export default {
        name: "proxy",
        components: {
            ConfigBox,
            Popover
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
                    }
                },
                sections: {
                    service_config: 'تنظیمات سرویس Proxy',
                },
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
