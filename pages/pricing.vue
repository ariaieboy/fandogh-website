<template>
    <div style="width: 100%; background: #F4F6FF">

        <div class="parallax-container">
            <h1>{{title}}</h1>
            <p class="header-description" v-html="description"></p>
        </div>

        <div class="price-page-navigation">
            <div style="width: 100%; height: 100%; display: flex; flex-direction: row">

                <div style="display: flex; flex-direction: row; padding-left: 16px; padding-right: 16px">
                    <img src="../assets/svg/ic_close.svg"
                         style="width: 16px; height: 16px; margin-top: auto; margin-bottom: auto;"/>
                    <p style="margin-right: 12px; color: #0045FF; font-size: 1.1em; margin-top: auto; margin-bottom: auto;">
                        ماشین حساب</p>
                </div>

            </div>

            <div style="background: #d0d0d0; height: 1px"></div>

        </div>

        <price-header :title="headers.plans.title"
                      :description="headers.plans.description"
                      :links="headers.plans.links">

        </price-header>

        <div style="background: rgba(196,194,194,0.31); width: 100%; padding: 32px 16px;" class="row">

            <div v-for="plan in plans" class="col-xs-12 col-sm-6 col-md-3 col-lg-3" style="padding: 0">
                <div class="plan-card-container">

                    <div class="header">
                        <img :src="require('../assets/svg/plans/' + plan.icon + '.svg')" :alt="plan.icon">
                        <p class="header-title">{{plan.title}}</p>
                        <p class="header-description">{{plan.price}}</p>
                    </div>

                    <div class="divider"></div>

                    <div class="plan-config-container">
                        <div v-for="conf in plan.config" class="detail-container">
                            <p class="detail-title">{{conf.title}}</p>
                            <p class="detail-amount">{{conf.detail}}</p>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="plan-description-container">
                        <p>{{plan.description}}</p>
                    </div>

                    <div class="divider"></div>

                    <div class="plan-spec-container">

                        <div v-for="spec in plan.specs" class="inner-container">
                            <p class="description">- {{spec.detail}}</p>
                        </div>

                        <button>جزئیات</button>

                    </div>

                </div>
            </div>

        </div>

        <price-header :title="headers.calculator.title"
                      :description="headers.calculator.description"
                      :links="headers.calculator.links">

        </price-header>

    </div>
</template>

