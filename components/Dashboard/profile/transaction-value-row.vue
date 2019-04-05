<template>

    <div class="row" style="background-color: #fefefe; border-radius: 3px; overflow-x:auto;margin-top: 6px;   box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07);">
        <table style="width: 100%; min-width: 900px; border-collapse: collapse; border: none; margin: 6px 0;">
            <tr class="head">
                <td class="number" width="8%">{{rowNo}}</td>
                <td class="number" width="15%">{{celSpec.date}}</td>
                <td class="number" width="16%" style="direction: ltr">{{celSpec.transactionAmount}}</td>
                <td width="16%">{{celSpec.namespace}}</td>
                <td class="number" width="20%">{{celSpec.description}}</td>
                <td width="25%">{{celSpec.transactionCode}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props:['rowNo','celSpec'],
        name: "transaction-value-row"
    }
</script>

<style lang="stylus" scoped>

    tr.head
        height 25px
        border-collapse collapse
        border none

    tr.head td
        font-family IRANYekan
        font-size .8em
        line-height 25px
        font-weight normal
        font-style normal
        color #000
        text-align center
        border-left 1px solid #adadad

    tr.head td.number
        font-family 'IRANYekanMobile(FaNum)'
        font-size .8em
        line-height 20px
        color #000000
        text-align center
        border-left 1px solid #adadad

    tr.head td:last-child
        border none

</style>