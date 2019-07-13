<template>
    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <div class="middle-xs middle-sm middle-lg middle-md free-feature-card">
            <div>
                <img :src="require('../../assets/svg/free_feature_img/' + item.image)" alt="feature"/>
                <p class="feature-title">{{item.title}}</p>
                <p class="feature-subtitle">{{item.subtitle}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        name: "feature"
    }
</script>

<style lang="stylus" scoped>

    .free-feature-card
        height 250px
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(41, 121, 255, 0.42)
        margin 1rem 0
        background-color #2979ff

        div
            padding 20px

            img
                width 90px
                height 90px
                display block
                margin-left auto
                margin-right auto
                transform scale(0.9, 0.9)

            p.feature-title
                text-align center
                font-family iran-yekan
                font-size 1em
                font-style normal
                font-stretch normal
                line-height 1.30
                letter-spacing normal
                margin-top 40px
                color #fefefe

            p.feature-subtitle
                text-align center
                font-family yekan-light
                font-size .9em
                font-style normal
                font-stretch normal
                line-height 1.17
                letter-spacing normal
                margin-top 13px
                color #fefefe


</style>
