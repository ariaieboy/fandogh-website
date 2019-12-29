<template>
    <div style="background-image: linear-gradient(to bottom, #0045ff, #002380); min-height: 1000px; padding-bottom: 100px">
        <div class="register-container row">
            <div class="register-header-container">


                <div class="register-logo">
                    <img src="../../assets/svg/ic-fandogh-mini.svg" :alt="'fandogh'">
                    <p>سکوی ابری فندق</p>
                </div>

                <div class="register-login-container">
                    <p class="reg-log-desc">اگر حساب کاربری دارید</p>
                    <p @click="$router.replace('/user/login')" class="reg-log-button">وارد شوید</p>

                </div>

            </div>

            <div class="register-title-container">
                <p>
                    همین حالا ثبت‌نام کنید و مدیریت زیرساخت خود را برای همیشه به سکوی ابری فندق بسپارید
                </p>
            </div>

            <vregister>

            </vregister>
        </div>
    </div>
</template>

<script>
    import Vregister from "../../components/Auth/vregister";

    export default {
        components: {
            Vregister
        },
        mounted() {
            this.$store.dispatch('logout')
        }
    }
</script>

<style lang="stylus" scoped>

    .row
        margin-left 0
        margin-right 0

    .register-header-container
        width: 100%;
        padding-right: 10%;
        padding-left: 10%;
        display: flex;
        margin-top: 64px;
        height: max-content
        @media only screen and (max-width 992px)
            flex-direction column
            margin-top 32px

    .register-container
        width: 100%;
        height: 100%;
        max-width 1750px
        margin-right auto
        margin-left auto
        display flex
        flex-direction column
        min-height: 1000px;

    .register-logo
        width max-content
        display flex
        height max-content
        padding 16px
        @media only screen and (max-width 992px)
            flex-direction column
            width 100%

        img
            width 64px
            height 64px
            margin-left auto
            margin-right auto
            @media only screen and (max-width 992px)
                width 48px
                width 48px

        p
            font-family: iran-yekan
            font-size: 2em
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.7;
            letter-spacing: normal;
            margin-top auto
            margin-right 12px
            margin-left 12px
            text-align: center;
            margin-bottom auto
            color: #f8f8f8;
            @media only screen and (max-width 992px)
                font-size 1.5em

        @media only screen and (max-width 992px)
            margin-top 32px

            img
                width 48px
                height 48px

            p
                font-size 1.7em


    .register-login-container
        display: flex
        height: max-content
        margin-top auto
        margin-bottom auto
        margin-right auto
        @media only screen and (max-width 992px)
            width 100%
            justify-content center

        p.reg-log-desc
            font-family: iran-yekan
            font-size: 1.2em
            font-weight: normal
            font-style: normal
            font-stretch: normal
            line-height: 1.75
            letter-spacing: normal
            margin-top auto
            margin-bottom auto
            text-align right
            color #fefefe

        p.reg-log-button
            font-family iran-yekan
            font-size: 1.2em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height: 1.75
            margin-bottom 0
            letter-spacing normal
            text-align center
            border-radius 5px
            padding 5px 10px
            margin-right 12px
            cursor pointer
            background-color #080295
            color #fefefe

    .register-title-container
        width 100%
        height max-content
        margin-top 48px
        margin-bottom 16px
        display flex

        p
            font-family: iran-yekan;
            width 100%
            font-size: 2em;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.71;
            padding-right 20%
            padding-left 20%
            letter-spacing: normal;
            text-align: center;
            color: #fefefe;
            @media only screen and (max-width 992px)
                font-size 1.4em
                padding-right 16px
                padding-left 16px


</style>
