<template>
    <div v-if="!loading">
        <nuxt-child/>

        <div class="col-lg-12 col-md-12 col-xs-12" style="height: 48px; width: 100%;">
            <img src="../../../assets/svg/my-plan.svg" alt="plan" class="section-title-image" align="right"/>
            <h1 class="service-plan-heading">پلن‌های پیشنهادی</h1>
        </div>

        <plan v-bind.sync="planData"/>

        <div class="notice"><p>توجه داشته باشید قیمت‌ پلن‌ها به صورت ماهیانه محاسبه می‌شوند</p></div>

        <div class="row">
            <div class="vol-lg-8 col-sm-8 col-md-8 col-xs-12" style="position: relative">

                <div class="col-lg-12 col-md-12 col-xs-12" style="height: 48px; width: 100%;margin-top: 30px">
                    <img src="../../../assets/svg/plan-customization.svg" alt="plan" class="section-title-image"
                         align="right"/>

                    <h1 class="service-plan-heading">شخصی‌سازی پلن</h1>
                </div>

                <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 plan-feature-title">

                    <h3 class="customization-title">حافظه تصادفی (رم)</h3>
                    <div></div>

                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: 16px;">

                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-3" style="height: 100%;">
                        <img style="transform: rotate(-45deg)" class="feature-image"
                             src="../../../assets/svg/ic-memory.svg" alt="memory"></img>
                    </div>

                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-9"
                         style="display: block; float: right; position: relative;">

                        <p class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                           style="margin: 0;color: #0045ff; font-size: 0.9em">
                            به ازای هر گیگابایت رم٬ نیم هسته پردازنده به شما تعلق خواهد گرفت
                        </p>

                        <div class="row col-lg-12 col-sm-12 col-md-12 col-xs-12"
                             style="display: flex; margin-top: 16px;float: left;">

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 feature-label-container">
                                <label class="feature-label">
                                    <input class="input" value="cpu" v-model="cpu" disabled
                                           style="color: #606060;">
                                    هسته
                                </label>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 feature-label-container">


                                <div style="display: block; width: 16px; margin: auto 0 auto 7px;">
                                    <div v-on:click="incMemory" class="man-button" style="margin: 0 0 2px 0;">
                                        <img alt="plus"
                                             src="../../../assets/svg/ic-plus.svg"/>
                                    </div>

                                    <div v-on:click="decMemory" class="man-button" style="margin: 2px 0 0 0">
                                        <img alt="minus"
                                             src="../../../assets/svg/ic-minus.svg"/>
                                    </div>
                                </div>

                                <label class="feature-label">
                                    <input
                                            disabled
                                            class="input"
                                            type="number"
                                            value="planData.memory"
                                            v-model="planData.memory">
                                    گیگابایت
                                </label>
                            </div>

                            <vue-slider class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                        style="margin-top: 20px;"
                                        v-model="planData.memory"
                                        v-bind="memoryOptions"/>
                            <div class="range-title">
                                <p>{{memoryRangeMin}}</p>
                                <p style="float: left;">{{memoryRangeMax}}</p>
                            </div>

                            <p class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                               style="margin: 0;color: #3ccc38; font-size: 11px">
                                هزینه هر گیگابایت رم ۶۰ هزارتومان است</p>
                        </div>

                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 plan-feature-title">

                    <h3 class="customization-title">حافظه ذخیره‌سازی</h3>
                    <div></div>

                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: 16px;">

                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-3" style="height: 100%;">
                        <img class="feature-image"
                             src="../../../assets/svg/ic-dedicated-volume.svg" alt="zone"></img>
                    </div>

                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-9"
                         style="display: block; float: right; position: relative;">
                        <div class="row col-lg-12 col-sm-12 col-md-12 col-xs-12"
                             style="display: flex; margin-top: 16px;float: left;">

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 feature-label-container">

                                <div style="display: block; width: 16px; margin: auto 0 auto 7px; box-shadow: transparent">
                                    <div v-on:click="incDedicatedVolume" class="man-button" style="margin: 0 0 2px 0;">
                                        <img alt="plus"
                                             src="../../../assets/svg/ic-plus.svg"/>
                                    </div>

                                    <div v-on:click="decDedicatedVolume" class="man-button" style="margin: 2px 0 0 0">
                                        <img alt="minus"
                                             src="../../../assets/svg/ic-minus.svg"/>
                                    </div>
                                </div>

                                <label class="feature-label">
                                    <input class="input"
                                           type="number"
                                           disabled
                                           value="planData.dedicatedVolume"
                                           v-model="planData.dedicatedVolume">
                                    گیگابایت
                                </label>
                            </div>

                            <vue-slider class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                        style="margin-top: 20px;"
                                        v-model="planData.dedicatedVolume"
                                        v-bind="dedicatedVolumeOptions"/>

                            <div class="range-title">
                                <p>{{dedicatedVolumeMin}}</p>
                                <p style="float: left;">{{dedicatedVolumeMax}}</p>
                            </div>

                            <p v-if="planData.dedicatedVolume < 10"
                               style="margin: auto;color: white; font-size: 11px; text-align: center;
                               background-color: orangered; border-radius: 25px; padding: 7px 12px">
                                حداقل میزان فضای قابل سفارش ۱۰ گیگابایت می‌باشد!</p>

                            <p class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                               style="margin: 16px 0 0 0;color: #3ccc38; font-size: 11px">
                                هزینه هر گیگابایت حافظه ذخیره‌سازی ۱۲۰۰ تومان است</p>

                        </div>

                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 plan-feature-title">

                    <h3 class="customization-title">ویژگی‌های رایگان</h3>
                    <div></div>

                </div>

                <div class="between-xs free-features-container">

                    <Feature v-for="(feature, index) in features"
                             :key="index"
                             :item="feature"/>

                </div>
            </div>

            <div class="container-fluid col-md-4 col-lg-4 col-sm-4 col-xs-12" :class="['checkout-box', {open}]">
                <div :class="['row' , (open ? 'expanded-invoice' : 'collapsed-invoice')]" class="row"
                     style="margin-bottom: -1px;">
                    <div class="one" @click="translateCheckoutBox" style="cursor: pointer;">
                        <img src="../../../assets/svg/arrow.svg" alt="arrow" style="cursor: pointer"/>
                    </div>
                    <div class="two">

                    </div>
                </div>

                <div class="row" style="background-color: #fefefe;">
                    <div style="flex: 1;">
                        <p style="font-family: iran-yekan; font-size: 1.1em; padding: 6px 16px; margin-bottom: 0;
                        background-color: rgba(233,236,245,0.5);">منابع
                            فعلی</p>

                        <div style="display: flex; flex-direction: column; padding: 6px 16px 6px 24px;">
                            <div style="display: flex; flex: 1; flex-direction: row">
                                <p style="margin-bottom: 0; width: max-content; font-size: 1em">حافظه تصادفی (رم)</p>
                                <p v-if="memory > 0.49"
                                   style="font-family: iran-sans; color: #0045ff; text-align: left; line-height: 1.75;
                                   margin-right: auto; margin-bottom: 0; font-size: 1em">
                                    {{memory}} گیگابایت
                                </p>
                                <p v-else
                                   style="font-family: iran-sans; color: #0045ff; text-align: left; line-height: 1.75;
                                   margin-right: auto; margin-bottom: 0; font-size: 1em">
                                    ۴۰۰ مگابایت
                                </p>
                            </div>

                        </div>
                        <div style="display: flex; flex-direction: column; padding: 6px 16px 6px 24px;">
                            <div style="display: flex; flex: 1; flex-direction: row">
                                <p style="margin-bottom: 0; width: max-content; font-size: 1em">حافظه ذخیره‌سازی</p>
                                <p v-if="memory > 0.49"
                                   style="font-family: iran-sans; color: #0045ff; text-align: left; line-height: 1.75;
                                   margin-right: auto; margin-bottom: 0; font-size: 1em">
                                    {{dedicatedVolume.toLocaleString()}} گیگابایت
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="row" style="padding-top: 8px; background-color: #fefefe">
                    <div style="flex: 1;">
                        <p style="font-family: iran-yekan; font-size: 1.1em; padding: 6px 16px; margin-bottom: 0;
                        background-color: rgba(233,236,245,0.5);">منابع
                            سفارشی</p>
                        <div style="display: flex; flex-direction: column; padding: 6px 16px 6px 24px;">
                            <div style="display: flex; flex: 1; flex-direction: row">
                                <p style="margin-bottom: 0; width: max-content; font-size: 1em">حافظه تصادفی (رم)</p>
                                <p style="font-family: iran-sans; color: #0045ff; text-align: left; line-height: 1.75;
                                   margin-right: auto; margin-bottom: 0; font-size: 1em">
                                    {{planData.memory.toLocaleString()}} گیگابایت
                                </p>
                            </div>

                        </div>
                        <div style="display: flex; flex-direction: column; padding: 6px 16px 6px 24px;">
                            <div style="display: flex; flex: 1; flex-direction: row">
                                <p style="margin-bottom: 0; width: max-content; font-size: .9em">حافظه ذخیره‌سازی</p>
                                <p v-if="memory > 0.49"
                                   style="font-family: iran-sans; color: #0045ff; text-align: left; line-height: 1.75;
                                   margin-right: auto; margin-bottom: 0; font-size: .9em">
                                    {{(planData.dedicatedVolume >= 10 ? planData.dedicatedVolume.toLocaleString() : 0)}}
                                    گیگابایت
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div v-if="memory > .4" class="row" style="padding-top: 8px;background-color: #fefefe">
                    <div style="flex: 1;">
                        <p style="font-family: iran-yekan; font-size: 1.1em; padding: 6px 16px; margin-bottom: 0; background-color: rgba(233,236,245,0.5);">
                            ارتقا منابع پلن</p>
                        <p v-if="!is_upgrading_plan" style="font-family: iran-sans; color: #2c2c2c; text-align: right; line-height: 1.75;
                                   padding: 6px 16px; margin-bottom: 0; font-size: 1em">
                            در صورتی که قصد ارتقا منابع پلن فعلی را دارید بر روی دکمه زیر کلیک کنید
                        </p>
                        <p v-else style="font-family: iran-sans; color: #2c2c2c; text-align: right; line-height: 1.75;
                                   padding: 6px 16px; margin-bottom: 0; font-size: 1em">
                            شما در حال ارتقا منابع فعلی هستید
                        </p>

                        <div style="padding: 6px 16px">
                            <button class="upgrade-button" :class="{'enabled':is_upgrading_plan}"
                                    @click="is_upgrading_plan = !is_upgrading_plan">
                                افزایش منابع پلن فعلی
                            </button>
                        </div>

                    </div>
                </div>

                <div class="row" v-if="!is_upgrading_plan" style="padding-top: 8px; background-color: #fefefe">
                    <div style="flex: 1;">
                        <p style="font-family: iran-yekan; font-size: 1.1em; padding: 6px 16px; margin-bottom: 0; background-color: rgba(233,236,245,0.5);">
                            مدت اعتبار پلن</p>
                        <v-select
                                dir="rtl"
                                :clearable="false"
                                :searchable="false"
                                label="title"
                                style="margin-bottom: 0 !important; width: 100%; padding: 6px 16px 6px 4px;"
                                v-model="selectedMonth"
                                :options="monthList"
                                @input="monthChanged"
                                placeholder="مدت اعتبار پلن">
                        </v-select>
                    </div>
                </div>

                <div class="row" style="padding-top: 8px; background-color: #fefefe">
                    <div style="flex: 1;">
                        <p style="font-family: iran-yekan; font-size: 1.1em; padding: 6px 16px; margin-bottom: 0; background-color: rgba(233,236,245,0.5);">
                            مبلغ نهایی</p>
                        <div style="display: flex; flex-direction: column; padding: 6px 16px 6px 24px;">
                            <div style="display: flex; flex: 1; flex-direction: row">
                                <p style="margin-bottom: 0; width: max-content; font-size: 1em">فعلی</p>
                                <p v-if="memory > 0.49"
                                   style="font-family: iran-sans; color: #0045ff; text-align: left; line-height: 1.75;
                                   margin-right: auto; margin-bottom: 0; font-size: 1em">
                                    {{fixedTotal.toLocaleString() + 'تومان '}}
                                </p>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; padding: 6px 16px 6px 24px;">
                            <div style="display: flex; flex: 1; flex-direction: row">
                                <p style="margin-bottom: 0; width: max-content; font-size: 1em">سفارش</p>
                                <p v-if="memory > 0.49"
                                   style="font-family: iran-sans; color: #0045ff; text-align: left; line-height: 1.75;
                                   margin-right: auto; margin-bottom: 0; font-size: 1em">
                                    {{total === '0' ? '۰ تومان' : total + ' تومان'}}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row" style="padding-top: 8px; background-color: #fefefe">
                    <div style="flex: 1;">
                        <p style="font-family: iran-yekan; font-size: 1.1em; padding: 6px 16px; margin-bottom: 0; background-color: rgba(233,236,245,0.5);">
                            کد تخفیف</p>
                        <div style="display: flex; flex-direction: column; padding: 6px 16px 6px 24px;">
                            <v-text-field
                                    type="text"
                                    style=" direction: rtl !important;"
                                    dir="ltr"
                                    :placeholder="'کد تخفیف را اینجا وارد نمایید'"
                                    v-model="finalBill.voucher_code">
                            </v-text-field>
                        </div>
                    </div>
                </div>

                <div class="row" style="padding: 16px; background-color: #fefefe">
                    <button class="checkout" @click="pushUrl">
                        ثبت نهایی و مشاهده فاکتور
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import PanelBox from "~/components/Dashboard/plans/panel-box/section-box.vue";
    import FPanels from "~/components/Dashboard/plans/panel-box";
    import FActivePlan from "~/components/Dashboard/plans/active-plan/panel";
    import FActivePlanBox from "~/components/Dashboard/plans/active-plan";
    import {getValue} from "~/utils/cookie";
    import Plan from "~/components/Plan";
    import Moment from 'moment-jalaali';
    import Feature from '~/components/Plan/feature.vue';
    import 'vue-slider-component/theme/default.css';
    import ErrorReporter from "~/utils/ErrorReporter";

    export default {
        layout: "dashboard",
        name: "plans",

        data: function () {
            return {
                is_upgrading_plan: false,
                planData: {
                    memory: 0,
                    cpu: 0,
                    dedicatedVolume: 0,
                },
                selectedMonth: {
                    title: '۳۰ روز',
                    value: 1
                },
                monthList: [
                    {
                        title: '۳۰ روز',
                        value: 1
                    },
                    {
                        title: '۲ ماه',
                        value: 2
                    },
                    {
                        title: '۳ ماه',
                        value: 3
                    },
                    {
                        title: '۴ ماه',
                        value: 4
                    },
                    {
                        title: '۵ ماه',
                        value: 5
                    },
                    {
                        title: '۶ ماه',
                        value: 6
                    },
                    {
                        title: '۷ ماه',
                        value: 7
                    },
                    {
                        title: '۸ ماه',
                        value: 8
                    },
                    {
                        title: '۹ ماه',
                        value: 9
                    },
                    {
                        title: '۱۰ ماه',
                        value: 10
                    },
                    {
                        title: '۱۱ ماه',
                        value: 11
                    },
                    {
                        title: '۱ سال',
                        value: 12
                    },
                    {
                        title: '۱۳ ماه',
                        value: 13
                    },
                    {
                        title: '۱۴ ماه',
                        value: 14
                    },
                    {
                        title: '۱۵ ماه',
                        value: 15
                    },
                    {
                        title: '۱۶ ماه',
                        value: 16
                    },
                    {
                        title: '۱۷ ماه',
                        value: 17
                    },
                    {
                        title: '۱۸ ماه',
                        value: 18
                    },
                    {
                        title: '۱۹ ماه',
                        value: 19
                    },
                    {
                        title: '۲۰ ماه',
                        value: 20
                    },
                    {
                        title: '۲۱ ماه',
                        value: 21
                    },
                    {
                        title: '۲۲ ماه',
                        value: 22
                    },
                    {
                        title: '۲۳ ماه',
                        value: 23
                    },
                    {
                        title: '۲ سال',
                        value: 24
                    }
                ],
                isCollapsed: false,
                dedicatedVolumeMin: '10GB',
                dedicatedVolumeMax: '1TB',
                memoryRangeMin: '0GB',
                memoryRangeMax: '64GB',
                order: [],
                quota: {},
                finalBill: {
                    memory: 0,
                    dedicated_volume: 0,
                    voucher_code: null,
                    month_count: 1
                }, features: [
                    {title: 'Load Balancer', subtitle: 'رایگان', image: 'load-balancer.png'},
                    {title: 'پهنای باند', subtitle: 'رایگان', image: 'band-width.svg'},
                    {title: 'گواهی‌نامه SSL', subtitle: 'رایگان', image: 'free-ssl.svg'},
                    {title: 'Health Check', subtitle: 'رایگان', image: 'healthcheck.svg'},
                    {title: ' استفاده از رجیستری دلخواه', subtitle: 'رایگان', image: 'favorite-image-registry.svg'},
                    {title: ' رجیستری اختصاصی', subtitle: 'رایگان', image: 'free-image-registry.svg'}
                ], memoryOptions: {
                    dotSize: 25,
                    width: 'auto',
                    height: 19,
                    contained: false,
                    direction: 'rtl',
                    interval: 0.5,
                    min: 0,
                    max: 64,
                    disabled: false,
                    clickable: true,
                    tooltip: 'none',
                    useKeyboard: false,
                    enableCross: true,
                    fixed: false,
                    included: true,
                    order: true,
                    process: true,
                    dotStyle: {backgroundColor: '#24d5d8', boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.17)'},
                    railStyle: {backgroundColor: 'rgba(0, 69, 255, 0.4)', cursor: 'pointer'},
                    processStyle: {backgroundColor: '#0045ff'},
                    labelStyle: {
                        color: '#0045ff',
                        fontFamily: 'iran-yekan',
                        fontWeight: 'bold',
                        letterSpacing: 'normal'
                    }
                }, dedicatedVolumeOptions: {
                    dotSize: 25,
                    width: 'auto',
                    height: 19,
                    contained: false,
                    direction: 'rtl',
                    min: 0,
                    max: 1000,
                    interval: 1,
                    disabled: false,
                    clickable: true,
                    duration: 0.5,
                    tooltip: 'none',
                    useKeyboard: false,
                    enableCross: true,
                    fixed: false,
                    included: true,
                    order: true,
                    process: true,
                    dotStyle: {backgroundColor: '#24d5d8', boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.17)'},
                    railStyle: {backgroundColor: 'rgba(0, 69, 255, 0.4)', cursor: 'pointer'},
                    processStyle: {backgroundColor: '#0045ff'},
                    labelStyle: {
                        color: '#0045ff',
                        fontFamily: 'iran-yekan',
                        fontWeight: 'bold',
                        letterSpacing: 'normal'
                    }
                }
            }
        },
        components: {
            PanelBox,
            FPanels,
            FActivePlan,
            FActivePlanBox,
            Plan,
            Moment,
            Feature
        },
        computed: {
            open() {
                return this.isCollapsed;
            },
            memory() {
                if (this.quota === null) {
                    return 0;
                } else {
                    return parseFloat(Math.fround(this.quota.memory_limit / 1024).toExponential(1))

                }
            },
            dedicatedVolume() {
                if (this.quota === null) {
                    return 0;
                } else {
                    return this.quota.volume_limit;
                }
            },
            namespace() {
                return getValue("namespace");
            },
            activePlan() {
                return this.$store.state.plan.activePlan;
            },
            percent() {
                let percent = Math.round(
                    (this.activePlan.current_used_resources.memory_usage /
                        this.activePlan.quota.memory_limit) *
                    100
                );
                return percent.toString();
            }, cpu() {
                this.planData.cpu = Math.max(this.planData.memory / 2, 0.5);
                return Math.max(this.planData.memory / 2, 0.5);
            }, total() {
                let temp = this.planData.memory * 60000 + (this.planData.dedicatedVolume >= 10 ? this.planData.dedicatedVolume * 1200 : 0);
                return temp.toLocaleString()
            }, fixedTotal() {
                let total = 0;
                if (this.quota.memory_limit > 400) {
                    total += Math.fround(this.quota.memory_limit / 1024) * 60000
                }

                if (this.quota.volume_limit > 0) {
                    total += this.quota.volume_limit * 1200;
                }

                return total
            }
        },
        loading() {
            return this.$store.state.loading;
        },
        destroyed() {
            this.$store.commit("plan/SET_DATA", {data: null, id: "activePlan"});
        },
        created() {
            this.$store.commit("SET_DATA", {data: true, id: "loading"});
            this.requestActivePlan();
        },
        methods: {
            monthChanged(month) {
                this.selectedMonth = month;
                this.finalBill.month_count = month.value;
            },
            translateCheckoutBox() {
                this.isCollapsed = !this.isCollapsed;
            },
            incMemory() {
                if (this.planData.memory < this.memoryOptions.max) {
                    this.planData.memory += 0.5;
                }
            }, decMemory() {
                if (this.planData.memory > this.memoryOptions.min) {
                    this.planData.memory -= 0.5;
                }

            }, incDedicatedVolume() {
                if (this.planData.dedicatedVolume < this.dedicatedVolumeOptions.max)
                    this.planData.dedicatedVolume += 1;
            }, decDedicatedVolume() {
                if (this.planData.dedicatedVolume > this.dedicatedVolumeOptions.min)
                    this.planData.dedicatedVolume -= 1;
            }, makeBill() {
                this.finalBill.memory = this.planData.memory;
                let bill = {}

                if (this.planData.dedicatedVolume >= 10) {
                    this.finalBill.dedicated_volume = this.planData.dedicatedVolume;
                }

                //adding quota to current selected plan resources
                if (this.quota !== null) {
                    if (parseFloat(Math.fround(this.quota.memory_limit / 1024).toExponential(1)) >= 0.5) {
                        this.finalBill.memory += parseFloat(Math.fround(this.quota.memory_limit / 1024).toExponential(1));
                    }
                    if (this.quota.volume_limit > 0) {
                        this.finalBill.dedicated_volume += this.quota.volume_limit;
                    }
                }

                if (this.finalBill.memory > 0) {
                    bill['memory'] = this.finalBill.memory;
                }

                if (this.finalBill.dedicated_volume > 0) {
                    bill['dedicated_volume'] = this.finalBill.dedicated_volume;
                }

                if (this.finalBill.voucher_code !== null) {
                    bill['voucher_code'] = this.finalBill.voucher_code;
                }

                bill['month_count'] = this.is_upgrading_plan ? 0 : this.finalBill.month_count

                return bill;
            },
            async pushUrl() {
                // this.$ga.event({
                //     eventCategory: "plan",
                //     eventAction: "click plan",
                //     eventLabel: "plan index",
                //     eventValue: index
                // });
                const bill = this.makeBill();

                await this.$store.dispatch("plan/requestPlan", bill)
                    .then(planRespose => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        this.$router.push({path: `plans/bill/${planRespose.invoice.id}`});
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
            async requestActivePlan() {
                try {
                    let plan = await this.$store.dispatch('getNameSpace', this.namespace);
                    this.quota = plan.quota;
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
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
            }
        },
        mounted() {
            this.$ga.event({
                eventCategory: "plan",
                eventAction: "see list plan"
            });
        }
    };
</script>


<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"


    .service-plan-heading
        font-family: iran-yekan
        font-size 18px
        min-width 220px
        line-height 48px
        height 48px
        margin 0
        letter-spacing normal
        text-align right
        color #7c7c7c

    @font-face
        font-style normal
        font-family roboto-bold
        src url('~/assets/fonts/Roboto-Bold.ttf')

    @font-face
        font-style normal
        font-family roboto
        src url('~/assets/fonts/Roboto-Regular.ttf')

    .customization-title
        height 32px
        font-family iran-yekan
        font-size 1.2em
        font-style normal
        display inline-flex
        line-height 32px
        margin auto
        letter-spacing normal
        color #0045ff

    .man-button
        border-radius 25px
        display inline-flex
        width 16px
        height 16px
        box-shadow transparent
        background-color #24d5d8
        cursor: pointer

        img
            display flex
            margin auto
            pointer-events none
            filter invert(100%)
            width 10px
            height 10px
            box-shadow transparent
            user-select none
            cursor: pointer

    .checkout-box
        position sticky
        border-radius 3px
        width 100%
        max-height min-content
        top 60px
        height max-content
        bottom 20px
        margin-top 30px
        transition max-height 0.2s ease
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        z-index 10
        @media only screen and (max-width: 1200px)
            bottom 0
            box-shadow 0 -3px 6px 0 rgba(0, 0, 0, 0.17)

        @media only screen and (max-width: 768px)
            bottom 0
            max-height 70px
            z-index 999999998
            box-shadow 0 -3px 6px 0 rgba(0, 0, 0, 0)
            &.open
                z-index 1000000000
                max-height 270px

        @media only screen and (max-width: 450px)
            bottom 0
            max-height 70px
            box-shadow 0 -3px 6px 0 rgba(0, 0, 0, 0)
            z-index 999999998
            &.open
                z-index 1000000000
                max-height 450px


        button.checkout
            width 100%
            height 45px
            border-radius 0
            margin-bottom 16px
            margin-top 6px
            border none
            color #fefefe
            outline none
            cursor pointer
            box-shadow 0 3px 6px 0 rgba(60, 204, 56, 0.42)
            background-color rgba(60, 204, 56, 0.9)
            font-family iran-yekan
            font-size 14px
            transition all .2s ease-in-out
            @media only screen and (max-width: 900px)
                height 35px
                margin-top 0
                margin-bottom 12px
                margin-right 16px
                margin-left 16px
            @media only screen and (max-width: 600px)
                max-height 73px
                margin-top 0

        button.checkout:hover
            transition all .2s ease-in-out
            background-color rgba(60, 204, 56, 1)


    .section-title-image
        width 48px
        height 100%
        vertical-align center
        margin-left 12px
        filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)

    .plan-feature-title
        display inline-flex
        flex-direction row
        height 32px
        width 100%
        margin-top 60px
        white-space nowrap

        div
            height 1px
            margin auto 12px auto auto
            right 12px
            width 100%
            display inline-flex
            background-color #7c7c7c

    .feature-image
        width 80%
        max-width 150px
        margin-top 26px
        max-height 100px
        height 70%
        filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)

    .free-features-container
        box-sizing border-box
        display flex
        flex 0 1 auto
        flex-direction row
        flex-wrap wrap

    .feature-label-container
        display inline-flex
        position relative
        margin-top 9px


    .feature-label
        font-family yekan-bold
        font-size .8em
        color #606060
        white-space nowrap
        width 100%


    .input
        border solid 1px #7c7c7c
        border-radius 3px
        background-color transparent
        width 70%
        height 35px
        direction ltr
        font-family 'iran-sans'
        padding 0 12px

        @media only screen and (max-width: 900)
            height 25px

    .range-title
        box-sizing content-box
        position relative
        width 100%
        margin-top -8px
        margin-bottom 16px

        p
            color #0045ff
            font-family iran-yekan
            font-size 1em
            font-weight bold
            margin 0
            display inline-block

    .checkout-section-title
        text-align center
        background-color #0045ff
        margin 0
        padding-top 6px
        padding-bottom 6px
        color #fff
        @media only screen and (min-width: 900px)
            border-radius 0 !important

    .expanded-invoice
        @media only screen and (min-width: 768px)
            display none

        div.one
            margin-left: auto;
            margin-right: auto;
            height: 45px;
            width: 45px;
            display inline-flex
            background-color: #fefefe;
            border-radius: 25px;
            margin-bottom: -22px;
            cursor pointer

            img
                display flex
                margin-bottom 12px
                margin-right auto
                margin-left auto
                filter invert(1)
                transform rotate(90deg)

        div.two
            box-shadow 0 -2px 6px 0 rgba(0, 0, 0, 1)
            width 100%
            height 1px
            background-color #fefefe
            z-index -1

    .collapsed-invoice
        @media only screen and (min-width: 768px)
            display none

        div.one
            margin-left: auto;
            margin-right: auto;
            height: 45px;
            width: 45px;
            display inline-flex
            background-color: #fefefe;
            border-radius: 25px;
            margin-bottom: -22px;
            cursor pointer

            img
                display flex
                margin-bottom 12px
                margin-right auto
                margin-left auto
                filter invert(1)
                transform rotate(-90deg)

        div.two
            box-shadow 0 -2px 6px 0 rgba(0, 0, 0, 1)
            width 100%
            height 1px
            background-color #fefefe
            z-index -1


    .notice
        margin-top 24px
        border-bottom 1px solid gray
        border-top 1px solid gray
        @media only screen and (max-width: 766px)
            margin-top 16px

        p
            font-family iran-yekan
            font-weight bold
            font-size 1em
            margin 0
            line-height 1.7 g
            padding 7px 16px


    .checkout-box-bottom-container
        width 100%
        height max-content
        display flex
        flex-direction column
        @media only screen and (max-width: 850px)
            flex-direction row
        @media only screen and (max-width: 550px)
            flex-direction column

    .upgrade-button
        width 100%
        height 45px
        font-family iran-yekan
        border-radius 3px
        background-color rgba(0, 229, 255, 0.4)
        color $fontGray
        outline none
        cursor pointer
        font-size .9em
        transition all .2s ease-in-out
        @media only screen and (max-width: 900px)
            height 40px
        @media only screen and (max-width: 600px)
            max-height 73px

        &.enabled
            background-color $colorAccent
            color $fontBlack


    .upgrade-button:hover
        background-color $colorAccent
        color $fontBlack


    .checkout-section-box
        margin-top 6px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        @media only screen and (max-width 992px)
            margin-top 0


</style>


<style lang="css">

    .vue-slider-dot-handle {
        background-image: url("../../../assets/svg/arrow.svg");
        background-repeat: no-repeat;
        background-size: 8px;
        background-position: center;
        transform: rotate(180deg);
    }

    .v-select .vs__dropdown-toggle {
        margin-bottom: 0 !important;
        background-color: transparent !important;
        border: none !important;
    }

    .v-text-field {
        padding-top: 3px !important;
    }
</style>
