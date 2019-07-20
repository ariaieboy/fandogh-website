<template>
    <div class="row" style="display: flex; padding-bottom: 128px">

        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 right-pane">

            <component :is="managed_service[service_name].title"
                       class="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                       style="padding: 0;"
                       v-model="managed_service_manifest">

            </component>


            <div v-if="isMobile" style="width: 100%; margin-top: 16px; display: flex; justify-content: center">

                <button class="create-msvc-btn" @click="deploy">اتمام ساخت</button>
                <button class="cancel-msvc-btn" @click="cancel">انصراف</button>

            </div>

        </div>

        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 left-pane">

            <div style="width: 100%; padding: 16px; display: flex; justify-content: end; background-color: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0, 0.16)">

                <div class="image-container">
                    <img :alt="title"
                         :src="require('../../../assets/svg/'+ managed_service[service_name].icon +'.svg')"/>
                </div>

                <span style="display: inline-flex; font-family: iran-yekan; font-size: 2em; text-align: left; margin-top: auto; margin-bottom: auto; order: 3; padding: 0 12px; color: #2979ff; font-weight: bold">
                    {{managed_service[service_name].title}}
                </span>
                <div style="width: 2px; background-color: #2979ff; margin: 16px 0; border-radius: 25px; order: 2">

                </div>
                <span style="flex: 1; font-family: iran-yekan; font-size: 2em; text-align: left; margin-top: auto; margin-bottom: auto; order:1; color: #6c6c6c; padding: 0 12px;">
                    {{managed_service[service_name].short_desc}}
                </span>

            </div>
            <div style="width: 100%; margin-top: 16px; background-color: #2979ff; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.17); padding: 16px; display: block">
                <span style="color: #fefefe; font-size: 1.2em;display: block; font-weight: bold">{{managed_service[service_name].title}}</span>
                <span style="color: #fefefe; font-size: 1em;display: block; margin-top: 16px; line-height: 1.75; font-weight: normal;">
                    {{managed_service[service_name].description}}
                </span>
            </div>

            <div v-if="!isMobile" style="width: 100%; margin-top: 16px; display: flex; justify-content: center">

                <button class="create-msvc-btn" @click="deploy">اتمام ساخت</button>
                <button class="cancel-msvc-btn" @click="cancel">انصراف</button>

            </div>

        </div>

    </div>

</template>