<script>
    import PriceHeader from "../components/elements/headers/price-header";

    export default {
        name: 'pricing',
        layout: 'default',
        components: {PriceHeader},
        data() {
            return {
                title: 'قیمت محصولات سکوی ابری فندق',
                description: 'قیمت‌گزاری رقابتی و منعطف برای هر نوع پروژه‌ای و با هر مقیاسی، کیفیت بالا در مقابل هزینه کم.<br/> از پروژه‌های کوچک یا پروژه‌های شرکتی را با حداقل هزینه و حداکثر کیفیت تهیه کنید.',
                headers: {
                    plans: {
                        title: 'پلن‌های پیشنهادی',
                        description: 'شاید برای شروع ایده‌ای از اینکه‌ چه\n' +
                            '                    میزان منابع برای پروژه و کسب‌وکار شما نیاز است نداشته باشید و به دنبال یک راهنمایی باشید. سکوی\n' +
                            '                    ابری فندق تجربه استفاده محصولات متفاوت را در قالب یک سری پیشنهاد برای شما تهیه کرده است تا\n' +
                            '                    بتوانید بسته به مقیاس پروژه خود، پلن مورد نیاز خود را انتخاب کنید.',
                        links: [
                            {
                                title: 'در مورد سیاست مدیریت و تخصیص منابع فندق بیشتر بدانید >',
                                href: 'https://docs.fandogh.cloud/docs/resources.html'
                            }
                        ]
                    }, calculator: {
                        title: 'ماشین حساب',
                        description: 'با ماشین‌ حساب سکوی ابری فندق میزان منابع مورد نیاز خود را انتخاب کنید و از هزینه تمام شده ماهیانه آگاه شوید.<br>' +
                            'همچنین می‌توانید محاسبه کنید که در ازای هر میزان منابع، چه ویژگی‌هایی در اختیار شما قرار داده می‌شود.',
                        links: [
                            {
                                title: 'در مورد سیاست مدیریت و تخصیص منابع فندق بیشتر بدانید >',
                                href: 'https://docs.fandogh.cloud/docs/resources.html'
                            }
                        ]
                    },
                },
                plans: [
                    {
                        icon: 'free_plan',
                        title: 'پلن رایگان',
                        price: 'رایگان و بدون هزینه',
                        description: 'مناسب پروژه‌های دانشجویی و ارائه محصولات MVP و کارهای آزمایشی',
                        config: [
                            {
                                title: 'پردازنده',
                                detail: '0.5 Core'
                            },
                            {
                                title: 'رم (حافظه تصادفی)',
                                detail: '400 Mi'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'تعداد سرویس مجاز',
                                detail: '2'
                            }
                        ],
                        specs: [
                            {
                                detail: 'شامل همه ویژگی‌های رایگان'
                            },
                            {
                                detail: 'گواهی ssl رایگان'
                            },
                            {
                                detail: 'دامنه دلخواه'
                            },
                        ]
                    },
                    {
                        icon: 'base-plan',
                        title: 'پلن پایه',
                        price: 'ماهیانه ۳۰ هزار تومان',
                        description: 'مناسب پروژه‌های کوچک که نیاز به ضمانت Uptime دارند.',
                        config: [
                            {
                                title: 'پردازنده',
                                detail: '0.5 Core'
                            },
                            {
                                title: 'رم (حافظه تصادفی)',
                                detail: '512 Mi'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'تعداد سرویس مجاز',
                                detail: '2'
                            }
                        ],
                        specs: [
                            {
                                detail: 'ضمانت Uptime'
                            },
                            {
                                detail: 'شامل همه ویژگی‌های رایگان'
                            },
                            {
                                detail: 'گواهی ssl رایگان'
                            },
                            {
                                detail: 'دامنه دلخواه'
                            }
                        ]
                    },
                    {
                        icon: 'economy-plan',
                        title: 'پلن اقتصادی',
                        price: 'ماهیانه ۷۲ هزار تومان',
                        description: 'مناسب پروژه‌های با مقیاس متوسط که نیاز به ساخت بیش از ۲ سرویس در آن دارید.',
                        config: [
                            {
                                title: 'پردازنده',
                                detail: '0.5 Core'
                            },
                            {
                                title: 'رم (حافظه تصادفی)',
                                detail: '1024 Mi'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'Dedicated Volume',
                                detail: '10 GB'
                            },
                            {
                                title: 'تعداد سرویس مجاز',
                                detail: '5'
                            }
                        ],
                        specs: [
                            {
                                detail: 'ضمانت Uptime'
                            },
                            {
                                detail: 'شامل همه ویژگی‌های رایگان'
                            },
                            {
                                detail: 'گواهی ssl رایگان'
                            },
                            {
                                detail: 'دامنه دلخواه'
                            },
                            {
                                detail: 'ساخت بیش از ۲ سرویس'
                            }
                        ]
                    },
                    {
                        icon: 'startup-plan',
                        title: 'پلن استارتاپی',
                        price: 'ماهیانه ۱۸۰ هزار تومان',
                        description: 'مناسب پروژه‌های استارتاپی که توزیع منابع و مدیریت هزینه برای آن‌ها مهم است.',
                        config: [
                            {
                                title: 'پردازنده',
                                detail: '1.0 Core'
                            },
                            {
                                title: 'رم (حافظه تصادفی)',
                                detail: '2048 Mi'
                            },
                            {
                                title: 'حافظه ذخیره‌سازی اشتراکی',
                                detail: '2.5 GB'
                            },
                            {
                                title: 'Dedicated Volume',
                                detail: '50 GB'
                            },
                            {
                                title: 'تعداد سرویس مجاز',
                                detail: '10'
                            }
                        ],
                        specs: [
                            {
                                detail: 'ضمانت Uptime'
                            },
                            {
                                detail: 'شامل همه ویژگی‌های رایگان'
                            },
                            {
                                detail: 'گواهی ssl رایگان'
                            },
                            {
                                detail: 'دامنه دلخواه'
                            },
                            {
                                detail: 'ساخت بیش از ۲ سرویس'
                            }
                        ]
                    },
                ]
            }
        },
        head() {
            return {
                title: this.title,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'قیمت‌گزاری رقابتی و منعطف برای هر نوع پروژه‌ای و با هر مقیاسی، کیفیت بالا در مقابل هزینه کم. از پروژه‌های کوچک یا پروژه‌های شرکتی را با حداقل هزینه و حداکثر کیفیت تهیه کنید.'
                    },
                    {
                        hid: 'keywords',
                        name: 'keywords',
                        content: 'قیمت,پروژه,سکو,سکوی ابری,سکوی ابری فندق,تکنولوژی,docker,پشتیبانی'
                    }
                ]

            }
        }
    }
