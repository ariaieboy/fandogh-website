<template>
    <div class="row" style="width: 100%; display: flex; flex-direction: column">

        <div class="login-logo">
            <img src="../../assets/svg/ic-fandogh-mini.svg" :alt="'fandogh'">
            <p>سکوی ابری فندق</p>
        </div>

        <div v-if="message" style="width: 100%; display: flex; flex-direction: column; margin-top: 48px; border-radius: 5px;
        padding: 16px; margin-right: auto; margin-left: auto; max-width: 450px;outline: none;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16); background-color: #ebefff;">

            <p style="font-family: iran-yekan; font-size: 1.4em; color: #333333; text-align: center;">{{message}}</p>
            <button @click="$router.replace('/')" style="width: 300px; height: 45px; color: #fefefe; background: #0045ff;
text-align: center; font-family: iran-yekan; font-size: 1.4em; border-radius: 5px; margin-left: auto; margin-right: auto; margin-top: 32px">
                باشه
            </button>
        </div>

        <div v-else class="login-dialog-box container-fluid">
            <p class="login-dialog-title">بازیابی گذرواژه</p>

            <v-text-field
                    ref="identifier"
                    style="font-family: iran-yekan;width: 100%; font-size: 1em; padding-left: 0; max-width: 375px; margin-left: auto; margin-right: auto;"
                    color="#0045ff"
                    type="text"
                    dir="rtl"
                    :rules="[rules.email_required]"
                    required
                    :prepend-inner-icon="'email'"
                    v-model="user.identifier"
                    :hint="identifier.hint"
                    :label="identifier.label">

            </v-text-field>

            <p class="forgot-error" v-html="error" v-if="error !== null"
               :style="{display: error === null ?  'none' : 'unset'}"></p>


            <button @click="recovery" class="login-dialog-button">تایید</button>


            <v-progress-linear
                    style="margin: 0; height: 5px;"
                    indeterminate
                    :active="loading"
                    color="rgba(0,255,255, 0.7) rgba(0,255,255, 1)"
            ></v-progress-linear>
            <div class="register-section">
                <div class="register-section-line"></div>
                <div class="register-section-container">
                    <span style="font-family: iran-yekan; font-size: 1.1em; font-weight: normal; font-style: normal; font-stretch: normal; line-height: 1.75; letter-spacing: normal; text-align: left; color: #707070;">
                        <span @click="$router.replace('/user/register')" style="cursor: pointer; color: #0045ff">ثبت‌نام کنید</span>
                        یا
                        <span @click="$router.replace('/user/login')"
                              style="cursor: pointer; color: #0045ff">وارد شوید</span>
                    </span>
                </div>
            </div>
        </div>

        <div class="bottom-info-container">

            <div class="info-line"></div>
            <div class="info-action-container">
                <a>حریم خصوصی</a>
                <a>شرایط استفاده</a>
            </div>
            <p class="ownership-right">© 2019 Fandogh PaaS</p>

        </div>
    </div>
</template>

<script>
    export default {
        name: "vForgotPassword",
        data() {
            return {
                rules: {
                    email_required: value => value !== '' || 'آدرس ایمیل را وارد نکرده‌اید'
                },
                loading: false,
                show_pass: false,
                error: null,
                message: null,
                user: {
                    identifier: ''
                },
                identifier: {
                    hint: 'آدرس ایمیلی که با آن ثبت‌نام کرده‌اید را وارد کنید',
                    label: 'آدرس ایمیل'
                }
            }
        },
        methods: {
            validateInput() {

                if (this.rules.email_required(this.user.identifier) !== true) {
                    this.$refs.identifier.focus();
                    return false
                } else {
                    return true
                }
            },
            recovery() {
                if (this.validateInput()) {
                    if (this.loading) return;
                    this.loading = true;
                    this.error = null;
                    this.$store.dispatch('recoveryAccount', this.user).then(response => {
                        this.loading = false
                        this.message = response.message
                    }).catch(e => {
                        this.loading = false
                        this.error = ErrorReporter(e, this.$data)
                    })
                }
            }
        },
        mounted() {
            this.$refs.identifier.focus()
        }
    }
</script>

<style lang="stylus" scoped>
    @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons")

    .row
        margin-left 0
        margin-right 0

    .container-fluid
        padding-left 0
        padding-right 0

    .login-logo
        width 100%
        display flex
        flex-direction column
        margin-top 60px
        padding 16px
        @media only screen and (max-width 992px)
            margin-top 32px

        img
            width 64px
            margin-left auto
            margin-right auto

        p
            font-family: iran-yekan
            font-size: 2.5em
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.7;
            letter-spacing: normal;
            text-align: center;
            margin-top 16px
            color: #f8f8f8;

        @media only screen and (max-width 992px)
            img
                width 48px

            p
                font-size 1.7em

    .login-dialog-box
        width 100%
        max-width 450px
        border-radius 5px
        box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.16)
        background-color #fefefe
        display flex
        flex-direction column
        @media only screen and (max-width 451px)
            border-radius 0

        p.login-dialog-title
            padding 24px 16px 40px 16px
            font-family: iran-yekan;
            font-size: 1.6em
            font-weight: bold
            font-style: normal
            font-stretch: normal
            line-height: 1.6em
            letter-spacing: normal
            text-align: center
            color: #fefefe
            background url("../../assets/svg/half-circle.svg") no-repeat top
            background-size contain

        button.login-dialog-button
            width 100%
            height 45px
            margin-top 48px
            margin-bottom 32px
            margin-left auto
            margin-right auto
            max-width 375px
            border-radius 5px
            background-color #0045ff
            font-family: iran-yekan
            font-size: 1.4em
            font-weight: normal
            font-style: normal
            font-stretch: normal
            line-height: 45px
            opacity 0.9
            letter-spacing: normal
            text-align: center
            color: #fafafa
            outline none

        button.login-dialog-button:hover
            opacity 1

    .register-section
        width 100%
        display flex
        flex-direction column
        background #ebefff
        border-bottom-left-radius 5px
        border-bottom-right-radius 5px
        @media only screen and (max-width 451px)
            border-radius 0

        div.register-section-line
            width 100%
            height 0
            border solid 1px #c4c2c2

        div.register-section-container
            padding 16px
            display flex
            justify-content center


    .bottom-info-container
        width 100%
        margin-top 80px
        display flex
        flex-direction column
        @media only screen and (max-width 451px)
            margin-top 16px

        div.info-line
            width 100%
            max-width 450px
            height: 1px;
            margin-left auto
            margin-right auto
            border-radius 25px
            background: -webkit-linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
            background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);

        div.info-action-container
            width: 100%;
            display: flex;
            max-width: 450px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 12px;
            justify-content: center

            a
                font-family: iran-yekan;
                font-size: .9em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                padding-left 8px
                padding-right 8px
                cursor pointer
                line-height: 1.79;
                letter-spacing: normal;
                text-align: center;
                color: #8d8d8d;
                transition all 0.2s ease-in-out

            a:hover
                color #00ffff
                transition all 0.2s ease-in-out

        p.ownership-right
            font-family: iran-yekan;
            font-size: 1em;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.79;
            letter-spacing: normal;
            text-align: center;
            color: #fefefe;
            direction: ltr
            max-width 450px
            margin-top 32px
            margin-right auto
            margin-left auto

    .forgot-error
        font-size 1.2em
        font-family iran-yekan
        width 100%
        padding-right 16px
        padding-left 16px
        text-align center
        margin-top 16px
        margin-bottom 16px
        color #fd3259

</style>
