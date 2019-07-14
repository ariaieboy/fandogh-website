<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div style="margin-top: 12px">

            <config-box :section-title="sections.kind_selection" :tooltip="sections.kind_tooltip">
                <div style="display: flex; flex-wrap: wrap; justify-content: center">

                    <span v-for="(inner_kind, index) in manifest_model.service.kinds"
                          :key="index"
                          v-tooltip="inner_kind.tooltip"
                          :class="['kind-button', {'is-active': inner_kind.is_active}]"
                          @click="onKindClicked(index)">
                        {{inner_kind.local_name}}
                    </span>

                </div>
            </config-box>

            <config-box :section-title="sections.service_config">

                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0">

                    <div style="display: flex">

                        <v-text-field
                                ref="name_selector"
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                :rules="[rules.counter, rules.required, rules.regex]"
                                v-model="manifest_model.service.service_name.name"
                                :label="manifest_model.service.service_name.label"
                                :counter="manifest_model.service.service_name.counter"
                                :maxlength="manifest_model.service.service_name.counter"
                                :hint="manifest_model.service.service_name.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.name"></popover>


                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field style="font-family: iran-sans; font-size: 1em; margin-left: -15px" color="#0093ff"
                                      dir="ltr"
                                      prefix="Mi"
                                      :rules="[rules.default_memory, rules.required]"
                                      type="number"
                                      min="50"
                                      :hint="manifest_model.service.memory.hint"
                                      v-model.number="manifest_model.service.memory.amount"
                                      required
                                      @change="(manifest_model.service.memory.amount < 50 ? manifest_model.service.memory.amount = 200 : manifest_model.service.memory.amount)"
                                      :label="manifest_model.service.memory.label">

                        </v-text-field>


                        <popover :tooltip="tooltips.memory"></popover>


                    </div>


                    <div style="display: flex; margin-top: 12px">
                        <v-text-field style="font-family: iran-sans; font-size: 1em; margin-left: -15px"
                                      color="#0093ff"
                                      dir="ltr"
                                      :rules="[rules.required, rules.default_replica]"
                                      type="number"
                                      min="1"
                                      v-model.number="manifest_model.service.replica.count"
                                      :label="manifest_model.service.replica.label"
                                      :hint="manifest_model.service.replica.hint"
                                      @change="(manifest_model.service.replica.count < 1 ? manifest_model.service.replica.count = 1 : manifest_model.service.replica.count)"
                                      required>

                        </v-text-field>

                        <popover :tooltip="tooltips.replica"></popover>

                    </div>
                </form>

            </config-box>

            <config-box v-if="manifest_model.service.kind.name === 'ExternalService'"
                        :section-title="sections.external_service_config"
                        :tooltip="sections.external_service_config_tooltip">

                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0;">

                    <div class="image-pull-policy-container">
                        <span style="height: 35px; display: flex; margin-left: 12px; background-color: #0093ff; border-radius: 25px;">
                            <span style="line-height: 35px; font-size: 1em; margin-right: 12px;color: #fefefe; font-family: iran-yekan">Allow Http</span>
                            <popover class="popover-style" :tooltip="tooltips.allow_http"></popover>
                        </span>

                        <div>
                            <fan-checkbox @click.native="onHttpClicked"
                                          :object="manifest_model.service.allow_http">

                            </fan-checkbox>
                        </div>

                    </div>

                    <div style="display: flex;margin-top: 16px">

                        <v-text-field style="font-family: iran-sans; font-size: 1em;margin-left: -15px"
                                      color="#0093ff"
                                      type="text"
                                      dir="ltr"
                                      v-model="manifest_model.service.path.dir"
                                      :hint="manifest_model.service.path.hint"
                                      :label="manifest_model.service.path.label">

                        </v-text-field>

                        <popover :tooltip="tooltips.path"></popover>

                    </div>

                    <div style="display: flex;margin-top: 16px">

                        <v-text-field style="font-family: iran-sans; font-size: 1em;margin-left: -15px"
                                      :rules="[rules.valid_port]"
                                      color="#0093ff"
                                      type="number"
                                      min="1"
                                      dir="ltr"
                                      v-model.number="manifest_model.service.port.number"
                                      :hint="manifest_model.service.port.hint"
                                      :label="manifest_model.service.port.label">

                        </v-text-field>

                        <popover :tooltip="tooltips.port"></popover>

                    </div>

                    <div style="display: flex; margin-top: 12px; position: relative">

                        <div class="fandogh-form-group" style="display: block; width: 100%; margin-left: -15px">
                            <label style="font-size: 12px; color: #6c6c6c; margin-bottom: 7px; z-index: 100; position: relative;">انتخاب
                                دامنه‌ها</label>
                            <v-select
                                    ref="selector"
                                    style="height: 38px; margin-bottom: 22px; font-family: iran-yekan;margin-top: -5px; position: relative;"
                                    dir="ltr"
                                    @input="changedValue"
                                    :clearable="clearable"
                                    :options="domainsList"
                                    label="title"
                                    language="fa-IR"
                                    :searchable="searchable"
                                    placeholder="نام دامنه را جست‌وجو کنید..."
                                    multiple>
                            </v-select>

                            <div style="display: flex; flex-wrap: wrap">

                                <span class="vs__selected" v-for="(item, index) in manifest_model.service.domains">
                                <button style="outline: none; border: none" class="vs__deselect"
                                        @click.prevent="removeDomain(index)">
                                    <svg style="outline: none; border: none" width="10" height="10"><path
                                            d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"></path></svg>
                                </button>
                                {{item}}
                                </span>

                            </div>
                        </div>

                        <popover :tooltip="tooltips.domains"></popover>
                    </div>
                </form>

            </config-box>

        </div>

    </div>
