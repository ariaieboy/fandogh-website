<template>
    <div class="wrapper" style="padding-bottom: 100px">
        <!--<f-loading :isFull="true" v-if="loading"/>-->
        <no-ssr>
            <f-d-header style="z-index: 10000"/>
            <div :class=" ['wrapper-content', (isMobile ? '' : 'container-fluid'),{'is-small':openSidebar}]">
                <div v-if="isMenuAvailable" :class="['wrapper-sidebar open']">
                    <admin-sidebar :items="items" v-bind.sync="stepPage"></admin-sidebar>
                </div>
                <div :class="['wrapper-main',{'open':openSidebar}]"
                     :style="{opacity:(isMobile && openSidebar ? '0.5' : '1.0')}">
                    <div class="dash-container">
                        <div :class="[(isMobile ? '' : 'container-fluid')]">
                            <keep-alive>
                                <component :is="stepPage.step_name"></component>
                            </keep-alive>

                            <div class="navigation-container">

                                <span class="navigation-btn" @click="backward">
                                <svg class="backward" width="180px" height="45px" viewBox="0 0 180 45" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <!-- Generator: Sketch 53.1 (72631) - https://sketchapp.com -->
                                    <desc>Created with Sketch.</desc>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Group-18">
                                            <path d="M3,0 L157.5,7.10542736e-15 C169.926407,4.82273345e-15 180,10.0735931 180,22.5 C180,34.9264069 169.926407,45 157.5,45 L3,45 C1.34314575,45 2.02906125e-16,43.6568542 0,42 L0,3 C-2.02906125e-16,1.34314575 1.34314575,7.48448398e-16 3,4.4408921e-16 Z M156.6175,41 C166.783682,41 175.025,32.7172679 175.025,22.5 C175.025,12.2827321 166.783682,4 156.6175,4 C146.451318,4 138.21,12.2827321 138.21,22.5 C138.21,32.7172679 146.451318,41 156.6175,41 Z"
                                                  id="Combined-Shape" fill="#FFFFFF"></path>
                                            <ellipse id="Oval" fill="#FEFEFE" cx="156.6175" cy="22.5" rx="16.4175"
                                                     ry="16.5"></ellipse>
                                            <g id="ic_navigate_next" transform="translate(143.185000, 9.000000)">
                                                <g id="Icon-24px">
                                                    <path d="M12.5859101,5.411639 C11.8101815,4.63201231 10.5554279,4.62904664 9.77253124,5.41587743 L10.3853564,4.79997278 C9.6072987,5.58194029 9.61210224,6.85598242 10.3914593,7.64096608 L14.7232538,12.0040339 C15.504682,12.7911037 15.5026108,14.069282 14.7232538,14.8542657 L10.3914593,19.2173335 C9.61003109,20.0044033 9.60245974,21.271496 10.3853564,22.0583268 L9.77253124,21.4424222 C10.5505889,22.2243897 11.8114772,22.2249851 12.5859101,21.4466606 L19.1587525,14.8407888 C19.9344811,14.0611621 19.9331854,12.7958353 19.1587525,12.0175108 L12.5859101,5.411639 Z"
                                                          id="Shape" fill="#6C6C6C"></path>
                                                    <polygon id="Shape" points="0 0 27.86 0 27.86 28 0 28"></polygon>
                                                </g>
                                            </g>
                                        </g>
                                    </g>


                                    <text x="92"
                                          y="21"
                                          :fill="(stepPage.step === 0 ? '#9c9c9c' : '#000000')"
                                          style="font-family: iran-yekan; font-size: 16px; font-weight: bold; user-select: none"
                                          text-anchor="start"
                                          alignment-baseline="middle">
                                        قبلی
                                    </text>
                                    </svg>
                                </span>

                                <button class="create-svc-btn">اتمام ساخت</button>

                                <span class="navigation-btn" @click="forward">

                               <svg class="forward" width="180px" height="45px" viewBox="0 0 180 45" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <!-- Generator: Sketch 53.1 (72631) - https://sketchapp.com -->
                                <desc>Created with Sketch.</desc>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Group-18"
                                       transform="translate(90.000000, 22.500000) scale(-1, 1) translate(-90.000000, -22.500000) ">
                                        <path d="M3,0 L157.5,7.10542736e-15 C169.926407,4.82273345e-15 180,10.0735931 180,22.5 C180,34.9264069 169.926407,45 157.5,45 L3,45 C1.34314575,45 3.8818616e-15,43.6568542 0,42 L0,3 C-2.02906125e-16,1.34314575 1.34314575,7.48448398e-16 3,4.4408921e-16 Z M156.6175,41 C166.783682,41 175.025,32.7172679 175.025,22.5 C175.025,12.2827321 166.783682,4 156.6175,4 C146.451318,4 138.21,12.2827321 138.21,22.5 C138.21,32.7172679 146.451318,41 156.6175,41 Z"
                                              id="Combined-Shape" fill="#FFFFFF"></path>
                                        <circle id="Oval" fill="#FEFEFE" cx="156.5" cy="22.5" r="16.5"></circle>
                                        <g id="ic_navigate_next" transform="translate(143.000000, 9.000000)">
                                            <g id="Icon-24px">
                                                <path d="M12.6491559,5.411639 C11.8695292,4.63201231 10.6084702,4.62904664 9.82163944,5.41587743 L10.4375441,4.79997278 C9.65557658,5.58194029 9.66040426,6.85598242 10.4350899,7.63235949 L14.8058278,12.0126405 C15.5864399,12.794957 15.5805134,14.069282 14.8058278,14.8456591 L10.4350899,19.2259401 C9.65447779,20.0082566 9.65071331,21.271496 10.4375441,22.0583268 L9.82163944,21.4424222 C10.603607,22.2243897 11.8708314,22.2249851 12.6491559,21.4466606 L19.2550277,14.8407888 C20.0346544,14.0611621 20.0333522,12.7958353 19.2550277,12.0175108 L12.6491559,5.411639 Z"
                                                      id="Shape" fill="#6C6C6C"></path>
                                                <polygon id="Shape" points="0 0 28 0 28 28 0 28"></polygon>
                                            </g>
                                        </g>
                                    </g>
                                </g>


                                    <text x="118"
                                          y="21"
                                          :fill="(stepPage.step === 5 ? '#9c9c9c' : '#000000')"
                                          style="font-family: iran-yekan; font-size: 16px; font-weight: bold; user-select: none"
                                          text-anchor="start"
                                          alignment-baseline="middle">
                                        بعدی
                                    </text>
                                </svg>
                            </span>

                            </div>

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
    import FDHeader from "~/components/wizard/header";
    import FFooter from "~/components/Footer";
    import AdminSidebar from "~/components/wizard/sidebar";
    import "normalize.css";
    import Notification from "~/components/Dashboard/notification";
    import Alert from "~/components/Dashboard/alert";
    import {readCookieReq, readCookie} from "../utils/cookies.js";
    import {alertReport} from "../utils/AlertError";
    import FLoading from "~/components/Loading";
    import Moment from 'moment-jalaali';
    import ServiceKind from "../pages/dashboard/services/wizard/index";
    import ImageSetup from "../pages/dashboard/services/wizard/image-setup";

    export default {
        name: "wizard",
        components: {
            FDHeader,
            FLoading,
            FFooter,
            AdminSidebar,
            Notification,
            Alert,
            Moment,
            ServiceKind,
            ImageSetup,
        },
        data() {

            return {

                stepPage: {
                    step: 0,
                    text: 'نوع سرویس',
                    component: '/dashboard/general',
                    active: true,
                    step_name: 'ServiceKind'
                }
                ,
                items: [
                    {
                        step: 0,
                        text: 'نوع سرویس',
                        component: '/dashboard/general',
                        active: true,
                        step_name: 'ServiceKind'
                    },
                    {
                        step: 1,
                        text: 'انتخاب ایمیج',
                        component: '/dashboard/general',
                        active: false,
                        step_name: 'ImageSetup'
                    },
                    {
                        step: 2,
                        text: 'Environment Variable',
                        component: '/dashboard/general',
                        active: false,
                        step_name: ''
                    },
                    {step: 3, text: 'Volumes', component: '/dashboard/general', active: false, step_name: ''},
                    {step: 4, text: 'Port Mapping', component: '/dashboard/general', active: false, step_name: ''},
                    {step: 5, text: 'Health Check', component: '/dashboard/general', active: false, step_name: ''},
                ]
            }
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
                return Math.max(Moment(plan.quota.expires_at).jDayOfYear() - Moment(new Date()).jDayOfYear(), 0)
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
            this.handelEventSize();
            window.addEventListener('beforeunload', (event) => {
                // event.returnValue = 'There is pending work. Sure you want to leave?';
                // localStorage.removeItem('vuex')
            });
            if (this.isMobile) {
                this.$store.commit('SET_DATA', {id: 'isNativeMenus', data: null})
                this.$store.commit("SET_DATA", {data: false, id: "sideMunu"});
            }
            let manifest = this.$store.state.manifest
            // if (!Object.keys(manifest).length) this.$router.push({ path: this._steps[0].path })
            this.persistData(manifest)
            this.handelRyChat()
        },
        methods: {
            leaving(){
              alert('really?')
            },
            persistData(manifest) {
                for (let key in manifest) {
                    if (manifest.hasOwnProperty(key)) {
                        if (typeof manifest[key] === 'object' && !Array.isArray(manifest[key])) {
                            this.persistData(manifest[key])
                        } else {
                            if (this.$parent.hasOwnProperty(key)) {
                                this.$parent[key] = manifest[key]
                            }
                        }
                    }
                }
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
            },
            backward() {
                if (this.stepPage.step > 0) {

                    this.items.forEach(item => {
                        item.active = item.text === this.items[this.stepPage.step - 1].text;
                    });

                    this.items.forEach(item => {
                        if (item.active) {
                            this.stepPage.step = item.step;
                            this.stepPage.step_name = item.step_name;
                            this.stepPage.active = item.active;
                            this.stepPage.text = item.text;
                            this.stepPage.component = item.component;
                        }
                    })
                }
            },
            forward() {

                if (this.stepPage.step < 5) {

                    this.items.forEach(item => {
                        item.active = item.text === this.items[this.stepPage.step + 1].text;
                    });

                    this.items.forEach(item => {
                        if (item.active) {
                            this.stepPage.step = item.step;
                            this.stepPage.step_name = item.step_name;
                            this.stepPage.active = item.active;
                            this.stepPage.text = item.text;
                            this.stepPage.component = item.component;
                        }
                    })

                }

            }
        }
    };
