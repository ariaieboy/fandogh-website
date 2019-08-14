<template>

    <div style="padding-bottom: 32px">

        <table-title :title="sectionTitle.title" :icon="sectionTitle.icon"></table-title>

        <empty-feature v-if="domains.length === 0" :title="emptySection.title" :icon="emptySection.icon" :url="createDomain">
        </empty-feature>

        <div v-else style="border-radius: 3px; width: 100%; background-color: #fefefe; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); box-sizing: content-box">

            <table-header :headers="headers"></table-header>

            <div style="margin-left: 12px; margin-right: 12px; margin-top: 12px">
                <table style="width: 100%; border: none; border-collapse: collapse; table-layout: fixed">
                    <tr v-for="(domain, index) in domains" v-if="index < 5" style="height: 40px; border-collapse: collapse; font-family: iran-yekan;font-size: 0.8em; color: #333333;
                            border-bottom: solid 1px rgba(0, 0, 0, 0.25); left: 12px">
                        <td :width="headers[0].width" style="text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
                            {{domain.name}}
                        </td>
                        <td :width="headers[1].width" style="text-align: center; font-family: iran-sans;text-overflow: ellipsis; overflow: hidden; white-space: nowrap">{{FFromDate(domain.created_at)}}</td>
                        <td :width="headers[2].width" style="text-align: center; padding-left: 6px; padding-right: 6px">

                            <div style="width: 100%; display: flex; background-color: #f0f0f0; border-radius: 25px;padding-bottom: 3px; padding-top: 3px; justify-content: end">
                                <i class="status" :class="getClass(domain.verified)">
                                </i>

                                <p style="font-family: iran-yekan; font-size: 0.9em; margin: 0; display: inline-block">
                                    {{domain.verified | state}}
                                </p>
                            </div>
                        </td>
                        <td :width="headers[3].width" style="text-align: center">
                            <img
                                    :src="require('./icons/' + getStatus(domain.certificate) + '.svg')"
                                    :alt="ssl-status"/>
                        </td>
                    </tr>
                </table>
            </div>

            <table-navigation :title="navigation.title" :count="(domains ? domains.length : 0)"
                              :button="navigation.button"
                              :link="goToDomains">

            </table-navigation>

        </div>
    </div>
</template>

<script>
    import FDate from "~/utils/date";
    import FFromDate from "~/utils/fromDate";
    import {getData} from "~/utils/getData";
    import TableTitle from "./children/table-title";
    import TableHeader from "./children/table-header";
    import TableNavigation from "./children/table-navigation";
    import StatusContainer from "./children/status-container";
    import Moment from 'moment-jalaali';
    import EmptyFeature from "./children/empty-feature";

    export default {
        layout: "dashboard",
        components: {EmptyFeature, StatusContainer, TableNavigation, TableHeader, TableTitle},
        data() {
            return {
                emptySection:{
                    title:'دامنه',
                    icon: 'ic-domain',
                },
                sectionTitle: {
                    title: 'دامنه‌ها',
                    icon: 'ic-domain'
                },
                headers: [
                    {title: 'نام دامنه', width: '30%'},
                    {title: 'تاریخ ساخت', width: '25%'},
                    {title: 'وضعیت دامنه', width: '25%'},
                    {title: 'وضعیت SSL', width: '20%'},
                ],
                navigation: {
                    title: 'تعداد دامنه‌ها',
                    button: 'لیست دامنه‌ها'
                }
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
                if(domains){
                    return domains
                }else {
                    return []
                }

            }
        },
        methods: {
            getDate(date) {
                return FFromDate(date);
            },
            goToDomains() {
                this.$router.push('/dashboard/domains/')
            },
            createDomain() {
                this.$router.push('/dashboard/domains/create')
            },
            FFromDate(value) {
                return Moment(value).format('jYYYY/jMM/jDD');
            },
            FDate(value) {
                return FDate({date: value});
            },
            getDomainStatus(verified) {
                return verified ? "تایید شده" : "تایید نشده";
            },
            getStatus(certificate) {
                if (!certificate) return "ssl-error";
                if (!certificate.details) return "ssl-error";
                const {status} = certificate.details;
                if (!status) return "";
                let value = status.toLowerCase();
                if (value === "ready") {
                    return "ssl-success";
                }
                if (value === "error") {
                    return "ssl-error";
                }
                if (value === "unknown") {
                    return "ssl-pending";
                }
            },
            getClass(verified) {
                return verified ? "success-circle" : "error-circle";
            }
        }
    };
</script>
<style lang="stylus" scoped>
    .scroll
        overflow-x auto


    .status
        width 7px
        height 7px
        border-radius 100%
        margin auto 12px auto 12px
        display inline-flex

        &.success-circle
            background-color #3ccc38

        &.pending-circle
            background-color #24d5d8

        &.error-circle
            background-color #fd3259
</style>
