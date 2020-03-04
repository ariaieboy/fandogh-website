<template>
    <div style="width: 100%;">
        <div class="slider-container">

            <div class="top-section">

                <div v-for="item in slider_data" class="row" style="height: 100%; margin-left: 0; margin-right: 0;display: flex">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 container-fluid fade slider-inner-container"
                         style="height: 100%; padding: 32px;max-width: 1700px; order: 0" :style="{display: item.selected? 'flex' : 'none'}">


                        <div class="slide-banner fade"
                             :style="{display: item.selected? 'flex' : 'none'}">
                            <img :src="require('../../../assets/svg/' + item.banner + '.svg')" :alt="item.banner">
                        </div>

                        <div class="slider-main">

                            <div class="main-title">{{item.title}}</div>

                            <div class="main-description">{{item.description}}</div>

                            <button @click="$router.push(item.button_link)" class="main-button">{{item.button_text}}</button>

                        </div>

                    </div>

                </div>
            </div>

            <div class="bullet-section">
                <img src="../../../assets/svg/bullet_bg.svg" width="100%" class="top-curve"/>
                <div class="main-slider-bullet-container">
                    <div v-for="(item, index) in slider_data" @click="bulletClicked(index)" class="main-slider-bullet"
                         :style="{backgroundColor: item.selected ? '#fefefe' : 'rgba(254, 254, 254, 0.4)'}">

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "slider",
        data() {
            return {

                intervalId: null,
                slider_data: [
                    {
                        title: "چرا سکوی ابری فندق؟",
                        description: 'سکوهای ابری مزایای خیلی بیشتری را در مقابل VPSها و Hostها در اختیار شما قرار می‌دهند و در عین حال از هزینه‌های شما هم می‌کاهند. سکوی ابری فندق به عنوان اولین سکوی ابری ایران ...',
                        button_text: "مطالعه بیشتر",
                        button_link: "/comparision",
                        banner: "question-mark",
                        selected: true
                    },
                    {
                        title: "سکوی ابری فندق چیست؟",
                        description: 'فندق اولین سکوی ابری عمومی ایران است که تکنولوژی زیرساختی PaaS را در قالبی کاملا ساده و با معماری مخصوص به خود پیاده سازی کرده و سعی بر آن دارد تا با کمک بهترین متخصصین و برنامه‌نویسان سرتاسر جهان به صنعت ابری و زیرساختی ایران کمک کند.',
                        button_text: "مطالعه بیشتر",
                        button_link: "/about-us",
                        banner: "banner_fandogh",
                        selected: false
                    },
                    {
                        title: "برای هر زبانی راه حلی داریم…",
                        description: 'برای آنکه توسعه برای شما ساده‌تر شود، ما زبان‌های برنامه‌نویسی محبوب و پر استفاده را در قالب اجرای مستقیم کد با ساختاری منطبق با معماری ابری و پوشش گستره بزرگی از فریم‌ورک‌های محبوب فراهم آورده‌ایم. با این ویژگی دیگر نیاز نیست شما دانش داکر داشته باشید یا درگیر پیچیدگی‌های یادگیری تکنولوژی‌های جدید شوید، در عوض شما می‌توانید تمام تمرکز و منابع خود را صرف توسعه پروژه‌هایتان کنید.',
                        button_text: "ثبت‌نام رایگان",
                        button_link: '/user/register',
                        banner: "banner_one",
                        selected: false
                    }
                ],

            }
        },
        created() {

            this.todo()

        },
        mounted() {
        },
        methods: {

            bulletClicked(index) {
                this.slider_data.forEach(slide => {
                    slide.selected = false
                });

                this.slider_data[index].selected = true
            },
            todo: function () {
                this.intervalId = setInterval(() => {
                    let temp_index = 0
                    this.slider_data.forEach((slide, index) => {
                        if (slide.selected) {
                            temp_index = index
                        }
                        slide.selected = false
                    })

                    if (temp_index === this.slider_data.length - 1) {
                        this.slider_data[0].selected = true
                    } else {
                        this.slider_data[temp_index + 1].selected = true
                    }

                }, 10000);
            }

        },
        beforeDestroy() {
            clearInterval(this.intervalId)
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"

    .slider-container
        width 100%
        padding-top 60px
        height max-content

        div.top-section
            width 100%
            min-height 450px
            background white

        div.bullet-section
            width 100%
            height auto

    .main-slider-bullet-container
        width 100%
        display flex
        margin-top -24px
        justify-content center

    .main-slider-bullet
        width 10px
        height 10px
        border-radius 25px
        margin 4px
        transition background-color .5s ease-in-out


    .slider-inner-container
        flex-direction row
        @media only screen and (max-width: 1050px)
            flex-direction column

    .slide-banner
        height 100%
        padding 32px
        flex 50%
        img
            max-width 100%
            margin-right auto
            margin-left 10%
            @media only screen and (max-width: 1050px)
                margin-right auto
                margin-left auto

    .slider-main
        width 100%
        max-width 800px
        display flex
        flex-direction column
        margin-top auto
        margin-bottom auto
        padding-left 10%
        padding-right 5%
        flex 50%
        @media only screen and (max-width: 1050px)
            margin-top 48px
            padding-right 16px
            padding-left 16px

        div.main-title
            width: 100%
            font-size: 1.8em
            font-family: iran-yekan
            font-weight: bold
            color: #0045ff

            @media only screen and (max-width: 1050px)
                text-align center
                font-weight normal
                font-size 1.6em

        div.main-description
            margin-top 32px
            font-family iran-yekan
            font-size 1.3em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.72
            letter-spacing normal
            text-align right
            color #1d1d1d
            @media only screen and (max-width: 1050px)
                text-align center
            @media only screen and (max-width: 992px)
                font-size 1em

        button.main-button
            outline none
            margin-left auto
            margin-top 48px
            width 200px
            height 45px
            border-radius 5px
            box-shadow 0 0 6px 0 rgba(0, 69, 255, 0.4)
            border solid 1px #0045ff
            background-color #0045ff
            color #fefefe
            font-family iran-yekan
            font-size 1.2em
            @media only screen and (max-width: 992px)
                font-size .9em
                margin-left auto
                margin-right auto


    .top-curve
        background url('~/assets/svg/bullet_bg.svg')
        background-size cover
        height 100%
        width 100%

    .fade
        -webkit-animation-name: fade;
        -webkit-animation-duration: .5s;
        animation-name: fade;
        animation-duration: .5s;


    @-webkit-keyframes fade
        from {
            left: .4
        }
        to {
            opacity: 1
        }


    @keyframes fade
        from {
            opacity: .4
        }
        to {
            opacity: 1
        }


</style>
