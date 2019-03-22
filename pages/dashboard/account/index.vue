<template>
    <div class="row">

        <div class="col-xs-12 col-md-11 col-lg-10 container-fluid"
        style="margin-bottom: 16px">
            <span class="mute-title">حساب کاربری</span>
        </div>

        <div class="col-xs-12 col-md-11 col-lg-10 container-fluid"
             style="min-height:245px; background-color: white; border-radius: 3px; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07);margin-bottom: 5px;">

            <div class="row" style="padding: 18px">
                <div class="col avatar-oval"></div>

                <div class="col col-lg-5">

                    <div class="fandogh-form-group-non-boarder">
                        <f-input styles="input-label"></f-input>
                        <f-label-disable label="نام و نام‌خانوادگی :" :value="account.first_name + account.last_name"/>
                    </div>
                    <div class="fandogh-form-group-non-boarder">
                        <f-input styles="input-label"></f-input>
                        <f-label-disable label="کد ملی :" :value="account.national_id"/>
                    </div>
                    <div class="fandogh-form-group-non-boarder">
                        <f-input styles="input-label"></f-input>
                        <f-label-disable label="تاریخ عضویت :" :value="account.created_at"/>
                    </div>
                    <div class="fandogh-form-group-non-boarder">
                        <f-input styles="input-label"></f-input>
                        <f-label-disable label="نام فضانام :" :value="namespace"/>
                    </div>

                </div>

                <div class="col col-lg-5">

                    <div class="fandogh-form-group-non-boarder">
                        <f-input styles="input-label"></f-input>
                        <f-label-disable label="نام کاربری :" :value="username"/>
                    </div>
                    <div class="fandogh-form-group-non-boarder">
                        <f-input styles="input-label"></f-input>
                        <f-label-disable label="آدرس ایمیل :" :value="email"/>
                    </div>
                    <div class="fandogh-form-group-non-boarder">
                        <f-input styles="input-label"></f-input>
                        <f-label-disable label="نوع کاربری :" value="رایگان"/>
                    </div>

                    <div class="fandogh-form-group-non-boarder">
                        <div class="box-checkbox" style="margin-right: 16px">
                            <div class="box-checkbox-input">
                                <f-checkbox
                                        styles="light input-checkbox-disable"
                                        v-model="account.newsletter_subscriber"
                                        id="newsletter_subscriber"
                                        title="دریافت خبرنامه"
                                />
                            </div>
                            <div class="box-checkbox-info">
                                <span class="mute-text">(وضعیت دریافت خبرنامه‌)</span>
                            </div>
                        </div>
                    </div>
                    <div class="fandogh-form-group-non-boarder" style="margin-right: 16px">
                        <f-button @onClick="accountEdit" styles="light-blue">ویرایش اطلاعات</f-button>
                        <f-button @onClick="accountPassword" styles="green">تغییر رمز عبور</f-button>
                    </div>

                </div>

            </div>
        </div>

        <div class="col-xs-12 col-md-11 col-lg-10 container-fluid"
             style="height:45px; background-color: white; border-radius: 3px; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07);margin-bottom: 5px">

        </div>

    </div>
</template>

<script>
    import FInput from "~/components/elements/input";
    import FButton from "~/components/elements/button";
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
            FCheckbox
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
                loadingProgress: false
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
            }
        }
    };
</script>


<style lang="stylus">
    .box-checkbox
        display flex
        @media only screen and (max-width: 768px)
            flex-direction column
            > div
                margin-bottom 15px
</style>