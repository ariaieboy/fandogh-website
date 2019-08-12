<template>

    <section>

        <div class="error-container">

            <div class="error-header">

            </div>

            <div class="error-inner-container">

                <div class="error-title-container">

                    <span class="error-message">{{error.statusCode === 404 ? 'Page not found' : error.message}}</span>
                    <span class="error-title">{{error.statusCode}}</span>

                </div>

                <div v-if="error.statusCode === 404" class="error-action-container">
                    <div class="line">

                    </div>
                    <div class="row" style="display: flex; justify-content: center">
                        <nuxt-link class="button" to="/">
                            صفحه اصلی
                        </nuxt-link>
                        <a class="button" href="https://docs.fandogh.cloud" target="_self">
                            مستندات
                        </a>
                        <a class="button" href="https://blog.fandogh.cloud" target="_self">
                            وبلاگ
                        </a>
                    </div>

                </div>

            </div>

        </div>

    </section>

</template>

<script>
    export default {
        props: ['error']
    }
</script>

<style lang="stylus" scoped>
    .error-title
        font-size 3.5em
        font-family iran-yekan
        line-height 1.75
        color #fefefe
        margin-top auto
        direction ltr
        margin-right 12px
        margin-bottom auto
        @media only screen and (max-width 992px)
            font-size 2.7em

    .error-message
        font-size 3.2em
        font-family iran-yekan
        line-height 1.75
        color rgba(254, 254, 254, 0.7)
        margin-top auto
        direction ltr
        letter-spacing normal
        margin-bottom auto
        @media only screen and (max-width 992px)
            font-size 2.4em

    .error-container
        display flex
        flex-direction column
        width 100%
        height 100%
        min-height 700px
        padding-top 60px
        background-image linear-gradient(to bottom, #0045ff, #002380)

        div.error-title-container
            width 100%
            display flex
            margin-top 64px
            max-width 650px
            margin-left auto
            margin-right auto
            justify-content center


    .error-inner-container
        display flex
        flex-direction column
        width 100%
        height 100%
        min-height 700px
        position absolute
        padding-top 60px
        background-image: linear-gradient(to bottom, rgba(0, 69, 255, 0.6), #0045ff 20%, #002380);

    .error-action-container
        width 100%
        max-width 700px
        margin-top 16px
        display flex
        margin-left auto
        margin-right auto
        flex-direction column

        div.line
            width 100%
            height: 2px;
            border-radius 25px
            background: -webkit-linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
            background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);


    .error-header
        height: 200px;
        display: flex;
        align-items: center;
        position: static;
        margin-top 0
        background url('../assets/svg/pod_bg.svg') repeat-x top;
        filter invert(1)
        background-size: 70%;
        @media only screen and (max-width 992px)
            background-size 100%


    .button
        margin-top: 24px;
        width: max-content;
        margin-left: 8px;
        margin-right: 8px;
        color: rgba(254, 254, 254, 0.7)

    .button:hover
        color #fefefe
</style>
