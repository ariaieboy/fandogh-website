<template>
    <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 container-fluid register-box-outer-container">


        <div v-if="message" style="width: 100%; display: flex; flex-direction: column; margin-top: 48px">
            <p style="font-family: iran-yekan; font-size: 1.5em; color: #333333; text-align: center;">
                {{message}}
            </p>
            <button @click="$router.replace('/user/login')" style="width: 300px; height: 45px; color: #fefefe; background: #0045ff;
text-align: center; font-family: iran-yekan; font-size: 1.4em; outline:none; border-radius: 5px; margin-left: auto; margin-right: auto; margin-top: 32px">
                باشه
            </button>
        </div>

        <div v-else class="row register-box-inner-container">

            <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 register-desc-box">

                <div class="register-feature-card">
                    <img src="../../assets/svg/border-person.svg" alt="person">
                    <div class="register-feature-container">
                        <p class="register-feature-title">حساب کاربری رایگان</p>

                        <p class="register-feature-description">
                            سرویس‌های خود را بسازید، دیتابیس‌های مورد نیازتان رو به سرویس‌ها متصل کنید و از تمام
                            ویژگی‌های رایگان بهره‌مند شوید.
                        </p>

                        <div></div>

                    </div>
                </div>

                <div class="register-feature-card">
                    <img src="../../assets/svg/framework_icon.svg" alt="framework">
                    <div class="register-feature-container">
                        <p class="register-feature-title">سکویی برای همه زبان‌ها</p>

                        <p class="register-feature-description">
                            فرقی نمی‌کند که دانش داکر داشته باشید، ما تمام زبان‌های محبوب را پشتیبانی میکنیم تا کار شما
                            آسان‌تر شود.
                        </p>

                        <div></div>

                    </div>
                </div>

                <div class="register-feature-card">
                    <img src="../../assets/svg/source_deployment_icon.svg" alt="deploy">
                    <div class="register-feature-container">
                        <p class="register-feature-title">استقرار سریع</p>

                        <p class="register-feature-description">
                            از سرور یا کامپیوتر شما تا سکوی ابری تنها چند دقیقه فاصله دارید، همین حالا اقدام کنید.
                        </p>

                    </div>
                </div>

            </div>

            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 register-input-box">
                <p class="register-dialog-title">ثبت‌نام رایگان</p>

                <v-form>

                    <v-text-field
                            ref="username"
                            style="font-family: iran-yekan;width: 100%; font-size: 1em; padding-left: 0; max-width: 350px; margin-left: auto; margin-right: auto;max-height: 70px"
                            color="#0045ff"
                            type="text"
                            dir="rtl"
                            :rules="[rules.username_required]"
                            required
                            @keyup.enter="register"
                            v-model="user.username"
                            :hint="username.hint"
                            :label="username.label">

                    </v-text-field>

                    <v-text-field
                            ref="password"
                            style="font-family: iran-yekan;width: 100%; font-size: 1em; padding-left: 0; max-width: 350px; margin-left: auto; margin-right: auto;max-height: 70px"
                            color="#0045ff"
                            type="text"
                            dir="rtl"
                            :rules="[rules.password_required]"
                            required
                            @keyup.enter="register"
                            :type="show_pass ? 'text' : 'password'"
                            browser-autocomplete="new-password"
                            :append-icon="show_pass ? 'visibility_off' : 'visibility'"
                            v-model="user.password"
                            :hint="password.hint"
                            @click:append="show_pass = !show_pass"
                            :label="password.label">

                    </v-text-field>

                    <v-text-field
                            ref="repeat_password"
                            style="font-family: iran-yekan;width: 100%; font-size: 1em; padding-left: 0; max-width: 350px; margin-left: auto; margin-right: auto;max-height: 70px"
                            color="#0045ff"
                            type="text"
                            dir="rtl"
                            :rules="[rules.repeat_password_required]"
                            required
                            :type="show_pass ? 'text' : 'password'"
                            browser-autocomplete="new-password"
                            :append-icon="show_pass ? 'visibility_off' : 'visibility'"
                            v-model="user.repeat_password"
                            :hint="repeat_password.hint"
                            @click:append="show_pass = !show_pass"
                            :label="repeat_password.label">

                    </v-text-field>

                    <v-text-field
                            ref="email"
                            style="font-family: iran-yekan;width: 100%; font-size: 1em; padding-left: 0; max-width: 350px; margin-left: auto; margin-right: auto; max-height: 70px"
                            color="#0045ff"
                            type="text"
                            dir="rtl"
                            @keyup.enter="register"
                            :rules="[rules.email_required, rules.email_valid]"
                            required
                            :type="'email'"
                            v-model="user.email"
                            :hint="email.hint"
                            :label="email.label">

                    </v-text-field>

                    <v-text-field
                            ref="namespace"
                            style="font-family: iran-yekan;width: 100%; font-size: 1em; padding-left: 0; max-width: 350px; margin-left: auto; margin-right: auto; max-height: 70px"
                            color="#0045ff"
                            type="text"
                            dir="rtl"
                            @keyup.enter="register"
                            :rules="[rules.namespace_required]"
                            required
                            :type="'text'"
                            v-model="user.namespace"
                            :hint="namespace.hint"
                            :label="namespace.label">

                    </v-text-field>
                </v-form>

                <p class="register-error" v-html="error" v-if="error !== null"
                   :style="{display: error === null ?  'none' : 'unset'}"></p>

                <button @click="register" class="register-dialog-button">تایید ثبت‌نام</button>

                <v-progress-linear
                        style="margin: 0; height: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px"
                        indeterminate
                        :active="loading"
                        color="rgba(0,255,255, 0.7) rgba(0,255,255, 1)"
                ></v-progress-linear>
            </div>

        </div>

    </div>

