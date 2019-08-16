<template>
    <div class="toolbar-container">
        <header style="display: flex; justify-content: center">
            <nav class="header-container" :class="{'no-fixed': noFixed, 'header-dashboard': dashboard}">
                <div class="right-menu">
                    <div class="menu">
                        <a>
                            <img class="nev-button" @click="toggleSideBar('navbar')" alt="hamburger button"
                                 :src="require('../../assets/svg/ic_hamburger.svg')">
                        </a>
                    </div>
                    <div class="logo" style="display: flex">
                        <router-link title="fandogh logo" :to="{path:'/'}">
                            <logo/>
                        </router-link>
                        <span class="logo-span"> سکوی ابری فندق</span>
                    </div>
                    <div class="navbar">
                        <ul style="padding-left: 32px; padding-right: 32px;">
                            <li class="nev-button"
                                style="color: #fefefe; font-size: 1em; font-family: iran-yekan; cursor: pointer; height: 100%; width: max-content; text-align: center; padding: 0 12px"
                                @click="toggleMenu">
                                محصولات
                            </li>
                            <li style="color: #fefefe; font-size: 1em; font-family: iran-yekan; cursor: pointer; height: 100%; width: max-content; display: inline-flex; padding: 0 12px">
                                <a rel="noopener" target="_blank" href="https://docs.fandogh.cloud"
                                   style="height: 100%; width: 100%; padding: 0; text-align: center; margin-right: auto; margin-left: auto">
                                    مستندات
                                </a>
                            </li>
                            <li style="color: #fefefe; font-size: 1em; font-family: iran-yekan; cursor: pointer; height: 100%; width: max-content; display: inline-flex; padding: 0 12px">
                                <a rel="noopener" target="_blank" href="https://blog.fandogh.cloud"
                                   style="height: 100%; width: 100%; padding: 0; text-align: center; margin-right: auto; margin-left: auto">
                                    بلاگ
                                </a>
                            </li>
                            <li style="color: #fefefe; font-size: 1em; font-family: iran-yekan; cursor: pointer; height: 100%; width: max-content; text-align: center; padding: 0 12px"
                                v-scroll-to="{el: '#prices', duration:1000, easing: 'linear'}">
                                قیمت‌ها
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="user" v-if="!loggedIn">
                    <button class="nav-action-button" @click="$router.push('/user/login')">ورود</button>
                </div>
                <div class="user" v-else>
                    <button @click="$router.push('/dashboard')" class="nav-action-button">داشبورد</button>
                </div>
                <!-- <div v-if="loggedIn" class="profile">
                  <a href="#" @click.prevent="toggleMenu(null)">
                    <img :src="avatar" alt="profile">
                  </a>
                </div>-->
            </nav>

            <login ref="login"/>
            <register ref="register"/>
            <sidebar ref="menu"/>
            <message ref="message"/>
        </header>

        <div id="sub_menu" ref="sub_menu" class="sub_menu">
            <div class="menu_section">
                <p>سرویس‌های مدیریت شده</p>
                <div class="horiz_line"></div>
                <div class="row" style="width: 100%; margin: 0;">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                         style="display: flex; flex-direction: column; height: 100%">
                        <a class="managed-service"
                           href="https://docs.fandogh.cloud/docs/mysql-managed-service.html" target="_blank">
                            <img src="../../assets/svg/services/managed/managed_service_mysql.svg"
                                 style="max-width: 48px; max-height: 48px"/>
                            <div style="flex: 1; margin-top: 5px">
                                <p class="english_title">Mysql</p>
                                <p class="english_subtitle">Database</p>
                            </div>
                        </a>

                        <a class="managed-service"
                           href="https://docs.fandogh.cloud/docs/postgresql-managed-service.html" target="_blank">
                            <img src="../../assets/svg/services/managed/managed_service_postgresql.svg"
                                 style="max-width: 48px; max-height: 48px"/>
                            <div style="flex: 1; margin-top: 5px">
                                <p class="english_title">Postgresql</p>
                                <p class="english_subtitle">Database</p>
                            </div>
                        </a>

                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"
                         style="display: flex; flex-direction: column; height: 100%">

                        <a class="managed-service"
                           href="https://docs.fandogh.cloud/docs/proxy-managed-service.html" target="_blank">
                            <img src="../../assets/svg/services/managed/managed_service_proxy.svg"
                                 style="max-width: 48px; max-height: 48px"/>
                            <div style="flex: 1; margin-top: 5px">
                                <p class="english_title">Proxy</p>
                                <p class="english_subtitle">Ip Range Limiter</p>
                            </div>
                        </a>


                        <a class="managed-service"
                           href="https://docs.fandogh.cloud/docs/redis-managed-service.html" target="_blank">
                            <img src="../../assets/svg/services/managed/managed_service_redis.svg"
                                 style="max-width: 48px; max-height: 48px"/>
                            <div style="flex: 1; margin-top: 5px">
                                <p class="english_title">Redis</p>
                                <p class="english_subtitle">In Memory Database Cache</p>
                            </div>
                        </a>

                    </div>
                </div>

                <a class="button" href="https://docs.fandogh.cloud/docs/managed-services-intro.html" target="_blank">مشاهده
                    همه</a>

            </div>
            <div class="vertical_line"></div>
            <div class="menu_section">
                <p>اجرای مستقیم کدها</p>
                <div class="horiz_line"></div>

                <div class="row" style="width: 100%; margin-left: 0; margin-right: 0">
                    <a class="language-support" @click="$router.push('languages/java')">
                        <img style="filter: invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)"
                             src="../../assets/svg/services/language/java_lang.svg"/>
                        <p>Java</p>
                    </a>

                    <a class="language-support" @click="$router.push('languages/python')">
                        <img style="filter: invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)"
                             src="../../assets/svg/services/language/python_lang.svg"/>
                        <p>Python</p>
                    </a>

                    <a class="language-support" @click="$router.push('languages/nodejs')">
                        <img style="filter: invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)"
                             src="../../assets/svg/services/language/nodejs_lang.svg"/>
                        <p>Node.js</p>
                    </a>


                    <a class="language-support" @click="$router.push('languages/php')">
                        <img style="filter: invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)"
                             src="../../assets/svg/services/language/php_lang.svg"/>
                        <p>PHP</p>
                    </a>

                    <a class="language-support" @click="$router.push('languages/c#')" style="margin-left: auto; display: flex;">
                        <img style="filter: invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%); margin-top: 8px"
                             src="../../assets/svg/services/language/c_sharp_lang.svg"/>
                        <p style="margin-top: auto; direction: ltr;">C#</p>
                    </a>

                </div>

                <a class="button" @click="$router.push('languages')">مشاهده همه</a>

            </div>
            <div class="vertical_line"></div>
            <div class="menu_section">
                <p>دیگر محصولات</p>
                <div class="horiz_line"></div>
                <div class="row"
                     style="width: 100%; margin: 12px 0 0 0; display: flex; justify-items: left; justify-content: left">

                    <div style=" width: 50%; flex-direction: column; margin-top: 12px">
                        <div style="width: 100%; display: flex; direction: ltr; height: max-content; flex-direction: column">
                            <div style="display: flex; width: 100%">
                                <img src="../../assets/svg/services/other_services/developer_tools.svg"
                                     style="margin-top: 0; filter: invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)">
                                <p style="flex: 1; font-family: 'Helvetica Neue'; font-size: 14px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: left; color: #535353; margin-top: auto; margin-bottom: auto; padding-left: 12px;">
                                    Developer Tools</p>
                            </div>
                            <div style="flex: 1; flex-direction: column; display: flex; position: relative; padding-left: 20%">

                                <a style="font-family: 'Helvetica Neue'; font-size: 14px; font-weight: normal; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: left; color: #535353; margin: 0 0 8px 0;" href="https://github.com/fandoghpaas/fandogh-cli/blob/master/api-docs/api-contract.yaml" target="_blank">
                                    API</a>
                                <a style="font-family: 'Helvetica Neue'; font-size: 14px; font-weight: normal; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: left; color: #535353; margin: 0 0 8px 0;" href="https://docs.fandogh.cloud/docs/getting-started.html" target="_blank">
                                    CLI</a>
                            </div>
                        </div>
                    </div>

                    <div style=" width: 50%; flex-direction: column; margin-top: 12px; margin-right: auto">
                        <div style="width: 100%; display: flex; direction: ltr; height: max-content; flex-direction: column">
                            <div style="display: flex; width: 100%">
                                <img src="../../assets/svg/services/other_services/object-storage.svg"
                                     style="margin-top: 0; filter: invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)">
                                <p style="flex: 1; font-family: 'Helvetica Neue'; font-size: 14px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: left; color: #535353; margin-top: auto; margin-bottom: auto; padding-left: 12px;">
                                    Object Storage</p>
                            </div>
                            <div style="flex: 1; flex-direction: column; display: flex; position: relative; padding-left: 20%">
                                <p style="font-family: 'Helvetica Neue'; font-size: 14px; font-weight: normal; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: left; color: #535353; margin: 0 0 8px 0;">
                                    Minio</p>
                                <p style="font-family: 'Helvetica Neue'; font-size: 14px; font-weight: normal; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: left; color: #535353; margin: 0 0 8px 0;">
                                    S3 Storage</p>
                            </div>
                        </div>
                    </div>

                    <div style="width: 50%; flex-direction: column; margin-top: 24px; margin-right: auto">
                        <div style="width: 100%; display: flex; direction: ltr; height: max-content; flex-direction: column">
                            <div style="display: flex; width: 100%">
                                <img src="../../assets/svg/services/other_services/operation_tools.svg"
                                     style="margin-top: 0; filter: invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)">
                                <p style="flex: 1; font-family: 'Helvetica Neue'; font-size: 14px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: left; color: #535353; margin-top: auto; margin-bottom: auto; padding-left: 12px;">
                                    Operation Tools</p>
                            </div>
                            <div style="flex: 1; flex-direction: column; display: flex; position: relative; padding-left: 20%">
                                <p style="font-family: 'Helvetica Neue'; font-size: 14px; font-weight: normal; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: left; color: #535353; margin: 0 0 8px 0;">
                                    Monitoring</p>
                            </div>
                        </div>
                    </div>

                </div>

                <a class="button" href="https://docs.fandogh.cloud/docs/managed-services-intro.html" target="_blank">مشاهده
                    همه</a>

            </div>
        </div>


    </div>

