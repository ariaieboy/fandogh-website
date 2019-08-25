<template>
    <div class="audience-container container-fluid">
        <!--<img src="../../../assets/svg/pod_bg.svg" width="100%" style="opacity: 20%;position: absolute"/>-->


        <div class="audience-inner-container">

            <p class="aud-title">{{title}}</p>

            <div class="horizontal-line"></div>


            <div class="audience-rail row">

                <div v-for="item in audiences" class="aud-item" @click="$router.push(item.href)">
                    <span>
                        <img :src="require('../../../assets/svg/targets/' + item.image + '.svg')" :alt="item.image">
                    </span>
                    <div style="width: 100%; padding-left: 12px; padding-right: 12px; display: flex; flex-direction: column">
                        <p>{{item.title}}</p>
                        <div class="divider"></div>
                    </div>
                </div>

            </div>

            <div class="aud-description">{{description}}</div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "audiences",
        data() {
            return {
                title: 'فندق برای چه کسانی است؟',
                description: '          مهم نیست که در حال توسعه یک محصول اولیه هستید یا صاحب یک کسب‌وکار بزرگ، سکوی ابری فندق برای هر\n' +
                    '                زمان\n' +
                    '                از نیاز‌های شما، یک راه حل دارد.',
                audiences: [
                    {
                        image: 'freelancers',
                        title: 'Freelancers',
                        href: '/audience/freelancers'
                    },
                    {
                        image: 'students',
                        title: 'دانشجویان',
                        href: '/audience/students'
                    },
                    {
                        image: 'startups',
                        title: 'استارتاپ‌ها',
                        href: '/audience/startups'
                    },
                    {
                        image: 'teams',
                        title: 'تیم‌ها',
                        href: '/audience/teams'
                    },
                    {
                        image: 'companies',
                        title: 'شرکت‌ها',
                        href: '/audience/companies'
                    }
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"

    .audience-container
        width 100%
        min-height 500px
        max-width 1750px
        background url("../../../assets/svg/pod_bg.svg") no-repeat top
        background-size contain
        margin-top -48px
        padding-left 0
        padding-right 0


    .audience-inner-container
        width 100%
        background-image linear-gradient(to bottom, rgba(254, 254, 254, 0.75), #fefefe 47%, #fefefe)
        display flex
        max-width 1750px
        height 100%
        flex-direction column
        padding-top 250px
        @media only screen and (max-width: 992px)
            padding-top 180px

        p.aud-title
            margin-left auto
            margin-right auto
            font-family iran-yekan
            font-size 2.4em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align left
            color $silverDark
            @media only screen and (max-width: 992px)
                font-size 1.8em


        div.horizontal-line
            width 450px
            height 0
            border solid 1px $grayMedium
            margin-left auto
            margin-right auto
            border-radius 25px
            margin-top 2px
            @media only screen and (max-width: 992px)
                width 350px

    .audience-rail
        width 100%
        margin-top 80px
        display flex
        margin-left 0
        margin-right 0
        height max-content
        justify-content center

        div.aud-item
            display flex
            height max-content
            flex-direction column
            justify-content center
            cursor pointer
            @media only screen and (max-width: 992px)
                margin-top 16px

            span
                display flex
                width 100px
                height 100px
                margin-left 24px
                margin-right 24px
                img
                    margin auto
                    width 90px
                    height 90px

            div
                p
                    font-family iran-yekan
                    font-size 1.3em
                    font-weight normal
                    font-style normal
                    font-stretch normal
                    line-height 1.72
                    letter-spacing normal
                    text-align center
                    margin-bottom 5px
                    color $colorBlueArea
                    margin-top 12px
                    @media only screen and (max-width: 992px)
                        font-size 1.1em


                div.divider
                    width available
                    height 0
                    border-radius 25px
                    margin-top 0
                    display none
                    border 1px solid $colorPrimary

        div.aud-item:hover
            div
                p
                    color $colorPrimary

                div.divider
                    display unset

    .aud-description
        font-family iran-yekan
        font-size 1.4em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.72
        letter-spacing normal
        margin-left auto
        margin-right auto
        text-align center
        color #3c3c3c
        max-width 700px
        margin-top 64px
        margin-bottom 32px
        padding-right 16px
        padding-left 16px
        @media only screen and (max-width: 992px)
            font-size 1.1em
            margin-top 32px


</style>
