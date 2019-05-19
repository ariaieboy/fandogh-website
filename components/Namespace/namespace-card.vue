<template>
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding: 0">
        <div class="box middle-xs">
            <div style="cursor: pointer; flex: 0.2 0 auto">
                <img style="width: 1.4em; height: 1.4em; vertical-align: middle; justify-self: right" alt="delete-namespace"
                     src="../../static/icons/ic_delete.svg"/>
                <span style="color: #fd3259; padding-right: 8px">حذف فضانام</span>
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

    .box
        display flex
        margin .5rem 0.5rem
        padding 16px
        min-height 32px
        border-radius 3px
        background-color #fefefe
        text-align center
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.09)

    div.text-container
        margin 0 16px 0 0
        font-size 1.2em
        width 100%
        overflow-x hidden
        white-space nowrap
        text-overflow ellipsis
        text-align left
        direction ltr
        color #4A4A4A
        font-family iran-yekan

</style>