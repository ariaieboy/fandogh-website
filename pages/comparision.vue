<template>
    <div class="row" style="background: #F8FAFF;">
        <div class="audience-container container-fluid">

            <div class="audience-inner-container">

                <h2 class="comp-header-title">{{header.title}}</h2>
                <div class="horizontal-line"></div>
                <p class="comp-header-desc">{{header.description}}</p>

            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "comparision",
        data() {
            return {
                header: {
                    title: 'چرا فندق',
                    description: 'اگر در ذهن شما سوال ایجاد شده است که سکوی ابری فندق چه ارزش افزوده‌ای را در برابر هاست‌های سنتی یا vpsها در اختیار شما قرار می‌دهد، در صفحه درستی قرار دارید. ' +
                        'در این بخش قصد داریم با توضیح برخی مفاهیم و ایجاد جداول قیاسی مزایا و تفاوت‌های سکوی ابری فندق با دیگر سرویس‌های زیرساختی برای شما توضیح دهیم.'
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../assets/css/variables.styl"

    .audience-container
        width 100%
        min-height 500px
        max-width 1750px
        background url("../assets/svg/clumsy-pod.svg") no-repeat top
        background-size contain
        padding-left 0
        padding-right 0

    .audience-inner-container
        width 100%
        background-image linear-gradient(to bottom, rgba(254, 254, 254, 0.75), #fefefe 57%, #fefefe)
        display flex
        max-width 1750px
        height 100%
        flex-direction column
        padding-top 150px
        @media only screen and (max-width: 992px)
            padding-top 180px

        h2.comp-header-title
            margin-left auto
            margin-right auto
            font-family iran-yekan
            font-size 4em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align left
            color $silverDark
            @media only screen and (max-width: 992px)
                font-size 2.4em


        div.horizontal-line
            width 450px
            height 0
            border solid 1px $colorPrimary
            margin-left auto
            margin-right auto
            border-radius 25px
            margin-top 2px
            @media only screen and (max-width: 992px)
                width 350px

        p.comp-header-desc
            margin-left 92px
            margin-right 92px
            font-family iran-yekan
            font-size 1.7em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align center
            padding-top 32px
            color $fontGray
            @media only screen and (max-width: 992px)
                font-size 1.5em


</style>
