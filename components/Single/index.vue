<template>
    <div class="single">
        <div class="detail">
            <slot></slot>
        </div>
        <div class="sidebar">
            <sidebar> </sidebar>
        </div>
    </div>
</template>

<script>
    import Sidebar from './sidebar'
    export default {
      components:{
        Sidebar
      }
    }
</script>

<style lang="stylus" scoped>
    .single
        padding-top 200px
        display flex
        flex-flow wrap row-reverse
        align-items flex-start
        .detail
            width calc(100% - 300px)
            margin-right 30px

    @media only screen and (max-width: 1230px)
        .single
            padding-top: 90px
    @media only screen and (max-width: 768px)
        .single
            flex-flow wrap column-reverse
            align-items center
            .detail
                width 100%
                margin 0
            .sidebar
                width 100%
                margin-bottom 24px

</style>
