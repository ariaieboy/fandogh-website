<template>

    <div class="row" style="background-color: #0045FF; border-radius: 2px; overflow-x:auto;">
        <table style="width: 100%; min-width: 900px; border-collapse: collapse; border: none; margin: 8px 0;">
            <tr class="head">
                <td v-for="item in celSpec" v-bind:style="{width:item.width}">
                    {{item.title}}
                </td>
            </tr>
        </table>
    </div>

</template>

<script>
    export default {
        props: ['celSpec'],
        name: "title-row"
    }
</script>

<style lang="stylus" scoped>

    *::-webkit-scrollbar
        display none

    *
        -ms-overflow-style none
        scrollbar-width none
        user-select none

    tr.head
        height 25px
        border-collapse collapse
        border none

    tr.head td
        font-family yekan-bold
        font-size .9em
        line-height 25px
        color #fff
        text-align center
        border-left 1px solid #fff

    tr.head td:last-child
        border none

</style>
