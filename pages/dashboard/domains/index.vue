<template>
    <div class="wrapper-image" v-if="!loading">
        <f-loading :isFull="true" v-if="isLoading"/>
        <f-empty v-if="!domains || !domains.length" title="هنوز دامنه‌ای اضافه نشده !">
            <f-button styles="red" @onClick="$router.push('/dashboard/domains/create')">افزودن دامنه</f-button>
        </f-empty>
        <div class="images" v-else>
            <div style="overflow: hidden; margin-bottom: 32px">
                <div class="right" style="float: right;"><p class="title"> لیست دامنه‌ها</p></div>
                <div class="left" style="float: left; cursor: pointer; margin-top: 8px"
                     @click="$router.push('/dashboard/domains/create')">
                    <svg width="180px" height="55px" viewBox="0 0 208 63" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <path d="M31.5,2 L176.5,2 C191.687831,2 204,14.3121694 204,29.5 C204,44.6878306 191.687831,57 176.5,57 L31.5,57 C16.3121694,57 4,44.6878306 4,29.5 C4,14.3121694 16.3121694,2 31.5,2 Z M176.5,53 C189.478692,53 200,42.4786916 200,29.5 C200,16.5213084 189.478692,6 176.5,6 C163.521308,6 153,16.5213084 153,29.5 C153,42.4786916 163.521308,53 176.5,53 Z M176.86016,24.01244 C180.459313,24.01654 183.37598,26.9332073 183.38008,30.53236 C183.38008,34.1332124 180.461012,37.05228 176.86016,37.05228 C173.259308,37.05228 170.34024,34.1332124 170.34024,30.53236 C170.34024,26.9315076 173.259308,24.01244 176.86016,24.01244 Z M180.73144,29.30476 C181.103745,28.9094749 181.094473,28.2898617 180.710506,27.9058945 C180.326538,27.5219273 179.706925,27.5126545 179.31164,27.88496 L175.34984,31.84552 L174.27476,30.77044 C173.880981,30.3783731 173.243927,30.379761 172.85186,30.77354 C172.459793,31.167319 172.461181,31.8043731 172.85496,32.19644 L174.64056,33.97584 C174.828734,34.164311 175.084131,34.270218 175.35046,34.270218 C175.616789,34.270218 175.872186,34.164311 176.06036,33.97584 L180.73144,29.30476 Z M191.39668,22.70672 C191.47232,26.72556 191.5678,31.72896 189.8876,36.27604 C189.008926,38.705239 187.596139,40.9062031 185.75344,42.7166 C183.442748,44.884869 180.684082,46.5192421 177.67236,47.50424 C177.563796,47.5420064 177.45276,47.5722513 177.34004,47.59476 C177.022449,47.6583925 176.695391,47.6583925 176.3778,47.59476 C176.265497,47.5722037 176.154877,47.5419592 176.04672,47.50424 C173.031944,46.5215291 170.270142,44.8879007 167.95696,42.71908 C166.114564,40.9089148 164.702545,38.7078263 163.82528,36.27852 C162.155,31.74632 162.24924,26.75408 162.32612,22.74144 L162.32612,22.67944 C162.341,22.34836 162.35712,22.00116 162.35712,21.61676 C162.392765,19.7223577 163.880563,18.1745939 165.77208,18.06416 C169.363023,17.9892713 172.789488,16.5444246 175.34984,14.02548 L175.37216,14.0044 C176.211769,13.2267847 177.508551,13.2267847 178.34816,14.0044 L178.37048,14.02548 C180.931504,16.5447658 184.359033,17.9892431 187.95072,18.06292 C189.842237,18.1733539 191.330035,19.7211177 191.36568,21.61552 C191.37082,21.9702923 191.381154,22.3249703 191.39668,22.67944 L191.39668,22.70672 Z M176.86016,39.06108 C181.567491,39.0556135 185.382174,35.240931 185.38764,30.5336 C185.388142,27.0838291 183.310369,23.9734894 180.123293,22.6530875 C176.936216,21.3326857 173.267561,22.0622879 170.828204,24.5016443 C168.388848,26.9410007 167.659246,30.6096559 168.979648,33.7967327 C170.300049,36.9838094 173.410389,39.0615815 176.86016,39.06108 Z" id="path-1"></path>
                            <filter x="-3.5%" y="-9.1%" width="107.0%" height="125.5%" filterUnits="objectBoundingBox" id="filter-2">
                                <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                                <feColorMatrix values="0 0 0 0 0.141176471   0 0 0 0 0.835294118   0 0 0 0 0.847058824  0 0 0 0.3 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                            </filter>
                        </defs>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Combined-Shape">
                                <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
                                <use fill="#24D5D8" fill-rule="evenodd" xlink:href="#path-1"></use>
                            </g>
                        </g>
                        <text x="140"
                              y="29"
                              fill="#FFFFFF"
                              style="font-family: iran-sans; font-size: 1em"
                              text-anchor="start"
                              alignment-baseline="middle">
                            ساخت دامنه جدید
                        </text>
                    </svg>
                </div>
            </div>

            <box-table :titles="titleRow" :items="domains" :func="details" :menu="menuList"></box-table>

        </div>
    </div>
