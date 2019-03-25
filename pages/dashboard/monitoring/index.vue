<template>
    <div>
        <div class="metrics-widget">
            <div class="title font-roboto">
                میزان مصرف CPU سرویس‌ها
            </div>
            <metrics-chart metric-name="cpu_usage" :options="defaultOptions"></metrics-chart>
        </div>
        <div class="metrics-widget">
            <div class="title font-roboto">
                میزان مصرف حافظه سرویس‌ها
            </div>
            <metrics-chart metric-name="memory_usage" :options="memoryUsageOptions"></metrics-chart>
        </div>
        <div class="metrics-widget">
            <div class="title font-roboto">
                میزان ترافیک دریافتی سرویس‌ها
            </div>
            <metrics-chart metric-name="network_in_usage" :options="defaultOptions"></metrics-chart>
        </div>
        <div class="metrics-widget">
            <div class="title font-roboto">
                میزان ترافیک خروجی سرویس‌ها
            </div>
            <metrics-chart metric-name="network_out_usage" :options="defaultOptions"></metrics-chart>
        </div>
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

<style lang="stylus" scoped>

    @font-face
        font-style normal
        font-family roboto
        src url('~/assets/fonts/Roboto-Regular.ttf')
    .metrics-widget .title
        text-align center
        background-color rgba(217, 217, 217, 0.2)
        padding 5px 0
        margin-bottom 10px
        /*border-bottom 1pt solid black*/
        color #4f4f4f
        font-size 16px

</style>
