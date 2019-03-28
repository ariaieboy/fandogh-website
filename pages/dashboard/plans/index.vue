<template>
    <div v-if="!loading">
        <nuxt-child/>

        <div class="col-lg-12 col-md-12 col-xs-12" style="height: 48px; width: 100%;">
            <img src="../../../assets/svg/my-plan.svg" alt="plan" style="width: 48px; height: 100%;
             vertical-align: center; margin-left: 12px;
                filter: invert(60%) sepia(44%) saturate(4202%) hue-rotate(208deg) brightness(102%) contrast(101%)"
                 align="right"/>

            <h1 class="service-plan-heading">پلن‌های پیشنهادی</h1>
        </div>

        <plan v-bind.sync="planData" />

        <div class="row">
            <div class="vol-lg-8 col-sm-8 col-md-8 col-xs-12" style="position: relative">

                <div class="col-lg-12 col-md-12 col-xs-12" style="height: 48px; width: 100%;margin-top: 140px">
                    <img src="../../../assets/svg/my-plan.svg" alt="plan" style="width: 48px; height: 100%;
             vertical-align: center; margin-left: 12px;
                filter: invert(60%) sepia(44%) saturate(4202%) hue-rotate(208deg) brightness(102%) contrast(101%)"
                         align="right"/>

                    <h1 class="service-plan-heading">شخصی‌سازی پلن</h1>
                </div>

                <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12"
                     style="display: inline-flex; flex-direction:row; height: 32px; width: 100%; margin-top: 70px; white-space: nowrap;">

                    <h3 class="customization-title">میزان رم</h3>
                    <div style="height: 1px; margin: auto 12px auto auto;width: 100%;display: inline-flex; background-color: #7c7c7c;"></div>

                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: 16px;">

                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4" style="height: 100%; display: flex;">
                        <img src="../../../assets/svg/my-plan.svg" alt="zone" style="width: 70px; height: 70px;
                    filter: invert(60%) sepia(44%) saturate(4202%) hue-rotate(208deg) brightness(102%) contrast(101%)">

                        </img>
                    </div>

                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-8"
                         style="display: block; float: right; position: relative;">
                        <p class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                           style="margin: 0;color: #2979ff; font-size: 15px">به
                            ازای هر گیگابایت
                            رم٬ نیم هسته پردازنده به شما تعلق خواهد
                            گرفت</p>
                        <div class="row col-lg-12 col-sm-12 col-md-12 col-xs-12"
                             style="display: flex; margin-top: 16px;">

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                                 style="display: inline-flex; position: relative">
                                <label style="font-family: yekan-bold; font-size: 12px; color: #606060; white-space: nowrap; width: 100%;">
                                    <input value="cpu" v-model="cpu" disabled
                                           style="border: solid 1px #7c7c7c; border-radius: 3px;background-color: transparent; width: 70%; height: 35px;
direction: ltr; font-family: 'IRANSans(FaNum)';padding: 0 12px; color: #606060;">
                                    هسته
                                </label>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                                 style="display: inline-flex; position: relative">
                                <label style="font-family: yekan-bold; font-size: 12px; color: #606060; white-space: nowrap; width: 100%;">
                                    <input value="planData.ram" v-model="planData.ram" style="border: solid 1px #7c7c7c; border-radius: 3px;background-color: transparent; width: 70%; height: 35px
;direction: ltr;font-family: 'IRANSans(FaNum)'; padding: 0 12px;">
                                    گیگابایت
                                </label>
                            </div>

                            <VueSlideBar class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left"
                                         v-model="planData.ram"
                                         :range="[{'label': '1000G'},{'label': '1G'}]"
                                         :min="1"
                                         :max="1000"
                                         :lineHeight="17"
                                         :processStyle="{ backgroundImage: 'linear-gradient(to left, #2979ff, #24d5d8)',
                                     fontFamily: 'IRANSans(FaNum)'}">

                            </VueSlideBar>
                            <p class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                               style="margin: 0;color: #3ccc38; font-size: 9px">
                                هزینه هر گیگابایت رم ۶۰ هزارتومان است</p>
                        </div>

                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12"
                     style="display: inline-flex; flex-direction:row; height: 32px; width: 100%; margin-top: 70px; white-space: nowrap;">

                    <h3 class="customization-title">هارد اختصاصی</h3>
                    <div style="height: 1px; margin: auto 12px auto auto;width: 100%;display: inline-flex; background-color: #7c7c7c;"></div>

                </div>

                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: 16px;">

                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4" style="height: 100%; display: flex;">
                        <img src="../../../assets/svg/my-plan.svg" alt="zone" style="width: 70px; height: 70px;
                    filter: invert(60%) sepia(44%) saturate(4202%) hue-rotate(208deg) brightness(102%) contrast(101%)">

                        </img>
                    </div>

                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-8"
                         style="display: block; float: right; position: relative;">
                        <div class="row col-lg-12 col-sm-12 col-md-12 col-xs-12"
                             style="display: flex; margin-top: 16px;">

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                                 style="display: inline-flex; position: relative">
                                <label style="font-family: yekan-bold; font-size: 12px; color: #606060; white-space: nowrap; width: 100%;">
                                    <input value="planData.storage" v-model="planData.storage" style="border: solid 1px #7c7c7c; border-radius: 3px;background-color: transparent; width: 70%; height: 35px
