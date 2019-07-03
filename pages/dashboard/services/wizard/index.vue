<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>


        <banner :page="page"></banner>


        <div style="margin-top: 12px">

            <config-box :section-title="sections.kind_selection" :tooltip="sections.kind_tooltip">
                <div style="display: flex; flex-wrap: wrap; justify-content: center">

                    <span v-for="(inner_kind, index) in kinds"
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

                        <v-text-field style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                      dir="ltr"
                                      color="#0093ff"
                                      required
                                      :rules="[rules.counter, rules.required]"
                                      v-model="serviceName.name"
                                      :label="serviceName.label"
                                      :counter="serviceName.counter"
                                      :maxlength="serviceName.counter"
                                      :hint="serviceName.hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.name"></popover>


                    </div>

                    <div style="display: flex; margin-top: 12px">

                        <v-text-field style="font-family: iran-sans; font-size: 1em; margin-left: -15px" color="#0093ff"
                                      dir="ltr"
                                      prefix="Mi"
                                      :rules="[rules.is_negative, rules.required]"
                                      type="number"
                                      min="50"
                                      :hint="memory.hint"
                                      v-model="memory.amount"
                                      required
                                      @change="(memory.amount < 50 ? memory.amount = 50 : memory.amount)"
                                      :label="memory.label">

                        </v-text-field>


                        <popover :tooltip="tooltips.memory"></popover>


                    </div>


                    <div style="display: flex; margin-top: 12px">
                        <v-text-field style="font-family: iran-sans; font-size: 1em; margin-left: -15px"
                                      color="#0093ff"
                                      dir="ltr"
                                      type="number"
                                      min="1"
                                      v-model="replica.count"
                                      :label="replica.label"
                                      :hint="replica.hint"
                                      @change="(replica.count < 1 ? replica.count = 1 : replica.count)"
                                      required
                                      :rules="[rules.required]">

                        </v-text-field>

                        <popover :tooltip="tooltips.replica"></popover>

                    </div>
                </form>

            </config-box>

            <config-box v-if="kind.name === 'ExternalService'"
                        :section-title="sections.external_service_config"
                        :tooltip="sections.external_service_config_tooltip">

                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0;">

                    <div style="display: flex;">

                        <v-text-field style="font-family: iran-sans; font-size: 1em;margin-left: -15px"
                                      :rules="[rules.valid_port]"
                                      color="#0093ff"
                                      type="number"
                                      min="0"
                                      dir="ltr"
                                      @change="(port.number < 0 ? port.number = 0 : port.number)"
                                      v-model="port.number"
                                      :hint="port.hint"
                                      :label="port.label">

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

                                <span class="vs__selected" v-for="(item, index) in domains">
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
    import 'vuetify/dist/vuetify.min.css';
    import Banner from "../../../../components/wizard/banner/banner";
    import Popover from "../../../../components/wizard/tooltip/popover";

    export default {
        name: "index",
        layout: 'wizard',
        data() {
            return {
                isEnabled: false,
                clearable: false,
                searchable: true,
                domains: [],
                tooltips: {
                    name: {
                        title: 'نام سرویس',
                        text: 'نامی که برای سرویس خود انتخاب می‌کنید، این نامی است که باقی سرویس‌ها از طریق آن٬ این سرویس را پیدا می‌کنند. این مورد مشابه سوئیچ name-- در دستور fandogh service deploy است.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#name'
                    },
                    memory: {
                        title: 'تعیین رم سرویس',
                        text: 'از طریق این فیلد می‌توانید مشخص کنید که چه مقدار منابع نیاز دارید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#resources'
                    },
                    replica: {
                        title: 'تعداد Replica',
                        text: 'در این فیلد می‌توانید مشخص کنید که چند instance از سرویس مورد نظرتان نیاز دارید، به طور پیشفرض مقدار این فیلد 1 است.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#replicas'
                    },
                    port: {
                        title: 'پورت',
                        text: 'از طریق این فیلد مشخص می‌کنید که درخواست‌هایی که کاربران به پورت ۸۰ ( یا ۴۴۳) ارسال می‌کنند باید به کدام پورت از سرویس شما هدایت شوند.به عنوان مثلا اگر یک اپ NodeJS دارید که روی پورت ۳۰۰۰ اجرا شده و می‌خواهید درخواست‌های HTTP از پورت 80 به پورت3000 آن سرویس هدایت شود، از طریق فیلد port باید این موضوع رو مشخص کنید. البته به طور پیش‌فرض پورت ۸۰ همیشه در نظر گرفته میشه و اگر سرویس مورد نظرتان روی پورت ۸۰ سرویس‌دهی می‌کند، نیاز ندارید این فیلد را مشخص کنید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#port'
                    },
                    domains: {
                        title: 'انتخاب دامنه‌ها',
                        text: 'اینجا می‌توانید لیست دامنه‌هایی که می‌خواهید به این سرویس متصل کنید را مشخص کنید. مثلا سرویس مورد نظر فرانت وب‌سایت شماست و مایلید روی domain.com و www.domain.com در دسترس باشد',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#domains'
                    },
                },
                kind: {local_name: 'External Service', name: 'ExternalService', is_active: true},
                rules: {
                    required: value => !!value || 'این فیلد اجباری‌ است',
                    counter: value => value.length <= 100 || 'Max 100 characters',
                    is_negative: value => value >= 50 || 'کمترین میزان رم قابل قبول ۵۰ مگابایت است',
                    valid_port: value => value >= 0 || 'مقدار پورت باید نمی‌تواند منفی باشد'
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
                        text: 'این بخش مربوط به تنظیمات سرویس External است که با تنظیم کردن آن می‌تواند مشحخص کنید سرویس شما بر روی چه دامنه‌هایی از بیرون دسترسی پذیر بوده و کدام پورت‌ها به پورت 80 مپ شوند',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#%D9%81%DB%8C%D9%84%D8%AF-spec-%D8%AF%D8%B1-externalservice-%D9%87%D8%A7'
                    }
                },
                page: {
                    title: 'انتخاب نوع سرویس',
                    description: 'برای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند در\n' +
                        '                ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند\n' +
                        '                در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که\n' +
                        '                می‌ماند در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق\n' +
                        '                که می‌ماند در ذهن‌ها'
                },
                items: [
                    'one', 'two', 'three'
                ],
                kinds: [
                    {
                        local_name: 'External Service',
                        name: 'ExternalService',
                        is_active: true,
                        tooltip: 'این نوع سرویس‌ها از خارج namespace در دسترس هستند'
                    },
                    {
                        local_name: 'Internal Service',
                        name: 'InternalService',
                        is_active: false,
                        tooltip: 'این نوع سرویس‌ها فقط از داخل namespace در دسترس هستند'
                    },

                ],
                serviceName: {
                    label: 'نام سرویس',
                    hint: 'تنها حروف a تا z و A تا Z و - معتبر هستند',
                    counter: 100,
                    name: ''
                },
                memory: {
                    label: 'تعیین رم سرویس',
                    hint: 'میزان رم مورد نیاز برای ساخت سرویس',
                    default: '200',
                    amount: 200
                },
                replica: {
                    label: 'تعداد Replica‌',
                    hint: 'تعداد سرویس‌های مشابهی که میخواهید با این تنظیمات همزمان ساخته شوند',
                    default: '1',
                    count: 1
                },
                port: {
                    label: 'پورت',
                    hint: 'پورتی از پروژه شما که به ۸۰ مپ شده و از بیرون در دسترس قرار میگیرد',
                    default: '80',
                    number: 80
                }

            }
        }, created() {
            this.$store.dispatch("getDomains", {verified: true});

            let manifest = JSON.parse(localStorage.getItem('vuex')).manifest;


            if (manifest.hasOwnProperty('name')) {
                this.serviceName.name = manifest.name
            }


            if (manifest.hasOwnProperty('kind')) {
                let kind_name = manifest.kind;

                this.kinds.forEach(item => {

                    item.is_active = false
                    if (item.name === kind_name) {
                        item.is_active = true;
                        this.kind = item
                    }
                })
            } else {
                this.onKindClicked(0)
            }


            if (manifest.hasOwnProperty('spec')) {

                if (manifest.spec.hasOwnProperty('resources')) {
                    if (manifest.spec.resources.hasOwnProperty('memory')) {
                        let memory = manifest.spec.resources.memory;
                        this.memory.amount = memory.toString().replace('Mi', '')
                    }
                } else {
                    this.memory.amount = this.memory.default
                }

                if (manifest.spec.hasOwnProperty('replicas')) {
                    this.replica.count = manifest.spec.replicas
                } else {
                    this.replica.count = this.replica.default
                }


                if (manifest.spec.hasOwnProperty('port')) {
                    this.port.number = manifest.spec.port
                } else {
                    if (this.kind.name === 'ExternalService')
                        this.port.number = this.port.default
                }

                if (manifest.spec.hasOwnProperty('domains')) {
                    manifest.spec.domains.forEach(item => {
                        console.log(item.name)
                        this.domains.push(item['name'])
                    })
                }

            } else {

                this.replica.count = this.replica.default
                this.port.number = this.port.default
                this.memory.amount = this.memory.default

            }
        },
        mounted: function () {


        },
        components: {
            Popover,
            Banner,
            ConfigBox
        },
        methods: {
            removeDomain(index) {
                this.domains.splice(index, 1)
            },
            changedValue(value) {
                var redundant = false

                if (value.length.valueOf() > 0) {

                    value.forEach(item => {
                        this.domains.forEach(subItem => {
                            if (subItem === item.title) {
                                redundant = true
                            }
                        });

                        if (!redundant) {
                            this.domains.push(item.title)
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
                this.kinds.forEach(item => {
                    item.is_active = false
                });
                this.kinds[index].is_active = true;
                this.kind = this.kinds[index]

                if (this.kind.name === 'ExternalService') {
                    this.port.number = null
                    this.port.number = this.port.default
                } else {
                    this.domains = []
                    this.port.number = null
                }

            },

        }
        ,
        computed: {
            domainsList() {
                if (!this.$store.state.domains) return []
                return this.$store.state.domains.map(item => {
                    return {
                        title: item.name,
                        value: item.name
                    };
                });
            }
            ,
        }
        ,
        watch: {
            kinds: {
                handler: function (value, oldValue) {
                    let kind = this.kind
                    this.addToManifest(kind.name, 'kind')
                }
                ,
                deep: true
            }
            ,
            memory: {
                handler: function (value, oldValue) {
                    let memory = value.amount
                    this.addToManifest(memory.toString().concat('Mi'), 'spec.resources.memory')
                }
                ,
                deep: true
            }
            ,
            replica: {
                handler: function (value, oldValue) {
                    let count = value.count
                    this.addToManifest(parseInt(count), 'spec.replicas')
                }
                ,
                deep: true
            }
            ,
            port: {
                handler: function (value, oldValue) {
                    if (value.number === null) {
                        this.deleteFromManifest('spec.port')
                    } else
                        this.addToManifest(parseInt(value.number), 'spec.port')
                }
                ,
                deep: true
            }
            ,
            domains: {
                handler: function (value, oldValue) {
                    let list = [...value]
                    let mapList = list.map(v => {
                        return {name: v}
                    })
                    this.addToManifest(mapList, 'spec.domains')
                    if (mapList.length === 0) {
                        this.deleteFromManifest('spec.domains')
                    }
                }
                ,
                deep: true

            }
            ,
            serviceName: {
                handler: function (value, oldValue) {
                    let name = value.name
                    if (name.length.valueOf() === 0) {
                        this.deleteFromManifest('name')
                    } else {
                        this.addToManifest(name, 'name')
                    }
                }
                ,
                deep: true
            }
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


</style>
