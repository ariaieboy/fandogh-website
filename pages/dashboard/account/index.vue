<template>
    <div class="row">

        <div class="col-lg-11 col-md-10 col-sm-8 col-xs-12 container-fluid"
             style="box-sizing: content-box; max-width: 1700px">

            <p class="title">حساب کاربری</p>

            <div class="box row">
                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12; margin: 0;">
                    <div style="border: solid 5px #24d5d8; border-radius: 100px; width: 80px; height: 80px;">
                    </div>
                </div>

                <div class="col-lg-5 col-md-4 col-sm-12 col-xs-12 row" style="display: block; margin: 0;">

                    <div style="min-height: 3em;">
                        <p class="profile-entity-title">نام و نام‌خانوادگی:</p>
                        <p class="profile-entity-value">سورنا سرآبادانی</p>
                    </div>
                    <div style="min-height: 3em">
                        <p class="profile-entity-title">شماره ملی:</p>
                        <p class="profile-entity-value">۱۱۲۳۴۵۰۹۵۶</p>
                    </div>
                    <div style="min-height: 3em">
                        <p class="profile-entity-title">تاریخ عضویت:</p>
                        <p class="profile-entity-value">۱۲/۰۲/۱۳۹۷</p>
                    </div>
                    <div style="min-height: 3em">
                        <p class="profile-entity-title">نام فضانام:</p>
                        <p class="profile-entity-value">sorena</p>
                    </div>

                </div>

                <div class="col-lg-5 col-md-6 col-sm-12 col-xs-12 row" style="display: block; margin: 0;">

                    <div style="min-height: 3em;">
                        <p class="profile-entity-title">نام کاربری:</p>
                        <p class="profile-entity-value">{{username}}</p>
                    </div>

                    <div style="min-height: 3em; overflow: hidden; white-space: nowrap;">
                        <p class="profile-entity-title">آدرس ایمیل:</p>
                        <p class="profile-entity-value">{{email}}</p>
                    </div>


                    <div style="min-height: 3em">
                        <p class="profile-entity-title">نوع کاربری:</p>
                        <p class="profile-entity-value">{{account.created_at}}</p>
                    </div>

                    <div class="row">
                    <button  @click="accountEdit" class="container-fluid left" style="border-radius: 17.5px; width: 200px; height: 35px;
  background-color: #7ed321;color: #ffffff;font-family: IRANYekan;font-size: 14px;border: none;outline: none; cursor: pointer">
                        ویرایش اطلاعات کاربری
                    </button>
                    </div>

                </div>
            </div>

            <div class="box-row row">
                <div @click="sectionClicked('ProfilePlan')"
                     :class="[(activeSectionName === 'ProfilePlan' ? 'enabled' : 'disabled')]">
                    <p :style="{borderLeft: '1px solid #2979ff'}">پلن من</p>
                </div>

                <div @click="sectionClicked('ProfileWallet')"
                     :class="[(activeSectionName === 'ProfileWallet' ? 'enabled' : 'disabled')]">
                    <p :style="{borderLeft: '1px solid #2979ff'}">کیف پول</p>
                </div>

                <div @click="sectionClicked('ProfileTransactions')"
                     :class="[(activeSectionName === 'ProfileTransactions' ? 'enabled' : 'disabled')]">
                    <p :style="{borderLeft: '1px solid #2979ff'}">تراکنش‌های مالی</p>
                </div>

                <div @click="sectionClicked('ProfileMessages')"
                     :class="[(activeSectionName === 'ProfileMessages' ? 'enabled' : 'disabled')]">
                    <p>پیام‌های من</p>
                </div>
            </div>

            <component v-bind:is="activeSectionName"></component>

        </div>

        <div class="col-xs-12" :class="{'col-md-9':openSidebar , 'col-md-6':!openSidebar}">

            <div class="fandogh-form-group right">
                <div class="box-checkbox">
                    <div class="box-checkbox-input">
                        <f-checkbox
                                styles="light input-checkbox-disable"
                                v-model="account.newsletter_subscriber"
                                id="newsletter_subscriber"
                                title="دریافت خبرنامه"
                        />
                    </div>
                    <div class="box-checkbox-info">
                        <span class="mute-text">(مایل به دریافت خبرنامه‌های فندق هستم.)</span>
                    </div>
                </div>
            </div>
            <div class="fandogh-form-group margin-top-100">
                <f-button @onClick="accountPassword" styles="red">تغییر رمز عبور</f-button>
            </div>
        </div>
    </div>
