<template>
    <div class="row" style="background: #F8FAFF; padding-bottom: 128px; margin-left: 0; margin-right: 0; display: flex; flex-direction: column">
        <div class="audience-container container-fluid">

            <div class="audience-inner-container">

                <h2 class="comp-header-title">{{header.title}}</h2>
                <div class="horizontal-line"></div>
                <p class="comp-header-desc">{{header.description}}</p>

            </div>

        </div>

        <div class="comp-menu">
            <p v-for="(item, index) in comp_menu" :id="index"
               class="menu-item" :class="{'selected': item.selected}"
               @click="onMenuClicked(index)">
                {{item.name}}
            </p>
        </div>

        <div class="comp-section-header container-fluid">
            <h2 class="comp-section-header-title">{{comp_sections[selected_index].title}}</h2>
            <div class="comp-section-horizontal-line"></div>
            <p class="comp-section-header-desc" v-html="comp_sections[selected_index].description"></p>

        </div>

        <div style="max-width: 1750px; width: 100%" class="container-fluid">

            <component :is="comp_sections[selected_index].section_name"
                       class="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                       style="padding: 0;">
            </component>

        </div>
    </div>
</template>

<script>

    import FandoghCompetitors from '../components/Landing/comparision/fandogh-competitors'
    import InfraServicesSchema from '../components/Landing/comparision/infra-services-schema'
    import VpsVSPaaS from '../components/Landing/comparision/vps-vs-paas'

    export default {
        name: "comparision",
        components: {
            FandoghCompetitors,
            InfraServicesSchema,
            VpsVSPaaS

        },
        data() {
            return {
                selected_index: 0,
                header: {
                    title: 'چرا فندق',
                    description: 'اگر در ذهن شما سوال ایجاد شده است که سکوی ابری فندق چه ارزش افزوده‌ای را در برابر هاست‌های سنتی یا vpsها در اختیار شما قرار می‌دهد، در صفحه درستی قرار دارید . ' +
                        'در این بخش قصد داریم با توضیح برخی مفاهیم و ایجاد جداول قیاسی مزایا و تفاوت‌های سکوی ابری فندق با دیگر سرویس‌های زیرساختی را برای شما توضیح دهیم.'
                },
                comp_menu: [
                    {
                        name: 'فندق و رقبای خارجی',
                        selected: true
                    },
                    {
                        name: 'شمای سرویس‌های زیرساختی',
                        selected: false
                    },
                    {
                        name: 'قیاس VPS و PaaS',
                        selected: false
                    }
                ],
                comp_sections: [
                    {
                        title: 'مقایسه فندق با رقبای خارجی',
                        description: 'سکوی ابری فندق یک PaaS یا Platform as a Service است که به کاربران در هر سطحی این امکان را می دهد تا محصولات نرم‌افزاری خود را بر روی سرورهای ابری مستقر کنند؛ بدون آنکه نیازی به دانش فنی زیرساخت داشته باشند. همچنین سکوی ابری فندق مدیریت تمام زیرساخت را برای شما انجام می‌دهد و شما می‌توانید مثل گذشته تمام تمرکز خود را بر روی توسعه محصول خود بگذارید و نگران موارد زیرساختی نباشید.' +
                            '<br/><br/> در جدول زیر عمده تفاوت‌ها و شباهت‌های سکوی ابری فندق با ۲ رقیب فدرتمند خود یعنی sloppy.io و heroku  را مشاهده می‌کنید.\n',
                        section_name: 'FandoghCompetitors',
                    },
                    {
                        title: 'شمای سرویس‌های زیرساختی',
                        description: 'موضوع سرویس‌های ابری تقریبا برای تمام کسب‌و‌کارها به صورت جهانی به یک موضوع داغ و جذاب تبدیل شده است اما در این میان مفاهیم متفاوتی وجود دارد که حیطه کاری و خدمات هر یک از این سرویس‌ها را مشخص می‌کند. اگر تصمیم دارید تا سرویس‌های خود را بر روی زیرساخت‌های ابری مستقر کنید فرقی ندارد که به چه منظور و با چه مقیاسی تصمیم به این عمل گرفته‌اید؛ مهمترین کاری که باید بکنید این است که مرزبندی بین این خدمات را به خوبی بشناسید و نسبت به حیطه خدمات هر یک از این سرویس‌ها آگاهی کافی داشته باشید.<br/>' +
                            'سرویس‌های ابری که به صورت فراگیر استفاده می‌شوند در ۳ بخش IaaS، PaaS و SaaS خلاصه می‌شوند؛ البته سرویس‌های FaaS هم وجود دارند اما استفاده از آن‌ها ملاحضات خاص خود را دارد و همانند ۳ مدل دیگر فراگیر نیست. این قبیل سرویس‌ها مزایای زیادی نسبت به سرورهای On Premise یا سرورهای اختصاصی به شما ارائه می‌کنند که در چند لایه می‌توان آن‌ها را توضیح داد. سرویس سکوی ابری فندق در حیطه PaaSها قرار دارد و در جدول زیر مزایای سرویس‌های ابری نسبت به سرورهای On Premise توضیح داده شده است.',
                        section_name: 'InfraServicesSchema',
                    },
                    {
                        title: 'قیاس VPS و PaaS',
                        description: 'برای آنکه راحت‌تر بتوانید ویژگی‌هایی که PaaS یا همان سکوی ابری در اختیار شما قرار می‌دهد را با ویژگی‌های یک VPS مقایسه کنید، به جدول زیر توجه کنید. <br/>\n' +
                            'در این جدول سعی کرده‌ایم تا لیستی کامل از مزایا را در قالب یک قیاس بیان کنیم تا تصمیم گیری برای انتخاب بین سکوی ابری فندق و VPS برای کابران آسان‌تر شود.',
                        section_name: 'VpsVSPaaS',
                    },
                ]
            }
        },
        methods: {

            onMenuClicked(index) {
                console.log(index);
                this.comp_menu.forEach((item) => {
                    item.selected = false
                });

                this.comp_menu[index].selected = true;
                this.selected_index = index;
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
        background-image linear-gradient(to bottom, rgba(248, 250, 255, 0.75), #F8FAFF 57%, #F8FAFF)
        display flex
        max-width 1750px
        height 100%
        min-height 500px
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
            text-align center
            color $silverDark
            @media only screen and (max-width: 992px)
                font-size 2.3em


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
                font-size 1.3em
                margin-left 0
                margin-right 0


    .comp-section-header
        width 100%
        display flex
        max-width 1750px
        height 100%
        flex-direction column
        padding-top 100px
        @media only screen and (max-width: 992px)
            padding-top 80px

        h2.comp-section-header-title
            margin-left auto
            margin-right auto
            font-family iran-yekan
            font-size 3em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align center
            color $silverDark
            @media only screen and (max-width: 992px)
                font-size 2.3em


        div.comp-section-horizontal-line
            width 500px
            height 0
            border solid 1px $colorPrimary
            margin-left auto
            margin-right auto
            border-radius 25px
            margin-top 8px
            @media only screen and (max-width: 992px)
                width 350px

        p.comp-section-header-desc
            margin-left 92px
            margin-right 92px
            font-family iran-yekan
            font-size 1.6em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            letter-spacing normal
            text-align center
            padding-top 32px
            color $fontGray
            @media only screen and (max-width: 992px)
                font-size 1.3em
                margin-left 0
                margin-right 0

    .comp-menu
        display flex
        flex-direction row
        background-color rgba(41, 121, 255, 0.2)
        height 64px
        padding-left 20%
        padding-right 20%
        width 100%
        @media only screen and (max-width: 992px)
            display inline-flex
            padding-left 0
            padding-right 0
            height 54px
            margin-top 32px

        p.menu-item
            font-size 1.3em
            color $fontGray
            cursor pointer
            line-height 64px
            margin-right auto
            margin-left auto
            padding-right 32px
            padding-left 32px
            text-align center
            font-family iran-yekan
            transition all .3s ease-in-out
            @media only screen and (max-width: 992px)
                font-size .9em
                flex 1
                padding 0
                line-height 54px

            &:hover
                transition all .3s ease-in-out
                color $colorPrimary

            &.selected
                color $colorPrimary


</style>