</template>

<script>
    import logo from "./logo";
    import FButton from "~/components/elements/button";
    import Login from "~/components/Auth/Login";
    import Sidebar from "./sidebar";
    import Register from "../Auth/Register";
    import Message from "../Auth/Message";
    import {getValue} from "~/utils/cookie";
    import Gravatar from "~/utils/gravatar";

    export default {
        components: {
            Register,
            logo,
            FButton,
            Login,
            Sidebar,
            Message
        },
        props: ["noFixed"],
        data() {
            return {
                // loggedIn: getToken()
            };
        },
        created() {

        },
        mounted() {

            if (!this.noFixed) {
                let headerContainer = document.querySelector(".header-container");
                document.addEventListener("scroll", () => {
                    if (window.pageYOffset > 10) {
                        headerContainer.classList.add("header-container-fixed");
                    } else {
                        headerContainer.classList.remove("header-container-fixed");
                    }
                });
            }

            window.onclick = function (event) {
                console.log(event.target.matches('.nev-button'))
                if (!event.target.matches('.nev-button')) {
                    if (document.getElementById("sub_menu").style.visibility === 'visible') {
                        document.getElementById("sub_menu").style.visibility = 'hidden'
                        document.getElementById("sub_menu").style.opacity = '0'
                    }
                }

            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.user.token;
            },
            avatar() {
                let email = getValue("email");
                return Gravatar(email, 150);
            },
            dashboard() {
                return this.$route.fullPath.includes("dashboard");
            }
        },
        methods: {
            toggleSideBar(type) {
                this.$store.dispatch("TOGGLE_NAV", {data: type, id: "sidebar"});
            },
            toggleMenu() {


                if (this.$refs.sub_menu.style.visibility === 'hidden') {
                    this.$refs.sub_menu.style.opacity = '100';
                    this.$refs.sub_menu.style.visibility = 'visible'
                } else {
                    this.$refs.sub_menu.style.opacity = '0';
                    this.$refs.sub_menu.style.visibility = 'hidden'
                }
            },
            showModal(modal) {
                this.$store.dispatch("showModal", modal);
            },
            exit() {
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
                        this.$store.dispatch("logout");
                        this.$router.replace("/");
                    }
                );

            }
        }
    };
