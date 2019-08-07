<template>
    <div class="audience-container">
        <img src="../../../assets/svg/pod_bg.svg" width="100%" style="opacity: 20%;position: absolute"/>


        <div class="audience-inner-container">

            <p class="aud-title">فندق برای چه کسانی است؟</p>

            <div class="horizontal-line"></div>


            <div class="audience-rail row">

                <div v-for="item in audiences" class="aud-item">
                    <img :src="require('../../../assets/svg/targets/' + item.image + '.svg')" :alt="item.image">
                    <div style="width: 100%; padding-left: 12px; padding-right: 12px; display: flex; flex-direction: column">
                        <p>{{item.title}}</p>
                        <div class="divider"></div>
                    </div>
                </div>

            </div>

            <div class="aud-description">
                مهم نیست که در حال توسعه یک محصول اولیه هستید یا صاحب یک کسب‌وکار بزرگ، سکوی ابری فندق برای هر
                زمان
                از نیاز‌های شما، یک راه حل دارد.
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "audiences",
        data() {
            return {
                audiences: [
                    {
                        image: 'innovators',
                        title: 'نو‌آوران',
                        href: ''
                    },
                    {
                        image: 'teams',
                        title: 'تیم‌ها',
                        href: ''
                    },
                    {
                        image: 'startups',
                        title: 'استارتاپ‌ها',
                        href: ''
                    },
                    {
                        image: 'developers',
                        title: 'برنامه‌نویسان',
                        href: ''
                    }
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .audience-container
        width 100%
        min-height 600px
        position relative
        margin-top -48px


    .audience-inner-container
        width 100%
        background-image linear-gradient(to bottom, rgba(254, 254, 254, 0.75), #fefefe 47%, #fefefe)
        position relative
        display flex
        flex-direction column
        padding-top 250px
        @media only screen and (max-width: 992px)
            padding-top 180px

        p.aud-title
            margin-left auto
            margin-right auto
            font-family iran-yekan
            font-size 2.4em
            font-weight bold
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align left
            color #0045ff
            @media only screen and (max-width: 992px)
                font-size 1.8em


        div.horizontal-line
            width 450px
            height 0
            border solid 2px #0045ff
            margin-left auto
            margin-right auto
            border-radius 25px
            margin-top 8px
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

            img
                margin-left 24px
                margin-right 24px

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
                    color #2979ff
                    margin-top 12px
                    @media only screen and (max-width: 992px)
                        font-size 1.1em


                div.divider
                    width available
                    height 0
                    border-radius 25px
                    margin-top 0
                    display none
                    border 1px solid #0045ff

        div.aud-item:hover
            div
                p
                    color #0045ff
                    font-weight bold
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
