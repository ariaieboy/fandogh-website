<template>
    <div>
        <p class="router-title">انتخاب نحوه ساخت</p>

        <div style="margin-top: 32px">
            <div class="row-custom between-xs">
                <service-card v-for="(item, index) in services"
                              :title="item.title"
                              :icon="item.icon"
                              :key="index"
                              @click.native="onSelected(item.url)">
                </service-card>
            </div>
        </div>

        <p class="router-title" style="margin-top: 48px">سرویس‌های مدیریت شده</p>

        <div style="margin-top: 32px">
            <div class="row-custom between-xs">

                <managed-service-card v-for="(item, index) in managed_services"
                                      :title="item.title"
                                      :key="index"
                                      :description="item.description"
                                      @click.native="$router.push({ path: '/dashboard/services/managed-service-setup', query: {service: item.path} })"
                                      :icon="item.icon">

                </managed-service-card>
            </div>
        </div>


    </div>
</template>

<script>
    import ManagedServiceCard from "../../../components/Dashboard/service/managed-service-card";
    import ServiceCard from "../../../components/Dashboard/service/service-card";

    export default {
        name: "router",
        components: {ServiceCard, ManagedServiceCard},
        layout: 'dashboard',
        data() {
            return {
                managed_services: [
                    {title: 'Mysql', description: 'Database', icon: 'mysql', path: "mysql"},
                    {title: 'Postgresql', description: 'Database', icon: 'postgresql', path: "postgresql"},
                    {title: 'Redis', description: 'In Memory Data Store', icon: 'redis', path: "redis"},
                    {title: 'Proxy', description: 'Proxy Service', icon: 'proxy', path: "proxy"}
                ],
                services: [
                    {title: 'Fandogh Cli', icon: 'cli', url: 'cli_setup'},
                    {title: 'Fandogh Wizard', icon: 'wizard', url: 'wizard'}
                ]
            }
        },
        created() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"})
        },
        computed: {},
        methods: {
            onSelected(path) {
                this.$router.replace('/dashboard/services/' + path)
            },
        }
    }
</script>

<style lang="stylus" scoped>

    .router-title
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal

    .row-custom
        box-sizing: border-box;
        display: flex;
        flex: 0 1 auto;
        flex-direction: row;
        flex-wrap: wrap
        justify-content start

    .box
        display block
        margin 1rem 0
        padding 16px 16px 16px 16px
        border-radius 3px
        background-color #fefefe
        text-align center
        cursor pointer
        box-sizing padding-box
        transition 0.3s ease-in-out all, 0.3s ease-in-out all
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.3)

        div.text-container
            margin auto
            display block
            flex 0.7 0 auto

        p.title
            color: #3e3e3e
            font-size 1.3em
            margin 0
            font-family iran-yekan
            font-weight bold

        div.divider
            background-color #2979ff
            height 2px
            border-radius 25px

        p.description
            font-size 1.1em
            color #7c7c7c
            margin 0
            font-family iran-yekan



    .box:hover
        background-color #2979ff
        box-shadow 0 2px 10px 5px rgba(41, 121, 255, 0.42)
        transition 0.3s ease-in-out all

        p.title
            color: #fefefe

        div.divider
            background-color #fefefe

        p.description
            color #fefefe

    div.image-container
        display inline-flex
        height 90px
        width 90px
        float left
        margin-top auto
        margin-bottom auto
        margin-right 12px
        margin-left 0
        padding 0
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
