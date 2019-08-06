<template>
    <div style="width: 100%; position: sticky; top: 0; z-index: 1000;">
        <header>
            <nav class="header-container" :class="{'no-fixed': noFixed, 'header-dashboard': dashboard}">
                <div class="right-menu">
                    <div class="menu">
                        <a href="#" @click.prevent="toggleMenu('navbar')">
                            <img alt="hamburger button" :src="require('../../assets/svg/ic_hamburger.svg')">
                        </a>
                    </div>
                    <div class="logo" style="display: flex">
                        <router-link title="fandogh logo" :to="{path:'/'}">
                            <logo/>
                        </router-link>
                        <span style="margin-top: auto; margin-bottom: auto; padding-right: 12px;  font-family: iran-yekan;font-size: 16px;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: left;color: #fefefe;"> سکوی ابری فندق</span>
                    </div>
                    <div class="navbar">
                        <ul style="padding-left: 16px; padding-right: 16px;">
                            <li style="color: #fefefe; font-size: 1em; font-family: iran-yekan; cursor: pointer;"
                                @click="toggleMenu">
                                محصولات
                            </li>
                            <li>
                                <a rel="noopener" target="_blank" href="https://docs.fandogh.cloud">
                                    <progress-hover :hover="true">مستندات</progress-hover>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener" target="_blank" href="https://blog.fandogh.cloud">
                                    <progress-hover :hover="true">بلاگ</progress-hover>
                                </a>
                            </li>
                            <li>
                                <router-link :to="{path:'/about-us'}">
                                    <progress-hover :hover="true">درباره ما</progress-hover>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="user" v-if="!loggedIn">
                    <f-button path="/user/login" styles="transparent md">ورود</f-button>
                    <f-button path="/user/register" styles="transparent border margin-10 md">ثبت نام</f-button>
                </div>
                <div class="user" v-else>
                    <f-button @onClick="exit" styles="transparent md exit">خروج</f-button>
                    <!--<f-button @onClick="$router.push('/dashboard/images')" styles="transparent border" > داشبورد </f-button>-->
                    <f-button path="/dashboard" styles="transparent border md margin-10">داشبورد</f-button>
                </div>
                <!-- <div v-if="loggedIn" class="profile">
                  <a href="#" @click.prevent="toggleMenu(null)">
                    <img :src="avatar" alt="profile">
                  </a>
                </div>-->
            </nav>
            <sidebar ref="menu"/>
            <login ref="login"/>
            <register ref="register"/>
            <message ref="message"/>
        </header>

        <div id="sub_menu" ref="sub_menu"
             style="width: 100%; height: 400px; box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.16); top: 60px; position: absolute; background-color: #ffffff; padding: 16px;display: none">
            <div style="flex: 1; height: 100%; display: flex; flex-direction: column;">
                <p style="  font-family: iran-yekan; font-size: 16px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.75; letter-spacing: normal; text-align: center; color: #3c3c3c;margin-top: 12px;">
                    سرویس‌های مدیریت شده</p>
                <div class="row" style="width: 100%; margin: 0;">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" style="display: flex; flex-direction: column">
                        <div style="width: 100%; display: flex; cursor: pointer; margin-top: 12px">
                            <img src="../../assets/svg/services/managed/managed_service_mysql.svg"
                                 style="max-width: 48px; max-height: 48px"/>
                            <div style="flex: 1; margin-top: 5px">
                                <p style="  font-family: 'Helvetica Neue'; font-size: 15px; font-style: normal; font-weight: bold; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: right; color: #535353; padding-right: 12px; margin-bottom: 5px;">
                                    Mysql</p>
                                <p style="  font-family: 'Helvetica Neue'; font-size: 14px; font-style: normal; font-weight: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: right; color: #7c7c7c; padding-right: 12px;">
                                    Database</p>
                            </div>
                        </div>

                        <div style="width: 100%; display: flex; cursor: pointer; margin-top: 12px">
                            <img src="../../assets/svg/services/managed/managed_service_redis.svg"
                                 style="max-width: 48px; max-height: 48px"/>
                            <div style="flex: 1; margin-top: 5px">
                                <p style="  font-family: 'Helvetica Neue'; font-size: 15px; font-style: normal; font-weight: bold; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: right; color: #535353; padding-right: 12px; margin-bottom: 5px;">
                                    Redis</p>
                                <p style="  font-family: 'Helvetica Neue'; font-size: 14px; font-style: normal; font-weight: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: right; color: #7c7c7c; padding-right: 12px;">
                                    In Memory Database Cache</p>
                            </div>
                        </div>

                        <div style="width: 100%; display: flex; cursor: pointer; margin-top: 12px">
                            <img src="../../assets/svg/services/managed/managed_service_postgresql.svg"
                                 style="max-width: 48px; max-height: 48px"/>
                            <div style="flex: 1; margin-top: 5px">
                                <p style="  font-family: 'Helvetica Neue'; font-size: 15px; font-style: normal; font-weight: bold; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: right; color: #535353; padding-right: 12px; margin-bottom: 5px;">
                                    Postgresql</p>
                                <p style="  font-family: 'Helvetica Neue'; font-size: 14px; font-style: normal; font-weight: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: right; color: #7c7c7c; padding-right: 12px;">
                                    Database</p>
                            </div>
                        </div>

                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                        <div style="width: 100%; display: flex; cursor: pointer; margin-top: 12px">
                            <img src="../../assets/svg/services/managed/managed_service_proxy.svg"
                                 style="max-width: 48px; max-height: 48px"/>
                            <div style="flex: 1; margin-top: 5px">
                                <p style="  font-family: 'Helvetica Neue'; font-size: 15px; font-style: normal; font-weight: bold; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: right; color: #535353; padding-right: 12px; margin-bottom: 5px;">
                                    Proxy</p>
                                <p style="  font-family: 'Helvetica Neue'; font-size: 14px; font-style: normal; font-weight: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: right; color: #7c7c7c; padding-right: 12px;">
                                    Ip Range Limiter</p>
                            </div>
                        </div>

                    </div>
                </div>
                <p style="cursor: pointer; font-family: iran-yekan; margin-top: auto; font-size: 13px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.69; letter-spacing: normal; text-align: center; color: #0045ff;">
                    مشاهده همه</p>

            </div>
            <div style="width: 1px; border: solid 1px #e8e8e8; margin-top: 16px; margin-bottom: 16px"></div>
            <div style="flex: 1; height: 100%; display: flex; flex-direction: column;">
                <p style="  font-family: iran-yekan; font-size: 16px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.75; letter-spacing: normal; text-align: center; color: #3c3c3c;margin-top: 12px;">
                    اجرای مستقیم کدها</p>
                <div class="row" style="width: 100%; margin: 12px 0 0 0;">
                    <div style="display: flex; flex-grow: 1; flex-direction: column; width: 33%;">
                        <img src="../../assets/svg/services/language/java_lang.svg"/>
                        <p style="margin-top: 12px; font-family: 'Helvetica Neue'; font-size: 14px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: center; color: #535353;">
                            Java</p>
                    </div>

                    <div style="display: flex; flex-grow: 1; flex-direction: column; width: 33%;">
                        <img src="../../assets/svg/services/language/python_lang.svg"/>
                        <p style="margin-top: 12px; font-family: 'Helvetica Neue'; font-size: 14px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: center; color: #535353;">
                            Python</p>
                    </div>

                    <div style="display: flex; flex-grow: 1; flex-direction: column; width: 33%;">
                        <img src="../../assets/svg/services/language/nodejs_lang.svg"/>
                        <p style="margin-top: 12px; font-family: 'Helvetica Neue'; font-size: 14px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: center; color: #535353;">
                            Node.js</p>
                    </div>

                </div>

                <p style="cursor: pointer; font-family: iran-yekan; margin-top: auto; font-size: 13px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.69; letter-spacing: normal; text-align: center; color: #0045ff;">
                    مشاهده همه</p>

            </div>
            <div style="width: 1px; border: solid 1px #e8e8e8; margin-top: 16px; margin-bottom: 16px"></div>
            <div style="flex: 1; height: 100%;display: flex; flex-direction: column;">
                <p style="font-family: iran-yekan; font-size: 16px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.75; letter-spacing: normal; text-align: center; color: #3c3c3c; margin-top: 12px;">
                    دیگر محصولات</p>


                <div class="row" style="width: 100%; margin: 12px 0 0 0; display: flex; justify-items: left; justify-content: left">

                    <div style=" width: 50%; flex-direction: column; margin-top: 12px">
                        <div style="width: 100%; display: flex; direction: ltr; height: max-content; flex-direction: column">
                            <div style="display: flex; width: 100%">
                                <img src="../../assets/svg/services/other_services/developer_tools.svg"
                                     style="margin-top: 0">
                                <p style="flex: 1; font-family: 'Helvetica Neue'; font-size: 14px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: left; color: #535353; margin-top: auto; margin-bottom: auto; padding-left: 12px;">
                                    Developer Tools</p>
                            </div>
                            <div style="flex: 1; flex-direction: column; display: flex; position: relative; padding-left: 20%">

                                <p style="font-family: 'Helvetica Neue'; font-size: 14px; font-weight: normal; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: left; color: #535353; margin: 0 0 8px 0;">
                                    API</p>
                                <p style="font-family: 'Helvetica Neue'; font-size: 14px; font-weight: normal; font-style: normal; font-stretch: normal; line-height: 1.21; letter-spacing: normal; text-align: left; color: #535353; margin: 0 0 8px 0;">
                                    CLI</p>
                            </div>
                        </div>
                    </div>

                    <div style=" width: 50%; flex-direction: column; margin-top: 12px; margin-right: auto">
                        <div style="width: 100%; display: flex; direction: ltr; height: max-content; flex-direction: column">
                            <div style="display: flex; width: 100%">
                                <img src="../../assets/svg/services/other_services/object-storage.svg"
                                     style="margin-top: 0">
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
                                     style="margin-top: 0">
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

                <p style="cursor: pointer; font-family: iran-yekan; margin-top: auto; font-size: 13px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.69; letter-spacing: normal; text-align: center; color: #0045ff;">
                    مشاهده همه</p>

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

            // window.onclick = function (event) {
            //     console.log(event.target.matches('li'))
            //     if(!event.target.matches('li')){
            //         if (document.getElementById("sub_menu").style.display === 'flex'){
            //             document.getElementById("sub_menu").style.display = 'none'
            //         }
            //     }
            //
            // }
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
            toggleMenu() {
                // this.$store.dispatch("TOGGLE_NAV", {data: type, id: "sidebar"});

                if (this.$refs.sub_menu.style.display === 'flex') {
                    this.$refs.sub_menu.style.display = 'none'
                } else {
                    this.$refs.sub_menu.style.display = 'flex'
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
                        this.$router.push("/user/login");
                    }
                );

            }
        }
    };
</script>

<style lang="stylus" scoped>

    .dropdown-content
        display none
        position absolute
        background-color #fefefe
        border-radius 3px
        min-width 160px
        overflow auto
        box-shadow 3px 4px 12px 0 rgba(0, 0, 0, 0.2)
        z-index 1
        left 10px
        top 0
        @media only screen and (max-width: 766px)
            left 4px


    .dropdown-content
        a
            color: #000000;
            padding: 8px 16px;
            text-decoration: none;
            font-family iran-yekan
            font-size .8em
            margin auto
            display: flex;
            @media only screen and (max-width: 766px)
                padding: 0 16px;
                font-size 1em

            img
                width 16px
                height 16px
                margin-top auto
                margin-bottom auto
                margin-left 12px

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
            padding 30px
            height 60px

        .header-container-fixed
            z-index 10
            padding 0 30px
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
</style>