<script>

    import Mysql from "../../../components/managed-services/mysql";
    import Postgresql from "../../../components/managed-services/postgresql";
    import Redis from "../../../components/managed-services/redis";
    import Proxy from "../../../components/managed-services/proxy";

    export default {
        name: "managed-service-setup",
        layout: 'dashboard',
        service_name: null,
        components: {
            Mysql,
            Postgresql,
            Redis,
            Proxy
        },
        data() {
            return {


                managed_service_manifest: {
                    kind: {
                        local_name: 'Managed Service',
                        name: 'ManagedService',
                        tooltip: 'این نوع سرویس‌ها از خارج namespace در دسترس هستند'
                    },
                    name: {
                        label: 'نام سرویس',
                        hint: 'تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند',
                        counter: 100,
                        name: ''
                    },
                    version: {
                        label: 'نسخه سرویس',
                        hint: 'نسخه‌ها در سرویس‌های مدیریت شده توسط خود فندق انتخاب می‌شوند',
                        name: null
                    },
                    parameters: [],
                    memory: {
                        label: 'تعیین رم سرویس',
                        hint: 'میزان رم مورد نیاز برای ساخت سرویس',
                        default: '200',
                        amount: 200
                    },
                },
                managed_service: {
                    mysql:
                        {
                            title: 'Mysql',
                            short_desc: 'Database',
                            icon: 'mysql',
                            path: "mysql",
                            version: '5.7',
                            description: 'MySQL یکی از محبوب‌ترین RDBMS‌های امروزی است که طرفداران زیادی در ایران داد، به همین دلیل MySQL به عنوان اولین managed-service به فندق اضافه شد.\n' +
                                'این managed-service از دو image متفاوت تشکیل شده، یکی خود MySQL و دیگری PHPMyAdmin که یک رابط کاربری تحت وب برای MySQL است.'

                        },

                    postgresql:
                        {
                            title: 'Postgresql',
                            short_desc: 'Database',
                            icon: 'postgresql',
                            path: "postgresql",
                            version: '10.4',
                            description: 'Postgresql یک ORDBMS معروف و پرطرفدار است که می‌توانید به سادگی به عنوان یک managed-service روی Namespace خود دیپلوی کنید. '
                        },

                    redis:
                        {
                            title: 'Redis',
                            short_desc: 'Cache Database',
                            icon: 'redis',
                            path: "redis",
                            version: '5.0.3',
                            description: 'شاید تا به حال نام پایگاه داده قدرتمند Redis را شنیده باشید. طبق توضیحات سایت Redis.io ٬ Redis یک پایگاه داده متن‌باز است که با قابلیت ذخیره داده‌ها به صورت in-memory باعث بالا رفتن سرعت ذخیره و بازیابی داده‌ها می‌شود.'
                        },

                    proxy:
                        {
                            title: 'Proxy',
                            short_desc: 'Proxy Service',
                            icon: 'proxy',
                            path: "proxy",
                            version: 'latest',
                            description: 'هنگامی که شما سرویس‌های خود را دیپلوی می‌کنید٬ سکو ترافیک خروجی سرویس شما را بر روی IP های متفاوتی برمی‌گرداند.\n' +
                                'این حالت در برخی شرایط که نیاز به یک IP آدرس مشخص وجود دارد٬ کار را کمی دشوار می‌کند.\n' +
                                'برای اینکه بتوانید از این مشکل جلوگیری به عمل آورید می‌توانید از Proxy Managed Service استفاده کنید. تنها کافی‌ است با استفاده از دستور fandogh managed-service deploy proxy 1 -c service_name proxy-server یک سرویس Proxy ایجاد کرده و داخل سرویسی که می‌خواهید ترافیک خروجی آن بر روی range ip مشخصی قرار گیرد تنظیم می‌کنید که این سرویس٬ responseهای خود را به proxy-server:3128 هدایت کند.'
                        }
                },
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    counter: value => value.length <= 100 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    default_memory: value => value >= 50 || 'کمترین میزان رم قابل قبول ۵۰ مگابایت است',
                    service_regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                    default_replica: value => value >= 1 || 'کمترین مقدار مجاز ۱ است',
                    valid_port: value => value >= 1 && value <= 65535 || 'مقدار پورت باید بین ۱ تا ۶۵۵۳۵ باشد'
                }

            }
        },
        computed: {
            service_name() {
                return this.$route.query.hasOwnProperty('service') ? this.$route.query.service : null
            },
            isMobile() {
                return this.$store.state.windowWidth <= 1024;
            }
        },
        created() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"})
            let manifest = this.$store.state.manifest

            this.addToManifest(this.managed_service_manifest.kind.name, 'kind')
            this.addToManifest(this.managed_service[this.service_name].title.toLowerCase(), 'spec.service_name')
            this.addToManifest(this.managed_service[this.service_name].version, 'spec.version')

        },
        methods: {
            deploy() {

                // if (this.isManifestValid()) {
                    this.loading = true
                    this.$store.commit("SET_DATA", {data: true, id: "loading"});
                    this.$store.dispatch('createServiceManifest').then(res => {
                        this.loading = false
                        this.finished = true
                        // removeValue('name')
                        // removeValue('versions')
                        this.$store.commit("SET_DATA", {id: "service", data: res});
                        this.$router.replace(`/dashboard/services/${res.name}`)
                        this.$store.commit('SET_DATA', {id: 'manifest', data: {}})
                    }).catch(e => {
                        this.loading = false
                        this.finished = false
                        // ErrorReporter(e, [], true).forEach(error => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        //
                        // })
                        this.$notify({
                            title: e,
                            time: 4000,
                            type: 'error'
                        })
                    })
                // }
            },
            cancel(){
                if (confirm('در صورت خروج تغییراتی که وارد کرده‌اید از بین خواهند رفت. آیا خارج می‌شوید؟')) {
                    this.$store.commit('SET_DATA', {id: 'manifest', data: {}})
                    this.$router.go(-1)
                }
            },
            leaving() {
                if (!this.finished) {
                    if (confirm('در صورت خروج تغییراتی که وارد کرده‌اید از بین خواهند رفت. آیا خارج می‌شوید؟')) {
                    } else {
                        this.$store.commit('SET_DATA', {id: 'manifest', data: {}})
                    }
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
        }, watch: {
            'managed_service_manifest.name': {
                handler: function (value, oldValue) {
                    let name = value.name
                    if (name.length.valueOf() === 0) {
                        this.deleteFromManifest('name')
                    } else {
                        if (this.rules.required(name) === true && this.rules.counter(name) === true && this.rules.service_regex(name) === true) {
                            this.addToManifest(name, 'name')
                        } else {
                            this.deleteFromManifest('name')
                        }
                    }
                }, deep: true
            },
            'managed_service_manifest.memory': {
                handler: function (value, oldValue) {
                    let memory = parseInt(value.amount);
                    if (this.rules.default_memory(memory) !== true) {
                        this.deleteFromManifest('spec.resources.memory')
                    } else {
                        this.addToManifest(memory.toString().concat('Mi'), 'spec.resources.memory')
                    }

                }, deep: true
            },
            'managed_service_manifest.parameters': {
                handler: function (value, oldValue) {
                    if ([...value].length === 0) {
                        this.deleteFromManifest('spec.parameters')
                    } else {
                        this.addToManifest([...value], 'spec.parameters')
                    }
                }, deep: true
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .right-pane
        width 100%
        min-height 600px
        padding 0
        order 1
        @media only screen and (max-width: 1025px)
            order: 2
            padding 16px


    .left-pane
        width 100%
        order 2
        position: sticky;
        top: 60px;
        height: max-content
        @media only screen and (max-width: 1025px)
            order: 1
            position: unset


    .create-msvc-btn
        font-family: iran-yekan
        text-align: center
        font-size: 1em
        font-weight: bold
        color: #fefefe
        flex 1 1 auto
        max-width 200px
        min-width 100px
        min-font-size 10px
        max-font-size 16px
        height 45px
        border-radius: 3px
        vertical-align: middle
        margin-left 6px
        margin-right 6px
        outline: none
        box-shadow: 0 2px 5px 1px rgba(36, 213, 216, 0.5)
        background-color: #24d5d8

    .cancel-msvc-btn
        font-family: iran-yekan
        text-align: center
        font-size: 1em
        font-weight: bold
        color: #151515
        flex 1 1 auto
        max-width 200px
        min-width 100px
        min-font-size 10px
        max-font-size 16px
        height 45px
        border-radius: 3px
        vertical-align: middle
        margin-left 6px
        margin-right 6px
        outline: none
        box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1)
        background-color: #fefefe


    div.image-container
        display inline-flex
        height 90px
        width 90px
        margin-top auto
        margin-bottom auto
        padding 0
        order 4
        margin-right auto
        background-color #2979ff
        border-radius 100px

        img
            margin auto
            width 52px
            height 52px
            @media only screen and (max-width: 766px)
                width 42px
                height 42px

</style>
