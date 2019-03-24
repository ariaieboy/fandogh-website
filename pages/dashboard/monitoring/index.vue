<template>
    <div>
        <div class="metrics-widget">
            <div class="title font-roboto">
                میزان مصرف CPU سرویس‌ها
            </div>
            <line-chart :chart-data="cpuDatacollection" :options="cpuUsageOptions" :height="80"></line-chart>
        </div>
        <div class="metrics-widget">
            <div class="title font-roboto">
                میزان مصرف حافظه سرویس‌ها
            </div>

            <line-chart :chart-data="memoryDatacollection" :options="memoryUsageOptions" :height="80"></line-chart>
        </div>
        <div class="metrics-widget">
            <div class="title font-roboto">

                میزان ترافیک دریافتی سرویس‌ها
            </div>
            <line-chart :chart-data="networkInDatacollection" :options="cpuUsageOptions" :height="80"></line-chart>
        </div>
        <div class="metrics-widget">
            <div class="title font-roboto">
                میزان ترافیک خروجی سرویس‌ها
            </div>
            <line-chart :chart-data="networkOutDatacollection" :options="cpuUsageOptions" :height="80"></line-chart>
        </div>
    </div>
</template>


<script>
    import LineChart from "~/components/Dashboard/chart/LineChart";

    export default {
        name: "dashboard-monitoring",
        layout: "dashboard",
        components: {
            LineChart
        },
        data() {
            return {
                cpuDatacollection: null,
                memoryDatacollection: null,
                networkInDatacollection: null,
                networkOutDatacollection: null,
                cpuUsageOptions: {
                    fill: false,
                    legend: {
                        // display: false
                        position: 'right'
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
                            position: 'right'
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
            this.fillData()

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
                await this.$store.dispatch("getMetric", "cpu_usage");
                await this.$store.dispatch("getMetric", "memory_usage");
                await this.$store.dispatch("getMetric", "network_in_usage");
                await this.$store.dispatch("getMetric", "network_out_usage");
                this.fillData()
            },
            fillData() {
                this.cpuDatacollection = {
                    datasets: this.$store.state.cpu_usage
                }

                this.memoryDatacollection = {
                    datasets: this.$store.state.memory_usage
                }

                this.networkInDatacollection = {
                    datasets: this.$store.state.network_in_usage
                }
                this.networkOutDatacollection = {
                    datasets: this.$store.state.network_out_usage
                }
            },
            getRandomInt() {
                return Math.floor(Math.random() * (100 - 5 + 1)) + 5
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
