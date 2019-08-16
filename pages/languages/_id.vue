<template>
    <div style="width: 100%; background: #F4F6FF">

        <div class="parallax-container">
            <div class="lang-detail-parent-container">
            </div>
        </div>
        <div class="lang-logo-container">
            <p>< Java ></p>
            <div>
                <div>
                    <img src="../../assets/svg/services/language/java_lang.svg" alt="java"/>
                </div>

            </div>
        </div>

        <p class="lang-detail-desc-title">{{lang_detail_slogan}}</p>

        <div class="row features-box">
            <div v-for="item in features" class="feature-card col-lg-5 col-md-5 col-sm-12 col-xs-12 container-fluid">
                <img :src="require('../../assets/svg/services/managed/' + item.icon + '.svg' )" :alt="item.icon">
                <div>
                    <p class="feature-card-title">{{item.title}}</p>
                    <p class="feature-card-description">{{item.description}}</p>
                </div>
            </div>
        </div>


        <div style="width: 100%; display: flex; background: #0045ff; padding: 16px">
            <div class="row lang-detail-media-container">

                <div class="col-lg-3 col-md-3 col-xs-12 col-md-12 lang-menu-container">

                    <p class="menu-title">آموزش مرحله به مرحله</p>

                    <div v-for="(menu, index) in language_menu" class="lang-menu-item"
                         :class="[menu.selected ? 'selected' : '']"
                         @click="menuItemSelected(index)">
                        <p class="menu-item-number">{{index + 1}}</p>
                        <p class="menu-item-title">{{menu.title}}</p>
                    </div>

                    <button class="menu-button">ثبت‌نام</button>
                </div>

                <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">

                    <vue-plyr class="tut_player" :key="menu_item.video"
                              :options="{controls: ['play-large', 'play', 'progress', 'mute', 'volume' ,'current-time','fullscreen', 'download']}">
                        <video style="width: 100%">
                            <source style="width: 100%" :src="require('../../assets/media/' + menu_item.video + '.mp4')"
                                    type="video/mp4"/>
                        </video>
                    </vue-plyr>

                </div>

            </div>

        </div>

        <div class="lang-detail-desc-container row">
            <p>چرا پروژه جاوایی خود را روی سکوی ابری فندق مستقر کنید</p>
            <div v-for="item in java_lang_features"
                 class="col-lg-5 col-md-5 col-sm-12 col-xs-12 lang-detail-spec-card container-fluid">
                <img :src="require('../../assets/svg/' + item.icon + '.svg' )" :alt="item.icon">
                <div>
                    <p class="lang-detail-spec-card-title">{{item.title}}</p>
                    <p class="lang-detail-spec-card-description">{{item.description}}</p>
                </div>
            </div>

        </div>

        <div class="framework-container row">
            <p class="framework-title">فریم‌ورک‌های پشتیبانی شده</p>

            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 feature-sec-menu">
                <div @click="frameworkItemSelected(index)" v-for="(item, index) in frameworks" :style=""
                     :class="[item.selected ? 'feature-selected' : 'feature-unselected']">{{item.title}}
                </div>
            </div>

            <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 feature-sec-card">

                <img :src="require('../../assets/svg/frameworks/' + framework.image + '.svg')"
                     :alt="framework.image"
                     class="col-2"/>
                <div class="col-10 card-container">
                    <p class="card-title">{{framework.title}}</p>
                    <p class="card-description">{{framework.description}}</p>
                </div>

            </div>

        </div>


    </div>

</template>

