<template>
    <div class="wrapper">
        <f-loading :isFull="true" v-if="loading"/>
        <no-ssr>
            <f-d-header/>
            <div :class=" ['wrapper-content', (isMobile ? '' : 'container-fluid'),{'is-small':openSidebar}]">
                <div v-if="isMenuAvailable" :class="['wrapper-sidebar', {'open':openSidebar}]">
                    <admin-sidebar/>
                </div>
                <div :class="['wrapper-main',{'open':openSidebar}]"
                     :style="{opacity:(isMobile && openSidebar ? '0.5' : '1.0')}">
                    <div class="dash-container">
                        <div :class="[(isMobile ? '' : 'container-fluid')]">

                            <div v-if="accountExpired" class="box-row" style="margin-bottom: 16px">

                                <div style="width: 100%; background-color: #FFBABA; margin: 0; border-radius: 5px; padding: 16px; border: 2px solid #D8000C ">

                                    <div style="margin: auto; display: flex">
                                        <img src="../assets/svg/warning.svg" alt="warning"
                                             style="width: 64px; height: auto; margin-top: auto; margin-bottom: auto; display: inline-flex;
                                                    filter: invert(23%) sepia(92%) saturate(7318%) hue-rotate(347deg) brightness(78%) contrast(122%);">
                                        <p v-if="remainingTime !== 0" style="display: inline-block; margin: auto 16px auto 0; font-family: iran-yekan; font-size: 1.2em; color: #D8000C">
                                            تنها
                                            <span style="font-family: iran-sans; color: #D8000C">{{remainingTime}}</span>
                                            روز دیگر از پلن شما باقی مانده است. جهت تمدید، لطفا نسبت به تمدید پلن خو
                                            اقدام فرمایید، در غیر این صورت بعد از این تاریخ سرویس‌های شما از دسترس خارج
                                            خواهند شد.
                                        </p>
                                        <p v-else style="display: inline-block; margin: auto 16px auto 0; font-family: iran-yekan; font-size: 1.2em; color: #D8000C">
                                            مدت اعتبار پلن شما به پایان رسیده است! لطفا برای جلوگیری از خاموش شدن سرویس‌هایتان پلن خود را تمدید نمایید.
                                        </p>
                                    </div>
                                    <div style="width: 100%; display: flex;">
                                        <button @click="redeemPlan"
                                                style="outline: none; font-size: 1em; font-weight: bold; background: #35cc33;box-shadow: 0 2px 6px rgba(53,204,51, 0.4); padding:12px 62px; border-radius: 3px; cursor: pointer; color: #fefefe; margin-right: auto">
                                            تمدید پلن
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <nuxt/>

                        </div>
                    </div>
                </div>
            </div>
            <notification/>
            <alert/>
        </no-ssr>
    </div>
</template>

