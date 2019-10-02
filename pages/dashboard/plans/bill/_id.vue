<template>
    <div v-if="!loading">
        <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12 container-fluid"
             style="margin-top: 32px">

            <nuxt-child/>

            <div class="col-xs-12 col-sm-11 col-md-10 col-lg-10 container-fluid"
                 style="border-radius: 3px; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); background-color: #ffffff;
                    box-sizing: content-box; padding: 0; max-width: 1700px">

                <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12" style="width: 100%;height: content-box;
            background-color: #0045ff; margin: 0; border-top-left-radius: 3px;
                    border-top-right-radius: 3px; padding: 16px; display: inline-flex">

                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12"
                         style="display: block;margin: 0;">

                        <img src="../../../../assets/svg/ic-fandogh-mini.svg"
                             style="width: 30%; height: auto; margin-left: auto; margin-right: auto; position:relative; display: block"/>

                        <p style="margin: 16px 0 0 0;text-align: center; font-size: 1.4em; color: #fff; font-family: iran-yekan">
                            فاکتور سرویس ابری</p>

                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12"
                         style="margin:auto;">

                        <p style="margin: 5px 0 0 0; font-family: iran-yekan; font-size: 1em; color: #fff; text-align: right">
                            <span style="font-family: iran-yekan; font-size: 1.1em; color: #fff;">صادر کننده:</span> سکو
                            ابری
                            فندق</p>

                        <p style="margin: 5px 0 0 0; font-family: iran-yekan; letter-spacing: 0.05em; font-size: 1em; color: #fff; text-align: right">
                            <span style="font-family: iran-yekan; font-size: 1.1em; color: #fff;">سفارش دهنده:</span>
                            {{username}}</p>

                        <p style="margin: 5px 0 0 0; font-family: iran-yekan; letter-spacing: 0.05em; font-size: 1em; color: #fff; text-align: right">
                            <span style="font-family: iran-yekan; font-size: 1.1em; color: #fff;">فضانام:</span>
                            {{namespace}}</p>

                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12"
                         style="margin: auto;">

                        <p style="margin: 5px 0 0 0; font-family: iran-yekan; font-size: 1.1em; color: #fff; text-align: right">
                            شماره سفارش: <span
                                style="font-family: iran-sans; font-size: .8em; color: #fff;padding-left: 6px;">{{invoice.id}}</span>
                        </p>

                        <p style="margin: 5px 0 0 0; font-family: iran-yekan; font-weight: normal; font-size: 1.1em; color: #fff; text-align: right">
                            تاریخ: <span style="font-family: iran-sans; font-size: .8em; color: #fff;">{{date}}</span>
                        </p>
                        <p style="margin: 5px 0 0 0; font-family: iran-yekan; font-weight: normal; font-size: 1.1em; color: #fff; text-align: right">
                            ساعت: <span style="font-family: iran-sans; font-size: .8em; color: #fff;">{{time}}</span>
                        </p>

                    </div>

                </div>


                <div class="col-xs-12 col-sm-11 col-md-10 col-lg-10 container-fluid"
                     style="box-sizing: content-box; margin-top: 32px; margin-bottom: 32px;">
                    <p style="font-size: 0.9em; font-family: iran-yekan; color: #000000;">این فاکتور به درخواست شما برای
                        ثبت
                        سفارش یک سرویس ابری به مشخصات زیر صادر شده است:</p>

                    <div class="row" style="box-sizing: content-box; margin-top: 32px;">

                        <div style="width:100%; border: 2px solid #0045ff; border-radius: 3px; position: relative; box-sizing: border-box; overflow-x: scroll">
                            <table style="width: 100%;min-width: 900px; border-collapse: collapse; border: none; margin: 6px 0;">
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
                                v-for="item in invoice.items"
                                v-bind:bill="item"
                                :key="item.id"></BillRow>

                    </div>

                    <div class="row"
                         style="height: 1px; background-color: #7c7c7c;box-sizing: content-box; margin-top: 16px"></div>

                    <div class="row" style="margin-top: 16px">
                        <p class="col-xs-12 col-md-6 col-sm-6 col-lg-6"
                           style="text-align: center; font-size: 0.9em; color: #000;display: inline-block; margin-right: auto; margin-left: auto">
                            مبلغ قابل پرداخت: <span style="font-family: iran-sans; font-size: 1em; color: #222">{{Number(invoice.total).toLocaleString()}} تومان</span>
                        </p>
                        <p class="col-xs-12 col-md-6 col-sm-6 col-lg-6"
                           v-if="invoice.payment_type === 'PLAN' && invoice.month_count !== 0"
                           style="text-align: center; font-size: 0.9em; color: #000;display: inline-block">
                            برای مدت: <span style="font-family: iran-sans; font-size: 1em; color: #222">{{invoice.month_count}} ماه</span>
                        </p>
                        <p class="col-xs-12 col-md-6 col-sm-6 col-lg-6"
                           v-else-if="invoice.payment_type === 'PLAN' && invoice.month_count === 0"
                           style="text-align: center; font-size: 0.9em; color: #000;display: inline-block">
                             ارتقا منابع پلن فعلی
                        </p>
                    </div>

                </div>
            </div>

            <div class="col-xs-12 col-sm-11 col-md-10 col-lg-10 container-fluid"
                 style="box-sizing: content-box; margin-top: 32px; margin-bottom: 32px;">

                <div style="box-sizing: content-box; margin-top: 32px; padding-right: 32px; padding-left: 32px">

                    <ul>
                        <li style="font-family: iran-yekan; font-size: 0.8em; text-align: right; color: #0045ff; letter-spacing: normal; line-height: 1.75; margin-top: 12px">
                            در صورت تایید و ادامه٬ شما با تمام جزئیات مطرح در فاکتور صادر شده موافق بوده و سکوی ابری فندق
                            هیچ گونه مسئولیتی
                            در قبال مشکلات احتمالی ناشی از اشتباه کاربر در بررسی صحت و درستی فاکتور را ندارد.
                        </li>

                        <li style="font-family: iran-yekan; font-size: 0.8em; text-align: right; color: #0045ff; letter-spacing: normal; line-height: 1.75; margin-top: 12px">
                            همچنین شما زودتر از موعد سررسید پلن خود نمی‌توانید پلن انتخاب شده را تنزل داده و از منابع آن کم کنید.
                        </li>

                        <li style="font-family: iran-yekan; font-size: 0.8em; text-align: right; color: #0045ff; letter-spacing: normal; line-height: 1.75; margin-top: 12px">
                            تعداد ماه‌ها تنها برای فاکتور منظور می‌گردد و این بدان معنی نیست که پلن قبلی از بین می‌رود؛ بلکه تفاوت محاسبه و پلن فعلی به قبلی اضافه می‌شود.
                        </li>

                        <li style="font-family: iran-yekan; font-size: 0.8em; text-align: right; color: orangered; letter-spacing: normal; line-height: 1.75; margin-top: 12px">
                            هزینه <strong style="text-decoration: underline">پردازنده</strong> در محاسبات٬ بر روی حافظه رم محاسبه می‌شود و در حال حاضر سکوی ابری فندق پردازنده را به صورت تابعی از رم به فروش میرساند.
                        </li>

                    </ul>


                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row action-container">
                    <button class="col-xs-12 col-sm-5 col-md-5 col-lg-3 container-fluid"
                            style="color: #fff; background-color: #7ed321; box-shadow: 0 2px 6px 0 rgba(126, 211, 33, 0.42);"
                            @click="pay">تایید و پرداخت
                    </button>

                    <button @click="$router.push('/dashboard/plans')"
                            class="col-xs-12 col-sm-5 col-md-5 col-lg-3 container-fluid"
                            style="color: #000; background-color: #ffffff; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07);">
                        ویرایش سفارش
                    </button>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import FButton from "~/components/elements/button";
    import {getValue} from "~/utils/cookie";
    import BillRow from "../../../../components/Dashboard/plans/bill/bill-row";
    import Moment from 'moment-jalaali';
    import ErrorReporter from "~/utils/ErrorReporter";


    export default {
        components: {
            BillRow,
            FButton,
            Moment
        },
        layout: "dashboard",
        data() {
            return {
                invoice: {},
                invoice_id: this.$route.params.id,
                items: [],
                jDate: '',
                jTime: '',
            };
        },
        methods: {
            async pay() {
                try {
                    this.$store.commit("SET_DATA", {data: true, id: "loading"});
                    await this.$store.dispatch('plan/requestPayment', this.invoice_id);
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    window.location = this.$store.state.plan.requestedPayment.payment_url;
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
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
                }
            }, async requestInvoice() {

                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                await this.$store
                    .dispatch('plan/reloadPlan', this.invoice_id)
                    .then(response => {
                        console.log(response)
                        this.invoice = response.invoice;
                        this.items = response.invoice.items;
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    })
                    .catch(e => {
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
            }
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
            date() {
                return Moment(this.invoice.created_at).format('jYYYY/jMM/jDD');
            },
            time() {
                return Moment(this.invoice.created_at).format('HH:mm');
            },
            diff() {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].total_price < 0) {
                        return this.items[i].total_price;
                    }
                }
                return 0;
            }
        }, created() {
            this.requestInvoice();
        }
    };
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
