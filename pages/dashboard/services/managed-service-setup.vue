<template>
    <div class="row">

        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
             style="width: 100%; min-height: 600px; background-color: orangered">

        </div>

        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="width: 100%;">

            <div style="width: 100%; padding: 16px; display: flex; justify-content: end; background-color: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0, 0.16)">

                <div class="image-container">
                    <img :alt="title"
                         :src="require('../../../assets/svg/'+ managed_service[service_name].icon +'.svg')"/>
                </div>

                <span style="display: inline-flex; font-family: iran-yekan; font-size: 1.8em; text-align: left; margin-top: auto; margin-bottom: auto; order: 3; padding: 0 12px; color: #2979ff">
                    {{managed_service[service_name].title}}
                </span>
                <div style="width: 2px; background-color: #2979ff; margin: 12px 0; border-radius: 25px; order: 2">

                </div>
                <span style="flex: 1; font-family: iran-yekan; font-size: 1.8em; text-align: left; margin-top: auto; margin-bottom: auto; order:1; color: #6c6c6c; padding: 0 12px;">
                    {{managed_service[service_name].short_desc}}
                </span>

            </div>
            <div style="width: 100%; margin-top: 16px; background-color: #2979ff; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.17); padding: 16px; display: block">
                <span style="color: #fefefe; font-size: 1.2em;display: block; font-weight: bold">{{managed_service[service_name].title}}</span>
                <span style="color: #fefefe; font-size: 1em;display: block; margin-top: 16px; line-height: 1.75; font-weight: normal;">
                    {{managed_service[service_name].description}}
                </span>
            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "managed-service-setup",
        layout: 'dashboard',
        service_name: null,
        data() {
            return {

                managed_service: {
                    mysql:
                        {
                            title: 'Mysql',
                            short_desc: 'Database',
                            icon: 'mysql',
                            path: "mysql",
                            description: 'MySQL یکی از محبوب‌ترین RDBMS‌های امروزی است که طرفداران زیادی در ایران داد، به همین دلیل MySQL به عنوان اولین managed-service به فندق اضافه شد.\n' +
                                'این managed-service از دو image متفاوت تشکیل شده، یکی خود MySQL و دیگری PHPMyAdmin که یک رابط کاربری تحت وب برای MySQL است.'

                        },

                    postgresql:
                        {
                            title: 'Postgresql',
                            short_desc: 'Database',
                            icon: 'postgresql',
                            path: "postgresql",
                            description:'Postgresql یک ORDBMS معروف و پرطرفدار است که می‌توانید به سادگی به عنوان یک managed-service روی Namespace خود دیپلوی کنید. '
                        },

                    redis:
                        {
                            title: 'Redis',
                            short_desc: 'Cache Database',
                            icon: 'redis',
                            path: "redis",
                            description:'شاید تا به حال نام پایگاه داده قدرتمند Redis را شنیده باشید. طبق توضیحات سایت Redis.io ٬ Redis یک پایگاه داده متن‌باز است که با قابلیت ذخیره داده‌ها به صورت in-memory باعث بالا رفتن سرعت ذخیره و بازیابی داده‌ها می‌شود.'
                        },

                    proxy:
                        {
                            title: 'Proxy',
                            short_desc: 'Proxy Service',
                            icon: 'proxy',
                            path: "proxy",
                            description:'هنگامی که شما سرویس‌های خود را دیپلوی می‌کنید٬ سکو ترافیک خروجی سرویس شما را بر روی IP های متفاوتی برمی‌گرداند.\n' +
                                'این حالت در برخی شرایط که نیاز به یک IP آدرس مشخص وجود دارد٬ کار را کمی دشوار می‌کند.\n' +
                                'برای اینکه بتوانید از این مشکل جلوگیری به عمل آورید می‌توانید از Proxy Managed Service استفاده کنید. تنها کافی‌ است با استفاده از دستور fandogh managed-service deploy proxy 1 -c service_name proxy-server یک سرویس Proxy ایجاد کرده و داخل سرویسی که می‌خواهید ترافیک خروجی آن بر روی range ip مشخصی قرار گیرد تنظیم می‌کنید که این سرویس٬ responseهای خود را به proxy-server:3128 هدایت کند.'
                        }
                }

            }
        },
        computed: {
            service_name() {
                return this.$route.query.hasOwnProperty('service') ? this.$route.query.service : null
            }
        },
        created() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"})
        }
    }
</script>

<style lang="stylus" scoped>

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
