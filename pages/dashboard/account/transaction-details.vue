<template>
    <div style="z-index: 100000000">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 container-fluid"
                 id="bill" style="margin-top: 32px">

                <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11 container-fluid"
                     style="border-radius: 3px; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); background-color: #ffffff;
                    box-sizing: content-box; padding: 0; max-width: 1900px">

                    <div id="header" class="row col-xs-12 col-sm-12 col-md-12 col-lg-12" style="width: 100%;height: content-box;
            background-color: #0045ff; margin: 0; border-top-left-radius: 3px;
                    border-top-right-radius: 3px; padding: 16px; display: inline-flex">

                        <div class="col-lg-4 col-md-4 col-sm-4 col-sm:900px col-xs-12"
                             style="display: block;margin: 0;">

                            <img src="../../../assets/svg/ic-fandogh-mini.svg"
                                 style="width: 30%; height: auto; margin-left: auto; margin-right: auto; position:relative; display: block; max-width: 72px"/>

                            <p style="margin: 16px 0 0 0;text-align: center; font-size: 1.4em; color: #fff; font-family: iran-yekan">
                                فاکتور سرویس ابری</p>

                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"
                             style="margin:auto;">

                            <p style="margin: 5px 0 0 0; font-family: iran-yekan; font-size: 1em; color: #fff; text-align: right; direction: rtl;" dir="rtl">
                                <span style="font-family: iran-yekan; font-size: 1.1em; color: #fff; direction: rtl" dir="rtl">صادر کننده: </span>سکو ابری فندق</p>

                            <p style="margin: 5px 0 0 0; font-family: iran-yekan; font-size: 1em; color: #fff; text-align: right; direction: rtl;" dir="rtl">
                                <span style="font-family: iran-yekan; font-size: 1.1em; color: #fff; direction: rtl;" dir="rtl">سفارش دهنده:</span>
                                {{namespace}}</p>

                            <p style="margin: 5px 0 0 0; font-family: iran-yekan; letter-spacing: 0.05em; font-size: 1em; color: #fff; text-align: right">
                                <span style="font-family: iran-yekan; font-size: 1.1em; color: #fff;">فضانام:</span>
                                {{namespace}}</p>

                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"
                             style="margin: auto;">

                            <p style="margin: 5px 0 0 0; font-family: iran-yekan; font-size: 1.1em; color: #fff; text-align: right">
                                شماره سفارش: <span
                                    style="font-family: iran-sans; font-size: .8em; color: #fff;padding-left: 6px;">{{transaction.transactionCode}}</span>
                            </p>

                            <p style="margin: 5px 0 0 0; font-family: iran-yekan; font-weight: normal; font-size: 1.1em; color: #fff; text-align: right">
                                تاریخ: <span style="font-family: iran-sans; font-size: .8em; color: #fff;">{{transaction.date}}</span>
                            </p>

                        </div>

                    </div>


                    <div class="col-xs-11 col-sm-11 col-md-10 col-lg-10 container-fluid"
                         style="box-sizing: content-box; margin-top: 32px; margin-bottom: 32px; direction: rtl" dir="rtl">
                        <p style="font-size: 0.9em; font-family: iran-yekan; color: #000000; direction: rtl" dir="rtl">این فاکتور به درخواست شما برای ثبت سفارش یک سرویس ابری به مشخصات زیر صادر شده است:</p>
                        <div class="row" style="box-sizing: content-box; margin-top: 32px; direction: rtl" dir="rtl">

                            <div style="width:100%; border: 2px solid #0045ff; border-radius: 3px; position: relative;  box-sizing: border-box; direction: rtl" dir="rtl">
                                <table style="width: 100%;border-collapse: collapse; border: none; margin: 6px 0; direction: rtl; table-layout: fixed;" dir="rtl">
                                    <tr class="head">
                                        <td >نام سفارش</td>
                                        <td >تعداد</td>
                                        <td >واحد شمارش</td>
                                        <td >قیمت واحد (تومان)</td>
                                        <td >قیمت کل (تومان)</td>
                                    </tr>
                                </table>
                            </div>

                            <BillRow
                                    v-for="item in transaction.items"
                                    v-bind:bill="item"
                                    :key="item.id"></BillRow>

                        </div>

                        <div class="row"
                             style="height: 1px; background-color: #7c7c7c;box-sizing: content-box; margin-top: 16px"></div>

                        <div class="row" style="margin-top: 16px">
                            <p class="col-xs-12 col-md-6 col-sm-6 col-lg-6"
                               style="text-align: center; font-size: 0.9em; color: #000;display: inline-block; margin-right: auto; margin-left: auto">
                                مبلغ پرداخت شده: <span style="font-family: iran-sans; font-size: 1em; color: #222">{{Number(transaction.transactionAmount).toLocaleString()}} تومان</span>
                            </p>
                            <p class="col-xs-12 col-md-6 col-sm-6 col-lg-6"
                               v-if="transaction.payment_type === 'PLAN' && transaction.month_count !== 0"
                               style="text-align: center; font-size: 0.9em; color: #000;display: inline-block">
                                برای مدت: <span style="font-family: iran-sans; font-size: 1em; color: #222">{{transaction.month_count}} ماه</span>
                            </p>
                            <p class="col-xs-12 col-md-6 col-sm-6 col-lg-6"
                               v-else-if="transaction.payment_type === 'PLAN' && transaction.month_count === 0"
                               style="text-align: center; font-size: 0.9em; color: #000;display: inline-block">ارتقا منابع</p>
                        </div>

                    </div>
                </div>

            </div>
    </div>