</script>

<style lang="stylus" scoped>

    .toolbar-container
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 1000;
        display: flex;
        flex-direction: column
        @media only screen and (max-width: 1230px)
            position absolute

    .sub_menu
        width 100%
        box-shadow 0 3px 15px 12px rgba(0, 0, 0, 0.16)
        top 60px
        position absolute
        background-color #ffffff
        padding 16px
        z-index 990
        display flex
        visibility hidden
        opacity 0
        transition all 0.2s ease-in-out

        div.vertical_line
            width 1px
            border solid 1px #e8e8e8
            margin-top 16px
            border-radius 25px
            margin-bottom 16px
            @media only screen and (max-width: 1230px)
                display none

        @media only screen and (max-width: 1230px)
            flex-direction column
            position relative
            border-radius 15px
            width 95%
            top 16px
            box-shadow 0 3px 15px 2px rgba(0, 0, 0, 0.25)
            margin-left auto
            margin-right auto


    .logo-span
        margin-top: auto;
        margin-bottom: auto;
        padding-right: 12px;
        font-family: iran-yekan;
        font-size: 1.1em;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.75;
        letter-spacing: normal;
        text-align: left;
        color: #fefefe;
        @media only screen and (max-width: 1230px)
            display none

    .menu_section
        flex 1
        display flex
        flex-direction column

        div.horiz_line
            width 100%
            height 0
            border 1px solid #0045ff
            border-radius 25px
            display none

        p
            font-family iran-yekan
            font-size 1.2em
            font-weight bold
            font-style normal
            font-stretch normal
            letter-spacing normal
            text-align center
            color #3c3c3c
            margin-top 12px
            margin-bottom 8px

        a.button
            cursor pointer
            width 100%
            margin-top auto
            padding-top 16px
            font-family iran-yekan
            font-size .9em
            font-weight bold
            font-style normal
            font-stretch normal
            letter-spacing normal
            text-align center
            color #0045ff
        @media only screen and (max-width: 1230px)
            div.horiz_line
                display unset

            p
                text-align right

            a.button
                text-align left

    .language-support
        display flex
        cursor pointer
        flex-direction column
        width 33%
        padding-top 16px

        p
            margin-top: 12px;
            font-family: 'Helvetica Neue';
            font-size: 14px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.21;
            letter-spacing: normal;
            text-align: center;
            color: #535353;

        @media only screen and (max-width: 1230px)
            width unset
            padding 8px 16px
            img
                display none

    .language-support:hover
        p
            color #0045ff


    .managed-service
        width 100%
        display flex
        cursor pointer
        padding-top 16px

        img
            display unset
            @media only screen and (max-width: 1230px)
                display none

        p.english_title
            font-family 'Helvetica Neue'
            font-size 1.1em
            font-style normal
            font-weight bold
            font-stretch normal
            line-height 1.21
            letter-spacing normal
            text-align right
            color #535353
            padding-right 12px
            margin 0 0 5px 0

        p.english_subtitle
            font-family 'Helvetica Neue'
            font-size 0.9em
            font-style normal
            font-weight normal
            font-stretch normal
            line-height 1.21
            letter-spacing normal
            text-align right
            color #7c7c7c
            padding-right 12px
            margin 0 0 5px 0

    .managed-service:hover
        p.english_title
            color #0045ff

        p.english_subtitle
            color #0045ff

