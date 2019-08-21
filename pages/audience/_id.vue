<template>
    <div class="row" style="background: #F8FAFF;">

        <div class="row audience-header">
            <div class="audience-bg">
                <span>
                    <img :src="require('../../assets/svg/targets/' + audience_model[audience].icon)" :alt="audience_model[audience].icon">
                </span>
                <p class="banner-title">{{audience_model[audience].title}}</p>
                <p class="banner-description">{{audience_model[audience].description}}</p>
            </div>
        </div>

        <div class="audience-toolbar">

        </div>

    </div>

</template>

<script>
    export default {
        name: "_id",
        data(){
            return{

                audience: this.$route.params.id,
                audience_model:{
                    students: {
                        title: 'دانشجویان',
                        description: 'برای دانشجویان با ایده‌های ناب و بودجه محدود',
                        icon: 'students.svg'
                    },
                    startups: {
                        title: 'استارتاپ‌ها',
                        description: 'سکویی برای توسعه، مدیریت و مقیاس‌پذیری پروژه‌های شما',
                        icon: 'startups.svg'
                    },
                    innovators: {
                        title: 'نوآوران',
                        description: 'ایده خود را به سرعت تبدیل به محصول کنید و در اختیار میلیون‌ها کاربر بگذارید',
                        icon: 'innovators.svg'
                    },
                    teams: {
                        title: 'تیم‌ها',
                        description: 'سهولت در توسعه و سادگی در مدیریت',
                        icon: 'teams.svg'
                    },
                    companies: {
                        title: 'شرکت‌ها',
                        description: 'راه‌حل‌های Enterprise در برابر هزینه‌های پایین و مزایای بی‌شمار',
                        icon: 'developers.svg'
                    },
                    freelancers: {
                        title: 'Freelancers',
                        description: 'برای Freelancer هایی که نیاز به میزبانی یکپارچه و تطبیق‌پذیر دارند',
                        icon: 'freelancers.svg'
                    },
                    developers: {
                        title: 'برنامه‌نویسان',
                        description: 'هزینه کم، قابلیت‌های نامحدود و هزینه پایین',
                        icon: 'developers.svg'
                    },
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

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
            img
                width 150px
                height 150px
                margin auto


        p.banner-title
            font-family iran-yekan
            font-size 3.5em
            font-weight normal
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


    .audience-toolbar
        width 100%
        height 55px
        background-color #080295
        display flex
        overflow-x scroll
        overflow-y hidden
        justify-content center

</style>