</template>

<script>
    import ConfigBox from "../../../../components/wizard/box/config-box";
    import Popover from "../../../../components/wizard/tooltip/popover";
    import FanCheckbox from "../../../../components/wizard/select-box/fan-checkbox";

    export default {
        name: "index",
        layout: 'wizard',
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
                isEnabled: false,
                clearable: false,
                searchable: true,
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
                    replica: {
                        title: 'تعداد Replica',
                        text: 'در این فیلد می‌توانید مشخص کنید که چند instance از سرویس مورد نظرتان نیاز دارید، به طور پیشفرض مقدار این فیلد 1 است.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#replicas'
                    },
                    port: {
                        title: 'پورت',
                        text: 'از طریق این فیلد مشخص می‌کنید که درخواست‌هایی که کاربران به پورت ۸۰ ( یا ۴۴۳) ارسال می‌کنند باید به کدام پورت از سرویس شما هدایت شوند.به عنوان مثلا اگر یک اپ NodeJS دارید که روی پورت ۳۰۰۰ اجرا شده و می‌خواهید درخواست‌های HTTP از پورت 80 به پورت3000 آن سرویس هدایت شود، از طریق فیلد port باید این موضوع رو مشخص کنید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#port'
                    },
                    domains: {
                        title: 'انتخاب دامنه‌ها',
                        text: 'اینجا می‌توانید لیست دامنه‌هایی که می‌خواهید به این سرویس متصل کنید را مشخص کنید. مثلا سرویس مورد نظر فرانت وب‌سایت شماست و مایلید روی domain.com و www.domain.com در دسترس باشد',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#domains'
                    },
                    allow_http:{
                        title: 'Allow Http',
                        text: 'اگر این فیلد true باشد، به این معنی است که فندق نباید درخواست‌های HTTP را به HTTPS ریدایرکت کند. به طور پیشفرض مقدار این فیلد true است٬ تا درخواست‌های HTTP ریدایرکت نشوند.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#allow-http'
                    },
                    path:{
                        title: 'Path',
                        text: 'اگر مایل هستید سرویس مورد نظرتان روی path خاصی درخواست‌ها را پاسخ دهد، مثلا از یک سرویس wordpress به عنوان بلاگ استفاده می‌کنید، می‌توانید از طریق این فیلد path را مشخص کنید، مثلا /blog/ تا فقط درخواست‌هایی که به آن مسیر ارسال شدند به وردپرس برسند و روی بقیه path ها بتوانید سرویس‌های دیگری را اجرا کنید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#path'
                    }
                },
                kind: {local_name: 'External Service', name: 'ExternalService', is_active: true},
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    counter: value => value.length <= 100 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    default_memory: value => value >= 50 || 'کمترین میزان رم قابل قبول ۵۰ مگابایت است',
                    regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                    default_replica: value => value >= 1 || 'کمترین مقدار مجاز ۱ است',
                    valid_port: value => value >= 1 && value <= 65535 || 'مقدار پورت باید بین ۱ تا ۶۵۵۳۵ باشد'
                },
                sections: {
                    kind_selection: 'انتخاب نوع سرویس',
                    kind_tooltip: {
                        title: 'نوع سرویس',
                        text: 'اگر می‌خواهید سرویس ‌شما فقط داخل namespace دسترسی‌پذیر باشند InternalService را انتخاب کنید ولی اگر می‌خواهید سرویس شما از بیرون دیده شود می‌توانید از ExternalService استفاده نمایید',
                        url: 'https://docs.fandogh.cloud/docs/services.html#%D8%A7%D9%86%D9%88%D8%A7%D8%B9-%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D9%87%D8%A7'
                    },
                    service_config: 'تنظیمات سرویس',
                    external_service_config: 'تنظیمات سرویس External',
                    external_service_config_tooltip: {
                        title: 'تنظیمات سرویس External',
                        text: 'این بخش مربوط به تنظیمات سرویس External است که با تنظیم کردن آن می‌تواند مشحخص کنید سرویس شما بر روی چه دامنه‌هایی از بیرون دسترسی پذیر بوده و کدام پورت‌ها به پورت 80 مپ شوند و در صورت نیاز اجازه پاسخگویی روی http یا path خاصی را داشته باشند',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#%D9%81%DB%8C%D9%84%D8%AF-spec-%D8%AF%D8%B1-externalservice-%D9%87%D8%A7'
                    }
                },
            }
        },
        components: {
            Popover,
            ConfigBox,
            FanCheckbox
        },
        methods: {
            onHttpClicked() {
                this.manifest_model.service.allow_http.selected = !this.manifest_model.service.allow_http.selected
            },
            removeDomain(index) {
                this.manifest_model.service.domains.splice(index, 1)
            },
            changedValue(value) {
                var redundant = false

                if (value.length.valueOf() > 0) {

                    value.forEach(item => {
                        this.manifest_model.service.domains.forEach(subItem => {
                            if (subItem === item.title) {
                                redundant = true
                            }
                        });

                        if (!redundant) {
                            this.manifest_model.service.domains.push(item.title)
                        }
                    });

                    this.$refs.selector.clearSelection()
                }
            },
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
            onKindClicked(index) {
                this.manifest_model.service.kinds.forEach(item => {
                    item.is_active = false
                });
                this.manifest_model.service.kinds[index].is_active = true;
                this.manifest_model.service.kind = this.manifest_model.service.kinds[index]

                if (this.manifest_model.service.kind.name === 'ExternalService') {
                    this.manifest_model.service.port.number = null
                    this.manifest_model.service.allow_http.selected = true
                } else {
                    this.manifest_model.service.domains = [];
                    this.manifest_model.service.port.number = null
                    this.manifest_model.service.allow_http.selected = null
                    this.manifest_model.service.path.dir = null
                }
            },
        },
        computed: {
            domainsList() {
                if (!this.$store.state.domains) return []
                return this.$store.state.domains.map(item => {
                    return {
                        title: item.name,
                        value: item.name
                    };
                });
            },
        }
    }
