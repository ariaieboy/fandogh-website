<template>
    <div class="row" style="display: flex; padding-bottom: 128px">

        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 right-pane">

            <component :is="managed_service[service_name].title"
                       class="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                       style="padding: 0;"
                       v-if="isInitialized"
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
                    {{managed_service[service_name].local_title}}
                </span>
                <div style="width: 2px; background-color: #2979ff; margin: 16px 0; border-radius: 25px; order: 2">

                </div>
                <span :style="{fontSize: (managed_service[service_name].title.toLowerCase() === 'redis'? '1.5em': '2em')}"
                      style="flex: 1; font-family: iran-yekan; text-align: left; margin-top: auto; margin-bottom: auto; order:1; color: #6c6c6c; padding: 0 12px;">
                    {{managed_service[service_name].short_desc}}
                </span>

            </div>
            <div style="width: 100%; margin-top: 16px; background-color: #2979ff; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.17); padding: 16px; display: block">
                <span style="color: #fefefe; font-size: 1.2em;display: block; font-weight: bold">{{managed_service[service_name].local_title}}</span>
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

    import MongoDB from "../../../components/managed-services/mongodb";
    import Mysql from "../../../components/managed-services/mysql";
    import Mssql from "../../../components/managed-services/mssql";
    import Postgresql from "../../../components/managed-services/postgresql";
    import Redis from "../../../components/managed-services/redis";
    import Elasticsearch from "../../../components/managed-services/elasticsearch";
    import Kibana from "../../../components/managed-services/kibana";
    import FileBrowser from "../../../components/managed-services/filemanager";
    import RabbitMQ from "../../../components/managed-services/rabbitmq";
    import Minio from "../../../components/managed-services/minio";
    import Proxy from "../../../components/managed-services/proxy";
    import ErrorReporter from "../../../utils/ErrorReporter";

    export default {
        name: "managed-service-setup",
        layout: 'dashboard',
        service_name: null,
        components: {
            Mysql,
            Postgresql,
            MongoDB,
            Mssql,
            Redis,
            RabbitMQ,
            FileBrowser,
            Minio,
            Elasticsearch,
            // Kibana,
            Proxy
        },
        data() {
            return {


                isInitialized: false,
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
                            local_title: 'Mysql',
                            short_desc: 'Database',
                            icon: 'mysql',
                            path: "mysql",
                            version: '5.7',
                            description: 'MySQL یکی از محبوب‌ترین RDBMS‌های امروزی است که طرفداران زیادی در ایران دارد، به همین دلیل MySQL به عنوان اولین managed-service به فندق اضافه شد.\n' +
                                'این managed-service از دو سرویس متفاوت تشکیل شده، یکی خود MySQL و دیگری PHPMyAdmin که یک رابط کاربری تحت وب برای MySQL است.'

                        },

                    postgresql:
                        {
                            title: 'Postgresql',
                            local_title: 'Postgresql',
                            short_desc: 'Database',
                            icon: 'postgresql',
                            path: "postgresql",
                            version: '10.4',
                            description: 'Postgresql یک ORDBMS معروف و پرطرفدار است که می‌توانید به سادگی به عنوان یک managed-service روی Namespace خود دیپلوی کنید. '
                        },

                    mssql:
                        {
                            title: 'Mssql',
                            local_title: 'MSSQL Server',
                            short_desc: 'Database',
                            icon: 'mssql',
                            path: "mssql",
                            version: 'latest',
                            description: 'Microsoft SQL Server یک نرم‌افزار سیستم مدیریت بانک‌های اطلاعاتی رابطه ای است که توسط شرکت مایکروسافت ساخته شده‌است. این محصول نرم‌افزاری عملکرد اصلی‌اش ذخیره‌سازی و بازیابی اطلاعات با توجه به درخواست سایر برنامه‌ها است؛ که بر روی همان فضانام وجود دارند.'
                        },

                    mongodb:
                        {
                            title: 'MongoDB',
                            local_title: 'MongoDB',
                            short_desc: 'Database',
                            icon: 'mongodb',
                            path: "mongodb",
                            version: '4.2',
                            description: 'MongoDB یک پایگاه داده ‌NoSQL کارا، مقیاس‌پذیر، بدون نیاز به طرح‌بندی اولیه نوشته شده در زبان برنامه‌نویسی ++C است.'
                        },

                    redis:
                        {
                            title: 'Redis',
                            local_title: 'Redis',
                            short_desc: 'In Memory Data Store',
                            icon: 'redis',
                            path: "redis",
                            version: '5.0.3',
                            description: 'شاید تا به حال نام پایگاه داده قدرتمند Redis را شنیده باشید. طبق توضیحات سایت Redis.io ٬ Redis یک پایگاه داده متن‌باز است که با قابلیت ذخیره داده‌ها به صورت in-memory باعث بالا رفتن سرعت ذخیره و بازیابی داده‌ها می‌شود.'

                        },

                    rabbitmq:
                        {
                            title: 'RabbitMQ',
                            local_title: 'RabbitMQ',
                            short_desc: 'Message Broker',
                            icon: 'rabbitmq',
                            path: "rabbitmq",
                            version: 'latest',
                            description: 'RabbitMQ یک سرویس متن باز message-broker یا پیام دهنده است که معماری Advanced Message Queuing Protocol یا به اختصار (AMQP) را ایجاد کرده‌ است.\n' +
                                'همچنین این سرویس در ادامه با معماری plug-in به نحوی گسترش یافت تا بتواند از پروتکول‌هایی مثل Streaming Text Oriented Messaging Protocol یا به اختصار (STOMP)، MQTT و ... هم پشتیبانی کند.'
                        },

                    filebrowser:
                        {
                            title: 'FileBrowser',
                            local_title: 'File Browser',
                            short_desc: 'File Manager',
                            icon: 'filebrowser',
                            path: "filebrowser",
                            version: 'latest',
                            description: 'یکی از مشکلات کاربران بر روی سکو‌های ابری، دسترسی به داده‌های ذخیره‌شده بر روی Storage است، برای آنکه بتوانید به صورت گرافیکی با محل ذخیره‌سازی داده‌ها کار کنید و داده‌های خود را دانلود و آپلود و یا حتی Edit کنید، می‌توانید از سرویس مدیریت شده File Browser فندق استفاده کنید.'
                        },

                    minio:
                        {
                            title: 'Minio',
                            local_title: 'MinIO',
                            short_desc: 'Object Storage',
                            icon: 'minio',
                            path: "minio",
                            version: 'latest',
                            description: 'اگر شما به دنبال راه حلی برای ذخیره‌سازی داده‌های متفاوت هستید بهتر است از Object Storageها استفاده کنید. یکی از این Object Storageها MinIO است.\n' +
                                'MinIO یک cloud storage سازگار با Amazon S3 است که به شما این امکان را میدهد تا فایل‌های خود را بر روی آن ذخیره کنید.'
                        },
                    elasticsearch:
                        {
                            title: 'Elasticsearch',
                            local_title: 'Elasticsearch',
                            short_desc: 'Search Engine',
                            icon: 'elasticsearch',
                            path: "elasticsearch",
                            version: 'latest',
                            description: 'Elasticsearch محبوب‌ترین موتور جست‌و‌جو (Search Engine) در بین کاربران است که بر پایه کتابخانه Lucene و زبان برنامه‌نویسی Java توسعه یافته و از قدرت بالایی برخوردار است. این موتور جست‌و‌جو قابلیت جست‌و‌جو تمام متن را با پشتیبانی از پروتکل HTTP به صورت توزیع شده در اختیار کاربران قرار می‌دهد. همچنین بخش‌هایی از این سرویس به صورت متن‌باز تحت لیسانس‌هایی مانند Apache توسعه یافته و بخش‌هایی دیگر تحت عنوان Elastic License توسعه یافته‌اند.'
                        },
                    // kibana:
                    //     {
                    //         title: 'Kibana',
                    //         local_title: 'Kibana',
                    //         short_desc: 'Elastic Dashboard',
                    //         icon: 'kibana',
                    //         path: "kibana",
                    //         version: 'latest',
                    //         description: 'Kibana یک داشبورد مدیریتی و متن‌باز برای دسترسی به داده‌های ثبت شده داخل Elasticsearch است. کاربرها می‌توانند بر اساس داده‌های موجود جداول و گراف‌های متفاوتی ایجاد کنند.\n' +
                    //             'Kibana همچنین قابلیتی برای Present کردن داده‌ها به اسم Canvas دارد که به کاربر اجازه می‌دهد تا از داده‌های مورد نیاز Slideهایی برای نمایش ایجاد کرده و خروجی بگیرد.'
                    //     },

                    proxy:
                        {
                            title: 'Proxy',
                            local_title: 'Proxy',
                            short_desc: 'Proxy Service',
                            icon: 'proxy',
                            path: "proxy",
                            version: 'latest',
                            description: 'هنگامی که شما سرویس‌های خود را دیپلوی می‌کنید٬ سکو ترافیک خروجی سرویس شما را بر روی IP های متفاوتی برمی‌گرداند.\n' +
                                'این حالت در برخی شرایط که نیاز به یک IP آدرس مشخص وجود دارد٬ کار را کمی دشوار می‌کند.\n' +
                                'برای اینکه بتوانید از این مشکل جلوگیری به عمل آورید می‌توانید از Proxy Managed Service استفاده کنید. تنها کافی‌ است با استفاده از دستور fandogh managed-service deploy proxy 1 -c service_name proxy-server یک سرویس Proxy ایجاد کرده و داخل سرویسی که می‌خواهید ترافیک خروجی آن بر روی range ip مشخصی قرار گیرد تنظیم می‌کنید که این سرویس، responseهای خود را به proxy-server:3128 هدایت کند.'
                        }
                },
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    counter: value => value.length <= 100 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    default_memory: value => value >= 50 || 'کمترین میزان رم قابل قبول ۵۰ مگابایت است',
                    min_heap_memory: value => value >= this.managed_service_manifest.memory.amount / 4 && value < this.managed_service_manifest.memory.amount / 2 || 'مقدار min memory باید حداقل یک چهارم و حداکثر کمتر از نصف رم کلی باشد.',
                    max_heap_memory: value => value >= this.managed_service_manifest.memory.amount / 2 && value < this.managed_service_manifest.memory.amount || 'مقدار max memory باید بیش از نصف رم کلی و کمتر از مقدار نهایی رم کلی باشد.',
                    service_regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                    regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                    volume_name_regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
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
        mounted() {
            this.$store.commit('SET_DATA', {id: 'manifest', data: {}})
            this.$store.commit("SET_DATA", {data: false, id: "loading"})
            let manifest = this.$store.state.manifest

            //populating manifest
            if (this.$route.query.hasOwnProperty('service_name')) {
                this.dumpManifest(this.$route.query.service_name, manifest)
            } else {
                manifest = JSON.parse(localStorage.getItem('vuex')).manifest;
                this.populateManifest(manifest)
            }

        },
        methods: {
            isManifestValid() {
                if (this.managed_service_manifest.name.name.length === 0) {
                    this.$notify({
                        title: 'نام سرویس را وارد نکرده‌اید',
                        time: 4000,
                        type: 'error'
                    });
                    return false
                }

                if (this.rules.regex(this.managed_service_manifest.name.name) !== true ||
                    this.rules.required(this.managed_service_manifest.name.name) !== true ||
                    this.rules.counter(this.managed_service_manifest.name.name) !== true) {
                    this.$notify({
                        title: 'نام سرویس قابل قبول نیست',
                        time: 4000,
                        type: 'error'
                    });
                    return false
                }



                if (this.managed_service[this.service_name].title === 'Elasticsearch') {

                    let min_heap_memory_checked = true;
                    let max_heap_memory_checked = true;

                    this.managed_service_manifest.parameters.forEach(item => {

                        if (item.name === 'min_heap_memory') {
                            if (this.rules.min_heap_memory(item.value) !== true) {
                                this.$notify({
                                    title: 'مقدار min memory باید حداقل یک چهارم و حداکثر کمتر از نصف رم کلی باشد.',
                                    time: 4000,
                                    type: 'error'
                                });
                                min_heap_memory_checked = false
                            }
                        }

                        if (item.name === 'max_heap_memory') {
                            if (this.rules.max_heap_memory(item.value) !== true) {
                                this.$notify({
                                    title: 'مقدار max memory باید بیش از نصف رم کلی و کمتر از مقدار نهایی رم کلی باشد.',
                                    time: 4000,
                                    type: 'error'
                                });
                                max_heap_memory_checked = false;
                            }
                        }

                    });

                    if (!max_heap_memory_checked || !min_heap_memory_checked) {
                        return false
                    }
                }

                if (this.managed_service[this.service_name].title === 'Mysql' || this.managed_service[this.service_name].title === 'Postgresql') {


                    if (this.managed_service[this.service_name].title === 'Mysql') {
                        let mysql_root_password_enabaled = false
                        this.managed_service_manifest.parameters.forEach(item => {
                            if (item.name === 'mysql_root_password') {
                                mysql_root_password_enabaled = true
                            }
                        });

                        if (!mysql_root_password_enabaled) {
                            this.$notify({
                                title: 'لطفا رمز عبور Mysql را مشخص نمایید',
                                time: 4000,
                                type: 'error'
                            });
                            return false
                        }
                    } else {
                        let postgres_password = false
                        this.managed_service_manifest.parameters.forEach(item => {
                            if (item.name === 'postgres_password') {
                                postgres_password = true
                            }
                        });

                        if (!postgres_password) {
                            this.$notify({
                                title: 'لطفا رمز عبور Postgresql را مشخص نمایید',
                                time: 4000,
                                type: 'error'
                            });
                            return false
                        }
                    }
                }


                let volume_checked = true;
                this.managed_service_manifest.parameters.forEach(item => {
                    if (item.name === 'volume_name') {
                        if (this.rules.regex(item.value) !== true ||
                            this.rules.required(item.value) !== true ||
                            this.rules.counter(item.value) !== true) {
                            this.$notify({
                                title: 'نام volume قابل قبول نیست',
                                time: 4000,
                                type: 'error'
                            });
                            volume_checked = false
                        }
                    }
                });

                if (!volume_checked) {
                    return false
                }

                return true
            },
            populateManifest(manifest) {

                this.addToManifest(this.managed_service_manifest.kind.name, 'kind')
                this.addToManifest(this.managed_service[this.service_name].title.toLowerCase(), 'spec.service_name')
                this.addToManifest(this.managed_service[this.service_name].version, 'spec.version')
                this.addToManifest(this.managed_service_manifest.memory.amount.toString().concat('Mi'), 'spec.resources.memory')

                if (manifest.hasOwnProperty('name')) {
                    this.managed_service_manifest.name.name = manifest.name
                }

                if (manifest.hasOwnProperty('spec')) {
                    let spec = manifest.spec

                    if (spec.hasOwnProperty('parameters')) {
                        spec.parameters.forEach(param => {
                            this.managed_service_manifest.parameters.push(param)
                        })
                    }

                    if (spec.hasOwnProperty('resources')) {
                        this.managed_service_manifest.memory.amount = parseInt(spec.resources.memory.toString().replace('Mi', ''))
                    }

                }

                this.isInitialized = true
            },
            async dumpManifest(service_name, manifest) {
                this.loading = true;
                await this.$store.dispatch('dumpServiceManifest', service_name)
                    .then(response => {
                        this.loading = false
                        manifest = JSON.parse(localStorage.getItem('vuex')).manifest;
                        this.deleteFromManifest('spec.replicas');
                        this.populateManifest(manifest)
                    }).catch(e => {
                        if (e.status === 401) {
                            this.$router.push("/user/login");
                        } else {
                            ErrorReporter(e, this.$data, true).forEach(error => {
                                this.$notify({
                                    title: error,
                                    time: 4000,
                                    type: "error"
                                });
                            });
                        }
                    })
            },
            deploy() {

                if (this.isManifestValid()) {
                    this.loading = true
                    this.$store.commit("SET_DATA", {data: true, id: "loading"});
                    this.$store.dispatch('createServiceManifest').then(res => {
                        setTimeout(() => {
                            this.loading = false
                            this.finished = true
                            // removeValue('name')
                            // removeValue('versions')
                            this.$store.commit("SET_DATA", {id: "service", data: res});
                            this.$router.replace({path: `/dashboard/services/${res.name}`})
                            this.$store.commit('SET_DATA', {id: 'manifest', data: {}})
                        }, 5000);

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
                }
            },
            cancel() {
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
        }
        ,
        watch: {
            'managed_service_manifest.name':
                {
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
                    }
                    ,
                    deep: true
                }
            ,
            'managed_service_manifest.memory':
                {
                    handler: function (value, oldValue) {
                        let memory = parseInt(value.amount);
                        if (this.rules.default_memory(memory) !== true) {
                            this.deleteFromManifest('spec.resources.memory')
                        } else {
                            this.addToManifest(memory.toString().concat('Mi'), 'spec.resources.memory')
                        }

                    }
                    ,
                    deep: true
                }
            ,
            'managed_service_manifest.parameters':
                {
                    handler: function (value, oldValue) {
                        if ([...value].length === 0) {
                            this.deleteFromManifest('spec.parameters')
                        } else {
                            this.addToManifest([...value], 'spec.parameters')
                        }
                    }
                    ,
                    deep: true
                }
        }
        ,
        beforeDestroy() {
            this.$store.commit('SET_DATA', {id: 'manifest', data: {}})
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
        font-weight: normal
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