</style>

<style lang="stylus">

    *
        user-select none

    .header-container
        position fixed
        top 0
        right 0
        z-index 1000
        display flex
        flex-flow wrap row
        justify-content space-between
        align-items center
        box-sizing border-box
        padding 13.5px 30px
        width 100%
        background-color #0045ff
        box-shadow 0 3px 6px rgba(0, 0, 0, 0.37)

    .header-container
        transition all 0.3s
        -webkit-transition all 0.3s
        -moz-transition all 0.3s

    .header-container-fixed
        position fixed
        /*padding 15px 90px*/
        background-color #0045ff

    .no-fixed
        background #0045ff

    header
        display block

        .right-menu
            display flex
            align-items center

            ul
                margin 0

                li
                    display inline-block

                    a
                        padding 20px
                        color white
                        text-decoration none

        .menu
            display none
            margin-left 16px

        .header-container
            .profile
                display none

        .user
            button
                margin-right 10px

    @media only screen and (max-width: 1230px)
        .header-container
            position initial
            height 60px

        .header-container-fixed
            z-index 1000
            background-color #0045ff

        .header-dashboard, &.dashboard
            position fixed

        .navbar
            display none

        header
            .header-container
                .profile
                    display block

                    img
                        width 32px
                        border-radius 32px

            .menu
                display block
                float left

                img
                    width 24px

    @media only screen and (max-width: 768px)
        header
            .user .btn-exit
                display none

    .nav-action-button
        padding: 8px 16px
        color: #fefefe
        font-size: 1em
        font-family: iran-yekan
        border-radius: 15px
        border: 1px solid #fefefe
        min-width: 100px
        outline: none
        transition all .2s ease-in-out

    .nav-action-button:hover
        background #fefefe
        color #0045ff
        transition all .2s ease-in-out
</style>

