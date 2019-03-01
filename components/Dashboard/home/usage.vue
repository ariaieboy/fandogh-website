<template>
    <div class="usage">
        <div class="dashboard-home-wrapper">
            <div class="row">
                <div class="dashboard-home-title col-xs-4">
                    <img src="~assets/img/icons/ic_services.svg" alt="services">
                    <span>آمار سرویس‌ها</span>
                    <usage-chart :colors="['blue','red']" :data="[20,30]"></usage-chart>
                </div>
                <div class="dashboard-home-title col-xs-4">
                    <!-- TODO: set icon-->
                    <img src="~assets/img/icons/ic_services.svg" alt="volume">
                    <span>Volume</span>
                    <usage-chart :colors="['blue','red']" :data="[20,30]"></usage-chart>
                </div>
                <div class="dashboard-home-title col-xs-4">
                    <!-- TODO: set icon-->
                    <img src="~assets/img/icons/ic_services.svg" alt="memory">
                    <span>رم سرویس‌ها</span>
                    <usage-chart :colors="['blue','red']" :data="[20,30]"></usage-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FButton from "~/components/elements/button";
    import UsageChart from "~/components/Dashboard/chart/UsageChart";
    import ActionButton from "~/components/Dashboard/table/action-button";
    import FEmpty from "~/components/Dashboard/empty";
    import FLoading from "~/components/Loading";

    export default {
        layout: "dashboard",
        components: {
            FLoading,
            FButton,
            ActionButton,
            FEmpty,
            UsageChart,
        }
    };
</script>

