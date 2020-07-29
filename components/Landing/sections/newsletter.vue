<template>
    <div class="newsletter-parent-container row">
        <div class="newsletter-container row" style=" margin-top: auto; margin-bottom: auto">
            <div class="col-xs-12 col-md-12 col-lg-6 col-sm-12 subscription-desc-container">
                <h2 class="subscription-title">{{title}}</h2>
                <div class="subscription-divider"></div>
                <p class="subscription-desc">{{description}}</p>
            </div>
            <div class="subscription-container col-xs-12 col-md-12 col-lg-6 col-sm-12">
                <button
                        @click="subscribe_for_newsletter"
                        class="subscription-button">{{submit}}
                </button>

                <input class="subscription-input"
                       type="email"
                       v-model="email_address"
                       @keyup.enter="subscribe_for_newsletter"
                       :placeholder="search_hint"/>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: "newsletter",
        data() {
            return {

                title: 'ثبت‌نام در خبرنامه فندق',
                description: 'با ثبت‌نام در خبرنامه فندق، از آخرین تغییرات و ویژگی‌های سکو و همچنین آخرین اخبار حوزه زیرساخت ابری با خیر شوید.',
                submit: 'تایید',
                search_hint: 'آدرس ایمیل شما',
                email_address: null
            }
        },
        methods: {

            subscribe_for_newsletter() {

                if (this.email_address !== null) {
                    if (this.email_address.toString().trim().length !== 0) {
                        this.$store.commit("SET_DATA", {data: true, id: "loading"});
                        this.$store.dispatch("subscribeNewsletter", this.email_address)
                            .then(response => {
                                this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                this.$notify({
                                    title: response['message'],
                                    time: 4000,
                                    type: "success"
                                });
                                this.email_address = null
                            })
                            .catch(error => {
                                this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                this.$notify({
                                    title: error,
                                    time: 4000,
                                    type: "error"
                                });
                            });
                    }
                }

            }
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"


    .newsletter-parent-container
        width 100%
        height 220px
        position relative
        background: url('../../../assets/svg/newsletter-bg.svg');
        background-size cover
        padding 16px 72px
        margin-top 72px
        display flex
        box-shadow 0 0 12px 6px rgba(0,0,0,0.17)
        @media only screen and (max-width: 1200px)
            height max-content
            padding 16px 48px

    .newsletter-container
        width 100%
        height max-content
        display flex
        flex-direction row
        @media only screen and (max-width: 1200px)
            padding 16px
            flex-direction column


    div.subscription-desc-container
        width 100%


        h2.subscription-title
            font-family iran-yekan
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.72
            letter-spacing normal
            text-align right
            color #fefefe
            margin-top 0
            margin-bottom 16px
            @media only screen and (max-width: 1200px)
                text-align center

        div.subscription-divider
            width 100%
            height 1px
            background #fefefe
            border-radius 5px


        p.subscription-desc
            font-family iran-yekan
            font-size 1.1em
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.72
            letter-spacing normal
            text-align right
            color #fefefe
            margin-top 16px
            margin-bottom 0
            @media only screen and (max-width: 1200px)
                text-align center

    div.subscription-container
        width 100%
        max-width 500px
        border-radius 10px
        background-color #ffffff
        height 68px
        display flex
        padding 4px
        margin-top auto
        margin-bottom auto
        margin-right auto
        box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.17)

        @media only screen and (max-width: 1200px)
            height 56px
            margin-top 32px
            margin-left auto
            margin-right auto

        button.subscription-button
            width 130px
            height 100%
            background-color #00ffff
            border-radius 10px
            color #3c3c3c
            text-align center
            font-weight bold
            font-family iran-yekan
            outline none
            font-size 1.3em
            @media only screen and (max-width: 1200px)
                text-align center
                width 110px
                font-size 1.1em

        button.subscription-button:hover
            background-color #00fafa


        input.subscription-input
            flex 1
            padding 0 12px
            outline none
            font-size 1.3em
            font-family "Helvetica Neue"
            font-weight normal
            @media only screen and (max-width: 1200px)
                font-size 1.1em


    .npc
        width 100%
        display flex
        flex-direction column
        @media only screen and (max-width: 1200px)
            flex-direction row

</style>
