<template>
    <div style="padding-bottom: 32px">

        <TitleRow v-bind:celSpec="titleRow"/>

        <TransactionValue v-for="(item, index) in valueRows"
                          :key="index"
                          v-bind:rowNo="++index"
                          v-bind:celSpec="item"/>

    </div>
</template>

<script>
    import TransactionValue from "~/components/Dashboard/profile/transaction-value-row";
    import TitleRow from "~/components/Dashboard/profile/title-row";

    export default {
        name: "profile-transaction",
        components: {
            TransactionValue,
            TitleRow,
        }, data() {
            return {
                titleRow: [
                    {title: 'ردیف', width: '8%'},
                    {title: 'تاریخ', width: '15%'},
                    {title: 'مقدار تراکنش (تومان)', width: '16%'},
                    {title: 'نام فضانام', width: '16%'},
                    {title: 'شرح تراکنش', width: '20%'},
                    {title: 'کد تراکنش', width: '25%'}
                ],
                valueRows: [
                    {
                        date: '۱۳۹۷/۰۱/۱۲',
                        transactionAmount: '۱۰۰٬۰۰۰',
                        namespace: 'sorena-namespace',
                        description: 'خرید پلن',
                        transactionCode: 'FP1-greB-deff-sasd-1201'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۳',
                        transactionAmount: '۸۰٬۰۰۰',
                        namespace: 'sorena-namespace',
                        description: 'خرید پلن',
                        transactionCode: 'FP1-greB-deff-sasd-1202'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۴',
                        transactionAmount: '۱۰۰٬۰۰۰',
                        namespace: 'sorena-namespace',
                        description: 'خرید پلن',
                        transactionCode: 'FP1-greB-deff-sasd-1203'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۵',
                        transactionAmount: '۱۲۰٬۰۰۰',
                        namespace: 'sorena-namespace',
                        description: 'خرید پلن',
                        transactionCode: 'FP1-greB-deff-sasd-1204'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۶',
                        transactionAmount: '۲۰۰٬۰۰۰',
                        namespace: 'sorena-namespace',
                        description: 'خرید پلن',
                        transactionCode: 'FP1-greB-deff-sasd-1205'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۷',
                        transactionAmount: '۱۰۰٬۰۰۰',
                        namespace: 'sorena-namespace',
                        description: 'خرید پلن',
                        transactionCode: 'FP1-greB-deff-sasd-1206'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۸',
                        transactionAmount: '۴۰۰٬۰۰۰',
                        namespace: 'sorena-namespace',
                        description: 'خرید پلن',
                        transactionCode: 'FP1-greB-deff-sasd-1207'
                    },
                    {
                        date: '۱۳۹۷/۰۱/۱۹',
                        transactionAmount: '۱۰۰٬۰۰۰',
                        namespace: 'sorena-namespace',
                        description: 'خرید پلن',
                        transactionCode: 'FP1-greB-deff-sasd-1208'
                    }
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>

    tr.head
        height 25px
        border-collapse collapse
        border none

    tr.head td
        font-family yekan-bold
        font-size .8em
        line-height 25px
        color #fff
        text-align center
        border-left 1px solid #fff

    tr.head td:last-child
        border none


</style>