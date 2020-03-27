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
                        <div style="background: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.07); margin-bottom: 8px; padding: 15px 16px">
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
                                <div v-if="verifyUserAccess({ADMIN: 'ADMIN', DEVELOPER: 'DEVELOPER'})"
                                     style="margin-top: 12px">
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
                            <button style="color: #fefefe; font-family: iran-yekan; outline: none; width: 100%; background-color: #9c9c9c; box-shadow: 0 2px 6px rgba(156, 156, 156, 0.4); border-radius: 3px; padding: 12px 0">
                                برای درخواست SSL دامنه خود را تایید کنید
                            </button>
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
                            <button @click="certificateDomain"
                                    style="color: #1d1d1d; font-family: iran-yekan; outline: none; width: 100%; background-color: #00E5FF; box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4); border-radius: 3px; padding: 12px 0">
                                درخواست SSL
                            </button>
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
                        <div class="col-xs-12"
                             style="background-color: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,.17); margin-top: 8px;padding-left: 0; padding-right: 0;">

                            <div style="border-top-right-radius: 3px; border-top-left-radius: 3px; height: 4px; background-color: #fd3259; width: 100%;"></div>
                            <p style="margin-bottom: 0; line-height: 1.75; padding: 16px">اگر دامنه فعلی به سرویسی متصل
                                است و قبل از آن ssl فعال نبوده است، برای برقرار شدن ssl، نیاز است تا یک بار سرویس را
                                destroy و سپس دوباره از نو deploy کنید تا تنظیمات جدید بر روی آن قرار گیرد.</p>

                        </div>
                        <div v-if="verifyUserAccess({ADMIN: 'ADMIN', DEVELOPER: 'DEVELOPER'})" style="margin-top: 8px">
                            <button
                                    style="color: #fefefe; font-family: iran-yekan; outline: none; width: 100%; background-color: #fd3259; box-shadow: 0 2px 6px rgba(253, 50, 89, 0.4); border-radius: 3px; padding: 12px 0"
                                    @click="removeCertificateDomain">لغو گواهینامه SSL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <h2 class="title_header" style="margin-top: 32px">بررسی رکورد‌های دامنه</h2>
                <div class="row">
                    <div class="col-xs-12">
                        <div style="background-color: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.17); margin-bottom: 16px">
                            <p style="margin-bottom: 0; font-size: 1em; padding: 16px"
                               v-html="dns_record_check_description"></p>
                        </div>
                        <button @click="checkDomainCNAMERecord"
                                style="color: #1e1e1e; font-family: iran-yekan; outline: none; width: 100%; background-color: #00E5FF; box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4); border-radius: 3px; padding: 12px 0;">
                            بررسی رکورد‌های CNAME دامنه
                        </button>
                        <button @click="checkDomainTXTRecord"
                                style="color: #1e1e1e; font-family: iran-yekan; outline: none; width: 100%; background-color: #00E5FF; box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4); border-radius: 3px; padding: 12px 0; margin-top: 8px">
                            بررسی رکورد‌های TXT دامنه
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <h2 class="title_header" style="margin-top: 48px">آموزش تایید و درخواست SSL دامنه</h2>

        <div style="width: 100%; display: flex; background: #0045ff; padding: 16px;">
            <div class="row lang-detail-media-container" style="margin: 0 !important;">

                <div class="col-lg-4 col-md-4 col-xs-12 col-md-12 lang-menu-container">

                    <div v-for="(menu, index) in domain_record_tutorials_model"
                         :key="menu.title"
                         class="lang-menu-item"
                         :class="[menu.selected ? 'selected' : '']"
                         @click="menuItemSelected(index)">
                        <p class="menu-item-number">{{index + 1}}</p>
                        <p class="menu-item-title">{{menu.title}}</p>
                    </div>
                </div>

                <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">

                    <vue-plyr class="tut_player" :key="menu_item.video"
                              :options="{controls: ['play-large', 'play', 'progress', 'mute', 'volume','current-time','fullscreen']}">
                        <video style="width: 100%">
                            <source style="width: 100%"
                                    :src="require('../../../assets/media/' + menu_item.video + '.mp4')"
                                    type="video/mp4"/>
                        </video>
                    </vue-plyr>

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
                cname_record: 'https://dnschecker.org/#CNAME/',
                txt_record: 'https://dnschecker.org/#TXT/',
                name: this.$route.params.name,
                test: "",
                textService: ``,
                textVeify: `
      <span class="success-text">تایید شده</span>`,
                description:
                    "لطفا روی دامنه مورد نظر یک رکورد با مقدار TXT زیر ایجاد کنید و روی کلید بررسی دامنه کلیک کنید ",
                cname_description: 'توجه داشته باشید برای اینکه فندق بتواند ترافیک ورودی را، به سمت دامنه‌ی جدید منتقل کند باید یک رکورد CNAME با مقدار زیر را بر روی دامنه خود ثبت کنید.',
                dns_record_check_description: 'شما می‌توانید با استفاده از این بخش، بررسی کنید که آیا مقادیر رکوردهای <b>CNAME</b> و <b>TXT</b> برای دامنه شما ایجاد شده است یا خیر. در نظر داشته باشید که در رکوردهای دامنه شما باید <b>مقدار TXT Record که فندق به شما داده است</b> وجود داشته باشد و برای <b>CNAME Record</b> هم باید مقدار <b>lb.fandogh.cloud</b> ایجاد شده باشد.',
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
                domain_record_tutorials_model: [
                    {
                        title: 'اضافه کردن رکورد TXT',
                        selected: true,
                        video: 'fandogh_txt_record_tutorial'
                    },
                    {
                        title: 'اضافه کردن رکورد CNAME',
                        selected: false,
                        video: 'fandogh_cname_record_tutorial'
                    },
                    {
                        title: 'اضافه کردن دامنه به سرویس',
                        selected: false,
                        video: 'fandogh_deploy_service_with_domain_tutorial'
                    },
                    {
                        title: 'ssl در سرویس‌های در حال اجرا',
                        selected: false,
                        video: 'fandogh_domain_ssl_for_running_service'
                    }
                ],
                menu_item: {
                    title: 'اضافه کردن رکورد TXT',
                    selected: true,
                    video: 'fandogh_txt_record_tutorial'
                },

            };
        },
        computed: {
            openSidebar() {
                return this.$store.state.sideMunu
            },
            domain() {
                let domain = this.$store.state.domain;
                if (domain) {
                    this.cname_record = `https://dnschecker.org/#CNAME/${domain.name}`;
                    this.txt_record = `https://dnschecker.org/#TXT/${domain.name}`;
                }
                return domain

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
            menuItemSelected(index) {
                this.domain_record_tutorials_model.forEach(menu => {
                    menu.selected = false
                });

                this.domain_record_tutorials_model[index].selected = true;
                this.menu_item = this.domain_record_tutorials_model[index];
            },
            checkDomainCNAMERecord() {
                window.open(this.cname_record, '_blank')
            },
            checkDomainTXTRecord() {
                window.open(this.txt_record, '_blank')
            },
            verifyUserAccess(permitted_roles) {
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

    .lang-detail-media-container
        width 100%
        padding 24px 16px
        border-radius: 5px;
        box-shadow: 0 0 44px 0 rgba(0, 0, 0, 0.51);
        background-color: #080295;
        display flex

        div.lang-menu-container
            width 100%;
            display flex
            height available
            flex-direction column

            p.menu-title
                font-family: iran-yekan;
                font-size: 1.4em
                font-weight: bold;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.71;
                width 100%
                letter-spacing: normal;
                text-align: center;
                color: #fafafa;
                margin-bottom 32px

            button.menu-button
                border-radius: 5px;
                background-color: #0045ff;
                margin-left 16px
                margin-right 16px
                height 40px
                font-family: iran-yekan;
                font-size: 1.2em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 40px
                letter-spacing: normal;
                text-align: center;
                color: #fafafa;
                margin-bottom 16px
                outline none

    .lang-menu-item
        display flex
        width 100%
        height max-content
        flex-direction row
        cursor pointer
        margin-left 16px

        p.menu-item-number
            font-family iran-sans
            font-size: 1.1em;
            width 40px
            height 40px
            border: solid 2px #8c8c8c;
            border-radius 100%
            text-align center
            line-height 40px
            color #8c8c8c
            transition all .2s ease-in-out
            @media only screen and (max-width 992px)
                width 30px
                height 30px
                line-height 30px

        p.menu-item-title
            padding-left 16px
            height available
            padding-right 16px
            font-family: iran-yekan;
            font-size: 1.1em;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height 40px
            letter-spacing: normal;
            text-align: right;
            color: #8c8c8c;
            transition all .2s ease-in-out


        &.selected
            p.menu-item-number
                width 40px
                height 40px
                font-family iran-sans
                font-size: 1.1em;
                background #fafafa
                border-radius 100%
                color #080295
                border none
                text-align center
                line-height 40px
                font-weight bold
                transition all .2s ease-in-out
                @media only screen and (max-width 992px)
                    width 30px
                    height 30px
                    line-height 30px

            p.menu-item-title
                padding-left 16px
                height available
                padding-right 16px
                font-family: iran-yekan;
                font-size: 1.1em;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height 40px
                letter-spacing: normal;
                text-align: right;
                color: #fafafa;
                transition all .2s ease-in-out


</style>

<style lang="stylus">

    .tut_player
        .plyr
            border-radius 0 0 5px 5px !important
            width 100% !important
            @media only screen and (max-width: 992px) {
                border-radius 0 !important
            }


    .plyr--video .plyr__control.plyr__tab-focus, .plyr--video .plyr__control:hover, .plyr--video .plyr__control[aria-expanded=true] {
        background: transparent !important;
        color: #fff;
        outline none !important
    }

    .plyr--full-ui input[type=range] {
        border-radius: 25px !important;
        color: rgba(255, 255, 255, 0.99) !important;
        @media only screen and (max-width: 992px) {
            border-radius 0 !important
        }

    }

    .plyr--video .plyr__controls {
        background: rgba(0, 69, 255, 0.7) !important;
        bottom: 0;
        color: #fff;
        left: 0;
        padding: 5px !important;
        position: absolute;
        margin 12px !important
        border-radius 25px !important
        right: 0;
        outline none !important
        transition: opacity .4s ease-in-out, -webkit-transform .4s ease-in-out;
        transition: opacity .4s ease-in-out, transform .4s ease-in-out;
        transition: opacity .4s ease-in-out, transform .4s ease-in-out, -webkit-transform .4s ease-in-out;
        z-index: 3;
    }

    .plyr__controls > .plyr__control:first-child, .plyr__controls > .plyr__control:first-child + [data-plyr=pause] {
        margin-left: 0;
        margin-right: 0 !important;
    }

    .plyr__progress__container
        width available !important
        flex 1 !important


    .plyr--full-ui.plyr--video .plyr__control--overlaid
        display: block;
        background: rgba(0, 69, 255, 0.7) !important;
        border-radius: 5px !important;
        padding 24px !important

</style>