</template>

<script>
    import FInput from "~/components/elements/input";
    import FButton from "~/components/elements/button";
    import ProfilePlan from "../../../components/Dashboard/profile/profile-plan";
    import File from "~/components/elements/file";
    import {formData} from "~/utils/formData";
    import ProgressBar from "~/components/Dashboard/progress-bar";
    import ErrorReporter from "~/utils/ErrorReporter";
    import FormValidator from "~/utils/formValidator";
    import FLabelDisable from "~/components/elements/label/label-disable";
    import FCheckbox from "~/components/elements/checkbox";
    import {getValue} from "~/utils/cookie";

    export default {
        layout: "dashboard",
        name: "account",
        components: {
            FInput,
            FButton,
            File,
            ProgressBar,
            FLabelDisable,
            FCheckbox,
            ProfilePlan
        },
        data() {
            return {
                // account: {
                //   username: "Ramin",
                //   name: "رامین",
                //   email: "Ramin.esmaeili91@yahoo.com",
                //   last_name: "اسماعیلی",
                //   code: "۰۰۱۱۴۶۵۸۲۹۸۷",
                //   news: false
                // },
                loading: false,
                loadingProgress: false,
                activeSectionName: 'ProfilePlan'
            };
        },
        computed: {
            openSidebar() {
                return this.$store.state.sideMunu
            },
            account() {
                return this.$store.state.account;
            },
            email() {
                return getValue("email");
            },
            progress() {
                return this.$store.state.progress;
            },
            username() {
                return getValue("username");
            }
        },

        mounted() {
            this.$ga.event({
                eventCategory: "account",
                eventAction: "show information"
            });
        },
        created() {
            this.getData();
        },
        methods: {
            async getData() {
                try {
                    let res = await this.$store.dispatch("getAccount", {
                        username: getValue("username")
                    });
                    if (res.newsletter_subscriber) {
                        let elm = document.querySelector("#newsletter_subscriber");
                        elm.click();
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    }
                }
            },
            accountEdit() {
                this.$ga.event({
                    eventCategory: "account",
                    eventAction: "click btn edit information"
                });
                this.$router.push("/dashboard/account/edit");
            },
            accountPassword() {
                this.$ga.event({
                    eventCategory: "account",
                    eventAction: "click btn edit information"
                });
                this.$router.push("/dashboard/account/password");
            }, sectionClicked(sectionName) {
                this.activeSectionName = sectionName;
            }
        }
    };
</script>


<style lang="stylus" scoped>
    .box-checkbox
        display flex
        @media only screen and (max-width: 768px)
            flex-direction column
            > div
                margin-bottom 15px

    .title
        font-family IRANYekan
        font-style normal
        font-size 1.1em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal

    .profile-entity-title
        font-family yekan-bold
        font-size .9em
        min-width 120px
        font-style normal
        display inline-block
        font-stretch normal
        margin auto
        line-height 1.75
        letter-spacing normal
        color #111111

    .profile-entity-value
        font-family IRANYekan
        font-size .9em
        display inline-block
        text-align right
        line-height 1.75
        text-overflow ellipsis
        margin auto
        margin-right 10px
        letter-spacing normal
        color #000000


    .box
        padding 16px
        box-sizing content-box
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        background-color #ffffff

    .box-row
        height 40px
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        background-color #ffffff
        margin-top 5px
        margin-bottom 5px
        white-space nowrap
        overflow scroll

        div.disabled
            display inline-block
            padding 0
            margin-right -1px
            cursor pointer

            p
                font-style normal
                font-stretch normal
                min-width 200px
                line-height 24px
                margin-top 8px
                text-align center
                font-family IRANYekan
                font-size .9em
                outline none
                margin-bottom 8px
                letter-spacing normal
                color #000000

        div.enabled
            display inline-block
            padding 0
            margin-right -1px
            background-color #2979ff
            cursor pointer

            p
                font-style normal
                font-stretch normal
                min-width 200px
                line-height 24px
                margin-top 8px
                text-align center
                font-family yekan-bold
                font-size .9em
                outline none
                margin-bottom 8px
                letter-spacing normal
                color #ffffff


    .plan-container
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        background-color #ffffff
</style>
