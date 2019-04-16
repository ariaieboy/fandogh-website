<template>

    <div style="padding-bottom: 32px">

        <table-title :title="sectionTitle.title" :icon="sectionTitle.icon"></table-title>

        <div style="border-radius: 3px; width: 100%; background-color: #fefefe; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); box-sizing: content-box">

            <table-header :headers="headers"></table-header>

            <div style="margin-left: 12px; margin-right: 12px; margin-top: 12px">
                <table style="width: 100%; border: none; border-collapse: collapse;">
                    <tr v-for="(service, index) in services" v-if="index < 5" style="height: 40px; border-collapse: collapse; font-family: iran-yekan;font-size: 0.8em; color: #333333;
                            border-bottom: solid 1px rgba(0, 0, 0, 0.25); left: 12px">
                        <td :width="headers[0].width" style="text-align: center; text-overflow: ellipsis">
                            {{service.name}}
                        </td>
                        <td :width="headers[1].width" style="text-align: center">{{service.start_date}}</td>
                        <td :width="headers[2].width" style="text-align: center; padding-left: 6px; padding-right: 6px">
                            <status-container
                                    :icon="stateIcons[service.state.toLowerCase()]"
                                    :status="service.state | state">
                            </status-container>
                        </td>
                    </tr>
                </table>
            </div>

            <table-navigation :title="navigation.title" :count="(services ? services.length : 0)"
                              :button="navigation.button"
                              :link="goToServices"></table-navigation>
        </div>
    </div>

</template>

<script>
    import FButton from "~/components/elements/button";
    import FDate from "~/utils/date";
    import ActionButton from "~/components/Dashboard/table/action-button";
    import FEmpty from "~/components/Dashboard/empty";
    import FLoading from "~/components/Loading";
    import FFromDate from "~/utils/fromDate";
    import TableHeader from "./children/table-header";
    import TableTitle from "./children/table-title";
    import TableNavigation from "./children/table-navigation";
    import Moment from 'moment-jalaali'
    import StatusContainer from "./children/status-container";

    export default {
        layout: "dashboard",
        components: {
            StatusContainer,
            TableNavigation,
            TableTitle,
            TableHeader,
            FLoading,
            FButton,
            ActionButton,
            FEmpty,
            Moment
        },
        data() {
            return {
                sectionTitle: {
                    title: 'سرویس‌ها',
                    icon: 'ic-service'
                },
                headers: [
                    {title: 'نام سرویس', width: '33%'},
                    {title: 'تاریخ ساخت', width: '33%'},
                    {title: 'وضعیت سرویس', width: '33%'}
                ],
                navigation: {
                    title: 'تعداد سرویس‌ها',
                    button: 'لیست سرویس‌ها'
                },
                stateIcons: {
                    'running': 'ic-service-successfull',
                    'pending': 'ic-service-pending',
                    'unstable': 'ic-service-failed'
                },
            };
        },
        filters: {
            state(value) {
                if (!value) return "";
                let val = value.toLowerCase();
                return val === "running"
                    ? "در حال اجرا"
                    : val === "pending"
                        ? "درحال ساخت"
                        : "مشکل در اجرا";
            }
        },
        computed: {
            services() {
                let services = this.$store.state.services;
                if (services) {
                    return services.map(
                        ({memory, start_date, name, service_type, state, url, service_restarts}) => {
                            return {
                                url,
                                name,
                                state,
                                service_restarts: service_restarts,
                                //version: last_version.version,
                                service_type: service_type,
                                // memory: `Mi ${memory}`,
                                start_date: Moment(start_date).format('jYYYY/jMM/jDD')
                            };
                        }
                    );
                }
            }
        },
        methods: {
            stateColor(state) {
                if (!state) return "";
                let val = state.toLowerCase();
                return val === "running"
                    ? "success-circle"
                    : val === "pending"
                        ? "pending-circle"
                        : "error-circle";
            },
            goToServices() {
                this.$router.push('/dashboard/services/')
            }
        }
    };
</script>