</template>

<script>
    import {getValue} from "../../../utils/cookie";
    import BillRow from "../../../components/Dashboard/plans/bill/bill-row";

    export default {
        name: "transaction-details",
        layout: 'dashboard',
        components: {
            BillRow,
        },
        data() {
            return {
                transactions: {}
            }
        },
        created() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
        },
        computed: {
            transaction() {
                this.transactions = this.$store.state.transactionDetail;
                return this.$store.state.transactionDetail
            },
            username() {
                return getValue("username");
            },
            namespace() {
                return sessionStorage.getItem("namespace");
            }
        },
        beforeDestroy() {
            this.$store.commit('SET_DATA', {id: 'transactionDetail', data: {}})
        },
        methods: {
        }
    }
</script>

<style lang="stylus" scoped>

    *::-webkit-scrollbar
        width 0
        height 0
        background transparent


    tr.head
        height 20px
        border-collapse collapse
        border none

    tr.head td
        font-family yekan-bold
        font-size 12px
        line-height 20px
        color #4a4a4a
        text-align center
        border-left 2px solid #0045ff

    tr.head td:last-child
        border none


    .plan
        padding 45px
        background #ffffff

    .plan-heading
        font-size 18px
        @media (max-width: 490px)
            font-size 16px

    .plan-details
        display flex
        flex-direction column

        p
            margin-bottom 25px
            font-weight bold
            font-size 16px
            line-height 1.75
            @media (max-width: 490px)
                font-size 14px

    .plan-box
        display inline-block
        max-width 100%

    .plan-inner
        padding 60px 50px
        border-radius 10px
        background-color #ffffff
        box-shadow 0 0 6px 0 rgba(0, 0, 0, 0.16)
        @media (max-width: 490px)
            padding 50px

    .plan-heading
        display flex
        flex-direction column
        justify-content center
        align-items center

        h3
            font-size 18px
            @media (max-width: 490px)
                font-size 14px

    .plan-divider
        height 2px
        background-color #e7e8ea

    .plan-config
        display flex
        flex-direction row
        justify-content space-around
        align-items center
        margin-top 25px

    .plan-information
        display flex
        flex-direction column
        justify-content space-around
        align-items center
        font-size 16px
        @media (max-width: 490px)
            font-size 12px

    .plan-information > span + span
        margin-top 10px

    .plan-information + .plan-information
        margin-right 10px

    .plan-image img
        width 30px
        @media (max-width: 490px)
            width 24px

    .plan-price
        margin-top 60px
        border solid 1px #b5b5b5
        border-radius 10px
        background-color #f0f4f8
        text-align center

    .plan-h3
        font-size 20px
        line-height 1.75
        @media (max-width: 490px)
            font-size 16px

    .plan-payment
        padding 32px
        @media (max-width: 490px)
            font-size 14px

    .back-btn
        display flex

    .plan-name
        font-family 'Roboto'

    .plan-info
        font-weight bold
        font-family 'Roboto'

    .action-container
        margin-top 32px
        white-space nowrap

        button
            height 40px
            float right
            font-size 0.9em
            font-family iran-yekan
            text-align center
            cursor pointer
            border none
            outline none
            border-radius 3px
            @media only screen and (max-width: 970px)
                margin-top 12px

</style>
