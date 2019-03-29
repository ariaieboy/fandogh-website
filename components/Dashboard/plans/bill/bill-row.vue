<template>
    <div style="width: 100%; border-radius: 3px; background-color: rgba(41, 121, 255, 0.3); margin: 10px 0 0 0; padding: 2px 0">
        <table style="width: 100%;border: none; border-collapse: collapse; margin: 6px 0">
            <tr class="data">
                <td width="26%">{{bill.local_name}}</td>
                <td class="number" width="17%">{{bill.count}}</td>
                <td width="17%">{{bill.unit}}</td>
                <td class="number" width="20%">{{bill.unit_price}}</td>
                <td class="number" width="20%">{{bill.price}}</td>
            </tr>
        </table>

    </div>
</template>

<script>
    export default {
        props: ['bill'],
        name: "bill-row"
    }
</script>

<style lang="stylus" scoped>

    tr.data
        height 20px
        border-collapse collapse

    tr.data td
        font-family IRANYekan
        font-size 12px
        line-height 20px
        color #000000
        text-align center
        border-left 2px solid #fff

    tr.data td.number
        font-family 'IRANYekanMobile(FaNum)'
        font-size 14px
        line-height 20px
        color #000000
        text-align center
        border-left 2px solid #fff

    tr.data td:last-child
        border none


</style>