<script>
    export default {
        name: "_id",
        layout: 'default',
        data() {
            return {
                lang_detail_slogan: 'دنیای بی‌کران جاوا بر روی سکوی ابری فندق',
                menu_item: {
                    title: 'init کردن پروژه',
                    selected: true,
                    video: 'sample'
                },
                framework: {
                    title: 'Spring Boot',
                    description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                    image: 'spring_boot_framework',
                },
                frameworks: [
                    {
                        title: 'Spring Boot',
                        selected: true,
                        card: {
                            title: 'Spring Boot',
                            description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                            image: 'spring_boot_framework',
                        }
                    },
                    {
                        title: 'Hibernate',
                        selected: false,
                        card: {
                            title: 'Hibernate',
                            description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                            image: 'spring_boot_framework',
                        }
                    },
                    {
                        title: 'Tomcat',
                        selected: false,
                        card: {
                            title: 'Tomcat',
                            description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                            image: 'spring_boot_framework',
                        }
                    },


                ],
                features: [
                    {
                        title: 'پشتیبانی کامل از زبان‌ها',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        icon: 'managed_service_mysql'
                    },
                    {
                        title: 'آزادی انتخاب فریم‌ورک',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        icon: 'managed_service_mysql'
                    }, {
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
                language_menu: [
                    {
                        title: 'init کردن پروژه',
                        selected: true,
                        video: 'sample'
                    },
                    {
                        title: 'انتخاب context',
                        selected: false,
                        video: 'sample'
                    },
                    {
                        title: 'انتخاب Build Tools',
                        selected: false,
                        video: 'sample'
                    },
                    {
                        title: 'Deploy کردن پروژه',
                        selected: false,
                        video: 'sample'
                    }
                ],
                java_lang_features: [
                    {
                        title: 'راحتی اتخاب فریم‌ورک',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        icon: 'framework_icon'
                    },
                    {
                        title: 'مقیاس‌پذیری آسان',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        icon: 'scale_icon'
                    },
                    {
                        title: 'اجرای مستقیم',
                        description: 'در کمترین زمان و با اتکا به پشتیبانی حرفه‌ای فندق، بدون نیاز به دانش داکر پروژه خود را به راحتی بر روی بستر ابری مستقر کنید و از مزایای معماری ابری بهره‌مند شوید.',
                        icon: 'source_deployment_icon'
                    },
                ]
            }
        },
        methods: {
            menuItemSelected(index) {
                this.language_menu.forEach(menu => {
                    menu.selected = false
                });
                this.language_menu[index].selected = true;
                this.menu_item = this.language_menu[index];
            },
            frameworkItemSelected(index) {
                this.frameworks.forEach(framework => {
                    framework.selected = false
                });

                this.frameworks[index].selected = true
                this.framework = this.frameworks[index].card
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

        div
            background url("../../assets/svg/java_bg.svg") no-repeat top
            background-size 60%
            background-attachment: fixed
            width 100%
            height 100%
            @media only screen and (max-width 1230px)
                background-size 100%

    .lang-logo-container
        width 100%
        display flex
        flex-direction column
        margin-top -241px
        @media only screen and (max-width 1230px)
            margin-top: -191px

        p
            font-family: 'Helvetica Neue';
            font-size: 4em;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.24;
            letter-spacing: normal;
            text-align: center;
            color: #f8f8f8;
            @media only screen and (max-width 1230px)
                font-size 3em

        div
            width: 320px
            height 320px
            background-color #F4F6FF
            border-radius 100%
            display flex
            margin-left auto
            margin-right auto
            margin-top 16px
            @media only screen and (max-width 1230px)
                width: 250px
                height 250px

            div
                width: 300px
                height 300px
                border-radius 100%
                display flex
                margin auto
                box-shadow: 0 0 31px 0 rgba(0, 69, 255, 0.5);
                background-image: linear-gradient(to bottom, #0045ff, #002380)
                @media only screen and (max-width 1230px)
                    width: 230px
                    height 230px

                img
                    width 100%
                    height 100%
                    padding 64px
                    size 100%

    .lang-detail-desc-title
        font-family: iran-yekan;
        font-size: 2.3em
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.72;
        letter-spacing: normal;
        text-align: center;
        color: #0045ff;
        margin-top 32px
        @media only screen and (max-width 1230px)
            font-size 1.7em


    .features-box
        width 100%
        padding 48px 16px

    .feature-card
        width 100%
        display flex
        padding-left 16px
        padding-right 16px
        margin-bottom 16px

        img
            margin-top 0
            height max-content
            @media only screen and (max-width 992px)
                width 58px

        div
            width 100%
            flex 1
            padding-left 16px
            padding-right 16px

            p.feature-card-title
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

            p.feature-card-description
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

    .lang-detail-media-container
        width 100%
        padding 24px 16px
        border-radius: 5px;
        box-shadow: 0 0 44px 0 rgba(0, 0, 0, 0.51);
        background-color: #080295;
        display flex

        div.lang-menu-container
            width 100%;
            display flex
            height available
            flex-direction column

            p.menu-title
                font-family: iran-yekan;
                font-size: 1.6em
                font-weight: bold;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.71;
                width 100%
                letter-spacing: normal;
                text-align: center;
                color: #fafafa;
                margin-bottom 32px

            button.menu-button
                border-radius: 5px;
                background-color: #0045ff;
                margin-left 16px
                margin-right 16px
                height 40px
                font-family: iran-yekan;
                font-size: 1.2em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 40px
                letter-spacing: normal;
                text-align: center;
                color: #fafafa;
                margin-bottom 16px
                outline none

    .lang-menu-item
        display flex
        width 100%
        height max-content
        flex-direction row
        cursor pointer
        margin-left 16px
        margin-right 16px

        p.menu-item-number
            font-family iran-sans
            font-size: 1.2em;
            width 40px
            height 40px
            border: solid 2px #8c8c8c;
            border-radius 100%
            text-align center
            line-height 40px
            color #8c8c8c
            transition all .2s ease-in-out

        p.menu-item-title
            padding-left 16px
            height available
            padding-right 16px
            font-family: iran-yekan;
            font-size: 1.2em;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height 40px
            letter-spacing: normal;
            text-align: right;
            color: #8c8c8c;
            transition all .2s ease-in-out


        &.selected
            p.menu-item-number
                width 40px
                height 40px
                font-family iran-sans
                font-size: 1.2em;
                background #fafafa
                border-radius 100%
                color #080295
                border none
                text-align center
                line-height 40px
                font-weight bold
                transition all .2s ease-in-out

            p.menu-item-title
                padding-left 16px
                height available
                padding-right 16px
                font-family: iran-yekan;
                font-size: 1.2em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height 40px
                letter-spacing: normal;
                text-align: right;
                color: #fafafa;
                transition all .2s ease-in-out

    .lang-detail-desc-container
        width 100%
        padding 32px
        background #225eff

        p
            font-family: iran-yekan;
            font-size: 2.2em
            font-weight: bold;
            width 100%
            font-style: normal;
            font-stretch: normal;
            line-height: 1.72;
            letter-spacing: normal;
            text-align: center;
            color: #fafafa;
            margin-bottom 64px
            @media only screen and (max-width: 992px)
                font-size 1.6em

    .lang-detail-spec-card
        width 100%
        display flex
        padding-left 16px
        padding-right 16px
        margin-bottom 32px

        img
            margin-top 0
            height max-content
            @media only screen and (max-width 992px)
                width 58px

        div
            width 100%
            flex 1
            padding-left 16px
            padding-right 16px

            p.lang-detail-spec-card-title
                font-family iran-yekan
                font-size 1.4em
                font-weight bold
                font-style normal
                font-stretch normal
                line-height 1.71
                letter-spacing normal
                text-align right
                color #fafafa
                margin-bottom 8px
                @media only screen and (max-width 992px)
                    font-size 1.2em

            p.lang-detail-spec-card-description
                font-family iran-yekan
                font-size 1.2em
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.75
                letter-spacing normal
                text-align right
                color #f8faff
                margin-bottom 12px
                @media only screen and (max-width 992px)
                    font-size 1em

    .framework-container
        width 100%
        background #fefefe
        padding 16px
        height max-content
        padding-bottom 64px

        p.framework-title
            font-family: iran-yekan;
            font-size: 2.2em
            font-weight: bold;
            font-style: normal;
            width 100%
            font-stretch: normal;
            line-height: 1.72;
            letter-spacing: normal;
            text-align: center;
            margin-top 32px
            color: #0045ff;
            margin-bottom 100px
            @media only screen and (max-width: 992px)
                font-size 1.6em


    .feature-sec-menu
        display flex
        flex-direction column
        padding-right 32px
        position sticky
        top 100px
        height max-content

        div.feature-selected
            cursor pointer
            height 40px
            line-height 40px
            font-size 1.2em
            font-family iran-yekan
            color #0045ff
            display flex
            width unset
            border-right 2px solid #0045ff
            text-align center
            padding-right 12px
            font-weight bold

        div.feature-unselected
            cursor pointer
            height 40px
            line-height 40px
            font-size 1.2em
            font-family iran-yekan
            color #8c8c8c
            width unset
            display flex
            border-right 2px solid #A7A7A7
            text-align center
            padding-right 12px
            font-weight normal

        @media only screen and (max-width: 1230px)
            flex-direction row
            top 16px
            display flex
            overflow-x: auto
            overflow-y hidden
            border-radius 25px
            height max-content
            padding-right 0
            scrollbar-width: none
            scrollbar-height: none
            background-color #0045ff
            white-space nowrap
            margin-bottom 16px
            box-shadow 0 0 6px 0 rgba(0, 69, 255, 0.4)
            div.feature-selected
                border none
                color #fefefe
                width max-content
                font-size .9em
                text-align right
                padding-left 12px

            div.feature-unselected
                border none
                color #e3e6ef
                font-size .9em
                width max-content
                padding-left 12px
                text-align right


    .feature-sec-card
        box-sizing padding-box
        padding 16px
        display flex
        height max-content

        img
            margin-top 0
            top 0
            height max-content
            @media only screen and (max-width: 1230px)
                width 64px
                margin-bottom auto
                margin-top: -5px
                height max-content

        div.card-container
            width 100%
            display flex
            flex-direction column
            padding-right 12px

            p.card-title
                font-family 'Helvetica Neue'
                font-size 1.8em
                font-weight bold
                font-style normal
                font-stretch normal
                line-height 1.25
                letter-spacing normal
                text-align right
                color #0045ff
                margin-bottom 6px
                @media only screen and (max-width: 1230px)
                    font-size 1.2em

            div.card-divider
                height 0
                border solid 1px #d4d4d4
                margin-left 30%
                margin-bottom 5px
                @media only screen and (max-width: 1230px)
                    margin-left 15%

            p.card-subtitle
                font-family 'Helvetica Neue'
                font-size 1.2em
                font-weight bold
                font-style normal
                font-stretch normal
                line-height 1.25
                letter-spacing normal
                text-align right
                color #7c7c7c
                margin-bottom 6px
                @media only screen and (max-width: 1230px)
                    font-size 1em


            p.card-description
                font-family iran-yekan
                font-size 1.1em
                margin-top 12px
                font-weight normal
                font-style normal
                font-stretch normal
                line-height 1.75
                letter-spacing normal
                text-align right
                color #3c3c3c
                margin-bottom 8px

            @media only screen and (max-width: 1230px)
                margin-top 12px


</style>

<style lang="stylus">

    .tut_player
        .plyr
            border-radius 0 0 5px 5px !important
            width 100% !important
            @media only screen and (max-width: 992px) {
                border-radius 0 !important
            }


    .plyr--video .plyr__control.plyr__tab-focus, .plyr--video .plyr__control:hover, .plyr--video .plyr__control[aria-expanded=true] {
        background: transparent !important;
        color: #fff;
        outline none !important
    }

    .plyr--full-ui input[type=range] {
        border-radius: 25px !important;
        color: rgba(255, 255, 255, 0.99) !important;
        @media only screen and (max-width: 992px) {
            border-radius 0 !important
        }

    }

    .plyr--video .plyr__controls {
        background: rgba(0, 69, 255, 0.7) !important;
        bottom: 0;
        color: #fff;
        left: 0;
        padding: 5px !important;
        position: absolute;
        margin 12px !important
        border-radius 25px !important
        right: 0;
        outline none !important
        transition: opacity .4s ease-in-out, -webkit-transform .4s ease-in-out;
        transition: opacity .4s ease-in-out, transform .4s ease-in-out;
        transition: opacity .4s ease-in-out, transform .4s ease-in-out, -webkit-transform .4s ease-in-out;
        z-index: 3;
    }

    .plyr__controls > .plyr__control:first-child, .plyr__controls > .plyr__control:first-child + [data-plyr=pause] {
        margin-left: 0;
        margin-right: 0 !important;
    }

    .plyr__progress__container
        width available !important
        flex 1 !important


    .plyr--full-ui.plyr--video .plyr__control--overlaid
        display: block;
        background: rgba(0, 69, 255, 0.7) !important;
        border-radius: 5px !important;
        padding 24px !important

</style>