<script>
    import FDHeader from "~/components/Dashboard/header";
    import FFooter from "~/components/Footer";
    import AdminSidebar from "~/components/Dashboard/sidebar";
    import "normalize.css";
    import Notification from "~/components/Dashboard/notification";
    import Alert from "~/components/Dashboard/alert";
    import {readCookieReq, readCookie} from "../utils/cookies.js";
    import {alertReport} from "../utils/AlertError";
    import FLoading from "~/components/Loading";
    import Moment from 'moment-jalaali';

    export default {
        components: {
            FDHeader,
            FLoading,
            FFooter,
            AdminSidebar,
            Notification,
            Alert,
            Moment
        },
        computed: {
            loading() {
                return this.$store.state.loading;
            },
            message() {
                return this.$store.state.message;
            },
            openSidebar() {
                return this.$store.state.sideMunu
            },
            isMobile() {
                return this.$store.state.windowWidth <= 992;
            },
            isMenuAvailable() {
                if (this.$route.path.indexOf('account') !== -1) {
                    return false;
                } else return this.$route.path.indexOf('bill') === -1;
            }, accountExpired() {
                if(this.$route.path.indexOf('bill') !== -1)
                    return false

                let plan = this.$store.state.activePlan;
                if (plan.hasOwnProperty('quota')) {
                    if (plan.quota.expires_at === null)
                        return false;
                    else
                        return Moment(plan.quota.expires_at).jDayOfYear() - Moment(new Date()).jDayOfYear() <= 3;
                } else
                    return false
            }, remainingTime() {
                let plan = this.$store.state.activePlan;
                if (plan.hasOwnProperty('quota')) {
                    return Math.max(Moment(plan.quota.expires_at).jDayOfYear() - Moment(new Date()).jDayOfYear(), 0)
                } else {
                    return 0
                }
            }
        },

        watch: {
            $route() {
                if (this.message) {
                    this.$store.dispatch("setMessage", this.message);
                    this.$store.dispatch("showModal", "message");
                }
                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                this.$store.commit('SET_DATA', {id: 'isNativeMenus', data: null});
                if (this.isMobile) {
                    this.$store.commit("SET_DATA", {data: false, id: "sideMunu"});
                }
            }
        },
        beforeMount() {
            let token;
            let valid = false;
            if (process.browser) {
                token = readCookie("USER_TOKEN");
                valid = token ? true : false;
                if (!valid) {
                    this.$router.push("/user/login");
                }
            }
        },
        mounted() {
            this.handelEventSize()
            if (this.isMobile) {
                this.$store.commit('SET_DATA', {id: 'isNativeMenus', data: null})
                this.$store.commit("SET_DATA", {data: false, id: "sideMunu"});
            }
            this.handelRyChat()
        },
        methods: {
            async redeemPlan() {

                let plan = this.$store.state.activePlan;

                if (!plan.hasOwnProperty('quota')) {
                    return
                }

                let quota = plan.quota

                if (parseFloat(Math.fround(quota.memory_limit / 1024).toExponential(1)) < 0.5) {
                    return;
                }

                const bill = this.makeBill(quota);

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

            },
            makeBill(quota) {
                let finalBill =  {
                    memory: 0.0,
                        dedicatedVolume: 0,
                }
                if (quota) {
                    finalBill.memory = parseFloat(Math.fround(quota.memory_limit / 1024).toExponential(1));
                    finalBill.dedicatedVolume += quota.volume_limit;
                }
                return finalBill;
            },
            handelRyChat() {
                let elm = document.querySelector('#raychatFrame')
                if (!elm) {
                    const raychatScript = document.createElement('script')
                    raychatScript.innerText = '!function(){function t(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,localStorage.getItem("rayToken")?t.src="https://app.raychat.io/scripts/js/"+o+"?rid="+localStorage.getItem("rayToken")+"&href="+window.location.href:t.src="https://app.raychat.io/scripts/js/"+o;var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}var e=document,a=window,o="b34779ab-3e49-4256-8f71-ec8ae7e76d64";"complete"==e.readyState?t():a.attachEvent?a.attachEvent("onload",t):a.addEventListener("load",t,!1)}();'
                    document.head.appendChild(raychatScript)
                }
            },
            handelEventSize() {
                var vm = this;
                window.addEventListener("resize", function (e) {
                    vm.setSize(e);
                });
                if (process.browser) {
                    this.setDefaultSize();
                }
            },
            setSize(e) {
                this.$store.dispatch("SET_SIZE", {
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            },
            setDefaultSize(e) {
                this.$store.dispatch("SET_SIZE", {
                    width: window.innerWidth,
                    height: window.innerHeight
                });
                if (this.isMobile) {
                    this.$store.dispatch("TOGGLE_NAV", {data: null, id: "sidebar"});
                }
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @import '../assets/css/main.styl'
    @import '../assets/css/variables.styl'

    $spaceTop = 45
    .parent-sidebar
        position relative

    // transition all 0.5s
    .dash-container
        box-sizing border-box
        margin-top $spaceTop + 68px
        padding-bottom 20px
        min-height calc(100vh - 120px)
        @media only screen and (max-width: 1230px)
            margin 0
            margin-top $spaceTop + 60px
            padding 0 30px
            width 100%
        @media only screen and (max-width: 992px)
            padding 0 15px

    .wrapper
        width 100%
        background #f5f5f5

        &-content
            display flex
            width 95%
            max-width 1600px
            padding-bottom 128px
            font-size 16px
            transition $transitionMain
            @media only screen and (min-width: 1600px)
                width 100%
            @media only screen and (max-width: 1250px)
                width 100%
                font-size 14px
            @media only screen and (max-width: 1230px)
                width 100%
                font-size 10px
            @media only screen and (max-width: 992px)
                width 100%
                font-size 12px

        &-sidebar
            position relative
            min-width $widthSidebarClose
            transition $transitionMain

            &.open
                min-width $widthSidebarOpen
            @media only screen and (max-width: $sizeMd)
                min-width 0
                &.open
                    min-width 0

        &-main
            flex-grow 1
            box-sizing border-box
            // margin-right 0.8em
            // margin-left 0.8em
            min-width calc(100vh - 5.25em)
            transition $transitionMain

            &.open
                min-width calc(100vh - 23em)
            @media only screen and (max-width: $sizeMd)
                min-width 0
                &.open
                    min-width 0
</style>
