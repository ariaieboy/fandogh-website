<template>
    <div class="parent-style">
        <table class="table-style">
            <tr>
                <td v-for="header in headers"
                    :width="header.width"
                    :style="{textAlign: 'center' }">
                    {{header.title}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "table-header",
        props:['headers']
    }
</script>

<style lang="stylus" scoped>

    .parent-style
        background-color #2979ff
        border-top-left-radius 3px
        border-top-right-radius 3px
        margin-top 0
        padding-left 12px
        padding-right 12px

    .table-style
        width 100%
        border none
        border-collapse collapse
        tr
            height 40px
            border-collapse collapse
            color #fefefe
            font-family iran-yekan
            font-size 0.8em
            font-weight bold



</style>