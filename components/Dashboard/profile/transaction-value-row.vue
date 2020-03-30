<template>

    <div class="row"
         style="background-color: #fefefe; border-radius: 2px; overflow-x:auto; margin-top: 2px; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07);">
        <table style="width: 100%; min-width: 900px; border-collapse: collapse; margin: 8px 0;">
            <tr class="head">
                <td class="number" width="8%">{{rowNo}}</td>
                <td class="number" style="direction: ltr;" width="17%">{{celSpec.date}}</td>
                <td width="20%">{{celSpec.transactionCode}}</td>
                <td width="20%">{{celSpec.namespace}}</td>
                <td class="number" width="20%" style="direction: ltr">{{celSpec.transactionAmount}}</td>
                <td class="number description-col" width="15%" @click="showTransactionDetail" style="cursor: pointer;">
                    <a  :href="`http://localhost:4000/dashboard/account/transaction-details?ns=${$route.query.ns}`" target="_blank">
                        {{celSpec.description}}
                    </a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: ['rowNo', 'celSpec'],
        name: "transaction-value-row",
        methods: {
            showTransactionDetail() {
                this.$store.commit("SET_DATA", {id: "transactionDetail", data: this.celSpec});
            }
        }
    }
</script>

<style lang="stylus" scoped>

    *
        user-select none

    tr.head
        height 25px
        border-collapse collapse
        border none

    tr.head td
        font-family iran-yekan
        font-size .9em
        line-height 25px
        font-weight normal
        font-style normal
        color #000
        text-align center
        border-left 1px solid #adadad

    tr.head td.number
        font-family iran-sans
        font-size .9em
        line-height 20px
        color #000000
        text-align center
        border-left 1px solid #adadad

    tr.head td.description-col a
        color #0045FF
        opacity .8
        transition all .2s ease-in-out

    tr.head td.description-col a:hover
        opacity 1
        transition all .2s ease-in-out

    tr.head td:last-child
        border none

</style>
