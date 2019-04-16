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
        max-height 36px

        img
            width 36px
            height 36px
            filter invert(41%) sepia(59%) saturate(4513%) hue-rotate(185deg) brightness(100%) contrast(108%)
        span
            margin-top auto
            margin-bottom auto
            margin-right 12px
            color #7c7c7c


</style>