</script>

<style lang="stylus" scoped>

    @import '../assets/css/main.styl'
    @import '../assets/css/variables.styl'

    *
        box-sizing content-box

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
            font-size 16px
            transition $transitionMain
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


    .navigation-btn
        flex 1 1 available
        cursor pointer

        svg.backward
            border-radius 3px 25px 25px 3px
            box-shadow 0 2px 6px rgba(0, 0, 0, 0.17)

        svg.forward
            box-shadow 0 2px 6px rgba(0, 0, 0, 0.17)
            border-radius 25px 3px 3px 25px

    .navigation-container
        display flex
        flex-direction row
        justify-content center
        height 45px
        flex-wrap wrap

    .create-svc-btn
        font-family: iran-yekan
        text-align: center
        font-size: 16px
        font-weight: bold
        color: #fefefe
        flex 1 1 auto
        max-width 200px
        min-width 100px
        min-font-size 10px
        max-font-size 16px
        height 45px
        border-radius: 3px
        vertical-align: middle
        margin-left 6px
        margin-right 6px
        outline: none
        box-shadow: 0 2px 5px 1px rgba(36, 213, 216, 0.5)
        background-color: #24d5d8

</style>



<style lang="stylus">

    .v-label {
        margin-right: 0 !important;
        align-self: start !important;
        right: auto !important;
        left: auto !important;
        background: #fefefe !important;
        width: fit-content !important;
        padding: 0 8px !important;
        float: right !important;
    }

    .v-text-field__slot
        align-items: end !important;
        height: 38px !important;


    .v-text-field
        input
            flex: 0 1 auto !important;
            line-height: 38px !important;
            height: 38px !important;
            max-height 38px !important
            padding: 5px 20px !important;
            text-align left !important
            cursor revert !important
            max-width: 100%;
            min-width: 0;
            width: 100%


    .v-label {
        vertical-align: middle !important;
    }

    /*.v-input--is-focused{*/
    /*left: auto !important;*/
    /*}*/

    .application--is-rtl .v-text-field .v-label {
        -webkit-transform-origin: none !important;
        transform-origin: none !important
    }

    .v-label {
        font-size: 16px;
        line-height: 1 !important;
        min-height: 8px;
        transition: .3s cubic-bezier(.25, .8, .5, 1)
    }

    .application--is-rtl .v-text-field .v-label {
        -webkit-transform-origin: top right;
        transform-origin: top right;
    }

    .application--is-rtl .v-text-field .v-counter {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .application--is-rtl .v-text-field--enclosed .v-input__append-outer {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }


    .v-text-field > .v-input__control > .v-input__slot:after, .v-text-field > .v-input__control > .v-input__slot:before
        bottom: -1px;
        content: "";
        position: absolute;
        transition: .3s cubic-bezier(.25, .8, .5, 1) !important;
        width: 100%


    .v-text-field .v-label {
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        top: 7px;
        -webkit-transform-origin: top right !important;
        transform-origin: top right !important;
        white-space: nowrap;
        margin-right 0 !important;
        pointer-events: none
    }

    .v-messages {
        flex: 1 1 auto;
        font-size: .7em !important;
        min-height: 12px;
        vertical-align middle !important;
        min-width: 1px;
        line-height 1 !important
        text-align right || center !important;
        position: relative
        margin-top -2px !important
    }

    .v-counter
        font-family iran-sans !important
        direction ltr !important
        margin-top 2px !important

    .v-select .vs__dropdown-toggle
        margin-bottom 8px !important
        min-height 46px !important
        border none !important
        border-bottom 1px solid #a4a4a4 !important
        border-radius 0 !important
        background-color #fff !important

    .v-input--has-state.error--text .v-label {
        -webkit-animation: shake .6s cubic-bezier(.25, .8, .5, 1) !important;
        animation: shake .6s cubic-bezier(.25, .8, .5, 1) !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text .v-messages {
        -webkit-animation: shake .6s cubic-bezier(.25, .8, .5, 1) !important;
        animation: shake .6s cubic-bezier(.25, .8, .5, 1) !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text .v-messages {
        -webkit-animation: shake .6s cubic-bezier(.25, .8, .5, 1) !important;
        animation: shake .6s cubic-bezier(.25, .8, .5, 1) !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text .v-input__slot {
        -webkit-animation: shake .6s cubic-bezier(.25, .8, .5, 1) !important;
        animation: shake .6s cubic-bezier(.25, .8, .5, 1) !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .v-input--has-state.error--text input {
        -webkit-animation: shake .6s cubic-bezier(.25, .8, .5, 1) !important;
        animation: shake .6s cubic-bezier(.25, .8, .5, 1) !important
        color: #f44336 !important;
        caret-color: #f44336 !important
    }

    .vs__selected {
        display: flex;
        align-items: center;
        background-color: rgba(41, 121, 255, .5) !important;
        border: 1px solid #0093ff !important;
        border-radius: 25px !important;
        color: #ffffff !important;
        font-family iran-yekan !important
        line-height: 1.4;
        margin: 4px 2px 0;
        padding: 0 0 0 16px !important
    }

    .vs__deselect {
        display: inline-flex;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none !important;
        margin-left: 12px !important;
        margin-right 2px !important
        margin-top 2px !important
        margin-bottom 2px !important
        padding: 9px !important;
        border: 1px solid #0093ff !important;
        border-radius 50px !important
        cursor: pointer;
        background: #fefefe !important;
        fill: rgba(60, 60, 60, .5) !important;
        text-shadow: 0 1px 0 #fff
    }


    .tooltip {
        display: block !important;
        z-index: 10000;
        max-width: 300px;
        font-family: iran-yekan;
        line-height: 1.7;
        font-size: 0.9em;
    }

    .tooltip .tooltip-inner {
        background: black;
        color: white;
        border-radius: 16px;
        padding: 5px 10px 4px;
    }

    .tooltip .tooltip-arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 5px;
        border-color: black;
        z-index: 1;
    }

    .tooltip[x-placement^="top"] {
        margin-bottom: 5px;
    }

    .tooltip[x-placement^="top"] .tooltip-arrow {
        border-width: 5px 5px 0 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }

    .tooltip[x-placement^="bottom"] {
        margin-top: 5px;
    }

    .tooltip[x-placement^="bottom"] .tooltip-arrow {
        border-width: 0 5px 5px 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }

    .tooltip[x-placement^="right"] {
        margin-left: 5px;
    }

    .tooltip[x-placement^="right"] .tooltip-arrow {
        border-width: 5px 5px 5px 0;
        border-left-color: transparent !important;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        left: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
    }

    .tooltip[x-placement^="left"] {
        margin-right: 5px;
    }

    .tooltip[x-placement^="left"] .tooltip-arrow {
        border-width: 5px 0 5px 5px;
        border-top-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        right: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
    }

    .tooltip.popover .popover-inner {
        background: #f9f9f9;
        color: black;
        padding: 24px;
        display: flex;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(0, 0, 0, .7);
    }

    .tooltip.popover .popover-arrow {
        border-color: #f9f9f9;
    }

    .tooltip[aria-hidden='true'] {
        visibility: hidden;
        opacity: 0;
        transition: opacity .15s, visibility .15s;
    }

    .tooltip[aria-hidden='false'] {
        visibility: visible;
        opacity: 1;
        transition: opacity .15s;
    }

    div.v-text-field__suffix{
        margin-left 16px
    }


</style>
