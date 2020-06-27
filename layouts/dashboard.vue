<template>
    <div class="wrapper">
        <f-loading :isFull="true" v-if="loading"/>
        <no-ssr>

            <f-d-header @toggle-namespace-modal="toggleNamespaceModal" v-if="!isFullPage"/>

            <div ref="namespace_modal" class="namespace-selection-modal-container">

                <div class="inner-container">

                    <div class="top-section">
                        <div class="pod-container"></div>
                        <div>
                            <img src="../assets/svg/ic_close.svg" alt="close" @click="toggleNamespaceModal">
                            <p>فضانام‌های شما</p>
                        </div>
                    </div>

                    <div class="namespace-list-container">

                        <div v-for="ns in namespaces"
                             @click="changeNamespaceTo(ns)"
                             class="namespace-item-holder"
                             :style="{backgroundColor: $route.query['ns'] === ns.name ? 'rgba(0, 69,255, 0.5)' : 'none'}">
                            <p :style="{color: $route.query['ns'] === ns.name ? '#fefefe' : '#000',
                                        fontWeight: $route.query['ns'] === ns.name ? 'bold' : 'normal'}">
                                {{ns.name}}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            <transition name="fade">
                <div v-if="showTicketImages" class="image-preview-modal-container">

                    <div class="preview-modal-action-header">

                        <div class="dashboard-preview-close-btn"
                             @click="dismissPreviewModal">
                            <img src="../assets/svg/ic-close.svg"
                                 style="filter: invert(1);"
                                 alt="close"/>
                        </div>
                        <div class="dashboard-preview-close-btn"
                             @click="downloadImage">
                            <img src="../assets/svg/ic-download.svg"
                                 style="filter: none"
                                 alt="download"/>
                        </div>

                    </div>

                    <img id="large-img-preview"
                         alt="attachment"
                         src="../assets/svg/ic-file-placeholder.svg"
                         class="preview-modal-show-case">

                    <div class="preview-modal-thumbnail-container">
                        <div id="thumbnail-rail-container" class="thumbnail-container-inner-rail">
                        </div>
                    </div>

                </div>
            </transition>

            <div :style="{width: isFullPage ? '100%': 'unset'}"
                 :class=" ['wrapper-content', (isMobile ? '' : 'container-fluid'),{'is-small':openSidebar}]">
                <div v-if="isMenuAvailable" :class="['wrapper-sidebar', {'open':openSidebar}]">
                    <admin-sidebar/>
                </div>

                <div :class="['wrapper-main',{'open':openSidebar}]"
                     :style="{opacity:(isMobile && openSidebar ? '0.5' : '1.0')}">
                    <div :style="{marginTop: isFullPage ? '0' : null}" class="dash-container">
                        <div :class="[(isMobile || isFullPage ? '' : 'container-fluid')]">

                            <div v-if="accountExpired" class="box-row" style="margin-bottom: 16px">

                                <div style="width: 100%; background-color: #FFBABA; margin: 0; border-radius: 5px; padding: 16px; border: 2px solid #D8000C ">

                                    <div style="margin: auto; display: flex">
                                        <img src="../assets/svg/warning.svg" alt="warning"
                                             style="width: 64px; height: auto; margin-top: auto; margin-bottom: auto; display: inline-flex;
                                                    filter: invert(23%) sepia(92%) saturate(7318%) hue-rotate(347deg) brightness(78%) contrast(122%);">
                                        <p v-if="remainingTime !== 0"
                                           style="display: inline-block; margin: auto 16px auto 0; font-family: iran-yekan; font-size: 1.2em; color: #D8000C">
                                            تنها
                                            <span style="font-family: iran-sans; color: #D8000C">{{remainingTime}}</span>
                                            روز دیگر از پلن شما باقی مانده است. جهت تمدید، لطفا نسبت به تمدید پلن خود
                                            اقدام فرمایید، در غیر این صورت بعد از این تاریخ سرویس‌های شما از دسترس خارج
                                            خواهند شد.
                                        </p>
                                        <p v-else
                                           style="display: inline-block; margin: auto 16px auto 0; font-family: iran-yekan; font-size: 1.2em; color: #D8000C">
                                            مدت اعتبار پلن شما به پایان رسیده است! لطفا برای جلوگیری از خاموش شدن
                                            سرویس‌هایتان پلن خود را تمدید نمایید.
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

                            <nuxt v-if="$route.query.ns"/>

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
    import AdminSidebar from "~/components/Dashboard/sidebar";
    import "normalize.css";
    import Notification from "~/components/Dashboard/notification";
    import Alert from "~/components/Dashboard/alert";
    import {readCookieReq, readCookie} from "../utils/cookies.js";
    import {alertReport} from "../utils/AlertError";
    import FLoading from "~/components/Loading";
    import Moment from 'moment-jalaali';
    import {removeValue, setValue, getValue} from "../utils/cookie";
    import ErrorReporter from "../utils/ErrorReporter";

    export default {
        components: {
            FDHeader,
            FLoading,
            AdminSidebar,
            Notification,
            Alert,
            Moment,
        },
        data() {
            return {
                namespace: null,
                namespaces: [],
                downloadable_link: '',

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
            showTicketImages() {
                if (this.$store.state.ticket_images) {

                    for (let image of this.$store.state.ticket_images.images) {
                        this.getTicketFiles(image, null)
                    }
                    this.getTicketFiles(null, this.$store.state.ticket_images.selected_image);
                    return true;
                } else {
                    return false;
                }
            },
            isFullPage() {
                if (this.$route.path.indexOf('transaction-details') !== -1) {
                    return true
                } else {
                    return false
                }
            },
            isMobile() {
                return this.$store.state.windowWidth <= 992;
            },
            isMenuAvailable() {
                if (this.$route.path.indexOf('account') !== -1 || this.$route.path.indexOf('support') !== -1) {
                    return false;
                } else return this.$route.path.indexOf('bill') === -1;
            }, accountExpired() {
                if (this.$route.path.indexOf('bill') !== -1)
                    return false;

                let plan = this.$store.state.activePlan;

                if (plan.hasOwnProperty('quota')) {
                    if (plan.quota.expires_at === null)
                        return false;
                    else
                        return Moment(plan.quota.expires_at).diff(Moment(new Date()), 'days') <= 3;
                } else
                    return false
            }, remainingTime() {
                let plan = this.$store.state.activePlan;
                if (plan.hasOwnProperty('quota')) {
                    return Math.max(Moment(plan.quota.expires_at).diff(Moment(new Date()), 'days'), 0)
                } else {
                    return 0
                }
            }
        },
        watch: {

            '$route.query.ns': {
                handler: function (ns) {
                    if (!sessionStorage.hasOwnProperty('namespace') || !sessionStorage.hasOwnProperty('user_role')) {
                        this.fetchUserNamespace()
                    } else if (sessionStorage.getItem('namespace') !== ns) {
                        this.fetchUserNamespace()
                    }
                },
                deep: true
            },
            $route(to, from) {

                if (!sessionStorage.hasOwnProperty('namespace') || !sessionStorage.hasOwnProperty('user_role'))
                    this.fetchUserNamespace()

                if (!to.query.ns && to.path.indexOf('/wizard') === -1 && to.path !== '/') {
                    if (from.query.ns) {
                        var queries = {};
                        queries['ns'] = from.query.ns;
                        for (const [key, value] of Object.entries(to.query)) {
                            queries[key] = value
                        }

                        this.$router.replace({
                            path: to.path,
                            query: queries
                        });

                    } else {
                        this.fetchUserNamespace()
                    }
                }

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
                    this.$router.replace("/user/login");
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
        created() {
            this.fetchUserNamespace();
            this.fetchUserNamespaces();
        },
        methods: {
            downloadImage() {
                var url = this.downloadable_link.replace(/^data:[^]\/[^;]+/, 'data:application/octet-stream');
                var a = document.createElement('a');
                a.href = url;
                if (this.downloadable_link.indexOf('data:text') !== -1) {
                    a.download = `${new Date().toLocaleString()}.txt`;
                }else if (this.downloadable_link.indexOf('application/pdf') !== -1){
                    a.download = `${new Date().toLocaleString()}.pdf`;
                } else {
                    a.download = `${new Date().toLocaleString()}.png`;
                }
                a.click();

            },
            populateTicketMessageFiles(file, data, is_init) {

                var reader = new window.FileReader();
                reader.readAsDataURL(data);
                var vm = this;
                reader.onload = function () {

                    if (is_init) {
                        if (data.type === 'text/plain') {
                            document.getElementById('large-img-preview').src = require('../assets/svg/ic-file-text.svg')
                        } else if(data.type === 'application/pdf'){
                            document.getElementById('large-img-preview').src = require('../assets/svg/ic-pdf-file.svg')
                        } else {
                            document.getElementById('large-img-preview').src = reader.result;
                        }
                        vm.downloadable_link = reader.result;
                    } else {
                        var DOM_div = document.createElement("div");
                        DOM_div.id = `thumbnail-${file.reply}-${file.id}`;
                        DOM_div.className = 'dashboard-preview-style';

                        var DOM_img = document.createElement("img");
                        DOM_img.id = `thumbnail-img-${file.reply}-${file.id}`;
                        DOM_img.className = 'dashboard-main-img';

                        if (data.type === 'text/plain') {
                            DOM_img.src = require('../assets/svg/ic-file-text.svg')
                        } else if(data.type === 'application/pdf'){
                            DOM_img.src = require('../assets/svg/ic-pdf-file.svg')
                        } else {
                            DOM_img.src = reader.result;
                        }

                        DOM_div.appendChild(DOM_img);
                        document.getElementById('thumbnail-rail-container').appendChild(DOM_div);

                        document.getElementById(`thumbnail-${file.reply}-${file.id}`).addEventListener('click', function () {
                            document.getElementById('large-img-preview').animate(
                                [
                                    {opacity: 1},
                                    {opacity: 0}],
                                {
                                    duration: 200,
                                    iterations: 1
                                });
                            document.getElementById('large-img-preview').src =
                                document.getElementById(`thumbnail-img-${file.reply}-${file.id}`).src;
                            vm.downloadable_link = reader.result;
                            document.getElementById('large-img-preview').animate(
                                [
                                    {opacity: 0},
                                    {opacity: 1}],
                                {
                                    duration: 200,
                                    iterations: 1
                                });
                        }, false);
                    }
                };

            },
            dismissPreviewModal() {
                document.getElementById('thumbnail-rail-container').innerHTML = '';
                document.getElementById('large-img-preview').src = require('../assets/svg/ic-file-placeholder.svg');
                this.$store.commit("SET_DATA", {data: null, id: "ticket_images"});
            },
            getTicketFiles(file, init_file) {

                this.$store.commit("SET_DATA", {data: true, id: "loading"});

                this.$store.dispatch("getTicketFiles", file === null ? init_file.id : file.id)
                    .then(response => {
                        this.populateTicketMessageFiles(file, response, file === null);
                        this.$store.commit('SET_DATA', {data: false, id: 'loading'})

                    }).catch(e => {
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
                });
            },
            changeNamespaceTo(namespace) {
                if (this.$route.query['ns']) {
                    if (this.$route.query['ns'] !== namespace.name) {
                        this.toggleNamespaceModal();
                        this.syncUrlWithNs(namespace)
                    } else {
                        this.toggleNamespaceModal()
                    }
                }
            },
            toggleNamespaceModal() {
                if (this.$refs.namespace_modal.style.display === 'flex') {
                    this.$refs.namespace_modal.style.display = 'none'
                } else {
                    this.$refs.namespace_modal.style.display = 'flex'
                }
            },
            syncUrlWithNs(namespace) {
                var queries = {};
                queries['ns'] = namespace.name;
                for (const [key, value] of Object.entries(this.$route.query)) {
                    if (key !== 'ns') {
                        queries[key] = value
                    }
                }
                let last_route = this.$route;
                this.$router.replace({
                    path: last_route.path,
                    query: queries
                }, () => {
                    sessionStorage.setItem('namespace', namespace.name);
                    sessionStorage.setItem('user_role', namespace.user_role);
                    window.location.reload()
                }, null);

            },
            async fetchUserNamespaces() {
                this.namespaces.length = 0;
                try {
                    this.namespaces = await this.$store.dispatch('requestUserNamespaces');

                    if (!this.$route.query.ns)
                        this.syncUrlWithNs(this.namespaces[0]);

                    this.$store.commit('SET_DATA', {data: false, id: 'loading'})
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
            },
            fetchUserNamespace() {
                this.$store.commit('SET_DATA', {data: true, id: 'loading'})
                if (this.$route.query.ns) {
                    this.$store.dispatch('getNameSpace', this.$route.query.ns)
                        .then(response => {
                            this.namespace = response;
                            if (!this.$route.query.ns) {

                                this.syncUrlWithNs(this.namespace);

                            } else if (this.namespace.name !== sessionStorage.getItem('namespace') ||
                                !sessionStorage.hasOwnProperty('namespace') ||
                                !sessionStorage.hasOwnProperty('user_role')) {

                                sessionStorage.setItem('namespace', this.namespace.name);
                                sessionStorage.setItem('user_role', this.namespace.user_role);
                                window.location.reload()

                            }

                            this.$store.commit('SET_DATA', {data: false, id: 'loading'})
                        })
                        .catch(e => {
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
                        });
                } else {
                    this.fetchUserNamespaces();
                }
            },
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
                        this.$router.push(`/dashboard/plans/bill/${planRespose.invoice.id}`);
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
                let finalBill = {};
                let memory = 0.0;
                let dedicatedVolume = 0;
                if (quota) {
                    memory = parseFloat(Math.fround(quota.memory_limit / 1024).toExponential(1));
                    dedicatedVolume += quota.volume_limit;

                    if (memory > 0)
                        finalBill['memory'] = memory;
                    if (dedicatedVolume > 0)
                        finalBill['dedicated_volume'] = dedicatedVolume
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
        margin-top $spaceTop + 48px
        padding-bottom 20px
        min-height calc(100vh - 120px)
        @media only screen and (max-width: 1230px)
            margin 0
            margin-top $spaceTop + 40px
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


    .namespace-selection-modal-container
        position fixed
        display none
        width 100%
        height 100%
        min-height 100px
        background-color rgba(0, 0, 0, 0.74)
        z-index 99999

        div.inner-container
            margin auto
            width 380px
            height 400px
            background-color #fefefe
            border-radius 3px
            box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.17)
            display flex
            flex-direction column
            @media only screen and (max-width 992px)
                width 100%
                height 100%
                border-radius 0
                box-shadow unset


            div.top-section
                width 100%
                height 54px
                background-color #0045ff
                border-top-right-radius 3px
                border-top-left-radius 3px
                box-shadow 0 3px 6px rgba(0, 0, 0, 0.27)
                @media only screen and (max-width 992px)
                    border-radius 0
                    height 68px


                div.pod-container
                    background url("../assets/svg/pod_bg.svg") no-repeat top
                    width 25%
                    background-size 75%
                    background-position center
                    position fixed
                    opacity .1
                    height 54px
                    filter invert(1)
                    @media only screen and (max-width 992px)
                        background-size 75%
                        width 100%
                        height 68px

                div
                    width 100%
                    height 100%
                    display flex
                    padding 0 16px

                    img
                        margin-top auto
                        margin-bottom auto
                        cursor pointer
                        width 16px
                        height 16px
                        filter invert(1)
                        opacity .7
                        margin-left -16px
                        transition all .2s ease-in-out

                    img:hover
                        opacity 1

                    p
                        margin auto
                        color #fefefe
                        font-size 1.2em
                        @media only screen and (max-width 992px)
                            font-size 1.3em

        div.namespace-list-container
            width 100%
            display flex
            flex-direction column
            overflow-y scroll
            flex-wrap nowrap
            flex 1
            padding-top 16px
            padding-bottom 16px

            div.namespace-item-holder
                cursor pointer
                display flex
                flex-direction column
                border-radius 25px
                margin 4px 32px
                background-color none
                transition all .2s ease-in-out

                p
                    color black
                    font-size 1em
                    margin auto
                    line-height 2.8
                    padding-top 4px

            div.namespace-item-holder:hover
                background-color rgba(0, 69, 255, 0.2)

    .image-preview-modal-container
        width 100%
        height 100%
        background-color rgba(0, 0, 0, 0.8)
        position fixed
        z-index 999999
        display flex
        flex-direction column

        div.preview-modal-action-header
            width 100%
            height max-content
            display flex
            flex-direction row

            div.dashboard-preview-close-btn
                width 64px
                height 64px
                cursor pointer
                display flex
                transition all .2s ease-in-out

            div.dashboard-preview-close-btn

                img
                    margin auto
                    opacity .75
                    width 24px
                    height 24px
                    transition all .2s ease-in-out


            div.dashboard-preview-close-btn:hover

                background rgba(0, 0, 0, 0.5)

            div.dashboard-preview-close-btn:hover

                img
                    opacity 1

        img.preview-modal-show-case
            width 80%
            height 57%
            margin auto
            object-fit contain

        div.preview-modal-thumbnail-container
            width 100%
            height max-content
            overflow-x auto
            background-color rgba(0, 0, 0, 0.1)

            div.thumbnail-container-inner-rail
                height max-content
                display inline-flex
                list-style none
                flex-direction row
                padding 0 16px

</style>

<style lang="css">

    .dashboard-preview-style {
        position: relative;
        width: 100px;
        height: 100px;
        margin: 12px 0 12px 8px;
        border-radius: 3px;
        box-shadow: none;
        display: flex;
        transition: all .3s ease-in-out;
        cursor: pointer;
    }

    .dashboard-main-img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
        object-fit: cover;
        transition: all .3s ease-in-out;
    }

    .dashboard-preview-style:hover {
        box-shadow: 0 1px 8px rgba(255, 255, 255, 0.37);
        margin: 12px 4px 12px 12px;
        transform: scale(1.1);
    }


    .fade-enter-active {
        transition: opacity .3s ease-in-out;
    }

    .fade-enter, .fade-leave-to, .fade-leave-active /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

</style>