</script>

<style lang="stylus" scoped>

    .row
        margin-right 0
        margin-left 0

    .parallax-container
        width: 100%;
        height: 375px;
        background-image: linear-gradient(to bottom, #0045ff, #0135c0 74%, #0230aa);
        @media only screen and (max-width 1230px)
            height 270px

        div.lang-detail-parent-container
            background-size 60%
            width 100%
            height 100%
            @media only screen and (max-width 1230px)
                background-size 100%


    h1
        font-family: 'yekan'
        font-size: 3em
        font-weight: bold
        font-style: normal
        font-stretch: normal
        line-height: 1.24
        padding-top 128px
        letter-spacing: normal
        text-align: center
        color: #fefefe

    h2
        font-family: 'yekan'
        font-size: 2em
        font-weight: normal
        font-style: normal
        font-stretch: normal
        line-height: 1.24
        letter-spacing: normal
        text-align: right
        color: #535353


    p.header-description
        font-family 'yekan'
        font-size 1.5em
        color: #fefefe
        text-align center


    .plan-card-container
        background #fefefe
        border-radius 3px
        box-shadow none
        opacity 0.6
        display flex
        flex-direction column
        padding 0
        cursor pointer
        margin 4px
        transition all 0.3s ease-in-out

        .header
            width 100%
            background #EBEFFF
            display flex
            flex-direction column
            padding 16px
            border-top-left-radius 3px
            border-top-right-radius 3px

            img
                filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
                width 94px
                height 94px
                margin-left auto
                margin-right auto

            p.header-title
                color #001069
                text-align center
                font-size 1.4em
                font-family iran-yekan
                padding-top 16px
                font-weight bold
                margin-bottom 0

            p.header-description
                color #535353
                text-align center
                font-size 1.2em
                font-family iran-yekan
                font-weight normal
                margin-bottom 0

        .divider
            height 1px
            background #e7ebf5

        .plan-config-container
            display flex
            flex-direction column
            padding 16px
            min-height 150px

            .detail-container
                display flex
                flex-direction row

                .detail-title
                    color #000
                    flex .7
                    font-size 1em
                    font-family iran-yekan
                    margin-bottom 8px

                .detail-amount
                    color #000
                    flex .3
                    text-align left
                    font-family "Helvetica Neue"
                    direction ltr
                    font-size 1em
                    margin-bottom 8px


        .plan-description-container
            width 100%
            background rgba(238, 238, 238, 0.19)
            display flex
            flex-direction column
            padding 16px

            p
                color #535353
                text-align center
                font-size 1em
                font-family iran-yekan
                font-weight normal
                margin-bottom 0


        .plan-spec-container
            display flex
            flex-direction column
            padding 16px
            min-height 250px

            .inner-container
                display flex
                flex-direction row

                p.description
                    color #404040
                    flex 1
                    text-align right
                    font-size 1em
                    margin-bottom 8px

            button
                background rgba(0, 69, 255, 0.41)
                width 100px
                border-radius 5px
                border 1px solid #0045ff
                color #fefefe
                height 38px
                font-family iran-yekan
                margin-top auto


    .plan-card-container:hover
        opacity 1
        box-shadow 0 3px 6px rgba(0, 0, 0, 0.17)

        .plan-spec-container
            button
                background #0045ff
                width 100px
                border-radius 5px
                color #fefefe
                height 38px
                font-family iran-yekan
                margin-top auto
                border none


    .price-page-navigation
        position sticky
        top 64px
        width 100%
        height 58px
        background #EBEFFF
        display flex
        flex-direction column
        z-index 10000
        @media only screen and (max-width 1230px)
            top 0
</style>
