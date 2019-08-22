<template>
    <div class="row" style="background: #F8FAFF;">

        <div class="row audience-header">
            <div class="audience-bg">
                <span>
                    <img :src="require('../../assets/svg/targets/' + audience_model[audience].icon)"
                         :alt="audience_model[audience].icon">
                </span>
                <p class="banner-title">{{audience_model[audience].title}}</p>
                <p class="banner-description">{{audience_model[audience].description}}</p>
            </div>
        </div>

        <div class="row" style="margin-left: 0; margin-right: 0; width: 100%">
            <div class="audience-toolbar">
                <p @click="$router.replace('/audience/' + item.name)" v-for="item in audience_model"
                   :class="['toolbar-option', {'selected': item.title === audience_model[audience].title}]">
                    {{item.title}}</p>
            </div>
        </div>

        <div class="platform-feature-container">
            <h2>{{features[audience].title}}</h2>
            <h4>{{features[audience].description}}</h4>

            <div class="row"
                 style="width: 100%; margin-top: 48px; max-width: 1370px; margin-left: auto; margin-right: auto">

                <div v-for="feature in features[audience].cards"
                     class="platform-feature-card col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <span>
                        <img :src="require('./icons/' + feature.icon)" :alt="feature.icon">
                    </span>
                    <div>
                        <h5>{{feature.title}}</h5>
                        <p>{{feature.description}}</p>
                    </div>

                </div>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "_id",
        data() {
            return {

                audience: this.$route.params.id,
                audience_model: {
                    students: {
                        title: 'دانشجویان',
                        description: 'برای دانشجویان با ایده‌های ناب و بودجه محدود',
                        icon: 'students.svg',
                        name: 'students'
                    },
                    startups: {
                        title: 'استارتاپ‌ها',
                        description: 'سکویی برای توسعه، مدیریت و مقیاس‌پذیری پروژه‌های شما',
                        icon: 'startups.svg',
                        name: 'startups'
                    },
                    innovators: {
                        title: 'نوآوران',
                        description: 'ایده خود را به سرعت تبدیل به محصول کنید و در اختیار میلیون‌ها کاربر بگذارید',
                        icon: 'innovators.svg',
                        name: 'innovators'
                    },
                    teams: {
                        title: 'تیم‌ها',
                        description: 'سهولت در توسعه و سادگی در مدیریت',
                        icon: 'teams.svg',
                        name: 'teams'
                    },
                    companies: {
                        title: 'شرکت‌ها',
                        description: 'راه‌حل‌های Enterprise در برابر هزینه‌های پایین و مزایای بی‌شمار',
                        icon: 'developers.svg',
                        name: 'companies'
                    },
                    freelancers: {
                        title: 'Freelancers',
                        description: 'برای Freelancer هایی که نیاز به میزبانی یکپارچه و تطبیق‌پذیر دارند',
                        icon: 'freelancers.svg',
                        name: 'freelancers'
                    },
                    developers: {
                        title: 'برنامه‌نویسان',
                        description: 'هزینه کم، قابلیت‌های نامحدود و هزینه پایین',
                        icon: 'developers.svg',
                        name: 'developers'
                    },
                },
                features: {

                    students: {
                        title: 'سکوی ابری فندق چه ویژگی‌هایی را به شما پیشنهاد می‌دهد؟',
                        description:'برای آنکه بدانید در صورت استفاده از زیرساخت ابری فندق چه امتیازاتی را بدست ‌می‌آورید، ما برای شما بارزترین ‌آن‌ها را لیست کرده‌ایم تا یک بینش از پیش آماده نسبت به آینده سرویس‌ها داشته باشید.',
                        cards: [
                            {
                                title: 'ساخت و استقرار آسان',
                                description: 'به راحتی سرویس‌های خود را بدون نیاز به دانش پیچیده ابری ظرف مدت کمتر از ۱ دقیقه بر روی سکوی ابری مستقر کنید.',
                                icon: 'source_deployment_icon.svg'
                            },
                            {
                                title: 'گستره زبان متنوع',
                                description: 'از زبان‌های پشتیبانی‌ شده سکوی ابری فندی استفاده کنید تا به صورت مستقیم پروژه‌های خود را به صورت کاملا داکرایز شده بر روی سکو مستقر کنید.',
                                icon: 'code.png'
                            },
                            {
                                title: 'گستره فریم‌ورک متنوع',
                                description: 'هر زبان برنامه‌نویسی فریم‌ورک‌های متنوعی دارد. ما هم در فندق این فریم‌ورک‌ها را به صورت شخصی‌سازی شده در اختیار شما قرار داده‌ایم تا برای راحتی کار و سرعت بخشیدن به روند توسعه از آن‌ها استفاده کنید.',
                                icon: 'framework_icon.svg'
                            },
                            {
                                title: 'پشتیبانی حرفه‌ای',
                                description: 'چه کاربر رایگان باشید و چه یک شرکت بزرگ چند هزار نفری فرقی ندارد، ما برای پشتیبانی شما از بهترین افراد و توسعه‌دهندگان سکوی ابری فندق کمک می‌گیریم تا بهترین تجربه را از پشتیبانی داشته باشید.',
                                icon: 'technical-support.svg'
                            },
                            {
                                title: 'مدیریت آسان',
                                description: 'به راحتی عملیات DevOps را بر روی سکو با رویکردی ساده شده و جدید تجربه کنید و مطمئن باشید تمام پیچیدگی‌ها را ما برای شما مدیریت می‌کنیم.',
                                icon: 'operation_tools.svg'
                            },
                            {
                                title: 'ساخت سرویس رایگان',
                                description: 'به صورت رایگان و بدون پرداخت هزینه منابع آزمایشی خود را دریافت کنید و ایده‌های خود را به صورت سرویس بر روی سکو مستقر کنید.',
                                icon: 'ic-service.svg'
                            },
                        ]
                    }
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .row
        margin-left 0
        margin-right 0

    .audience-header
        width 100%
        height max-content
        padding-top 60px
        background-size 60%
        background url("../../assets/svg/pod_bg.svg") no-repeat top center

    .audience-bg
        width 100%
        height auto
        padding-top 60px
        display flex
        flex-direction column
        -webkit-backdrop-filter: blur(3.5px);
        backdrop-filter: blur(3.5px);
        background-image: linear-gradient(to bottom, rgba(0, 69, 255, 0.75), #0135c0 74%, #0230aa);

        span
            width 200px
            height 200px
            border-radius 50%
            background #fefefe
            display flex
            margin-left auto
            margin-right auto
            @media only screen and (max-width 992px)
                width 125px
                height 125px

            img
                width 123px
                height 123px
                margin auto
                @media only screen and (max-width 992px)
                    width 80px
                    height 80px


        p.banner-title
            font-family iran-yekan
            font-size 3em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.24
            margin-top 32px
            letter-spacing normal
            text-align center
            margin-bottom 0
            color #f8f8f8
            @media only screen and (max-width 992px)
                font-size 2.4em

        p.banner-description
            font-family iran-yekan
            font-size 2em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.71
            margin-top 16px
            padding-right 20%
            padding-left 20%
            letter-spacing normal
            text-align center
            margin-bottom 48px
            color #dedede
            @media only screen and (max-width 992px)
                font-size 1.3em
                padding-left 16px
                padding-right 16px


    .audience-toolbar
        width 100%
        height 65px
        background-color #080295
        display flex
        flex-direction row
        padding-left 16px
        justify-content center
        padding-right 16px
        position sticky
        @media only screen and (max-width 992px)
            white-space nowrap
            flex-direction row
            justify-content unset
            overflow-x scroll
            overflow-y hidden

        p.toolbar-option
            font-family: iran-yekan;
            font-size: 1.3em;
            font-weight normal
            font-style: normal
            font-stretch: normal;
            line-height: 1.73;
            width unset
            letter-spacing: normal;
            text-align: center;
            color: #9c9c9c;
            margin auto 12px
            cursor pointer

            &.selected
                font-size 1.4em
                color #fefefe


    .platform-feature-container
        background #fefefe
        width 100%

        h2
            font-family iran-yekan
            font-size 2.4em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.73
            letter-spacing normal
            text-align center
            color #3c3c3c
            margin-top 48px
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

    .platform-feature-card
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
                filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)

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