;direction: ltr;font-family: 'IRANSans(FaNum)'; padding: 0 12px;">
                                    گیگابایت
                                </label>
                            </div>

                            <VueSlideBar class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left"
                                         v-model="planData.storage"
                                         :range="[{'label': '1000G'},{'label': '10G'}]"
                                         :min="10"
                                         :max="1000"
                                         :lineHeight="17"
                                         :processStyle="{ backgroundImage: 'linear-gradient(to left, #2979ff, #24d5d8)',
                                     fontFamily: 'IRANSans(FaNum)'}">

                            </VueSlideBar>
                            <p class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                               style="margin: 0;color: #3ccc38; font-size: 9px">
                                هزینه هر گیگابایت هارد اختصاصی ۱۲۰۰ تومان است</p>
                        </div>

                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12"
                     style="display: inline-flex; flex-direction:row; height: 32px; width: 100%; margin-top: 70px; white-space: nowrap;">

                    <h3 class="customization-title">ویژگی‌های رایگان</h3>
                    <div style="height: 1px; margin: auto 12px auto auto;width: 100%;display: inline-flex; background-color: #7c7c7c;"></div>

                </div>

                <div class="between-xs" style="box-sizing: border-box; display: flex; flex: 0 1 auto;
                            flex-direction: row; flex-wrap: wrap">

                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md" style=" height: 250px;border-radius: 3px;
                        box-shadow: 0 2px 6px 0 rgba(41, 121, 255, 0.42);
                        margin: 1rem 0;
                        background-color: #2979ff;">

                            <div style="padding: 20px;">
                                <img
                                     src="../../../assets/svg/ic-auto-scaling.svg"
                                     style="width: 90px; height: 90px; display: block;
                                     margin-left: auto; margin-right: auto;" />

                                <p style="text-align:center;font-family: 'IRANYekan';font-size: 17px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 40px;color: #fefefe;">Load Balancer</p>

                                <p style="text-align:center;font-family: yekan-light;font-size: 14px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 13px;color: #fefefe;">رایگان</p>
                            </div>
                        </div>
                    </div>


                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md" style=" height: 250px;border-radius: 3px;
                        box-shadow: 0 2px 6px 0 rgba(41, 121, 255, 0.42);
                        margin: 1rem 0;
                        background-color: #2979ff;">

                            <div style="padding: 20px;">
                                <img
                                        src="../../../assets/svg/ic-auto-scaling.svg"
                                        style="width: 90px; height: 90px; display: block;
                                     margin-left: auto; margin-right: auto;" />

                                <p style="text-align:center;font-family: 'IRANYekan';font-size: 17px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 40px;color: #fefefe;">پهنای باند</p>

                                <p style="text-align:center;font-family: yekan-light;font-size: 14px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 13px;color: #fefefe;">رایگان</p>
                            </div>
                        </div>
                    </div>


                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md" style=" height: 250px;border-radius: 3px;
                        box-shadow: 0 2px 6px 0 rgba(41, 121, 255, 0.42);
                        margin: 1rem 0;
                        background-color: #2979ff;">

                            <div style="padding: 20px;">
                                <img
                                        src="../../../assets/svg/ic-auto-scaling.svg"
                                        style="width: 90px; height: 90px; display: block;
                                     margin-left: auto; margin-right: auto;" />

                                <p style="text-align:center;font-family: 'IRANYekan';font-size: 17px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 40px;color: #fefefe;">گواهی‌نامه SSL</p>

                                <p style="text-align:center;font-family: yekan-light;font-size: 14px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 13px;color: #fefefe;">رایگان</p>
                            </div>
                        </div>
                    </div>


                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md" style=" height: 250px;border-radius: 3px;
                        box-shadow: 0 2px 6px 0 rgba(41, 121, 255, 0.42);
                        margin: 1rem 0;
                        background-color: #2979ff;">

                            <div style="padding: 20px;">
                                <img
                                        src="../../../assets/svg/ic-auto-scaling.svg"
                                        style="width: 90px; height: 90px; display: block;
                                     margin-left: auto; margin-right: auto;" />

                                <p style="text-align:center;font-family: 'IRANYekan';font-size: 17px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 40px;color: #fefefe;">Health Check</p>

                                <p style="text-align:center;font-family: yekan-light;font-size: 14px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 13px;color: #fefefe;">رایگان</p>
                            </div>
                        </div>
                    </div>


                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md" style=" height: 250px;border-radius: 3px;
                        box-shadow: 0 2px 6px 0 rgba(41, 121, 255, 0.42);
                        margin: 1rem 0;
                        background-color: #2979ff;">

                            <div style="padding: 20px;">
                                <img
                                        src="../../../assets/svg/ic-auto-scaling.svg"
                                        style="width: 90px; height: 90px; display: block;
                                     margin-left: auto; margin-right: auto;" />

                                <p style="text-align:center;font-family: 'IRANYekan';font-size: 16px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 40px;color: #fefefe;">استفاده از رجیستری دلخواه</p>

                                <p style="text-align:center;font-family: yekan-light;font-size: 14px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 13px;color: #fefefe;">رایگان</p>
                            </div>
                        </div>
                    </div>


                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="middle-xs middle-sm middle-lg middle-md" style=" height: 250px;border-radius: 3px;
                        box-shadow: 0 2px 6px 0 rgba(41, 121, 255, 0.42);
                        margin: 1rem 0;
                        background-color: #2979ff;">

                            <div style="padding: 20px;">
                                <img
                                        src="../../../assets/svg/ic-auto-scaling.svg"
                                        style="width: 90px; height: 90px; display: block;
                                     margin-left: auto; margin-right: auto;" />

                                <p style="text-align:center;font-family: 'IRANYekan';font-size: 16px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 40px;color: #fefefe;">ایمیج رجیستری اختصاصی</p>

                                <p style="text-align:center;font-family: yekan-light;font-size: 14px;
                                font-style: normal;font-stretch: normal;line-height: 1.17;letter-spacing: normal;
                                margin-top: 13px;color: #fefefe;">رایگان</p>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
            <div style="position: sticky; background: #ffffff; border-radius: 3px;
                        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); width: 100%; height: 160px;top: 60px;bottom: 0;
                        margin-top: 140px;z-index: 10;"
                 class="container-fluid col-md-3 col-lg-3 col-sm-3 col-xs-12">

                <p style="font-family: IRANYekan; padding: 0 16px; font-size: 15px; text-align: center">مبلغ نهایی
                    (تومان):</p>
                <p style="width: 100%; text-align: center; font-family: 'IRANSans(FaNum)';">{{total}}</p>

                <button style="width: 100%; height: 40px; border-radius: 3px;
                margin-bottom: 16px;
                border: transparent;
                box-shadow: 0 3px 6px 0 rgba(60, 204, 56, 0.42);background-color: #3ccc38;
                font-family: IRANYekan; font-size: 14px">
                    ثبت نهایی و پرداخت
                </button>

            </div>
            <!--<panel-box>-->
            <!--<f-panels :items="allPlan"/>-->
            <!--</panel-box>-->

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

    export default {
        layout: "dashboard",
        name: "plans",
        data: function () {
            return {
                planData: {
                    ram: 1,
                    storage: 10,
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
                return this.planData.ram / 2;
            }, total() {
                let temp = this.planData.ram * 60000 + this.planData.storage * 1200;
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
            this.getData();
        },
        methods: {
            async getData() {
                try {
                    await this.$store.dispatch("plan/getPlans", this.namespace);
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    } else {
                        this.$notify({
                            title: e.data.message,
                            time: 4000,
                            type: "error"
                        });
                    }
                }
            },
            scroll() {
                new Vue({
                    el: "#cint",
                    methods: {
                        /**
                         * scrollTo - Horizontal Scrolling
                         * @param {(HTMLElement ref)} element - Scroll Container
                         * @param {number} scrollPixels - pixel to scroll
                         * @param {number} duration -  Duration of scrolling animation in millisec
                         */
                        scrollTo(element, scrollPixels, duration) {
                            const scrollPos = element.scrollLeft;
                            // Condition to check if scrolling is required
                            if (!((scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0))) {
                                // Get the start timestamp
                                const startTime =
                                    "now" in window.performance
                                        ? performance.now()
                                        : new Date().getTime();

                                function scroll(timestamp) {
                                    //Calculate the timeelapsed
                                    const timeElapsed = timestamp - startTime;
                                    //Calculate progress
                                    const progress = Math.min(timeElapsed / duration, 1);
                                    //Set the scrolleft
                                    element.scrollLeft = scrollPos + scrollPixels * progress;
                                    //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
                                    if (timeElapsed < duration) {
                                        //Request for animation
                                        window.requestAnimationFrame(scroll);
                                    } else {
                                        return;
                                    }
                                }

                                //Call requestAnimationFrame on scroll function first time
                                window.requestAnimationFrame(scroll);
                            }
                        },
                        swipeLeft() {
                            const content = this.$refs.content;
                            this.scrollTo(content, -300, 800);
                        },
                        swipeRight() {
                            const content = this.$refs.content;
                            this.scrollTo(content, 300, 800);
                        }
                    }
                });
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
        font-family: yekan-bold
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
        font-family yekan-bold
        font-size 17px
        font-style normal
        display inline-flex
        line-height 32px
        margin auto;
        letter-spacing normal
        color #2979ff

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

    .vue-slide-bar-tooltip {
        position: relative;
        font-size: 0 !important;
        white-space: nowrap;
        padding: 13px 13px !important;
        min-width: 24px !important;
        text-align: center;
        color: #fff;
        border-radius: 100px !important;
        border: transparent !important;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.17) !important;
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
        background-image: url("../../../assets/svg/arrow.svg") !important;
        filter: invert(100%) sepia(100%) saturate(100%) hue-rotate(0deg) brightness(100%) contrast(100%);
        background-repeat: no-repeat !important;
        background-position: center !important;
        background-size: 8px;
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
