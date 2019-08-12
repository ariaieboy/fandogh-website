<template>
    <div class="row" style="width: 100%; display: flex; flex-direction: column">

        <div class="login-logo">
            <img src="../../assets/svg/ic-fandogh-mini.svg" :alt="'fandogh'">
            <p>سکوی ابری فندق</p>
        </div>


        <div class="login-dialog-box container-fluid">
            <p class="login-dialog-title">ورود به حساب کاربری</p>


            <v-text-field
                    ref="username"
                    style="font-family: iran-yekan !important;width: 375px !important; font-size: 1em !important; padding-left: 0 !important; margin-left: auto !important; margin-right: auto !important;"
                    color="#0045ff"
                    type="text"
                    dir="rtl"
                    :prepend-inner-icon="'person'"
                    v-model="user.username"
                    :hint="username.hint"
                    :label="username.label">

            </v-text-field>

            <v-text-field
                    ref="password"
                    style="font-family: iran-yekan !important;width: 375px !important; font-size: 1em !important; padding-left: 0 !important; margin-left: auto !important; margin-right: auto !important;"
                    color="#0045ff"
                    type="text"
                    dir="rtl"
                    :type="show_pass ? 'text' : 'password'"
                    browser-autocomplete="new-password"
                    :prepend-inner-icon="'lock'"
                    :append-icon="show_pass ? 'visibility_off' : 'visibility'"
                    v-model="user.password"
                    :hint="password.hint"
                    @click:append="show_pass = !show_pass"
                    :label="password.label">

            </v-text-field>

            <p class="recovery-error" v-html="error" v-if="error !== null"
               :style="{display: error === null ?  'none' : 'unset'}"></p>

            <button @click="login" class="login-dialog-button">ورود</button>


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
                        از اینجا
                        <span @click="$router.replace('/user/register')"
                              style="cursor: pointer; color: #0045ff">ثبت‌نام</span>
                        کنید
                    </span>
                </div>
            </div>
        </div>

        <p @click="$router.push('/user/forgot_password')" class="forgot-pass-button">فراموشی گذرواژه</p>

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
    import 'vuetify/dist/vuetify.min.css';


    export default {
        name: "vlogin",
        data() {
            return {
                loading: false,
                show_pass: false,
                error: null,
                user: {
                    username: '',
                    password: ''
                },
                username: {
                    hint: 'نام کاربری را وارد نمایید',
                    label: 'نام کاربری'
                },
                password: {
                    hint: 'گذرواژه را وارد نمایید',
                    label: 'گذرواژه'
                }
            }
        },
        methods: {
            login(e) {

                if (this.user.username.length > 0 && this.user.password.length > 0) {
                    if (this.loading) return;
                    this.loading = true;
                    this.error = null;
                    this.$store.dispatch("login", {username: this.user.username, password: this.user.password})
                        .then(res => {
                            this.loading = false;
                            this.$router.replace("/dashboard/general");
                            this.$ga.event({
                                eventCategory: "account",
                                eventAction: "login"
                            });
                            this.$store.dispatch("TOGGLE_NAV", {data: 'halfSidebar', id: "sidebar"});

                        })
                        .catch(e => {
                            this.loading = false;
                            this.error = e;
                        });
                }
            }
        },
        mounted() {
            this.$refs.password.focus()
            this.$refs.username.focus()
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

    .forgot-pass-button
        font-family: iran-yekan;
        font-size: 1em
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.72;
        letter-spacing: normal;
        text-align: center;
        color: #fefefe;
        width 100%
        margin-top 32px
        padding-left 16px
        padding-right 16px
        cursor pointer

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

    .login-error
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

<style lang="stylus">
    .v-label {
        margin-right: 0 !important;
        align-self: start !important;
        right: auto !important;
        left: auto !important;
        background: #fefefe !important;
        width: fit-content !important;
        padding: 0 8px !important;
        float: right !important;
    }

    .v-text-field__slot
        align-items: end !important;
        height: 38px !important;


    .v-text-field
        input
            flex: 0 1 auto !important;
            line-height: 38px !important;
            height: 38px !important;
            max-height 38px !important
            padding: 5px 20px !important;
            text-align left !important
            cursor revert !important
            max-width: 100%;
            min-width: 0;
            width: 100%


    .v-label {
        vertical-align: middle !important;
    }

    /*.v-input--is-focused{*/
    /*left: auto !important;*/
    /*}*/

    .application--is-rtl .v-text-field .v-label {
        -webkit-transform-origin: none !important;
        transform-origin: none !important
    }

    .v-label {
        font-size: 16px;
        line-height: 1 !important;
        min-height: 8px;
        transition: .3s cubic-bezier(.25, .8, .5, 1)
    }

    .application--is-rtl .v-text-field .v-label {
        -webkit-transform-origin: top right;
        transform-origin: top right;
    }

    .application--is-rtl .v-text-field .v-counter {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .application--is-rtl .v-text-field--enclosed .v-input__append-outer {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }


    .v-text-field > .v-input__control > .v-input__slot:after, .v-text-field > .v-input__control > .v-input__slot:before
        bottom: -1px;
        content: "";
        position: absolute;
        transition: .3s cubic-bezier(.25, .8, .5, 1) !important;
        width: 100%


    .v-text-field .v-label {
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        top: 7px;
        -webkit-transform-origin: top right !important;
        transform-origin: top right !important;
        white-space: nowrap;
        margin-right 0 !important;
        pointer-events: none
    }

    .v-messages {
        flex: 1 1 auto;
        font-size: .7em !important;
        min-height: 12px;
        vertical-align middle !important;
        min-width: 1px;
        line-height 1 !important
        text-align right || center !important;
        position: relative
        margin-top -2px !important
    }

    .v-counter
        font-family iran-sans !important
        direction ltr !important
        margin-top 2px !important
</style>
