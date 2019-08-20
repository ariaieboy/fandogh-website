<template>
    <div class="row" style="background: #F8FAFF;">

        <div class="row language-header">
            <div class="language-bg">
                <p class="banner-title">{{title}}</p>
                <p class="banner-description">{{description}}</p>
            </div>
        </div>

        <div class="row languages-feature-box">
            <div v-for="item in feature_cards" class="lang-feature-card col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <span>
                    <img :src="require('./icons/' + item.icon)" :alt="item.icon">
                </span>
                <div>
                    <p class="lang-card-title">{{item.title}}</p>
                    <p class="lang-card-description">{{item.description}}</p>
                </div>
            </div>

        </div>
        <div style="width: 100%; height: 0; border: solid .5px #c4c2c2;"></div>

        <div class="languages-container" style="max-width: 1230px; margin-left: auto; margin-right: auto">
            <p class="languages-title">{{languages_title}}</p>
            <p class="languages-description">{{languages_description}}</p>
            <div class="col-lg-10 col-sm-12 col-md-10 col-xs-12 container-fluid"
                 style="padding-bottom: 32px; margin-top: 32px">
                <div class="row">

                    <div v-for="item in languages" class="col-lg-6 col-md-6 col-sm-12 col-xs-12 language-card">
                        <img :src="require('../../assets/svg/services/language/' + item.icon + '.svg')"
                             :alt="item.icon">
                        <div>
                            <p class="language-title">{{item.title}}</p>
                            <p class="language-description">{{item.description}}</p>
                            <p @click="$router.push('/languages/' + item.href)" class="language-link">مشاهده مستندات</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "index",
        layout: 'default',
        data() {

            return {

                title: '< Languages >',
                description: 'با زبان‌های پشتیبانی شده در فندق فرآیند توسعه محصولات خود را با معماری ابری سرعت ببخشید',
                languages_title: 'گستره‌ای از زبان‌ها با پشتیبانی حرفه‌ای',
                languages_description: 'با استفاده از زبان‌های برنامه‌نویسی پشتیبانی شده فندق، روند توسعه محصولات خود را سرعت بخشید و پیچیدگی‌های مدیریت زیرساخت را به ما بسپارید و خیالتان راحت باشد، چرا که این زبان‌ها با اولویت بسیار بالایی پیوسته بهینه‌سازی و بروز می‌شوند',
                feature_cards: [
                    {
                        title: 'پشتیبانی کامل از زبان‌ها',
                        description: 'تمام تلاشمان را میکنیم تا با کمک توسعه‌دهندگان و استفاده از تجربیات دیگران زبان‌های معروف و پر کاربرد را پیوسته منطبق با معماری ابری ارائه کنیم تا شما تمام تمرکز خود را همیشه بر روی توسعه محصولات خود معطوف کنید.',
                        icon: 'code.png'
                    },
                    {
                        title: 'آزادی انتخاب فریم‌ورک',
                        description: 'محدودیت در سکوی ابری فندق به وسعت آسمان و تنوع فریم‌ورک‌ها به تعداد ابرهای این آسمان‌ است تا شما بتوانید تکنولوژی دلخواه خود را به راحتی هرچه تمام‌تر بر روی این سکو مستقر کنید.',
                        icon: 'framework.svg'
                    },
                    {
                        title: 'اجرای مستقیم کدها',
                        description: 'کدهای خود را به هر زبانی که هستند به راحتی و به صورت مستقیم ظرف چند دقیقه بر روی سکوی ابری فندق مستقر کنید بی‌آنکه نیاز باشد دانشی در مورد docker داشته باشید.',
                        icon: 'source_deploy.svg'
                    },
                ],
                languages: [
                    {
                        title: 'Java',
                        description: 'اگر شما هم از طرفداران پروپاقرص جاوا هستید، می‌توانید سرویس‌های جاوایی خود را با فریم‌ورک‌ قدرتمند Spring Boot و گستره‌ای از Build Tools‌ها و JDK‌های پشتیبانی شده بر روی سکوی ابری فندق مستقر کنید.',
                        icon: 'java_lang',
                        href: 'java'
                    },
                    {
                        title: 'Python',
                        description: 'زبانی محبوب با ساختاری قدرتمند برای توسعه‌دهندگانی که سرعت در توسعه برای آن‌ها اهمیت دارد؛ حال می‌توانند سرویس‌های پایتونی خود را با پشتیبانی حرفه‌ای از فریم‌ورک جذاب Django Project بسازند.',
                        icon: 'python_lang',
                        href: 'python'
                    },
                    {
                        title: 'PHP',
                        description: 'پلتفرمی جذاب به همراه پشتیبانی قوی برای آن دسته از توسعه‌دهندگانی که در دنیای Laravel به سر می‌برند می‌توانند از فریم‌ورک‌های بهینه شده برای ساختار ابری خود استفاده کنند.',
                        icon: 'php_lang',
                        href: 'php'
                    },
                    {
                        title: 'Java Script',
                        description: 'به وسعت دنیای وب؛ زبانی محبوب برای برنامه‌نویسان front با گستره‌ای از فریم‌ورک‌های جذابی همچون Vue.js، Angular.js و React.js و Node.js همه و همه برای سرویس‌های ابری شما فراهم شده‌اند.',
                        icon: 'nodejs_lang',
                        href: 'java_script'
                    },
                    {
                        title: 'C#',
                        description: 'زبانی به قدمت دو دهه ولی بهبود یافته و همپا با ساختارهای جدید تا شما بتوانید سرویس‌های net core. را به راحتی در دنیای ابرها مستقر کنید و از سرعت و قدرت و مزایای سکوهای ابری در پروژه‌های خود بهره‌مند شوید.',
                        icon: 'c_sharp_lang',
                        href: 'c_sharp'
                    }
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .row
        margin-left 0
        margin-right 0

    .language-header
        width 100%
        height auto
        padding-top 60px
        -webkit-backdrop-filter blur(3.5px)
        backdrop-filter blur(3.5px)
        background-image linear-gradient(to bottom, #0045ff, #0135c0 74%, #0230aa)

    .language-bg
        width 100%
        height 100%
        padding-top 60px
        padding-bottom 100px
        background-size cover
        background url("../../assets/svg/language_bg.svg") no-repeat top
        @media only screen and (max-width 992px)
            padding-bottom 50px

        p.banner-title
            font-family 'Helvetica Neue'
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

    .languages-feature-box
        width 100%
        padding 32px 16px
        display flex
        justify-content center
        background #fefefe

    .lang-feature-card
        width 100%
        max-width 600px
        display flex
        padding-left 16px
        padding-right 16px
        @media only screen and (max-width 992px)
            margin-bottom 16px

        span
            width 60px
            height 60px
            display flex
            border-radius 50%
            background #0045ff
            img
                width 32px
                height auto
                margin auto

        div
            width 100%
            flex 1
            padding-left 16px
            padding-right 16px

            p.lang-card-title
                font-family iran-yekan
                font-size 1.4em
                font-weight bold
                font-style normal
                font-stretch normal
                line-height 1.71
                letter-spacing normal
                text-align right
                color #0045ff
                @media only screen and (max-width 992px)
                    font-size 1.2em

            p.lang-card-description
                font-family iran-yekan
                font-size 1.2em
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.75
                letter-spacing normal
                text-align right
                color #535353
                @media only screen and (max-width 992px)
                    font-size 1em

    .languages-container
        width 100%
        padding 16px
        margin-bottom 16px

        p.languages-title
            font-family iran-yekan
            font-size 2em
            font-weight bold
            font-style normal
            font-stretch normal
            line-height 1.24
            margin-top 48px
            letter-spacing normal
            text-align center
            color #0045ff
            @media only screen and (max-width 992px)
                font-size 1.4em
                margin-top 16px

        p.languages-description
            font-family iran-yekan
            font-size 1.4em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            padding-right 10%
            padding-left 10%
            letter-spacing normal
            text-align center
            color #535353
            @media only screen and (max-width 992px)
                font-size 1.2em
                padding-left 16px
                padding-right 16px

        div
            width 100%


    .language-card
        width 100%
        display flex
        margin-top 64px

        img
            width 58px
            margin-top 8px
            height max-content
            filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
            @media only screen and (max-width 992px)
                width 48px

        div
            width 100%
            flex 1
            padding-left 16px
            padding-right 16px

            p.language-title
                font-family 'Helvetica Neue'
                font-size 1.4em
                font-weight normal
                font-style normal
                direction ltr
                font-stretch normal
                line-height 1.71
                letter-spacing normal
                text-align right
                color #0045ff

            p.language-description
                font-family iran-yekan
                font-size 1.1em
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.75
                letter-spacing normal
                text-align right
                color #535353

            p.language-link
                font-family iran-yekan
                font-size .9em
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.79
                letter-spacing normal
                text-align right
                color #2979ff
                cursor pointer

            p.language-link:hover
                color #0045ff

</style>
