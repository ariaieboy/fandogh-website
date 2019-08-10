<template>
    <div style="width: 100%;">
        <div class="slider-container">

            <div class="top-section">

                <div v-for="item in slider_data" class="row" style="height: 100%; margin-left: 0; margin-right: 0;display: flex">

                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 container-fluid fade"
                         style="height: 100%; padding: 32px;max-width: 1700px;" :style="{display: item.selected? 'block' : 'none'}">

                        <div class="slider-main">

                            <div class="main-title">{{item.title}}</div>

                            <div class="main-description">{{item.description}}</div>

                            <button class="main-button">{{item.button_text}}</button>

                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-10 col-xs-10 container-fluid slide-banner fade"
                         :style="{display: item.selected? 'flex' : 'none'}">
                        <img src="../../../assets/svg/banner_one.svg">
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
                        title: "برای هر زبانی راه حلی داریم…",
                        description: "فندق یه PaaS است که به شما این امکان رو میده که سرویس‌های خودتون رو بر روی سرورهای\n" +
                            "                            ابری\n" +
                            "                            مستقر کنید و نگران مدیریت سرورها و سرویس‌هایی که نیاز دارید نباشید.",
                        button_text: "ثبت‌نام رایگان",
                        button_link: "",
                        banner: "../../../assets/svg/banner_one.svg",
                        selected: true
                    },
                    {
                        title: "برای هر زبانی راه حلی داریم…1",
                        description: "فندق یه PaaS است که به شما این امکان رو میده که سرویس‌های خودتون رو بر روی سرورهای\n" +
                            "                            ابری\n",
                        button_text: "ثبت‌نام رایگان",
                        button_link: "",
                        banner: "../../../assets/svg/banner_one.svg",
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

    .slide-banner
        height 100%
        padding 32px

        img
            max-width 100%

    .slider-main
        width 100%
        float left
        max-width 800px
        display flex
        flex-direction column
        margin-top 16px
        padding-right 20%
        @media only screen and (max-width: 992px)
            padding-right 16px
            padding-left 16px

        div.main-title
            width: 100%
            font-size: 1.8em
            font-family: iran-yekan
            font-weight: bold
            color: #0045ff
            @media only screen and (max-width: 992px)
                font-size 1.5em

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
