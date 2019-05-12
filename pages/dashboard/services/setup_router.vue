<template>
    <div>
        <p class="title">انتخاب نحوه ساخت</p>

        <div style="margin-top: 32px">
            <div class="row-custom between-xs">

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                    <div class="box middle-xs" @click="$router.push('/dashboard/services/cli_setup')">
                        <img alt="cli" src="~/assets/svg/cli.svg"/>
                        <div class="text-container">
                            <p class="title">Fandogh Cli</p>
                        </div>
                        <div class="divider"></div>
                        <div class="text-container">
                            <p class="description">ساخت سرویس از طریق cli فندق</p>
                        </div>
                    </div>
                </div>


                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                    <div class="box middle-xs" @click="$router.push('/dashboard/services/setup')">
                        <img alt="cli" src="~/assets/svg/wizard.svg"/>
                        <div class="text-container">
                            <p class="title">Fandogh Wizard</p>
                        </div>
                        <div class="divider"></div>
                        <div class="text-container">
                            <p class="description">ساخت سرویس از طریق داشبورد وب</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "router",
        layout: 'dashboard',
        created() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"})
        },
        computed: {},
        methods: {}
    }
</script>

<style lang="stylus" scoped>

    .title
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

    .box
        display block
        margin 1rem 0
        height max-content
        padding 16px
        border-radius 3px
        background-color #fefefe
        text-align center
        cursor pointer
        transition 0.3s ease-in-out all, 0.3s ease-in-out all
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.3)

    .box:hover
        background-color #2979ff
        box-shadow 0 2px 10px 5px rgba(41, 121, 255, 0.42)
        transition 0.3s ease-in-out all, 0.3s ease-in-out all

        div.divider
            background-color #fefefe
        img
            filter: invert(100%) sepia(91%) saturate(36%) hue-rotate(207deg) brightness(120%) contrast(200%)

        div.text-container
            width auto
            p.title
                color: #fefefe
            p.description
                color #fefefe

    .box
        img
            position relative
            margin-right auto
            margin-left auto
            width 170px
            height 170px
            filter none
            @media only screen and (max-width: 766px)
                width 140px
                height 140px

    div.divider
        background-color rgba(0, 0, 0, 0.25)
        margin-right 16px
        margin-left 16px
        margin-top 6px
        height 2px
        border-radius 25px

    div.text-container
        width auto
        p.title
            font-size 1.4em
            color #141414
            font-family iran-yekan
            margin-bottom 0
            margin-top 12px
        p.description
            font-size 1.1em
            color #3e3e3e
            font-family iran-yekan


</style>