</template>

<script>

    import FButton from "~/components/elements/button";
    import FDate from "~/utils/date";
    import FFromDate from "~/utils/fromDate";
    import {getData} from "~/utils/getData";
    import Alert from "~/components/Dashboard/alert";
    import ActionButton from "~/components/Dashboard/table/action-button";
    import FEmpty from "~/components/Dashboard/empty";
    import ErrorReporter from "~/utils/ErrorReporter";
    import FLoading from "~/components/Loading";
    import BoxTable from "../../../components/Dashboard/table/box-table";
    import Moment from 'moment-jalaali'

    export default {
        layout: "dashboard",
        components: {
            FButton,
            ActionButton,
            FEmpty,
            FLoading,
            BoxTable,
            Moment
        },
        data() {
            return {
                isLoading: false,
                sslError: require('../../../assets/svg/ssl-error.svg'),
                sslSuccess: require('../../../assets/svg/ssl-success.svg'),
                titleRow: [
                    {title: 'نام دامنه', width: '29%', name: 'name'},
                    {title: 'تاریخ ساخت', width: '20%', name: 'date'},
                    {title: 'متصل به', width: '18%', name: 'service'},
                    {title: 'وضعیت', width: '18%', name: 'status'},
                    {title: 'وضعیت ssl', width: '12%', name: 'certificate'},
                ],
                menuList: [
                    {method: this.details, icon: 'ic-logs.svg', title: 'جزئیات دامنه', style: {}},
                    {method: this.remove, icon: 'ic_delete.svg', title: 'حذف دامنه', style: {color: '#fd3259'}},
                ]
            };
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
            },
            state: function (verified) {
                return verified ? "تایید شده" : "تایید نشده";
            }
        },
        computed: {
            loading() {
                return this.$store.state.loading;
            },
            domains() {
                let domains = this.$store.state.domains;
                if (domains) {
                    return domains.map(({certificate, created_at, name, service, verified}) => {
                        return {
                            name,
                            date: Moment(created_at).format('jYYYY/jMM/jDD'),
                            service: service ? service : 'آزاد',
                            certificate: this.getStatus(certificate),
                            status: `<div style="display: flex;">` +
                                `<canvas class="status ${this.getClass(verified)}"></canvas>${this.getDomainStatus(verified)}</div>`
                        };
                    });
                }
            }
        },
        destroyed() {
            this.$store.commit("SET_DATA", {data: null, id: "domains"});
        },
        created() {
            this.getData();
        },

        methods: {
            async getData() {
                try {
                    await this.$store.dispatch("getDomains");
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }
            },
            getDate(date) {
                return FDate({date: date})
            },
            FFromDate(value) {
                return FFromDate(value);
            },
            FDate(value) {
                return FDate({date: value});
            },
            getDomainStatus(verified) {
                return verified ? "تایید شده" : "تایید نشده";
            },
            getStatus(certificate) {
                if (!certificate) return `<div style="display: flex"><img style="margin-left: auto; margin-right: auto;" src=${this.sslError} class="ssl"  alt="ssl-status"></div>`;
                if (!certificate.details) return `<div style="display: flex"><img style="margin-left: auto; margin-right: auto;" class="ssl" src=${this.sslError} alt="ssl-status"></div>`;
                const {status} = certificate.details;
                if (!status) return "";
                let value = status.toLowerCase();
                if (value === "ready") {
                    return `<div style="display: flex"><img style="margin-left: auto; margin-right: auto;" class="ssl" src=${this.sslSuccess} alt="ssl-success"></div>`;
                }
                if (value === "error") {
                    return `<div style="display: flex"><img style="margin-left: auto; margin-right: auto;" class="ssl" src=${this.sslError} alt="ssl-status"></div>`;
                }
                if (value === "unknown") {
                    return `<div style="display: flex"><img style="margin-left: auto; margin-right: auto;" class="ssl" src=${this.sslError} alt="ssl-status"></div>`;
                }
            },
            verify(index) {
                this.$ga.event({
                    eventCategory: "domain",
                    eventAction: "click btn verify domain",
                    eventLabel: "domain name",
                    eventValue: this.domains[index].name
                });
                this.$router.push(`/dashboard/domains/verification/${this.domains[index].name}`);
            },
            details(index) {
                this.$router.push(`/dashboard/domains/${this.domains[index].name}`);
            },
            getClass(verified) {
                return verified ? "success-circle" : "error-circle";
            },
            removeCertificateDomain(index) {
                this.$ga.event({
                    eventCategory: "domain",
                    eventAction: "click btn remove certificate domain",
                    eventLabel: "domain name",
                    eventValue: this.domains[index].name
                });
                this.$alertify(
                    {
                        title: `حذف گواهی SLL`,
                        description: `آیا از حذف SSL دامنه ${this.domains[index].name} مطمئن هستید؟`
                    },
                    status => {
                        if (status) {
                            this.isLoading = true;
                            this.$store
                                .dispatch("removeCertificateDomain", this.domains[index].name)
                                .then(res => {
                                    this.$store.dispatch("getDomains");
                                    this.isLoading = false;
                                    this.$ga.event({
                                        eventCategory: "domain",
                                        eventAction: "remove ssl domain",
                                        eventLabel: "domain name",
                                        eventValue: this.domains[index].name
                                    });
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                })
                                .catch(e => {
                                    this.isLoading = false;
                                    this.$ga.event({
                                        eventCategory: "domain",
                                        eventAction: "fail remove ssl domain",
                                        eventLabel: "domain name",
                                        eventValue: this.domains[index].name
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
            remove(index) {
                this.$ga.event({
                    eventCategory: "domain",
                    eventAction: "click btn remove domain",
                    eventLabel: "domain name",
                    eventValue: this.domains[index].name
                });
                this.$alertify(
                    {
                        title: `حذف دامنه`,
                        description: ` آیا از حذف دامنه ${this.domains[index].name} مطمئن هستید؟`
                    },
                    status => {
                        if (status) {
                            this.$store
                                .dispatch("removeDomain", this.domains[index].name)
                                .then(res => {
                                    this.$store.dispatch("getDomains");
                                    this.$ga.event({
                                        eventCategory: "domain",
                                        eventAction: "remove domain",
                                        eventLabel: "domain name",
                                        eventValue: this.domains[index].name
                                    });
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                })
                                .catch(e => {
                                    this.$ga.event({
                                        eventCategory: "domain",
                                        eventAction: "fail remove domain",
                                        eventLabel: "domain name",
                                        eventValue: this.domains[index].name
                                    });
                                    this.$notify({
                                        title: e.data.message,
                                        type: "error"
                                    });
                                });
                        }
                    }
                );
            }
        }
    };
</script>
<style lang="stylus" scoped>
    .title
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal

    .scroll
        overflow-x auto
</style>

<style lang="stylus">
    .ssl
        width 36px !important
        height 36px !important

    .status
        width 7px !important
        height 7px !important
        border-radius 100% !important
        margin auto 0 auto 12px !important
        @media only screen and (max-width: 766px)
            margin auto 0 auto 5px !important

        &.success-circle
            background-color #3ccc38 !important

        &.pending-circle
            background-color #24d5d8 !important

        &.error-circle
            background-color #fd3259 !important
</style>