</script>

<style scoped lang="stylus">

    .vs__selected
        display flex !important
        align-items center !important
        background-color rgba(41, 121, 255, .5) !important
        border 1px solid #0093ff !important
        border-radius 25px !important
        color #ffffff !important
        font-family iran-yekan !important
        line-height 1.4 !important
        margin 4px 2px 0 !important
        padding 0 0 0 16px !important


    .kind-button
        border 1px solid #0093ff
        height 38px
        border-radius 3px
        display inline-flex
        white-space normal
        padding 0 16px
        margin 5px
        cursor pointer
        font-size 16px
        color #606060
        background-color transparent
        line-height 38px
        text-align center

        &.is-active
            color #fefefe
            box-shadow 0 3px 6px 0 rgba(41, 121, 255, 0.5)
            background-color #0093ff
            transition all .3s ease-in-out

    .image-pull-policy-container
        display flex

        div
            margin-top auto
            margin-bottom auto

        @media only screen and (max-width: 900px)
            display block

            div
                display flex
                box-sizing padding-box
                justify-content center

            span
                margin-bottom 12px !important
                margin-left 0 !important

    .popover-style
        z-index 1001 !important
        margin-top -12px !important
        margin-right 12px !important
        margin-left 12px !important
        filter invert(0%) sepia(100%) saturate(0%) hue-rotate(203deg) brightness(205%) contrast(105%) !important

        @media only screen and (max-width: 900px)
            margin-top -8px !important

</style>


<style lang="stylus">

    input.vs__search
        padding-left 17px !important

    div.vs__selected-options
        padding-left 17px !important

    .vs__selected
        display flex !important
        align-items center !important
        background-color rgba(41, 121, 255, .5) !important
        border 1px solid #0093ff !important
        border-radius 25px !important
        color #ffffff !important
        font-family iran-yekan !important
        line-height 1.4 !important
        margin 4px 2px 0 !important
        padding 0 0 0 16px !important

    .v-input--has-state.error--text .v-label {
        -webkit-animation: none !important;
        animation: none !important;
    }


</style>
