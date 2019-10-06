<template>

    <div style="margin-bottom: 50px; width: 100%">
        <div class="row" style="width: 100%;">
            <div style="width: 100%; display: flex">
                <p class="date-tile">تاریخ پایان پلن شما:
                    <span class="date-value" v-if="planExpirationDate">{{planExpirationDate}}</span>
                    <span class="date-value" v-else>نامحدود</span>
                </p>
            </div>

            <div v-if="verifyUserAccess({ADMIN:'ADMIN'})"
                 class="profile-plan-action-container">
                <div class="redeem-plan-container">
                    <input v-model.number="monthCount" @input="monthChanged" dir="rtl" type="number"
                           placeholder="مدت زمان تمدید پلن بین ۱ تا ۲۴ ماه"
                           style="flex: 0.9 0 auto; padding: 0 16px; border: none; outline: none;border-radius: 3px;font-family: iran-sans">
                    <button style="color: #fefefe; flex: 0.15 0 auto; border: none; outline: none; background-color: #24D5D8;font-family: iran-yekan; border-top-left-radius: 3px; border-bottom-left-radius: 3px; cursor: pointer; font-size: 1.1em"
                            @click="redeemPlan">
                        تمدید پلن فعلی
                    </button>
                </div>
                <button class="navigation-button"
                        style="background-color: #0045ff; box-shadow: 0 2px 6px 0 rgba(0, 69, 255, 0.42)"
                        @click="navigateToPlanPage">
                    افزایش منابع پلن
                </button>
            </div>


            <div style="width: 100%; margin-top: 16px; display: flex">
                <div class="plan-container" style="padding: 12px; width: 100%;">

                    <div style="height: 100px; flex: 1 0 auto">
                        <div class="container-fluid row plan-item">
                            <img class="plan-image" alt="cpu" src="../../../assets/svg/ic-cpu.svg">


                            <div style="margin-top: auto;margin-bottom: auto;margin-right: 24px; padding: 0;">
                                <p class="plan-title">پردازنده</p>
                                <p class="plan-value">{{quota.cpu_limit}} هسته</p>

                            </div>
                        </div>
                    </div>

                    <div style="height: 100px; flex: 1 0 auto">
                        <div class="container-fluid row plan-item">
                            <img alt="storage"
                                 class="plan-image"
                                 style="transform: scale(0.8)"
                                 src="../../../assets/svg/ic-storage.svg">


                            <div style="margin-top: auto;margin-bottom: auto;margin-right: 24px; padding: 0;">

                                <p class="plan-title">حافظه ذخیره‌سازی</p>
                                <p class="plan-value">{{quota.volume_limit}} گیگابایت</p>

                            </div>
                        </div>
                    </div>

                    <div style="height: 100px; flex: 1 0 auto">
                        <div class="container-fluid row plan-item">
                            <img alt="memory" src="../../../assets/svg/ic-memory.svg" class="plan-image"
                                 style="transform: rotate(45deg) scale(1.1)">


                            <div style="margin-top: auto;margin-bottom: auto;margin-right: 24px; padding: 0;">

                                <p class="plan-title">رم</p>
                                <p class="plan-value">{{(quota.memory_limit > 511 ?
                                    parseFloat(Math.fround(quota.memory_limit /
                                    1024).toExponential(1)) : quota.memory_limit)}}
                                    <span v-if="quota.memory_limit>=512">گیگابایت</span>
                                    <span v-else>مگابایت</span>
                                </p>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {getValue} from "../../../utils/cookie";
    import Moment from 'moment-jalaali';
    import ErrorReporter from "~/utils/ErrorReporter";
    import RoleAccessHandler from "../../../utils/RoleAccessHandler";

    export default {
        props: ['cpu', 'memory', 'dedicatedVolume'],
        name: "profile-plan",
        data() {
            return {
                quota: {},
                finalBill: {
                    memory: 0,
                    dedicatedVolume: 0,
                },
                monthCount: null,
            }
        },
        components: {
            Moment,
        },
        computed: {

            namespace() {
                return getValue('namespace');
            },
            planExpirationDate() {
                if (this.quota.hasOwnProperty('expires_at')) {
                    if (this.quota.expires_at) {
                        return Moment(this.quota.expires_at).format('jYYYY/jMM/jDD');
                    }
                }
                return false;
            }
        },
        methods: {
            monthChanged(month) {
                this.monthCount = month.target.value;
                if (this.monthCount > 24) {
                    this.monthCount = 24;
                } else if (this.monthCount < 1) {
                    this.monthCount = 1
                }
            },
            verifyUserAccess(permitted_roles) {
                return RoleAccessHandler(permitted_roles)
            },
            async requestUserPlan() {
                try {
                    let plan = await this.$store.dispatch('getNameSpace', this.namespace);
                    this.quota = plan.quota;
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push('/user/login');
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

            }, async redeemPlan() {

                if (parseFloat(Math.fround(this.quota.memory_limit / 1024).toExponential(1)) < 0.5) {
                    alert('اول پلن بخر بعدش تمدید کن عزیزم');
                    return;
                }

                const bill = this.makeBill();

                await this.$store.dispatch("plan/requestPlan", bill)
                    .then(planRespose => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        this.$router.push(`plans/bill/${planRespose.invoice.id}`);
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

            }, makeBill() {
                let bill = {}
                if (this.quota) {
                    this.finalBill.memory = parseFloat(Math.fround(this.quota.memory_limit / 1024).toExponential(1));
                    this.finalBill.dedicatedVolume += this.quota.volume_limit;

                    if (this.finalBill.memory > 0)
                        bill['memory'] = this.finalBill.memory
                    if (this.finalBill.dedicatedVolume > 0)
                        bill['dedicated_volume'] = this.finalBill.dedicatedVolume
                }

                bill['month_count'] = this.monthCount === null ? 1 : this.monthCount;
                return bill;
            },
            navigateToPlanPage() {
                this.$router.push('/dashboard/plans');
            }
        },
        created() {
            this.$store.commit("SET_DATA", {data: true, id: "loading"});
            this.requestUserPlan();
        }
    }
</script>

<style lang="stylus" scoped>

    .row
        margin-left 0 !important
        margin-right 0 !important
        @media only screen and (max-width 992px)
            margin-left -1rem !important
            margin-right -1rem !important
    .plan-container
        border-radius 3px
        display flex
        width 100%
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        background-color #ffffff
        @media only screen and (max-width 992px)
            flex-direction column
            margin-right auto
            margin-left auto
            max-width 400px

    .plan-item
        width 100%
        height 100%
        margin 0
        justify-content right
        display flex
        position relative
        @media only screen and (max-width: 900px)
            margin-top 12px

        img.plan-image
            padding 0
            width 80px
            height 100%
            margin-top auto
            margin-bottom auto
            filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)

        p.plan-title
            margin 0
            font-family yekan-bold
            font-size 1.1em

        p.plan-value
            margin 0
            font-family iran-sans
            font-size 1em

    .navigation-container
        width 100%
        margin-right auto
        margin-left auto
        display flex
        position relative
        justify-content center


    .navigation-button
        width 300px
        height 50px
        background-color #0045ff
        outline none
        border none
        position relative
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(41, 121, 255, 0.42)
        color #ffffff
        font-family iran-yekan
        font-size 1em
        margin-left 5px
        margin-right auto
        cursor pointer
        margin-top 16px
        margin-bottom 24px
        @media only screen and (max-width 992px)
            margin-bottom 16px
            max-width 400px
            margin-top 0
            width 100%
            font-size 1.1em
            margin-left auto


    .date-tile
        font-family yekan-bold
        font-size 1.3em
        font-style normal
        margin-top 24px
        margin-bottom 16px
        font-stretch normal
        letter-spacing normal
        color: #7c7c7c
        @media only screen and (max-width 992px)
            margin-right auto
            margin-left auto
            font-size 1.5em


    .date-value
        font-family iran-sans
        font-size .9em
        font-style normal
        margin-top 24px
        margin-bottom 16px
        font-stretch normal
        letter-spacing normal
        color: #222

    .redeem-plan-container
        border-radius 3px
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.09)
        width 40%
        height 50px
        background-color #fefefe
        margin-top 16px
        margin-bottom 24px
        display flex
        padding 0
        @media only screen and (max-width 992px)
            margin-right auto
            margin-left auto
            max-width 400px
            width 100%

    .profile-plan-action-container
        width: 100%;
        display: flex
        @media only screen and (max-width 992px)
            flex-direction column



</style>
