<template>
    <div class="row" style="background: #F8FAFF;">

        <div class="row managed-service-header">
            <div class="managed-service-bg">
                <p class="banner-title">{{title}}</p>
                <p class="banner-description">{{description}}</p>
            </div>
        </div>

        <div class="managed-services-feature-container">
            <h2>{{feature_model.title}}</h2>
            <h4>{{feature_model.description}}</h4>

        </div>



    </div>

</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                title: 'سرویس‌های مدیریت شده',
                description: 'فقط چند کلیک فاصله میان شما و محبوب‌ترین و پر‌ استفاده‌ترین تکنولوژی‌ها وجود دارد',
                feature_model:{
                    title: 'قدرتمند، ایمن و مقیاس‌پذیر',
                    description: 'به راحتی سرویس مورد نیاز خود را بسازید و دیگر نگران مقیاس‌پذیری و تنظیمات‌ پیچیده و پشتیبانی آن نباشید',
                    features: [

                    ]

                },
                managed_services:{
                    title: '',
                    description: '',
                    services:[]
                },
                tutorial:{
                    title: '',
                    description: '',
                    video: ''
                },
                register: {
                    title: ''
                }

            }
        }
    }
</script>

<style lang="stylus" scoped>

    .row
        margin-left 0
        margin-right 0

    .managed-service-header
        width 100%
        height auto
        padding-top 60px
        -webkit-backdrop-filter blur(3.5px)
        backdrop-filter blur(3.5px)
        background-image linear-gradient(to bottom, #0045ff, #0135c0 74%, #0230aa)

    .managed-service-bg
        width 100%
        height 100%
        padding-top 60px
        padding-bottom 100px
        background-size contain
        background url("img/managed_services_header_background.png") no-repeat top center
        @media only screen and (max-width 992px)
            padding-bottom 50px

        p.banner-title
            font-family iran-yekan
            font-size 3.5em
            font-weight bold
            font-style normal
            font-stretch normal
            line-height 1.24
            margin-top 48px
            letter-spacing normal
            text-align center
            color #f8f8f8
            @media only screen and (max-width 992px)
                font-size 2.4em
                margin-top 0

        p.banner-description
            font-family iran-yekan
            font-size 2em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            margin-top 32px
            padding-right 20%
            padding-left 20%
            letter-spacing normal
            text-align center
            color #f8f8f8
            @media only screen and (max-width 992px)
                font-size 1.3em
                padding-left 16px
                padding-right 16px


    .managed-services-feature-container
        background #fefefe
        padding 32px 24px
        width 100%
        h2
            font-family iran-yekan
            font-size  2.2em
            font-weight  normal
            font-style  normal
            font-stretch  normal
            line-height  1.73
            letter-spacing  normal
            text-align  center
            color  #3c3c3c
        h4
            font-family  iran-yekan
            font-size  1.4em
            font-weight  normal
            font-style  normal
            font-stretch  normal
            line-height  1.71
            margin-top 16px
            letter-spacing  normal
            text-align  center
            padding-left 10%
            padding-right 10%
            color  #535353

</style>
