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
                    <img src="../../../assets/svg/my-plan.svg" alt="plan" class="section-title-image" align="right"/>

                    <h1 class="service-plan-heading">شخصی‌سازی پلن</h1>
                </div>

                <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 plan-feature-title">

                    <h3 class="customization-title">میزان رم</h3>
                    <div></div>

                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: 16px;">

                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4" style="height: 100%; display: flex;">
                        <img class="feature-image" src="../../../assets/svg/my-plan.svg" alt="zone"></img>
                    </div>

                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-8"
                         style="display: block; float: right; position: relative;">

                        <p class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                           style="margin: 0;color: #2979ff; font-size: 0.9em">
                            به ازای هر گیگابایت رم٬ نیم هسته پردازنده به شما تعلق خواهد گرفت
                        </p>

                        <div class="row col-lg-12 col-sm-12 col-md-12 col-xs-12"
                             style="display: flex; margin-top: 16px;">

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
                                    <input class="input" value="planData.memory" v-model="planData.memory">
                                    گیگابایت
                                </label>
                            </div>

                            <VueSlideBar class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left"
                                         style="margin: 40px 0 16px 0; box-sizing: content-box"
                                         v-model="planData.memory"
                                         :range=slider.memoryRange
                                         :min=slider.memoryMin
                                         :max=slider.memoryMax
                                         :paddingless=slider.paddingless
                                         :lineHeight=slider.height
                                         :processStyle="{ backgroundImage: slider.gradient,fontFamily: slider.font}">

                            </VueSlideBar>

                            <p class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                               style="margin: 0;color: #3ccc38; font-size: 9px">
                                هزینه هر گیگابایت رم ۶۰ هزارتومان است</p>
                        </div>

                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 plan-feature-title">

                    <h3 class="customization-title">هارد اختصاصی</h3>
                    <div></div>

                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: 16px;">

                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4" style="height: 100%; display: flex;">
                        <img class="feature-image" src="../../../assets/svg/my-plan.svg" alt="zone"></img>
                    </div>

                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-8"
                         style="display: block; float: right; position: relative;">
                        <div class="row col-lg-12 col-sm-12 col-md-12 col-xs-12"
                             style="display: flex; margin-top: 16px;">

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 feature-label-container">

                                <div style="display: block; width: 16px; margin: auto 0 auto 7px; box-shadow: transparent">
                                    <div v-on:click="incDedicatedVolume" class="man-button" style="margin: 0 0 2px 0;">
                                        <img alt="plus"
                                             src="../../../assets/svg/ic-plus.svg"/>
                                    </div>

                                    <div v-on:click="decDedicatedVolume" class="man-button" style="margin: 2px 0 0 0">
                                        <img alt="minus"
                                             src="../../../assets/svg/ic-minus.svg" />
                                    </div>
                                </div>

                                <label class="feature-label">
                                    <input class="input" value="planData.dedicatedVolume" v-model="planData.dedicatedVolume">
                                    گیگابایت
                                </label>
                            </div>

                            <VueSlideBar class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left"
                                         style="margin-top: 40px; margin-bottom: 16px;box-sizing: content-box"
                                         v-model="planData.dedicatedVolume"
                                         :range=slider.dedicatedVolumeRange
                                         :min=slider.dedicatedVolumeMin
                                         :max=slider.dedicatedVolumeMax
                                         :paddingless=slider.paddingless
                                         :lineHeight=slider.height
                                         :processStyle="{ backgroundImage: slider.gradient,fontFamily: slider.font}">

                            </VueSlideBar>

                            <p v-if="planData.dedicatedVolume < 10" class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                               style="margin: 0;color: white; font-size: 11px; text-align: center;
                               background-color: orangered; border-radius: 25px; padding: 7px 0">
                                حداقل میزان فضای قابل سفارش ۱۰ گیگابایت می‌باشد!</p>

                            <p class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                               style="margin: 16px 0 0 0;color: #3ccc38; font-size: 9px">
                                هزینه هر گیگابایت هارد اختصاصی ۱۲۰۰ تومان است</p>

                        </div>

                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 plan-feature-title">

                    <h3 class="customization-title">ویژگی‌های رایگان</h3>
                    <div></div>

                </div>

                <div class="between-xs free-features-container">

                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md free-feature-card">
                            <div>
                                <img src="../../../assets/svg/ic-auto-scaling.svg" alt="feature"/>
                                <p class="title">Load Balancer</p>
                                <p class="subtitle">رایگان</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md free-feature-card">

                            <div>
                                <img src="../../../assets/svg/ic-auto-scaling.svg" alt="feature"/>
                                <p class="title">پهنای باند</p>
                                <p class="subtitle">رایگان</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md free-feature-card">
                            <div>
                                <img src="../../../assets/svg/ic-auto-scaling.svg" alt="feature"/>
                                <p class="title">گواهی‌نامه SSL</p>
                                <p class="subtitle">رایگان</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md free-feature-card">
                            <div>
                                <img src="../../../assets/svg/ic-auto-scaling.svg" alt="feature"/>
                                <p class="title">Health Check</p>
                                <p class="subtitle">رایگان</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md free-feature-card">
                            <div>
                                <img src="../../../assets/svg/ic-auto-scaling.svg" alt="feature"/>
                                <p class="title">استفاده از رجیستری دلخواه</p>
                                <p class="subtitle">رایگان</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md free-feature-card">
                            <div>
                                <img src="../../../assets/svg/ic-auto-scaling.svg" alt="feature"/>
                                <p class="title">ایمیج رجیستری اختصاصی</p>
                                <p class="subtitle">رایگان</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="checkout-box container-fluid col-md-3 col-lg-3 col-sm-3 col-xs-12">

                <p style="font-family: iran-yekan; padding: 0 16px; font-size: 15px; text-align: center">
                    مبلغ نهایی (تومان):</p>
                <p style="width: 100%; text-align: center; font-family: iran-sans;">{{total}}</p>
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
    import VueSlideBar from "vue-slide-bar";
    import Moment from 'moment-jalaali'

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
                slider: {
                    gradient: 'linear-gradient(to left, #2979ff, #24d5d8)',
                    font: 'iran-sans',
                    height: 17,
                    paddingless: true,
                    memoryMin: 1,
                    dedicatedVolumeMin: 0,
                    memoryMax: 256,
                    dedicatedVolumeMax: 128,
                    dedicatedVolumeRange: [
                        // TODO: set max separately
                        {'label': '128G'},
                        {'label': '10G'}
                    ],
                    memoryRange: [
                        {'label': '256G'},
                        {'label': '1G'}
                    ]

                }, finalBill: {
                    memory: 0,
                    dedicatedVolume: 0,
                },


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
            VueSlideBar,
        },
        computed: {
            namespace() {
                return getValue("namespace");
            },
            allPlan() {
                return this.$store.state.plan.plans;
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

            }
        },
        loading() {
            return this.$store.state.loading;
        },
        destroyed() {
            this.$store.commit("plan/SET_DATA", {data: null, id: "activePlan"});
        },
        created() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
        },
        methods: {
            incMemory() {
                this.planData.memory += 1;
            }, decMemory() {
                this.planData.memory -= 1;
            }, incDedicatedVolume() {
                this.planData.dedicatedVolume += 1;
            }, decDedicatedVolume() {
                this.planData.dedicatedVolume -= 1;
            }, makeBill() {
                this.finalBill.memory = this.planData.memory;
                if (this.planData.dedicatedVolume >= 10) {
                    this.finalBill.dedicatedVolume = this.planData.dedicatedVolume;
                }
                // this.finalBill.sum = this.total;
                // this.finalBill.date = Moment(String(new Date())).format('jYYYY/jMM/jDD');
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
                console.log(planRespose)
                this.$store.commit("SET_DATA", {data: false, id: "loading"});
                this.$router.push({name: 'dashboard-plans-bill'});
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
        font-family: IRANYekanMobile(FaNum)
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
        font-family IRANYekanMobile(FaNum)
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
        height 160px
        top 60px
        bottom 20px
        margin-top 130px
        z-index 10

        button
            width 100%
            height 40px
            border-radius 3px
            margin-bottom 16px
            border none
            outline none
            box-shadow 0 3px 6px 0 rgba(60, 204, 56, 0.42)
            background-color #3ccc38
            font-family IRANYekan
            font-size 14px
            @media only screen and (max-width: 900)
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
        height 50%
        filter invert(60%) sepia(44%) saturate(4202%) hue-rotate(208deg) brightness(102%) contrast(101%)

    .free-features-container
        box-sizing border-box
        display flex
        flex 0 1 auto
        flex-direction row
        flex-wrap wrap

    .free-feature-card
        height 250px
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(41, 121, 255, 0.42)
        margin 1rem 0
        background-color #2979ff

        div
            padding 20px

            img
                width 90px
                height 90px
                display block
                margin-left auto
                margin-right auto

            p.title
                text-align center
                font-family 'IRANYekan'
                font-size 17px
                font-style normal
                font-stretch normal
                line-height 1.17
                letter-spacing normal
                margin-top 40px
                color #fefefe

            p.subtitle
                text-align center
                font-family yekan-light
                font-size 14px
                font-style normal
                font-stretch normal
                line-height 1.17
                letter-spacing normal
                margin-top 13px
                color #fefefe

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


</style>


<style lang="css">

    .vue-slide-bar-tooltip-container {
        position: absolute;
        transition: all 0s;
        will-change: transform;
        cursor: pointer;
        z-index: 3 !important;
        left: 0;
        top: 0 !important;
    }

    .vue-slide-bar-tooltip-wrap {
        /* display: none; */
        position: absolute;
        z-index: 9;
        width: 100%;
        height: 100%;
        display: block !important;
    }

    .vue-slide-bar-tooltip-top {
        top: -4px !important;
        left: 70% !important;
        transform: translate(-50%, -100%) !important;
    }

    @media only screen and (max-width: 900px) {
        .vue-slide-bar-tooltip-top {
            top: -1px !important;
            left: 70% !important;
            transform: translate(-50%, -100%) !important;
        }
    }

    .vue-slide-bar-tooltip {
        position: relative;
        font-size: 0 !important;
        white-space: nowrap;
        padding: 13px 13px !important;
        min-width: 24px !important;
        text-align: center;
        color: #fff;
        margin: auto !important;
        border-radius: 100px !important;
        border: transparent !important;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.17) !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        background-size: 8px;
        background-image: url("../../../assets/svg/arrow.svg") !important;
        background-color: #24d5d8 !important;

    }

    .vue-slide-bar-tooltip::before {
        content: '';
        position: absolute !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 0 !important;
        height: 0 !important;
        border: 12px solid transparent !important;
        border-radius: 0 !important;
        transform: translate(10%, -5%) !important;
    }

    .vue-slide-bar-process {
        position: absolute !important;
        border-radius: 15px;
        transition: all 0s;
        z-index: 1;
        width: 0;
        height: 100%;
        top: 0;
        left: 0;
        will-change: width !important;
    }

    .vue-slide-bar-separate-text {
        text-align: center;
        position: absolute !important;
        white-space: nowrap !important;
        transform: translate(-50%, 0);
        font-family: IRANYekan !important;
        font-weight: bold;
        font-size: 1.2em !important;
        color: #2979ff !important;
        top: 3px !important;
        left: 1px !important;
    }

    .vue-slide-bar-separate {
        position: revert !important;
        width: 2px;
        background-color: transparent !important;
        height: 5px;
        cursor: pointer;
    }

    .vue-slide-bar-range {
        display: flex !important;
        padding: 5px 0;
        justify-content: space-between !important;
    }

</style>
