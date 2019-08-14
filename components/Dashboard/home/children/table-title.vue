<template>
    <div class="parent">
        <img :src="require('~/components/Dashboard/sidebar/icons/' + icon + '.svg')" :alt="title"/>
        <span>{{title}}</span>
    </div>
</template>

<script>
    export default {
        name: "table-title",
        props: ['icon', 'title']
    }
</script>

<style lang="stylus" scoped>

    .parent
        box-sizing content-box
        padding 12px
        position relative
        display flex
        max-height 48px
        @media only screen and (max-width: 900px)
            max-height 36px

        img
            width 48px
            height 48px
            filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
            @media only screen and (max-width: 900px)
                width 36px
                height 36px
        span
            margin-top auto
            margin-bottom auto
            margin-right 12px
            color #7c7c7c


</style>
