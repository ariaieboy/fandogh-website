<template>
    <div class="row" v-if="!loading">
        <nuxt-child/>

        <div class="col-xs-12 col-sm-11 col-md-10 col-lg-10 container-fluid"
             style="border-radius: 3px; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); background-color: #ffffff;
                    box-sizing: content-box; padding: 0">

            <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12" style="width: 100%;height: content-box;
            background-color: #2979ff;margin: 0; border-top-left-radius: 3px;
                    border-top-right-radius: 3px; padding-left: 16px; padding-right: 16px; display: inline-flex">

                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"
                     style="display: block;margin: 0; padding-top: 16px; padding-bottom: 16px;">

                    <img src="../../../assets/svg/ic-fandogh-mini.svg"
                         style="width: 30%; height: auto; margin-left: auto; margin-right: auto; position:relative; display: block"/>

                    <p style="margin: 16px 0 0 0;text-align: center; font-size: 1.4em; color: #fff; font-family: IRANYekan">
                        فاکتور سرویس ابری</p>

                </div>

                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"
                     style="margin:auto;">

                    <p style="font-family: yekan-light; font-size: 0.8em; color: #fff; text-align: center">
                        <span style="font-family: IRANYekan; font-size: 1em; color: #fff;">صادر کننده:</span> سکو ابری فندق</p>

                    <p style="font-family: yekan-light; font-size: 0.8em; color: #fff; text-align: center">
                        <span style="font-family: IRANYekan; font-size: 1em; color: #fff;">سفارش دهنده:</span> Botick</p>

                    <p style="font-family: 'yekan-light'; font-size: 0.8em; color: #fff; text-align: center">
                        <span style="font-family: IRANYekan; font-size: 1em; color: #fff;">شماره سفارش:</span> 1234-xxWY-T12GH-2345</p>

                </div>

                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"
                     style="margin: auto;">

                    <p style="font-family: yekan-light; font-size: 0.8em; color: #fff; text-align: center">
                        <span style="font-family: IRANYekan; font-size: 1em; color: #fff;">تاریخ:</span>
                        ۱۲/۱۲/۱۳۹۷ </p>
                    <p style="font-family: yekan-light; font-size: 0.8em; color: #fff; text-align: center">
                        <span style="font-family: IRANYekan; font-size: 1em; color: #fff;">ساعت:</span>
                        ۲۰:۳۱ </p>

                </div>

            </div>


            <div class="col-xs-12 col-sm-11 col-md-10 col-lg-10 container-fluid" style="box-sizing: content-box; margin-top: 32px; margin-bottom: 32px;">
                <p style="font-size: 0.9em; font-family: IRANYekan; color: #000000;">این فاکتور به درخواست شما برای ثبت سفارش یک سرویس ابری به مشخصات زیر صادر شده است:</p>

                <div style="box-sizing: content-box; margin-top: 32px">

                    <div style="width:100%; border: 2px solid #4a90e2; border-radius: 3px; position: relative; box-sizing: border-box">
                        <table style="width: 100%; border-collapse: collapse; border: none; margin: 6px 0;">
                            <tr class="head">
                                <td width="26%">نام سفارش</td>
                                <td width="17%">تعداد</td>
                                <td width="17%">واحد شمارش</td>
                                <td width="20%">قیمت واحد (تومان)</td>
                                <td width="20%">قیمت کل (تومان)</td>
                            </tr>
                        </table>
                    </div>

                    <BillRow
                            v-for="item in bill.items"
                            v-bind:bill="item"></BillRow>

                </div>

                <div class="row" style="margin-top: 16px">
                    <p class="col-xs-12 col-md-6 col-sm-6 col-lg-6" style="text-align: left; padding-left: 48px; font-size: 0.9em">مجموع کل:
                        <span style="font-family: 'IRANYekanMobile(FaNum)'; font-size: 1em; color: #222">{{bill.sum}} تومان</span></p>
                    <p class="col-xs-12 col-md-6 col-sm-6 col-lg-6" style="padding-right: 48px; font-size: 0.9em">تاریخ انقضا سرویس:
                        <span style="font-family: 'IRANYekanMobile(FaNum)'; font-size: 1em; color: #222">{{bill.date}}</span></p>
                </div>

            </div>
        </div>

        <div class="col-xs-12 col-sm-11 col-md-10 col-lg-10 container-fluid" style="box-sizing: content-box; margin-top: 32px; margin-bottom: 32px;">

            <div style="box-sizing: content-box; margin-top: 32px; padding-right: 32px; padding-left: 32px">

                <p style="font-family: IRANYekan; font-size: 0.8em; text-align: right; color: #4a90e2; letter-spacing: normal;">
                    در صورت ادامه و تایید شما با تمام جزئیات مطرح شده در فاکتور صادره شده موافق بوده و سکو ابری فندق هیچ مسئولیتی
                    در قبال مشکلات احتمالی ناشی از اشتباه کاربر در بررسی صحت و درستی فاکتور را ندارد.<br>
                    همچنین شما حداقل تا یک ماه نمی‌توانید پلن انتخاب شده را تنزل داده و از منابع آن کم کنید.
                </p>


            </div>

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row" style="margin-top: 32px; white-space: nowrap">
                <button class="col-xs-12 col-sm-5 col-md-5 col-lg-3 container-fluid"
                        style="height: 40px; border-radius: 3px;box-shadow: 0 2px 6px 0 rgba(126, 211, 33, 0.42);
                        font-size: 0.9em;font-family: IRANYekan;color: #fff;text-align: center;
                border: none;outline: none;background-color: #7ed321;">
                    تایید و پرداخت

                </button>


                <button @click="$router.push('/dashboard/plans')" class="col-xs-12 col-sm-5 col-md-5 col-lg-3 container-fluid"
                        style="height: 40px; float: right;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07);
                        font-size: 0.9em;font-family: IRANYekan;color: #000;text-align: center;
                        background-color: #ffffff;border: none; outline: none; border-radius: 3px;">
                    ویرایش سفارش
                </button>
            </div>

        </div>
        <!--<div class="col-md-8 col-sm-12 col-xs-12">-->
        <!--<div class="plan">-->
        <!--<div class="row">-->
        <!--<div class="col-md-4">-->
        <!--<img src="/icons/fandogh-logo.png">-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="row center-md center-xs">-->
        <!--<div class="col-md-6 col-xs-12 col-sm-12">-->
        <!--<h2 class="plan-heading">صورت حساب شما</h2>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="row">-->
        <!--<div class="col-md-6 col-xs-12 col-sm-12">-->
        <!--<div class="plan-details">-->
        <!--<p>نام مشتری : {{username}}</p>-->
        <!--<p>نام فضا : {{namespace}}</p>-->
        <!--<p>طرح انتخابی : {{bill.memory.local_name}}</p>-->
        <!--<p>هزینه پلن : {{}}</p>-->
        <!--<p>مالیات بر ارزش افزوده : {{tax}}</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="col-md-6 col-xs-12 col-sm-12">-->
        <!--<div class="plan-box">-->
        <!--<div class="plan-inner">-->
        <!--<div class="plan-heading">-->
        <!--<img :src="'/icons/plans/services-icon/' ">-->
        <!--<h3>{{}}</h3>-->
        <!--</div>-->
        <!--<div class="plan-divider"></div>-->
        <!--<div class="plan-config">-->
        <!--<div class="plan-information">-->
        <!--<span class="plan-image">-->
        <!--<img src="/icons/plans/cpu.png">-->
        <!--</span>-->
        <!--<span class="plan-name font-roboto">CPU</span>-->
        <!--<span class="plan-info">{{}}</span>-->
        <!--</div>-->
        <!--<div class="plan-information">-->
        <!--<span class="plan-image">-->
        <!--<img src="/icons/plans/ram.png">-->
        <!--</span>-->
        <!--<span class="plan-name font-roboto">RAM</span>-->
        <!--<span class="plan-info">{{}}</span>-->
        <!--</div>-->
        <!--<div class="plan-information">-->
        <!--<span class="plan-image">-->
        <!--<img src="/icons/plans/storage.png">-->
        <!--</span>-->
        <!--<span class="plan-name font-roboto">STORAGE</span>-->
        <!--<span class="plan-info">{{}}</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="row">-->
        <!--<div class="col-md-12 col-xs-12 col-sm-12">-->
        <!--<div class="plan-price">-->
        <!--<h3 class="plan-h3">{{addTaxToPrice}}</h3>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="row center-md">-->
        <!--<div class="col-md-10 col-xs-12 col-sm-12">-->
        <!--<div class="plan-payment">-->
        <!--<h3-->
        <!--class="plan-h3"-->
        <!--&gt;برای خرید این پلن لطفا مبلغ قابل پرداخت را به شماره حساب ۶۲۱۹-۸۶۱۰-۲۱۰۴-۲۳۱۳ واریز فرمایید و شماره پیگیری را برای support@fandogh.cloud ارسال کنید.</h3>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="row end-md">-->
        <!--<div class="col-md-12 col-xs-12 col-sm-12">-->
        <!--<div class="back-btn">-->
        <!--<f-button @onClick="$router.push('/dashboard/plans')" styles="red small login">بازگشت</f-button>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import FButton from "~/components/elements/button";
    import {getValue} from "~/utils/cookie";
    import BillRow from "../../../components/Dashboard/plans/bill/bill-row";

    export default {
        components: {
            BillRow,
            FButton
        },
        layout: "dashboard",
        data() {
            console.log(this.$route.params['bill']);
            return {
                bill: this.$route.params['bill'],
            };
        },
        destroyed() {
        },
        mounted() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
        },
        computed: {
            loading() {
                return this.$store.state.loading;
            },
            username() {
                return getValue("username");
            },
            namespace() {
                return getValue("namespace");
            },
            index() {
                return this.$route.params.id - 1;
            },
            plan() {
                return this.$store.state.plan.plans[this.index];
            },
            addTaxToPrice: function () {
                const price = parseInt(0);
                if (price === 0) return "رایگان";
                const tax = Math.ceil(9 * price) / 100;
                const taxedPrice = tax + price;
                return `مبلغ قابل پرداخت ${taxedPrice.toLocaleString("fa-EG")} تومان`;
            },
            tax: function () {
                const price = parseInt(0);
                if (price === 0) return "رایگان";
                const finalPrice = Math.ceil(9 * price) / 100;
                return `${finalPrice.toLocaleString("fa-EG")} تومان`;
            }
        }
    };
</script>

<style lang="stylus" scoped>


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
        border-left 2px solid #4a90e2

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
</style>