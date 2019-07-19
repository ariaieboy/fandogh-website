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
                    {{managed_service[service_name].description}}
                </span>

            </div>
            <div style="width: 100%; margin-top: 16px; background-color: #2979ff; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.17); padding: 16px; display: block">
                <span style="color: #fefefe; font-size: 1.2em;display: block; font-weight: bold">{{managed_service[service_name].title}}</span>
                <span style="color: #fefefe; font-size: 1em;display: block; margin-top: 16px; line-height: 1.75; font-weight: normal;">
                    برای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند در ذهن‌ها
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
                            description: 'Database',
                            icon: 'mysql',
                            path: "mysql"
                        },

                    postgresql:
                        {
                            title: 'Postgresql',
                            description: 'Database',
                            icon: 'postgresql',
                            path: "postgresql"
                        },

                    redis:
                        {
                            title: 'Redis',
                            description: 'Cache Database',
                            icon: 'redis',
                            path: "redis"
                        },

                    proxy:
                        {
                            title: 'Proxy',
                            description: 'Proxy Service',
                            icon: 'proxy',
                            path: "proxy"
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
