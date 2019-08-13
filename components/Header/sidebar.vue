<template>
    <div class="sidebar" :class="{'show-sidebar-navbar': sidebar}">
        <div class="row sidebar-heading no-margin" style="display: flex; flex-direction: column">
            <div class="col-xs-6">
                <a href="#" @click.prevent="toggleMenu" class="close">
                    <img alt="close icon"
                         :src="require('../../assets/svg/ic_close.svg')">
                </a>
            </div>
            <div>
                <div class="logo">
                    <img src="../../assets/svg/ic-fandogh-mini.svg" alt="fandogh icon" style="filter: invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)">
                </div>
                <p style="width: 100%; color: rgba(0,0,0,.9); text-align: center; margin-bottom: 16px; font-size: 1.3em">سکوی ابری فندق</p>
            </div>
        </div>
        <div class="navs">
            <ul>
                <li>
                    <a href="/">صفحه اصلی</a>
                </li>
                <!--<li>-->
                <!--<a @click="toggleMenu" href="#prices">سرویس ها</a>-->
                <!--</li>-->
                <li>
                    <a rel="noopener" target="_blank" href="https://docs.fandogh.cloud">مستندات</a>
                </li>
                <li>
                    <a rel="noopener" target="_blank" href="http://blog.fandogh.cloud/">وبلاگ</a>
                </li>
                <li>
                    <router-link :to="{path:'/about-us'}">درباره ما</router-link>
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
        height 97vh
        margin 1.5vh 1.5vw
        border-radius 25px
        background-color #ebefff
        box-shadow 0 0 8px 10px rgba(0, 0, 0, 0.17)
        opacity 0
        transition all 0.5s ease
        transform translate3d(0, -100%, 0)

    .show-sidebar-navbar
        opacity 1
        transform translate3d(0, 0, 0)

    .sidebar-heading
        margin 32px
        border-bottom 2px solid rgba(0, 0, 0, 0.8)

        .close
            img
                width 24px
                filter invert(5%)

        .logo
            margin-right auto
            margin-left auto
            width max-content

            img
                width 52px

    .navs
        border-bottom 2px solid rgba(0, 0, 0, 0.8)
        text-align right
        margin 32px

        ul
            margin 30px 0
            padding 0

        li
            margin 15px 0

            a
                display block
                padding 10px
                color rgba(0,0,0, 0.8)

    .auth
        padding 30px
        text-align center

        button
            margin 10px
</style>
