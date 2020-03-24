<template>
    <div style="padding-bottom: 32px">

        <table-title :title="sectionTitle.title" :icon="sectionTitle.icon"></table-title>

        <empty-feature v-if="volumes.length === 0"
                       :privileged="verifyUserAccess({ADMIN:'ADMIN', DEVELOPER: 'DEVELOPER'})"
                       :title="emptySection.title" :icon="emptySection.icon" :url="createVolume">

        </empty-feature>

        <div v-else
             style="border-radius: 3px; width: 100%; background-color: #fefefe; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); box-sizing: content-box">

            <table-header :headers="headers"></table-header>

            <div style="margin-left: 12px; margin-right: 12px; margin-top: 12px">
                <table style="width: 100%; border: none; border-collapse: collapse;">
                    <tr v-for="(volume, index) in volumes" v-if="index < 5" style="height: 40px; border-collapse: collapse; font-family: iran-yekan;font-size: 0.8em; color: #333333;
                            border-bottom: solid 1px rgba(0, 0, 0, 0.25); left: 12px">
                        <td :width="headers[0].width" style="text-align: center; text-overflow: ellipsis">
                            {{volume.name}}
                        </td>
                        <td :width="headers[1].width" style="text-align: center; font-family: iran-sans;">
                            {{volume.created_at}}
                        </td>
                        <td :width="headers[2].width" style="text-align: center;">{{volume.capacity}}</td>
                        <td :width="headers[3].width"
                            style="text-align: center;text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 80px">
                            {{volume.condition}}
                        </td>
                        <td :width="headers[4].width" style="text-align: center">
                            <div style="width: 100%; display: flex; background-color: #f0f0f0; border-radius: 25px;padding-bottom: 3px; padding-top: 3px; justify-content: end;white-space: nowrap">
                                <i class="status" :class="stateIcon(volume.service)"
                                ></i>
                                <p style="font-family: iran-yekan; font-size: 0.9em; margin: 0; display: inline-flex;">
                                    {{volume.service | state}}
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <table-navigation :title="navigation.title" :count="(volumes ? volumes.length : 0)"
                              :button="navigation.button"
                              :link="goToVolumes">

            </table-navigation>
        </div>
    </div>

</template>

<script>
    import TableHeader from "./children/table-header";
    import TableTitle from "./children/table-title";
    import TableNavigation from "./children/table-navigation";
    import Moment from 'moment-jalaali'
    import EmptyFeature from "./children/empty-feature";
    import RoleAccessHandler from "../../../utils/RoleAccessHandler";

    export default {
        name: "volumes",
        components: {
            TableNavigation,
            TableTitle,
            TableHeader,
            Moment,
            EmptyFeature,
            RoleAccessHandler
        },
        data() {
            return {
                emptySection: {
                    title: 'فضای ‌‌ذخیره‌سازی',
                    icon: 'ic-dedicated-volume',
                },
                sectionTitle: {
                    title: 'فضای ذخیره‌سازی',
                    icon: 'ic-dedicated-volume'
                },
                headers: [
                    {title: 'نام فضای ذخیره‌سازی', width: '30%'},
                    {title: 'تاریخ ساخت', width: '15%'},
                    {title: 'حجم', width: '12%'},
                    {title: 'وضعیت', width: '20%'},
                    {title: 'متصل به', width: '23%'},
                ],
                navigation: {
                    title: 'تعداد فضای ذخیره‌سازی',
                    button: 'لیست فضاها'
                },
            }
        }, computed: {
            volumes() {
                let volumes = this.$store.state.volumes === null ? [] : this.$store.state.volumes
                if (volumes) {
                    return volumes.map(
                        ({age, capacity, name, mounted_to, condition}) => {
                            return {
                                created_at: Moment(age).format('jYYYY/jMM/jDD'),
                                capacity: `${capacity.toString().replace('Gi', '')}GB`,
                                name,
                                condition: name === null ? 'در حال ساخت...' : ((condition === 'Resizing' || condition === 'FileSystemResizePending') && !mounted_to) ? 'در انتظار اتصال به سرویس و اتمام افزایش فضا' : (condition === 'Resizing' || condition === 'FileSystemResizePending') ? 'در حال افزایش فضا...' : 'آماده',
                                service: mounted_to
                            };
                        }
                    );
                }
            }
        }, methods: {
            stateColor(state) {
                if (!state) return "";
                let val = state.toLowerCase();
                return val === "running"
                    ? "success-circle"
                    : val === "pending"
                        ? "pending-circle"
                        : "error-circle";
            },
            goToVolumes() {
                this.$router.push('/dashboard/volumes/')
            },
            createVolume() {
                this.$router.push('/dashboard/volumes/create')
            },
            verifyUserAccess(permitted_roles) {
                return RoleAccessHandler(permitted_roles)
            },
            stateIcon: function (service) {
                if (service) {
                    return 'mounted-circle'
                } else {
                    return 'free-circle'
                }
            }
        }, filters: {
            state: function (service) {
                return service === null ? 'آزاد' : service
            }
        }
    }

</script>

<style lang="stylus" scoped>


    .status
        width 7px
        height 7px
        border-radius 100%
        margin auto 12px auto 12px
        display inline-flex

        &.free-circle
            background-color #3ccc38

        &.mounted-circle
            background-color #2979ff

</style>
