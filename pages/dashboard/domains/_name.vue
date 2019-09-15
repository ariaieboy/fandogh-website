<template>
    <div v-if="domain">
        <h2 class="title_header">جزئیات دامنه</h2>

        <div style="background: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0, 0.17); padding: 16px">
            <div class="row">

                <div style="display: flex; margin-bottom: 16px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <v-text-field style="font-family: iran-yekan; font-size: 1em;"
                                  class="v-text-fld"
                                  color="#0045ff"
                                  type="text"
                                  dir="ltr"
                                  :disabled="true"
                                  v-model="domain_obj.name.value"
                                  :label="domain_obj.name.label">

                    </v-text-field>

                </div>

                <div style="display: flex; margin-bottom: 16px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <v-text-field style="font-family: iran-yekan; font-size: 1em;"
                                  class="v-text-fld"
                                  color="#0045ff"
                                  type="text"
                                  dir="rtl"
                                  :disabled="true"
                                  :value="FDate(domain.created_at)"
                                  :label="domain_obj.date.label">

                    </v-text-field>

                </div>

                <div v-if="domain.service"
                     style="display: flex; margin-bottom: 16px; cursor: pointer"
                     class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
                     @click="$router.push('/dashboard/services/' + domain.service)">

                    <v-text-field style="font-family: iran-yekan; font-size: 1em;"
                                  class="v-text-fld"
                                  color="#0045ff"
                                  type="text"
                                  dir="rtl"
                                  :disabled="true"
                                  :value="domain.service"
                                  :label="domain_obj.service.label">

                    </v-text-field>

                </div>
            </div>

        </div>


        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <h2 class="title_header" style="margin-top: 32px">تأیید دامنه</h2>
                <div class="row" v-if="domain.verified">
                    <div class="col-xs-12">
                        <div style="background: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.17); margin-bottom: 12px; padding: 16px">
                            <span>وضعیت دامنه: <span v-html="textVeify"></span></span>
                        </div>
                        <div style="background-color: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.17);">
                            <div style="border-top-right-radius: 3px; border-top-left-radius: 3px; height: 4px; background-color: #fd3259"></div>
                            <p style="font-size: 1em; padding: 16px">{{cname_description}}</p>
                            <p style="font-weight: bold; text-align: center; font-size: 1.1em; background-color: #0045ff; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding: 8px 16px; color: #fefefe;">
                                <span style="color: #fefefe; font-weight: normal">CNAME: </span>lb.fandogh.cloud</p>

                        </div>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col-xs-12">
                        <f-collaps :selected="true">
                            <div slot="collapse-header">
                                <div class="domain-label">
                                    <span>وضعیت دامنه:</span>
                                    <span class="error-text">تایید نشده</span>
                                </div>
                            </div>
                            <div slot="collapse-body">
                                <div class="domain-description domain-column">
                                    <p style="font-size: 1em">{{description}}</p>
                                </div>
                                <div class="domain-description">
                                    <span>کد فعال سازی :</span>
                                    <span class="pending-text">{{domain.verification_key}}</span>
                                </div>
                            </div>
                            <div slot="collapse-footer">
                                <div v-if="verifyUserAccess({ADMIN: 'ADMIN', DEVELOPER: 'DEVELOPER'})" style="margin-top: 12px">
                                    <button @click="verify"
                                            style="color: #1d1d1d; font-family: iran-yekan; outline: none; width: 100%; background-color: #00E5FF; box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4); border-radius: 3px; padding: 12px 0">
                                        بررسی تأیید دامنه
                                    </button>
                                </div>
                            </div>
                        </f-collaps>
                    </div>
                </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <h2 class="title_header" style="margin-top: 32px">گواهینامه SSL</h2>
                <div class="row" v-if="!domain.verified">
                    <div class="col-xs-12">
                        <f-collaps :selected="false" :disabled="true">
                            <div slot="collapse-header">
                                <div class="domain-label">
                                    <span>وضعیت گواهینامه SSL:</span>
                                    <span class="error-text">ابتدا دامنه خود را تایید کنید</span>
                                </div>
                            </div>
                        </f-collaps>
                        <div v-if="verifyUserAccess({ADMIN: 'ADMIN', DEVELOPER: 'DEVELOPER'})" style="margin-top: 12px">
                            <button style="color: #fefefe; font-family: iran-yekan; outline: none; width: 100%; background-color: #9c9c9c; box-shadow: 0 2px 6px rgba(156, 156, 156, 0.4); border-radius: 3px; padding: 12px 0">برای درخواست SSL دامنه خود را تایید کنید</button>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="domain.verified && !domain.certificate">
                    <div class="col-xs-12">
                        <f-collaps :selected="false" :disabled="true">
                            <div slot="collapse-header">
                                <div class="domain-label">
                                    <span>وضعیت گواهینامه SSL :</span>
                                    <span class="pending-text">درخواست نداده‌اید</span>
                                </div>
                            </div>
                        </f-collaps>
                        <div v-if="verifyUserAccess({ADMIN: 'ADMIN', DEVELOPER: 'DEVELOPER'})" style="margin-top: 12px">
                            <button  @click="certificateDomain"
                                    style="color: #1d1d1d; font-family: iran-yekan; outline: none; width: 100%; background-color: #00E5FF; box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4); border-radius: 3px; padding: 12px 0">درخواست SSL</button>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="domain.verified && domain.certificate">
                    <div class="col-xs-12">
                        <f-collaps :selected="true">
                            <div slot="collapse-header">
                                <div class="domain-label">
                                    <span>وضعیت گواهینامه SSL :</span>

                                    <span
                                            v-if="domain.certificate && domain.certificate.details"
                                            :data-balloon="domain.certificate.details.info"
                                            data-balloon-pos="up"
                                            :class="getStatus"
                                    >{{domain.certificate.details.status | status}}</span>
                                </div>
                            </div>
                            <div slot="collapse-body">
                                <div class="domain-description">
                                    <span>تاریخ درخواست :</span>
                                    <span>{{FDate(domain.certificate.created_at)}}</span>
                                </div>
                                <div class="domain-description">
                                    <span>وضعیت :</span>
                                    <span
                                            v-if="domain.certificate && domain.certificate.details"
                                            :class="getStatus"
                                            :data-balloon="domain.certificate.details.info"
                                            data-balloon-pos="up"
                                    >
                {{domain.certificate.details.status | status}}
                <img src="~/static/icons/plans/info-button.png"></span>
                                </div>
                            </div>
                        </f-collaps>
                        <div v-if="verifyUserAccess({ADMIN: 'ADMIN', DEVELOPER: 'DEVELOPER'})" style="margin-top: 12px">
                            <button
                                    style="color: #fefefe; font-family: iran-yekan; outline: none; width: 100%; background-color: #fd3259; box-shadow: 0 2px 6px rgba(253, 50, 89, 0.4); border-radius: 3px; padding: 12px 0"
                                    @click="removeCertificateDomain">لغو گواهینامه SSL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FInput from "~/components/elements/input";
    import FButton from "~/components/elements/button";
    import FTextarea from "~/components/Dashboard/textarea";
    import FLable from "~/components/Dashboard/label";
    import FLabelDisable from "~/components/elements/label/label-disable";
    import FDate from "~/utils/date";
    import FCollaps from "~/components/elements/collaps";
    import Popover from "../../../components/wizard/tooltip/popover";
    import ErrorReporter from "../../../utils/ErrorReporter";
    import RoleAccessHandler from "../../../utils/RoleAccessHandler";
    import Moment from 'moment-jalaali';

    export default {
        layout: "dashboard",
        components: {
            FCollaps,
            FInput,
            FButton,
            FTextarea,
            FLable,
            FLabelDisable,
            Popover,
            Moment
        },
        data() {
            return {
                name: this.$route.params.name,
                test: "",
                textService: ``,
                textVeify: `
      <span class="success-text">تایید شده</span>`,
                description:
                    "لطفا روی دامنه مورد نظر یک رکورد با مقدار TXT زیر ایجاد کنید و روی کلید بررسی دامنه کلیک کنید ",
                cname_description: 'توجه داشته باشید برای اینکه فندق بتواند ترافیک ورودی را، به سمت دامنه‌ی جدید منتقل کند باید یک رکورد CNAME با مقدار زیر را بر روی دامنه خود ثبت کنید.',
                domain_obj: {
                    name: {
                        label: 'نام دامنه',
                        hint: 'نام ایمیجی که میخواهید آپلود کنید',
                        default: '80',
                        counter: 100,
                        value: this.$route.params.name,
                    },
                    date: {
                        label: 'تاریخ ثبت دامنه',
                        hint: 'نسخه دلخواهی برای ایمیجی که میخواهید وارد کنید',
                        default: '',
                        value: '',
                    },
                    service: {
                        label: 'متصل به سرویس',
                        default: '',
                        value: '',
                    }
                },

            };
        },
        computed: {
            openSidebar() {
                return this.$store.state.sideMunu
            },
            domain() {
                return this.$store.state.domain;
            },
            getStatus() {
                if (!this.domain) return ''
                let certificate = this.domain.certificate;
                if (!certificate) return "";
                if (!certificate.details) return ""
                const {status} = certificate.details;
                if (!status) return "";
                let value = status.toLowerCase();
                if (value === "ready") {
                    return "success-text";
                }
                if (value === "error") {
                    return "error-text";
                }
                if (value === "unknown") {
                    return "pending-text";
                }
            }
        },

        filters: {
            status: function (value) {
                if (!value) return "";
                let state = value.toLowerCase();
                if (state === "ready") {
                    return "فعال";
                }
                if (state === "error") {
                    return "خطا";
                }
                if (state === "unknown") {
                    return "نامشخص";
                }
            }
        },
        created() {
            this.getData();
        },
        destroyed() {
        },
        methods: {
            verifyUserAccess(permitted_roles){
                return RoleAccessHandler(permitted_roles)
            },
            async getData() {
                try {
                    await this.$store.dispatch("getDomain", {
                        name: this.$route.params.name
                    });
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (this.domain.service) {
                        this.textService = `<a href="/dashboard/services/${this.domain.service}" >
            ${this.domain.service}
            <img src="/icons/plans/info-button.png" >
            </a>`;
                    }
                } catch (e) {
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }
            },
            FDate(date) {
                return Moment(date).format('jYYYY/jMM/jDD')
            },
            verify() {
                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                this.$ga.event({
                    eventCategory: "domain",
                    eventAction: "verify domain",
                    eventLabel: "domain name",
                    eventValue: this.name
                });
                this.$store
                    .dispatch("verificationDomain", {name: this.name})
                    .then(res => {
                        if (res.verified) {
                            this.$notify({
                                title: "دامنه شما با موفقیت به سرویس متصل شد.",
                                type: "success"
                            });
                            this.$ga.event({
                                eventCategory: "domain",
                                eventAction: "verified domain",
                                eventLabel: "domain name",
                                eventValue: this.name
                            });
                            this.getData();
                            // this.$router.push("/dashboard/domains");
                        } else {
                            this.$ga.event({
                                eventCategory: "domain",
                                eventAction: "fail verified domain",
                                eventLabel: "domain name",
                                eventValue: this.name
                            });
                            this.$notify({
                                title: "رکورد TXT شما روی دامنه صحیح نیست",
                                type: "error"
                            });
                        }
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    })
                    .catch(e => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    });
            },
            certificateDomain() {
                this.$store.commit("SET_DATA", {data: true, id: "loading"});
                let name = this.domain.name;
                this.$ga.event({
                    eventCategory: "domain",
                    eventAction: "click btn certificate domain",
                    eventLabel: "domain name",
                    eventValue: name
                });
                this.$store
                    .dispatch("certificateDomain", {name})
                    .then(res => {
                        this.getData();
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        this.$ga.event({
                            eventCategory: "domain",
                            eventAction: "send certificate domain",
                            eventLabel: "domain name",
                            eventValue: name
                        });
                        this.$notify({
                            title: "درخواست شما با موفقیت ثبت شد",
                            type: "success"
                        });
                    })
                    .catch(e => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});

                        this.$ga.event({
                            eventCategory: "domain",
                            eventAction: "fail certificate domain",
                            eventLabel: "domain name",
                            eventValue: name
                        });

                        // this notify for themploery
                        if (typeof e === "object") {
                            this.$notify({
                                title: e.domain_name[0],
                                time: 4000,
                                type: "error"
                            });
                        } else {
                            this.$notify({
                                title: ErrorReporter(e, this.$data),
                                time: 4000,
                                type: "error"
                            });
                        }
                    });
            },
            removeCertificateDomain() {
                let name = this.domain.name;
                this.$ga.event({
                    eventCategory: "domain",
                    eventAction: "click btn remove certificate domain",
                    eventLabel: "domain name",
                    eventValue: name
                });
                this.$alertify(
                    {
                        title: `حذف گواهی SLL`,
                        description: `آیا از حذف SSL دامنه ${name} مطمئن هستید؟`
                    },
                    status => {
                        if (status) {
                            this.$store.commit("SET_DATA", {data: true, id: "loading"});
                            this.$store
                                .dispatch("removeCertificateDomain", {name})
                                .then(res => {
                                    this.getData()
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$ga.event({
                                        eventCategory: "domain",
                                        eventAction: "remove ssl domain",
                                        eventLabel: "domain name",
                                        eventValue: name
                                    });
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                })
                                .catch(e => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$ga.event({
                                        eventCategory: "domain",
                                        eventAction: "fail remove ssl domain",
                                        eventLabel: "domain name",
                                        eventValue: name
                                    });
                                    this.$notify({
                                        title: e.data.message,
                                        type: "error"
                                    });
                                });
                        }
                    }
                );
            },
        }
    };
</script>

<style lang="stylus" scoped>

    .title_header
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal


    .domain
        &-description
            display flex
            margin-bottom 10px
            padding 0 15px

            img
                vertical-align top

        &-column
            flex-direction column


</style>

<style lang="stylus">


    .v-text-fld
        .v-label
            font-size: 16px;
            line-height: 1 !important;
            color: black !important
            min-height: 8px;
            transition: .3s cubic-bezier(.25, .8, .5, 1)

        .v-text-field__slot
            input
                flex: 0 1 auto !important;
                line-height: 38px !important;
                height: 38px !important;
                max-height 38px !important
                padding: 5px 20px !important;
                text-align center !important
                cursor revert !important
                font-size 1.3em !important
                max-width: 100%;
                color black !important
                min-width: 0;
                width: 100%
</style>
