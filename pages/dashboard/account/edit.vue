<template>

    <div class="row">
        <h2 class="title_header">مشخصات کاربری</h2>

        <div style="padding: 16px">
            <div class="row"
                 style="background-color: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.17); padding: 16px;">

                <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                                  color="#0045ff"
                                  type="text"
                                  dir="ltr"
                                  v-model="user.user_name.value"
                                  :readonly="true"
                                  :label="user.user_name.label">

                    </v-text-field>

                </div>
                <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                                  color="#0045ff"
                                  type="text"
                                  dir="ltr"
                                  :readonly="true"
                                  v-model="user.email.value"
                                  :label="user.email.label">

                    </v-text-field>

                </div>
                <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <v-text-field
                            style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; background-color: transparent !important;"
                            color="#0045ff"
                            type="text"
                            dir="ltr"
                            :readonly="!editing"
                            v-model="user.first_name.value"
                            :label="user.first_name.label">

                    </v-text-field>

                </div>
                <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <v-text-field
                            style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; background-color: transparent !important;"
                            color="#0045ff"
                            type="text"
                            dir="ltr"
                            :readonly="!editing"
                            v-model="user.last_name.value"
                            :label="user.last_name.label">

                    </v-text-field>

                </div>
                <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <v-text-field style="font-family: iran-sans; font-size: 1em;margin-left: -15px"
                                  color="#0045ff"
                                  type="text"
                                  dir="ltr"
                                  :readonly="!editing"
                                  v-model="user.national_id.value"
                                  :label="user.national_id.label">

                    </v-text-field>

                </div>
                <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <v-container class="px-0" fluid>
                        <v-checkbox
                                :color="'#0022ff'"
                                :disabled="!editing"
                                v-model="user.newsletter_subscriber.value"
                                :label="user.newsletter_subscriber.label + ' (' + user.newsletter_subscriber.hint + ')'"
                        ></v-checkbox>
                    </v-container>
                </div>
            </div>


            <div class="row profile-edit-container">
                <button v-if="!loading && !editing" @click="editing = true" class="start-editing">ویرایش مشخصات</button>
                <button v-if="!loading && editing" @click="saveEdit" class="submit-editing">تایید تغییرات</button>
                <button v-if="!loading && editing" @click="cancelEditing()" class="cancel-editing">انصراف</button>
            </div>
        </div>

        <h2 class="title_header" style="margin-top: 48px">تغییر رمز عبور</h2>

        <div style="padding: 16px; width: 100%;">
            <div class="row"
                 style="background-color: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.17); padding: 16px;">
                <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                                  color="#0045ff"
                                  type="text"
                                  dir="ltr"
                                  v-model="current_password"
                                  :label="password.current_password.label">

                    </v-text-field>

                </div>
                <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <v-text-field
                            style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; background-color: transparent !important;"
                            color="#0045ff"
                            type="text"
                            dir="ltr"
                            v-model="new_password"
                            :label="password.new_password.label">

                    </v-text-field>

                </div>
                <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <v-text-field
                            style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; background-color: transparent !important;"
                            color="#0045ff"
                            type="text"
                            dir="ltr"
                            v-model="repeat_new_password"
                            :label="password.repeat_new_password.label">

                    </v-text-field>

                </div>
            </div>


            <div class="row profile-edit-container">
                <button v-if="!loading && !editing" @click="saveNewPassword" class="start-editing">تایید رمز عبور جدید
                </button>
            </div>
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
        data() {
            return {
                loading: false,
                loadingProgress: false,
                editing: false,
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    secret_regex: value => new RegExp('^[a-z0-9]+([-.a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد، خط تیره (-) و (.) معتبر هستند)',
                    counter: value => value.length <= 253 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    url_regex: value => new RegExp('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$').test(value) || 'آدرس وارد شده معتبر نیست'
                },
                user: {
                    email: {
                        label: 'آدرس ایمیل',
                        value: ''
                    },
                    user_name: {
                        label: 'نام‌ کاربری',
                        value: ''
                    },
                    first_name: {
                        label: 'نام‌',
                        value: ''
                    },
                    last_name: {
                        label: 'نام خانوادگی',
                        value: ''
                    },
                    national_id: {
                        label: 'کد ملی',
                        value: ''
                    },
                    newsletter_subscriber: {
                        label: 'دریافت خبر نامه',
                        hint: 'مایل به دریافت خبرنامه هستم',
                        value: true
                    }
                },
                password: {
                    current_password: {
                        label: 'رمز عبور فعلی',
                    },
                    new_password: {
                        label: 'رمز عبور جدید',
                    },
                    repeat_new_password: {
                        label: 'تکرار رمز عبور جدید',
                    }
                },
                current_password: '',
                new_password: '',
                repeat_new_password: '',


            };
        },
        computed: {
            openSidebar() {
                return this.$store.state.sideMunu
            },
            username() {
                return getValue("username");
            },
            email() {
                return getValue("email");
            },
            progress() {
                return this.$store.state.progress;
            },
            account() {
                return this.$store.state.account;
            }
        },
        mounted() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"});

        },
        components: {
            FInput,
            FButton,
            File,
            ProgressBar,
            FLabelDisable,
            FCheckbox
        },
        created() {
            this.getData();

            this.user.email.value = this.email
            this.user.user_name.value = this.username


        },

        methods: {
            cancelEditing() {
                location.reload()
            },
            async saveNewPassword() {
                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                if (this.password.new_password.value !== this.password.repeat_new_password.value) {
                    this.$notify({
                        title: "رمز عبور و تکرار رمز عبور شما یکسان نیست",
                        time: 4000,
                        type: "error"
                    });
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    return;
                }
                if (
                    !FormValidator(this.$data, {
                        current_password: { required: true, name: "رمز عبور قبلی " },
                        new_password: { required: true, name: "رمز عبور جدید " },
                        repeat_new_password: { required: true, name: "تکرار رمز عبور" }
                    })
                ) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    return;
                }

                this.$ga.event({
                    eventCategory: "account",
                    eventAction: "save update information password"
                });
                this.$store
                    .dispatch("updateAccount", {
                        username: getValue("username"),
                        current_password: this.current_password,
                        new_password: this.new_password
                    })
                    .then(res => {
                        this.$notify({
                            title: "رمز عبور شما با موفقیت بروز رسانی شد.",
                            time: 4000,
                            type: "success"
                        });
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        this.$router.replace("/dashboard/account");
                    })
                    .catch(e => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        this.$alertReport(e);
                    });
            },
            async getData() {
                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                try {
                    let res = await this.$store.dispatch("getAccount", {
                        username: getValue("username")
                    });

                    // if (res.newsletter_subscriber) {
                    //     let elm = document.querySelector("#newsletter_subscriber");
                    //     elm.click();
                    // }

                    this.user.first_name.value = res.first_name
                    this.user.last_name.value = res.last_name
                    this.user.national_id.value = res.national_id
                    this.user.newsletter_subscriber.value = res.newsletter_subscriber

                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.replace("/user/login");
                    }
                }
            },
            async saveEdit() {
                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                if (
                    !/^\d{10}$/.test(this.user.national_id.value) &&
                    this.user.national_id.value
                ) {
                    this.$notify({
                        title: "از کاراکتر های مجاز استفاده کنید",
                        time: 4000,
                        type: "error"
                    });
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    return;
                }
                this.$ga.event({
                    eventCategory: "account",
                    eventAction: "save update information"
                });
                let body = {
                    username: getValue("username"),
                    national_id:
                        this.user.national_id.value !== "" ? this.user.national_id.value : null,
                    newsletter_subscriber:
                        this.user.newsletter_subscriber.value !== ""
                            ? this.user.newsletter_subscriber.value
                            : null,
                    first_name: this.user.first_name.value,
                    last_name: this.user.last_name.value
                };
                try {
                    await this.$store.dispatch("updateAccount", body);
                    this.$notify({
                        title: "پروفایل شما با موفقیت بروزرسانی شد",
                        time: 4000,
                        type: "success"
                    });
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    this.$router.push("/dashboard/account");
                } catch (error) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    this.$alertReport(error);
                }
            }
        }
    };
