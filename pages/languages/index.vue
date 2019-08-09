<template>
    <div class="row">

        <div class="row language-header">
            <div class="language-bg">
                <p class="banner-title">{{title}}</p>
                <p class="banner-description">{{description}}</p>
            </div>
        </div>

        <div class="row languages-feature-box">
            <div v-for="item in feature_cards" class="lang-feature-card col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <img :src="require('../../assets/svg/services/managed/' + item.icon + '.svg' )" :alt="item.icon">
                <div>
                    <p class="lang-card-title">{{item.title}}</p>
                    <p class="lang-card-description">{{item.description}}</p>
                </div>
            </div>

        </div>
        <div style="width: 100%; height: 0; border: solid 1px #c4c2c2;"></div>

        <div class="languages-container">
            <p class="languages-title">{{languages_title}}</p>
            <p class="languages-description">{{languages_description}}</p>
            <div class="col-lg-10 col-sm-12 col-md-10 col-xs-12 container-fluid" style="padding-bottom: 32px">
                <div class="row">

                    <div v-for="item in languages" class="col-lg-6 col-md-6 col-sm-12 col-xs-12 language-card">
                        <img :src="require('../../assets/svg/services/language/' + item.icon + '.svg')"
                             :alt="item.icon">
                        <div>
                            <p class="language-title">{{item.title}}</p>
                            <p class="language-description">{{item.description}}</p>
                            <a class="language-link" :href="item.href" target="_blank">مشاهده مستندات</a>
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
                description: 'با زبان‌های پشتیبانی شده در فندق فرایند توسعه محصولات خود را با معماری ابری سرعت ببخشید',
                languages_title: 'گستره‌ای از زبان‌ها با پشتیبانی حرفه‌ای',
                languages_description: 'با استفاده از زبان‌های پشتیبانی شده فندق، روند توسعه محصولات خود را سرعت ببخشید و  پیچیدگی‌های مدیریت زیرساخت را به ما بسپارید',
                feature_cards: [
                    {
                        title: 'پشتیبانی کامل از زبان‌ها',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        icon: 'managed_service_mysql'
                    },
                    {
                        title: 'آزادی انتخاب فریم‌ورک',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        icon: 'managed_service_mysql'
                    },
                ],
                languages: [
                    {
                        title: 'Java',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        icon: 'java_lang',
                        href: 'java'
                    },
                    {
                        title: 'Python',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        icon: 'python_lang',
                        href: 'python'
                    },
                    {
                        title: 'PHP',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        icon: 'php_lang',
                        href: 'php'
                    },
                    {
                        title: 'Node.js',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        icon: 'nodejs_lang',
                        href: 'php'
                    },
                    {
                        title: 'C#',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
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
        -webkit-backdrop-filter  blur(3.5px)
        backdrop-filter  blur(3.5px)
        background-image  linear-gradient(to bottom, #0045ff, #0135c0 74%, #0230aa)

    .language-bg
        width 100%
        height 100%
        padding-top 60px
        padding-bottom 100px
        background-size cover
        background url("../../assets/svg/language_bg.svg") no-repeat top
        @media only screen and (max-width  992px)
            padding-bottom 50px

        p.banner-title
            font-family  'Helvetica Neue'
            font-size  3.5em
            font-weight  bold
            font-style  normal
            font-stretch  normal
            line-height  1.24
            margin-top 48px
            letter-spacing  normal
            text-align  center
            color  #f8f8f8
            @media only screen and (max-width  992px)
                font-size 2.4em
                margin-top 0

        p.banner-description
            font-family  iran-yekan
            font-size  2em
            font-weight  normal
            font-style  normal
            font-stretch  normal
            line-height  1.71
            margin-top 32px
            padding-right 20%
            padding-left 20%
            letter-spacing  normal
            text-align  center
            color  #f8f8f8
            @media only screen and (max-width  992px)
                font-size 1.3em
                padding-left 16px
                padding-right 16px

    .languages-feature-box
        width 100%
        padding 32px 16px
        background #fefefe

    .lang-feature-card
        width 100%
        display flex
        padding-left 16px
        padding-right 16px
        @media only screen and (max-width  992px)
            margin-bottom 16px

        img
            margin-top 0
            height max-content
            @media only screen and (max-width  992px)
                width 58px

        div
            width 100%
            flex 1
            padding-left 16px
            padding-right 16px

            p.lang-card-title
                font-family  iran-yekan
                font-size  1.4em
                font-weight  bold
                font-style  normal
                font-stretch  normal
                line-height  1.71
                letter-spacing  normal
                text-align  right
                color  #0045ff
                @media only screen and (max-width  992px)
                    font-size 1.2em

            p.lang-card-description
                font-family  iran-yekan
                font-size  1.2em
                font-weight  normal
                font-style  normal
                font-stretch  normal
                line-height  1.75
                letter-spacing  normal
                text-align  right
                color  #535353
                @media only screen and (max-width  992px)
                    font-size 1em

    .languages-container
        width 100%
        padding 16px
        margin-bottom 16px

        p.languages-title
            font-family  iran-yekan
            font-size  2.2em
            font-weight  bold
            font-style  normal
            font-stretch  normal
            line-height  1.24
            margin-top 48px
            letter-spacing  normal
            text-align  center
            color  #0045ff
            @media only screen and (max-width  992px)
                font-size 1.5em
                margin-top 16px

        p.languages-description
            font-family  iran-yekan
            font-size  1.6em
            font-weight  normal
            font-style  normal
            font-stretch  normal
            line-height  1.71
            padding-right 20%
            padding-left 20%
            letter-spacing  normal
            text-align  center
            color  #535353
            @media only screen and (max-width  992px)
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
            width  58px
            margin-top 8px
            height max-content
            filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
            @media only screen and (max-width  992px)
                width 48px

        div
            width 100%
            flex 1
            padding-left 16px
            padding-right 16px

            p.language-title
                font-family  iran-yekan
                font-size  1.4em
                font-weight  bold
                font-style  normal
                direction ltr
                font-stretch  normal
                line-height  1.71
                letter-spacing  normal
                text-align  right
                color  #0045ff

            p.language-description
                font-family  iran-yekan
                font-size  1.2em
                font-weight  normal
                font-style  normal
                font-stretch  normal
                line-height  1.75
                letter-spacing  normal
                text-align  right
                color  #535353

            a.language-link
                font-family  iran-yekan
                font-size  .9em
                font-weight  normal
                font-style  normal
                font-stretch  normal
                line-height  1.79
                letter-spacing  normal
                text-align  center
                color  #2979ff

</style>
