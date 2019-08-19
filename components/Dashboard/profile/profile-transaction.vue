<template>
    <div style="padding-bottom: 32px">

        <TitleRow v-bind:celSpec="titleRow"/>

        <TransactionValue v-for="(item, index) in transactions"
                          :key="index"
                          v-bind:rowNo="++index"
                          v-bind:celSpec="item"/>

    </div>
</template>

<script>
    import TransactionValue from "~/components/Dashboard/profile/transaction-value-row";
    import TitleRow from "~/components/Dashboard/profile/title-row";
    import ErrorReporter from "../../../utils/ErrorReporter";
    import Moment from 'moment-jalaali'

    export default {
        name: "profile-transaction",
        components: {
            TransactionValue,
            TitleRow,
            Moment

        }, data() {
            return {
                transactions: [],
                titleRow: [
                    {title: 'ردیف', width: '8%'},
                    {title: 'تاریخ', width: '17%'},
                    {title: 'کد تراکنش', width: '20%'},
                    {title: 'نام فضانام', width: '20%'},
                    {title: 'مقدار تراکنش (تومان)', width: '20%'},
                    {title: 'شرح تراکنش', width: '15%'}

                ],
            }
        },
        created() {

            this.requestTransactions()

        },
        methods: {
            async requestTransactions() {

                await this.$store.dispatch("getTransactions")
                    .then(transactionResponse => {
                        this.transactions = transactionResponse.map(
                            ({id, paid_at, total, items}) => {
                                return {
                                    transactionCode: id,
                                    transactionAmount: total,
                                    namespace: this.$store.state.activePlan.name,
                                    description: 'جزئیات تراکنش',
                                    items,
                                    date: Moment(paid_at).format('jYYYY/jMM/jDD - HH:mm')
                                };
                            }
                        );
                    }).catch(e => {
                        if (e.status === 401) {
                            this.$router.push("/user/login");
                        } else {
                            ErrorReporter(e, this.$data, true).forEach(error => {
                                this.$notify({
                                    title: error,
                                    time: 4000,
                                    type: "error"
                                });
                            });
                        }
                    });

            },
        }
    }
</script>

<style lang="stylus" scoped>

    ::-webkit-scrollbar
        display none

    -ms-overflow-style none
    scrollbar-width none

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
