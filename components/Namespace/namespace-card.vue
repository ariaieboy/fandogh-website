<template>
    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="padding: 0">
        <div class="box middle-xs">
            <div style="flex: 0.2 0 auto;">
                <!--<img style="width: 1.4em; height: 1.4em; vertical-align: middle; justify-self: right"-->
                     <!--alt="delete-namespace"-->
                     <!--src="../../static/icons/ic_delete.svg"/>-->
                <span style=" padding: 5px 8px; border-radius: 3px; color: #fefefe"
                :style="{backgroundColor: (namespace.quota.memory_limit/512 >=1 ? '#0045ff' : '#35cc33')}">{{(namespace.quota.memory_limit/512 >=1 ? 'حرفه‌ای' : 'رایگان')}}</span>
            </div>

            <div class="text-container">
                {{namespace.name}}
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "namespace-card",
        props: ['namespace']
    }
</script>

<style scoped lang="stylus">

    @import '../../assets/css/variables.styl'

    .box
        display flex
        margin .5rem 0.5rem
        height 58px
        min-height 32px
        border-radius 3px
        background-color #fefefe
        text-align center
        padding-left 16px
        padding-right 16px
        box-shadow 0 2px 6px rgba(0,0,0,0.07)

    div.text-container
        margin 0 16px 0 0
        font-size 1.2em
        width 100%
        line-height 62px
        overflow-x hidden
        white-space nowrap
        text-overflow ellipsis
        text-align left
        direction ltr
        color #4A4A4A
        font-family iran-yekan

</style>
