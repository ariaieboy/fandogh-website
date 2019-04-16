<template>

    <div class="parent">
        <img v-if="icon" :src="require('../icons/' + icon + '.svg')" alt="name"></img>
        <p>{{status}}</p>
    </div>

</template>

<script>
    export default {
        name: "status-container",
        props: ['status', 'icon']
    }
</script>

<style lang="stylus" scoped>

    .parent
        width 110px
        margin-left auto
        margin-right auto
        display flex
        background-color #f0f0f0
        border-radius 25px
        padding-bottom 3px
        padding-top 3px
        justify-content end

        img
            margin auto 6px auto 6px
            display inline-flex
            width 16px
            height 16px

        p
            font-family iran-yekan
            font-size 0.9em
            margin 0
            display inline-block

</style>