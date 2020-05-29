<template>

    <div class="row support-complete-row-container">
        <table style="width: 100%; border-collapse: separate; border-spacing: 0 .15em; table-layout: fixed"
               :style="{minWidth: is_simple ? 'unset' : '900px'}">
            <tbody v-if="!is_simple" class="section">
            <tr class="header">
                <th v-for="item in header" v-bind:style="{width:item.width}">
                    {{item.title}}
                </th>
            </tr>
            </tbody>
            <tbody>
            <tr class="data" v-for="(celSpec, index) in celSpecs"
                @click="func ? func(index) : ''">
                <td class="number" :width="is_simple ? '10%' : '8%'">{{celSpec.id}}</td>
                <td :width="is_simple ? '37%' : '12%'" width="15%" v-html="celSpec.status"></td>
                <td v-if="!is_simple" width="15%" style="font-family: iran-sans">{{celSpec.created_at}}</td>
                <td v-if="!is_simple" width="10%">{{celSpec.department}}</td>
                <td :width="is_simple ? '53%' : '55%'">{{celSpec.title}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "ticket-complete-row",
        props: ['header', 'celSpecs', 'func', 'is_simple'],
    }
</script>

<style lang="stylus" scoped>

    .support-complete-row-container
        overflow-x auto
        padding-bottom 150px
        padding-top 16px
        @media only screen and (max-width 992px)
            padding-top 16px


    .section::after
        height .3em
        display table-row
        content ''


    tr.header
        border-collapse collapse
        border none
        padding-top 3px
        padding-bottom 3px
        box-shadow 0 4px 2px -2px rgba(0, 0, 0, 0.17)

        th
            font-family yekan-bold
            font-size .9em
            line-height 40px
            background-color #0045ff
            color #fff
            border none
            border-collapse collapse
            text-align center

        th:last-child
            border-bottom-left-radius 3px
            border-top-left-radius 3px

        th:first-child
            border-bottom-right-radius 3px
            border-top-right-radius 3px


    tr.data
        cursor pointer
        margin-bottom 16px
        border-collapse separate
        background-color #fefefe
        transition all .3s ease-in-out
        box-shadow 0 1px 1px rgba(0, 0, 0, 0.07)
        padding-top 3px
        padding-bottom 3px

        td
            font-family iran-yekan
            font-size .9em
            line-height 40px
            font-weight normal
            font-style normal
            color #000
            text-align center
            white-space nowrap
            text-overflow ellipsis
            overflow hidden

        td.number
            font-family iran-sans
            font-size .9em
            line-height 20px
            color #000000
            text-align center

        td.description-col
            a
                color #0045FF
                opacity .8
                transition all .2s ease-in-out

        td.description-col a:hover
            opacity 1
            transition all .2s ease-in-out

        td:last-child
            border-bottom-left-radius 3px
            border-top-left-radius 3px

        td:first-child
            border-bottom-right-radius 3px
            border-top-right-radius 3px


</style>
