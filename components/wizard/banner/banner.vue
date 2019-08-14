<template>
    <div class="banner">
        <div style="padding: 24px 16px">
            <div class="banner-title">
                {{page.title}}
            </div>
            <div class="banner-description">
                {{page.description}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "banner",
        props: ['page']
    }
</script>

<style lang="stylus" scoped>

    .banner
        margin 0
        border-radius 3px
        background-color #0045ff
        width 100%
        box-shadow 0 3px 6px 0 rgba(41, 121, 255, 0.4)

        div.banner-title
            font-family iran-yekan
            font-size 18px
            font-weight bold
            font-style normal
            font-stretch normal
            line-height 1.72
            letter-spacing normal
            color #fefefe
            text-align right

        div.banner-description
            margin-top 12px
            font-family iran-yekan
            font-size 15px
            font-weight normal
            font-style normal
            font-stretch normal
            line-height 1.73
            letter-spacing normal
            text-align right
            color #fefefe
</style>
