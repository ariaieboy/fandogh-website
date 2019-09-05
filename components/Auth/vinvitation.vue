<template>
    <div class="row" style="width: 100%; display: flex; flex-direction: column">

        <div class="invitation-logo">
            <img src="../../assets/svg/ic-fandogh-mini.svg" alt="fandogh"/>
            <p>سکوی ابری فندق</p>
        </div>


        <div class="invitation-dialog-box container-fluid">
            <p class="invitation-dialog-title">پیوستن به تیم</p>

            <img style="margin-top: 16px"
                 src="../../assets/svg/invitation.svg"
                 alt="invitation"/>

            <div v-if="token_error === null && invitation_details !== null"
                 style="width: 100%; display: flex; flex-direction: column">
                <p class="invitation-text">
                    این دعوت‌نامه توسط {{invitation_details.owner}} در تاریخ {{create_date}} برای شما
                    فرستاده شده است تا به تیم {{invitation_details.namespace}} بپوندید و آن‌ها در مسیر توسعه محصولی با
                    کیفیت و برتر همراهی کنید.
                    از اینکه شما را در کنار خودمان داریم مفتخریم و امیدواریم تجربه خوبی را بر روی سکوی ابری فندق داشته
                    باشید.
                </p>
            </div>

            <div v-else style="width: 100%; display: flex; flex-direction: column">
                <p class="login-required-text">
                    ابتدا با فشردن دکمه زیر وارد حساب کاربری خود شوید سپس به همین صفحه بازگشته و دعوت‌نامه را تایید
                    نمایید
                </p>
            </div>


            <v-progress-linear
                    style="margin: 0; height: 5px;"
                    indeterminate
                    :active="loading"
                    color="rgba(0,255,255, 0.7) rgba(0,255,255, 1)"
            ></v-progress-linear>

            <div class="register-section">
                <div class="register-section-line"></div>
                <div class="register-section-container">
                    <button @click="confirmInvitation" v-if="token_error === null" class="invitation-dialog-button">
                        تایید دعوت‌نامه
                    </button>
                    <a v-else href="http://localhost:4000/user/login" target="_blank" class="invitation-dialog-button">ورود
                        به حساب کاربری</a>
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
    import Moment from 'moment-jalaali'

    export default {
        name: "vinvitation",
        components: {
            Moment,
        },
        data() {
            return {
                loading: false,
                show_pass: false,
                token_error: null,
                invitation_token: this.$route.params.id,
                invitation_details: null,
                success_message: ''
            }
        },
        methods: {
            async getInvitationDetails() {
                try {
                    this.$store.commit("SET_DATA", {data: true, id: "loading"});
                    this.invitation_details = await this.$store.dispatch("getInvitationDetail", this.invitation_token);
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    if (e.status === 401) {
                        this.token_error = 'login required'
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }
            },
            async confirmInvitation() {
                try {
                    this.$store.commit("SET_DATA", {data: true, id: "loading"});
                    this.success_message = await this.$store.dispatch("confirmTeamInvitation", this.invitation_token);
                    console.log(this.success_message)
                    this.$notify({
                        title: this.success_message.message,
                        time: 4000,
                        type: "success"
                    });
                    this.$router.replace("/dashboard/general");
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$notify({
                        title: e.data.message,
                        time: 4000,
                        type: "error"
                    });
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }
            }
        },
        computed: {
            create_date() {
                if (this.invitation_details !== null)
                    return Moment(this.invitation_details.created_at).format('jYYYY/jMM/jDD')
            }
        },
        created() {
            this.getInvitationDetails()
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

    .invitation-logo
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

    .invitation-dialog-box
        width 100%
        max-width 550px
        border-radius 5px
        box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.16)
        background-color #fefefe
        display flex
        flex-direction column
        @media only screen and (max-width 451px)
            border-radius 0

        p.invitation-dialog-title
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

        button.invitation-dialog-button
            width 100%
            height 45px
            margin-top 16px
            margin-bottom 16px
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

        button.invitation-dialog-button:hover
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

    .invitation-error
        font-size 1.2em
        font-family iran-yekan
        width 100%
        padding-right 16px
        padding-left 16px
        text-align center
        margin-top 16px
        margin-bottom 16px
        color #fd3259

    .invitation-text
        font-family: iran-yekan
        font-size: 1.2em
        font-weight: normal
        font-style: normal
        font-stretch: normal
        line-height: 1.69
        padding 32px
        letter-spacing: normal
        text-align: center
        color: #3c3c3c

    .login-required-text
        font-family: iran-yekan
        font-size: 1.2em
        font-weight: normal
        font-style: normal
        font-stretch: normal
        line-height: 1.69
        padding 32px
        letter-spacing: normal
        text-align: center
        color #fd3259

</style>