</script>


<style lang="stylus" scoped>
    @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons")

    .title_header
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal

    .profile-edit-container
        width 100%
        padding 16px
        display flex
        justify-content center
        @media only screen and (max-width: 992px)
            flex-direction column

        button.submit-editing
            max-width: 300px;
            background: #00E5FF;
            width: 100%;
            margin-top: auto;
            margin-bottom: auto;
            padding: 12px 0;
            border-radius: 3px;
            box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4);
            outline: none;
            font-family: iran-yekan;
            color: #1d1d1d
            margin-left 8px
            transition all 0.3s ease-in-out
            @media only screen and (max-width: 992px)
                margin-right auto
                margin-left auto
                margin-bottom 16px


        button.submit-editing:hover
            transition all 0.3s ease-in-out
            box-shadow: 0 0 16px rgba(0, 229, 255, 0.6);

        button.start-editing
            max-width: 300px;
            background: #00E5FF;
            width: 100%;
            margin-top: auto;
            margin-bottom: auto;
            padding: 12px 0;
            border-radius: 3px;
            box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4);
            outline: none;
            font-family: iran-yekan;
            color: #1d1d1d
            transition all 0.3s ease-in-out
            @media only screen and (max-width: 992px)
                margin-right auto
                margin-left auto


        button.start-editing:hover
            transition all 0.3s ease-in-out
            box-shadow: 0 0 16px rgba(0, 229, 255, 0.6);


        button.cancel-editing
            max-width: 300px;
            background: #fd3259;
            width: 100%;
            margin-top: auto;
            margin-bottom: auto;
            padding: 12px 0;
            margin-right 8px
            border-radius: 3px;
            box-shadow: 0 2px 6px rgba(253, 50, 89, 0.4);
            outline: none;
            font-family: iran-yekan;
            color: #fefefe
            transition all 0.3s ease-in-out
            @media only screen and (max-width: 992px)
                margin-right auto
                margin-left auto

        button.cancel-editing:hover
            transition all 0.3s ease-in-out
            box-shadow: 0 0 16px rgba(253, 50, 89, 0.6);


</style>


<style lang="stylus">

    .v-label
        background transparent !important

    label.v-label.theme--light
        margin-top auto !important
        margin-bottom auto !important


</style>
