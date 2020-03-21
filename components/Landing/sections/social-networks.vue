<template>
    <div class="social-network-container container-fluid">

        <h2 class="social-sec-title">{{title}}</h2>

        <div class="row" style="margin-top: 32px">

            <img v-for="(tweet, index) in tweets"
                 class="col-xs-12 col-md-4 col-lg-4" :src="require('../../../assets/svg/' + tweet.img + '.svg')"
                 :alt="tweet.img"
                 style="cursor: pointer; margin-bottom: auto; margin-top: 24px"
                 @click="openTweet(index)">

        </div>


        <p class="social-sec-description">{{description}}</p>
        <div style="width: 100%; display: flex; justify-content: center; justify-items: center">
            <a href="https://twitter.com/intent/tweet?screen_name=fandoghpaas&ref_src=twsrc%5Etfw"
               class="twitter-mention-button" data-show-count="false">Tweet to @fandoghpaas</a>
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>

    </div>

</template>

<script>
    export default {
        name: "social-networks",
        data() {
            return {
                title: 'سکوی ابری فندق در رسانه‌ها',
                description: 'شما هم می‌توانید تجربه خود را در توئیتر منتشر کنید و سکوی ابری فندق را در آن منشن کنید تا در این قسمت دیده‌ شوید.',
                tweets: [
                    {
                        img: 'jadi_tweet',
                        link: 'https://twitter.com/jadi/status/1219586780258799617?ref_src=twsrc%5Etfw'
                    },
                    {
                        img: 'mostafa_tweet',
                        link: 'https://twitter.com/mostafaasadi73/status/1156933802775719938?ref_src=twsrc%5Etfw'
                    },
                    {
                        img: 'alireza_tweet',
                        link: 'https://twitter.com/DarkSuniuM/status/1234392673164939264?ref_src=twsrc%5Etfw'
                    },
                    {
                        img: 'mojtaba_tweet',
                        link: 'https://twitter.com/mojtabad/status/1222822982583754756?ref_src=twsrc%5Etfw'
                    },
                    {
                        img: 'arash_tweet',
                        link: 'https://twitter.com/x3n0b1a/status/1234463530793021441?ref_src=twsrc%5Etfw'
                    },
                    {
                        img: 'ashkan_tweet',
                        link: 'https://twitter.com/NakhsaKMR/status/1198648869237731329?ref_src=twsrc%5Etfw'
                    },
                ]
            }
        },
        methods: {
            openTweet(index) {

                window.open(this.tweets[index].link, '_blank');

            }
        }
    }
</script>

<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"

    .social-network-container
        width 100%
        background #f7f7f7
        min-height 700px
        max-width 1750px
        position relative
        box-sizing padding-box
        padding 32px
        @media only screen and (min-width 1500px)
            padding 32px 0


    .social-sec-title
        font-family iran-yekan
        font-size 2.5em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.71
        margin-top 16px
        letter-spacing normal
        text-align center
        color $silverDark
        @media only screen and (max-width: 992px)
            font-size 1.8em


    .social-sec-description
        font-size 1.4em
        font-weight normal
        font-style normal
        font-stretch normal
        line-height 1.72
        letter-spacing normal
        text-align center
        max-width 850px
        margin-right auto
        margin-left auto
        margin-top 32px
        color $fontGray
        font-family iran-yekan
        @media only screen and (max-width: 992px)
            font-size 1.1em


</style>
