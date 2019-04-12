<template>
    <div v-if="!loading">
        <nuxt-child/>

        <div class="col-lg-12 col-md-12 col-xs-12" style="height: 48px; width: 100%;">
            <img src="../../../assets/svg/my-plan.svg" alt="plan" class="section-title-image" align="right"/>
            <h1 class="service-plan-heading">پلن‌های پیشنهادی</h1>
        </div>

        <plan v-bind.sync="planData"/>

        <div class="row">
            <div class="vol-lg-8 col-sm-8 col-md-8 col-xs-12" style="position: relative">

                <div class="col-lg-12 col-md-12 col-xs-12" style="height: 48px; width: 100%;margin-top: 100px">
                    <img src="../../../assets/svg/plan-customization.svg" alt="plan" class="section-title-image"
                         align="right"/>

                    <h1 class="service-plan-heading">شخصی‌سازی پلن</h1>
                </div>

                <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 plan-feature-title">

                    <h3 class="customization-title">میزان رم</h3>
                    <div></div>

                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: 16px;">

                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4" style="height: 100%; display: flex;">
                        <img style="transform: rotate(-45deg) scale(1.2, 1.2)" class="feature-image"
                             src="../../../assets/svg/ic-memory.svg" alt="memory"></img>
                    </div>

                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-8"
                         style="display: block; float: right; position: relative;">

                        <p class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                           style="margin: 0;color: #2979ff; font-size: 0.9em">
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

                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4" style="height: 100%; display: flex;">
                        <img style="transform: scale(1.2, 1.2)" class="feature-image"
                             src="../../../assets/svg/ic-dedicated-volume.svg" alt="zone"></img>
                    </div>

                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-8"
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

                            <p v-if="planData.dedicatedVolume < 10" class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                               style="margin: 0;color: white; font-size: 11px; text-align: center;
                               background-color: orangered; border-radius: 25px; padding: 7px 0">
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

            <div class="checkout-box container-fluid col-md-3 col-lg-3 col-sm-3 col-xs-12">

                <div v-if="memory >= 1 || planData.memory > 0">
                    <p style="font-family: iran-yekan;font-weight: bold; padding: 0 16px; font-size: 15px; text-align: right">
                        میزان رم:
                        <span style="font-family: iran-sans; color: #2979ff" v-if="memory >= 1">{{memory}} گیگ</span>
                        <span v-if="memory >= 1 && planData.memory > 0">+</span>
                        <span style="font-family: iran-sans; font-weight: normal">{{planData.memory}} گیگ</span></p>
                </div>
                <div v-if="planData.dedicatedVolume >= 10 || dedicatedVolume > 0">
                    <p style="font-family: iran-yekan;font-weight: bold; padding: 0 16px; font-size: 15px; text-align: right">
                        حافظه ذخیره‌سازی:
                        <span style="font-family: iran-sans; color: #2979ff" v-if="dedicatedVolume > 0">{{dedicatedVolume}} گیگ </span>
                        <span v-if="dedicatedVolume > 0 && planData.dedicatedVolume >= 10">+</span>
                        <span style="font-family: iran-sans; font-weight: normal" v-if="planData.dedicatedVolume >= 10">{{planData.dedicatedVolume}} گیگ</span>
                    </p>
                </div>

                <div style="height: 1px; background-color: #999;"></div>

                <p style="font-family: iran-yekan;font-weight: bold; padding: 0 16px; font-size: 15px; text-align: center">
                    مبلغ نهایی (تومان):</p>
                <p style="width: 100%; text-align: center; font-family: iran-sans; color: #2979ff; margin-top: 0; margin-bottom: 0" v-if="fixedTotal > 0">{{fixedTotal}}</p>
                <p style="width: 100%; text-align: center; margin-top: 0; margin-bottom: 0" v-if="fixedTotal> 0">+</p>
                <p style="width: 100%; text-align: center; font-family: iran-sans;margin-top: 0; margin-bottom: 0">{{total}}</p>
                <button @click="pushUrl">
                    ثبت نهایی و پرداخت
                </button>

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
    import Image from "../services/image";
    import Plan from "~/components/Plan";
    import Moment from 'moment-jalaali';
    import Feature from '~/components/Plan/feature.vue';
    import 'vue-slider-component/theme/default.css';

    export default {
        layout: "dashboard",
        name: "plans",

        data: function () {
            return {
                planData: {
                    memory: 1,
                    cpu: 0.5,
                    dedicatedVolume: 0,
                },
                dedicatedVolumeMin: '10G',
                dedicatedVolumeMax: '256G',
                memoryRangeMin: '1G',
                memoryRangeMax: '256G',
                quota: {},
                finalBill: {
                    memory: 0,
                    dedicatedVolume: 0,
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
                    interval: 1,
                    min: 1,
                    max: 256,
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
                    railStyle: {backgroundColor: 'rgba(173, 173, 173, 0.3)'},
                    processStyle: {backgroundImage: 'linear-gradient(to right, #2979ff, #24d5d8)'},
                    labelStyle: {
                        color: '#2979ff',
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
                    max: 256,
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
                    railStyle: {backgroundColor: 'rgba(173, 173, 173, 0.3)', cursor: 'pointer'},
                    processStyle: {backgroundImage: 'linear-gradient(to right, #2979ff, #24d5d8)'},
                    labelStyle: {
                        color: '#2979ff',
                        fontFamily: 'iran-yekan',
                        fontWeight: 'bold',
                        letterSpacing: 'normal'
                    }
                }
            }
        },
        components: {
            Image,
            PanelBox,
            FPanels,
            FActivePlan,
            FActivePlanBox,
            Plan,
            Moment,
            Feature
        },
        computed: {
            memory() {
                if (this.quota === null) {
                    return 0;
                } else {
                    return this.quota.memory_limit / 1024;
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
                this.planData.cpu = this.planData.memory / 2;
                return this.planData.memory / 2;
            }, total() {
                let temp = this.planData.memory * 60000 + this.planData.dedicatedVolume * 1200;
                return temp.toLocaleString()
            },fixedTotal(){
                return Math.round(this.quota.memory_limit / 1024) * 60000 + this.quota.volume_limit * 1200;
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
            incMemory() {
                if (this.planData.memory < this.memoryOptions.max)
                    this.planData.memory += 1;
            }, decMemory() {
                if (this.planData.memory > this.memoryOptions.min)
                    this.planData.memory -= 1;
            }, incDedicatedVolume() {
                if (this.planData.dedicatedVolume < this.dedicatedVolumeOptions.max)
                    this.planData.dedicatedVolume += 1;
            }, decDedicatedVolume() {
                if (this.planData.dedicatedVolume > this.dedicatedVolumeOptions.min)
                    this.planData.dedicatedVolume -= 1;
            }, makeBill() {
                this.finalBill.memory = this.planData.memory;
                if (this.planData.dedicatedVolume >= 10) {
                    this.finalBill.dedicatedVolume = this.planData.dedicatedVolume;
                }
                if (this.quota !== null) {
                    if (this.quota.memory_limit / 1024 >= 1) {
                        this.finalBill.memory += this.quota.memory_limit / 1024;
                    }

                    if (this.quota.volume_limit > 0) {
                        this.finalBill.dedicatedVolume += this.quota.volume_limit;
                    }
                }

                return this.finalBill;
            },
            async pushUrl() {
                // this.$ga.event({
                //     eventCategory: "plan",
                //     eventAction: "click plan",
                //     eventLabel: "plan index",
                //     eventValue: index
                // });
                const bill = this.makeBill();
                console.log(bill);
                const planRespose = await this.$store.dispatch("plan/requestPlan", bill);
                console.log(planRespose);
                console.log(planRespose.invoice.id);
                this.$store.commit("SET_DATA", {data: false, id: "loading"});
                this.$router.push(`plans/bill/${planRespose.invoice.id}`);
            },
            async requestActivePlan() {
                let plan = await this.$store.dispatch('getNameSpace', this.namespace);
                this.$store.commit("SET_DATA", {data: false, id: "loading"});
                this.quota = plan.quota;
                console.log(this.quota);
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
        width 140px
        font-family iran-yekan
        font-size 1.2em
        font-style normal
        display inline-flex
        line-height 32px
        margin auto;
        letter-spacing normal
        color #2979ff

    .man-button
        border-radius 25px
        display inline-flex
        width 16px
        height 16px
        box-shadow transparent
        background-color #adadad
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
        background-color #ffffff
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        width 100%
        height min-content
        top 60px
        bottom 20px
        margin-top 130px
        z-index 10
        @media only screen and (max-width: 900px)
            bottom 0
            box-shadow 0 -3px 6px 0 rgba(0, 0, 0, 0.17)

        button
            width 100%
            height 40px
            border-radius 3px
            margin-bottom 16px
            border none
            outline none
            cursor pointer
            box-shadow 0 3px 6px 0 rgba(60, 204, 56, 0.42)
            background-color #3ccc38
            font-family iran-yekan
            font-size 14px
            @media only screen and (max-width: 900px)
                height 35px
                margin-bottom 12px


    .section-title-image
        width 48px
        height 100%
        vertical-align center
        margin-left 12px
        filter invert(60%) sepia(44%) saturate(4202%) hue-rotate(208deg) brightness(102%) contrast(101%)

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
            width 100%
            display inline-flex
            background-color #7c7c7c

    .feature-image
        width 80%
        margin-top 26px
        height 70%
        filter invert(60%) sepia(44%) saturate(4202%) hue-rotate(208deg) brightness(102%) contrast(101%)

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
            color #2979ff
            font-family iran-yekan
            font-size 1em
            font-weight bold
            margin 0
            display inline-block


</style>


<style lang="css">

    .vue-slider-dot-handle {
        background-image: url("../../../assets/svg/arrow.svg");
        background-repeat: no-repeat;
        background-size: 8px;
        background-position: center;
        transform: rotate(180deg);
    }

</style>