</template>

<script>
    import Validation from '~/utils/validation'
    import ErrorReporter from '~/utils/ErrorReporter'


    export default {
        name: "vregister",
        data() {
            return {

                rules: {
                    username_required: value => value !== '' || 'نام کاربری نباید خالی باشد',
                    email_required: value => value !== '' || 'آدرس ایمیل نباید خالی باشد',
                    password_required: value => value !== '' || 'گذرواژه نباید خالی باشد',
                    repeat_password_required: value => value !== '' || 'تکرار گذرواژه را وارد نکرده‌اید',
                    namespace_required: value => value !== '' || 'نام فضانام نباید خالی باشد',
                    email_valid: value => Validation.email(value) || 'آدرس ایمیل وارد شده صحیح نیست'
                },
                show_pass: false,
                loading: false,
                error: null,
                message: null,
                user: {
                    username: '',
                    email: '',
                    password: '',
                    repeat_password: '',
                    namespace: ''
                },
                username: {
                    hint: 'نام کاربری را وارد نمایید',
                    label: 'نام کاربری'
                },
                password: {
                    hint: 'گذرواژه را وارد نمایید',
                    label: 'گذرواژه'
                },
                repeat_password: {
                    hint: 'گذرواژه را دوباره وارد نمایید',
                    label: 'تکرار گذرواژه'
                },
                email: {
                    hint: 'آدرس ایمیل خود را وارد نمایید',
                    label: 'آدرس ایمیل'
                },
                namespace: {
                    hint: 'نام فضانام یا همان namespace دلخواهتان را وارد نمایید',
                    label: 'فضانام'
                }
            }
        },
        methods: {
            validateInputs() {

                if (this.rules.username_required(this.user.username) !== true) {
                    this.$refs.username.focus();
                    return false
                } else if (this.rules.password_required(this.user.password) !== true) {
                    this.$refs.password.focus();
                    return false
                } else if (this.rules.repeat_password_required(this.user.repeat_password) !== true) {
                    this.$refs.repeat_password.focus();
                    return false
                } else if (this.rules.email_required(this.user.email) !== true ||
                    this.rules.email_valid(this.user.email) !== true) {
                    this.$refs.email.focus();
                    return false
                } else if (this.rules.namespace_required(this.user.namespace) !== true) {
                    this.$refs.namespace.focus();
                    return false
                } else {
                    return true
                }
            },
            register() {
                if (this.validateInputs()) {
                    if (this.loading) return;
                    this.loading = true;
                    this.error = null;
                    this.$store.dispatch('register', this.user).then(response => {
                        this.loading = false;
                        this.message = response.message
                    }).catch(error => {
                        this.loading = false;
                        this.error = ErrorReporter(error, this.$data)
                    })
                }
            }
        },
        mounted() {

            this.$refs.namespace.focus();
            this.$refs.email.focus();
            this.$refs.password.focus();
            this.$refs.repeat_password.focus();
            this.$refs.username.focus();
        }
    }
</script>

<style lang="stylus" scoped>

    @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons")

    .row
        margin-left 0
        margin-right 0

    .register-box-outer-container
        width 100%
        max-width 950px
        border-radius 5px
        padding 16px
        height max-content
        box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.16)
        background-color #ebefff


    .register-box-inner-container
        display flex
        width 100%
        height 100%

        div.register-desc-box
            margin-left auto
            margin-right auto
            padding-top 32px


        div.register-input-box
            margin-right auto
            display flex
            max-width 400px
            min-height 650px
            padding-right 0
            padding-left 0
            margin-left -32px
            border-radius: 5px;
            box-shadow: 6px 3px 16px 8px rgba(0, 0, 0, 0.16);
            background-color: #fefefe;
            flex-direction column
            @media only screen and (max-width 992px)
                box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
                max-width 100%
                margin-left 0

            p.register-dialog-title
                width 100%
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
                @media only screen and (max-width 992px)
                    font-size 1.4em

            button.register-dialog-button
                width 100%
                height 45px
                margin-bottom 16px
                margin-left auto
                margin-right auto
                max-width 350px
                border-radius 5px
                background-color #0045ff
                font-family: iran-yekan
                font-size: 1.4em
                font-weight: normal
                font-style: normal
                font-stretch: normal
                margin-top auto
                line-height: 45px
                opacity 0.9
                letter-spacing: normal
                text-align: center
                color: #fafafa
                outline none

            button.register-dialog-button:hover
                opacity 1


    .register-feature-card
        width: 100%;
        max-width: 500px;
        display: flex;
        margin-bottom: 32px

        img
            width: 42px;
            height: 42px;
            filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)

        div.register-feature-container
            width: 100%;
            margin-right: 12px;
            display: flex;
            flex-direction: column

            p.register-feature-title
                font-family: iran-yekan;
                font-size: 1.2em
                font-weight: bold;
                margin-top 8px
                font-style: normal;
                font-stretch: normal;
                line-height: 1.75;
                letter-spacing: normal;
                text-align: right;
                color: #0045ff;
                margin-bottom: 8px
                @media only screen and (max-width 992px)
                    font-size 1.1em


            p.register-feature-description
                font-family: iran-yekan;
                font-size: 1.1em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.72;
                letter-spacing: normal;
                text-align: right;
                color: #3c3c3c;
                @media only screen and (max-width 992px)
                    font-size 1em

            div
                width: 100%;
                height: 1px;
                background: #707070;
                border-radius: 25px


    .register-error
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
