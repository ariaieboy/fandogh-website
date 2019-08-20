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

            <div class="row" style="width: 100%; margin-top: 48px; max-width: 1370px; margin-left: auto; margin-right: auto">

                <div v-for="feature in feature_model.features" class="managed-service-feature-card col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <span>
                        <img :src="require('./img/icons/' + feature.icon)" :alt="feature.icon">
                    </span>
                    <div>
                        <h5>{{feature.title}}</h5>
                        <p>{{feature.description}}</p>
                    </div>

                </div>

                <div style="  height: 0; border: solid .5px #c4c2c2;"></div>

            </div>

        </div>


    </div>

</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                title: 'سرویس‌های مدیریت شده',
                description: 'فقط چند کلیک فاصله میان شما و محبوب‌ترین و پر‌ استفاده‌ترین تکنولوژی‌ها وجود دارد',
                feature_model: {
                    title: 'قدرتمند، ایمن و مقیاس‌پذیر',
                    description: 'به راحتی سرویس مورد نیاز خود را بسازید و دیگر نگران مقیاس‌پذیری و تنظیمات‌ پیچیده و پشتیبانی آن نباشید',
                    features: [

                        {
                            title: 'گستره سرویس‌های ارائه شده',
                            description: 'تمام سرویس‌های محبوب و پر استفاده را در یک پکیج با گستره بالا برای شما فراهم آورده‌ایم تا سرعت توسعه محصولات شما را افزایش دهیم.',
                            icon: 'choice_range.svg'
                        },
                        {
                            title: 'مقیاس‌پذیری بالا',
                            description: 'سرویس‌های مدیریت شده به راحتی و با کمترین هزینه به هر میزان که نیاز داشته باشید تغییر مقیاس می‌دهند تا در هر لحظه پاسخگوی نیازهای‌ شما باشند.',
                            icon: 'ic-auto-scaling.svg'
                        },
                        {
                            title: 'نصب سریع',
                            description: 'شما تنها با چند کلیک ساده می‌توانید هر کدام از سرویس‌های مدیریت شده و قدرتمند سکوی ابری فندق را در فضانام خود داشته باشید.',
                            icon: 'ic-service.svg'
                        },
                        {
                            title: 'امنیت بالا',
                            description: 'سرویس‌های مدیریت شده از طریق Private Network فضانام شما با دیگر سرویس‌ها در تماس هستند و از بیرون هیچگونه دسترسی به آن‌ها وجود ندارد.',
                            icon: 'ic-secret.svg'
                        },
                        {
                            title: 'پشتیبانی و توسعه',
                            description: 'سرویس‌های مدیریت شده توسط تیم سکوی ابری فندق توسعه یافته و نگهداری می‌شوند؛ در نتیجه نگرانی بابت توسعه و نگهداری آن‌ها برای کاربران وجود ندارد.',
                            icon: 'code.png'
                        },
                        {
                            title: 'قابل اعتماد',
                            description: 'سرویس‌های مدیریت شده از روی نسخه‌های stable ساخته می‌شوند و نگرانی بابت مشکلات نسخه‌های فرعی یا بتا و یا احتمال failure در آن‌ها وجود ندارد.',
                            icon: 'reliability.svg'
                        },

                    ]

                },
                managed_services: {
                    title: '',
                    description: '',
                    services: []
                },
                tutorial: {
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
            font-size 2.2em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.73
            letter-spacing normal
            text-align center
            color #3c3c3c
            @media only screen and (max-width 992px)
                font-size 1.8em

        h4
            font-family iran-yekan
            font-size 1.4em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            margin-top 16px
            letter-spacing normal
            text-align center
            padding-left 10%
            padding-right 10%
            color #535353
            @media only screen and (max-width 992px)
                font-size 1.2em

    .managed-service-feature-card
        display flex
        width 100%
        margin-top 32px
        margin-bottom 32px
        span
            width 52px
            height 52px
            border-radius 5px
            background-color rgba(0, 69, 255, 0.2)
            display flex
            img
                width 36px
                height 36px
                margin auto
        div
            display flex
            flex-direction column
            flex 1
            padding-right 16px
            h5
                font-family: iran-yekan;
                font-size: 1.4em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.75;
                letter-spacing: normal;
                text-align: right;
                color: #3c3c3c;
            p
                font-family: iran-yekan;
                font-size: 1.2em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.75;
                letter-spacing: normal;
                margin-top 8px
                text-align: right;
                color: #535353;

</style>
