<template>
    <div class="sidebar" :class="{'show-sidebar-navbar': sidebar}">
        <div class="row sidebar-heading no-margin" style="display: flex; flex-direction: column">
            <div class="col-xs-6">
                <a href="#" @click.prevent="toggleMenu" class="close" rel="noopener">
                    <img alt="close icon"
                         :src="require('../../assets/svg/ic_close.svg')">
                </a>
            </div>
            <div>
                <div class="logo">
                    <img src="../../assets/svg/ic-fandogh-mini.svg" alt="fandogh icon"
                         style="filter: invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)">
                    <p>سکوی ابری فندق</p>
                </div>

            </div>
        </div>
        <div class="products">
            <ul class="row">
                <li class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <img src="../../assets/svg/source_deployment_icon.svg" alt="lang"><a href="https://fandogh.cloud/languages" target="_blank" rel="noopener">اجرای مستقیم کدها</a>
                </li>
                <li class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <img src="../../assets/svg/ic-managed-services.svg" alt="lang"><a href="https://fandogh.cloud/managed-services" target="_blank" rel="noopener">سرویس‌های مدیریت شده</a>
                </li>
                <!--<li class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                    <!--<img src="../../assets/svg/services/other_services/developer_tools.svg" alt="lang"><a href="#">Developer Tools</a>-->
                <!--</li>-->
                <!--<li class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                    <!--<img src="../../assets/svg/services/other_services/object-storage.svg" alt="lang"><a href="#">Object Storage</a>-->
                <!--</li>-->
                <!--<li class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                    <!--<img src="../../assets/svg/services/other_services/operation_tools.svg" alt="lang"><a href="#">Operation Tools</a>-->
                <!--</li>-->

            </ul>
        </div>
        <div class="navs">
            <ul class="row">
                <li class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                    <a href="/" rel="noopener">صفحه اصلی</a>
                </li>
                <!--<li>-->
                <!--<a @click="toggleMenu" href="#prices">سرویس ها</a>-->
                <!--</li>-->
                <li class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                    <a rel="noopener" target="_blank" href="https://docs.fandogh.cloud">مستندات</a>
                </li>
                <li class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                    <a rel="noopener" target="_blank" href="http://blog.fandogh.cloud/">وبلاگ</a>
                </li>
                <li class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                    <router-link :to="{path:'/about-us'}">درباره ما</router-link>
                </li>
                <li class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                    <router-link :to="{path:'/our-values'}">ارزش‌های ما</router-link>
                </li>
                <li class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                    <router-link :to="{path:'/conditions-of-use'}">قوانین سکو</router-link>
                </li>
                <li class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                    <router-link :to="{path:'/contact-us'}">تماس با ما</router-link>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    import logo from "./logo";
    import FButton from "~/components/elements/button";
    import {getValue} from "~/utils/cookie";

    export default {
        data() {
            return {
                show: false
            };
        },
        components: {
            logo,
            FButton
        },
        watch: {
            $route() {
                if (this.isMobile) {
                    this.$store.dispatch("TOGGLE_NAV", {data: null, id: "sidebar"});
                }
            }
        },
        methods: {
            toggleMenu() {
                this.$store.dispatch("TOGGLE_NAV", {data: null, id: "sidebar"});
            },
            showModal(modal) {
                this.toggleMenu();
                this.$store.dispatch("showModal", modal);
            },
            logout() {
                this.$alertify(
                    {
                        img: "/icons/exit.svg",
                        title: `خروج از داشبورد`,
                        description: "آیا برای خروج از داشبورد مطمئن هستید هستید ؟",
                        label: 'خروج'
                    },
                    status => {
                        if (!status) return
                        this.$ga.event({
                            eventCategory: "account",
                            eventAction: "user logout dashboard",
                            eventLabel: "username",
                            eventValue: getValue("username")
                        });
                        this.toggleMenu();
                        this.$store.dispatch("logout");
                        this.$router.replace("/");
                    }
                );
            },
            goToDashboard() {
                this.$router.push("/dashboard/images/");
                this.toggleMenu();
            }
        },
        computed: {
            isMobile() {
                return this.$store.state.windowWidth <= 1230;
            },
            sidebar() {

                return this.$store.state.sidebar === "navbar";
            },
            loggedIn() {
                return this.$store.state.user.token;
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .sidebar
        position fixed
        top 0
        right 0
        z-index 9999
        overflow-y scroll
        width 97vw
        height max-content
        min-height 600px
        margin 1.5vh 1.5vw
        border-radius 25px
        background-color #ecf0ff
        box-shadow 0 0 8px 10px rgba(0, 0, 0, 0.17)
        opacity 0
        transition all 0.3s ease
        transform translate3d(0, -100%, 0)

    .show-sidebar-navbar
        opacity 1
        transform translate3d(0, 0, 0)
        @media only screen and (min-width 1230px)
            transform translate3d(0, -100%, 0)
            opacity 0

    .sidebar-heading
        margin 32px
        border-bottom 1px solid rgba(0, 0, 0, 0.3)

        .close
            img
                width 18px
                filter invert(5%)
                @media only screen and (max-width 992px)
                    width 14px

        .logo
            margin-right auto
            margin-left auto
            width max-content
            display flex
            flex-direction column

            img
                width 64px
                margin-left auto
                margin-right auto
                @media only screen and (max-width 992px)
                    width 48px
            p
                width 100%
                color rgba(0, 0, 0, .9)
                text-align center
                margin-bottom 16px
                font-size 1.5em
                margin-top 12px
                font-weight bold
                @media only screen and (max-width 992px)
                    font-size 1.2em


    .products
        border-bottom 1px solid rgba(0, 0, 0, 0.3)
        text-align right
        margin 32px

        ul
            margin 16px 0
            padding 0

            li
                margin 6px 0
                display flex
                max-height 40px

                img
                    filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
                    width 24px

                a
                    display block
                    padding 10px
                    font-size 1.3em
                    color #3c3c3c
                    margin-top auto
                    margin-bottom auto
                    font-weight normal
                    font-family iran-yekan
                    @media only screen and (max-width 992px)
                        font-size 1.2em

    .navs
        text-align right
        margin 32px

        ul
            margin 16px 0
            padding 0

        li
            margin 0

            a
                display block
                padding 10px
                font-size 1.4em
                color #0045ff
                font-family iran-yekan
                @media only screen and (max-width 992px)
                    font-size 1.2em

    .auth
        padding 30px
        text-align center

        button
            margin 10px
</style>
