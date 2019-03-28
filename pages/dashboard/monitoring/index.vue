<template>
    <div>
        <metrics-chart metric-name="cpu_usage" :options="defaultOptions"
                       title="میزان مصرف CPU سرویس‌ها"></metrics-chart>

        <metrics-chart metric-name="memory_usage" :options="memoryUsageOptions"
                       title="میزان مصرف حافظه سرویس‌ها"></metrics-chart>

        <metrics-chart metric-name="network_in_usage" :options="defaultOptions"
                       title="میزان ترافیک دریافتی سرویس‌ها"></metrics-chart>

        <metrics-chart metric-name="network_out_usage" :options="defaultOptions"
                       title="میزان ترافیک خروجی سرویس‌ها"></metrics-chart>
    </div>
</template>


<script>
    import MetricsChart from "~/components/Dashboard/chart/MetricsChart";

    export default {
        name: "dashboard-monitoring",
        layout: "dashboard",
        components: {
            MetricsChart
        },
        data() {
            return {
                defaultOptions: {
                    fill: false,
                    legend: {
                        // display: false
                        fullWidth: false,
                        position: 'bottom'
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'minute',
                                displayFormats: {
                                    minute: 'HH:mm'
                                }
                                // tooltipFormat: 'mm'
                            }
                        }]
                    }
                },
                memoryUsageOptions: {
                    fill: false,
                    legend:
                        {
                            // display: false
                            position: 'bottom'
                        }
                    ,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'minute',
                                displayFormats: {
                                    minute: 'HH:mm'
                                }
                                // tooltipFormat: 'mm'
                            }
                        }],
                        yAxes: [
                            {
                                ticks: {
                                    callback: function (value, index, values) {
                                        return `${(value / 1024 / 1024).toFixed(2)}MB`;
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        },
        mounted() {
            // this.fillData()
        },
        destroyed() {
            this.$store.commit("SET_DATA", {data: null, id: "images"});
        },
        created() {
            this.getData()
        },
        methods: {
            async getData() {
                this.$store.commit("SET_DATA", {data: false, id: "loading"});
            }
        }
    }
</script>