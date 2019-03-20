<template>
    <div>
        <div>
            <line-chart :chart-data="cpuDatacollection" :options="cpuUsageOptions" :height="80"></line-chart>
        </div>
        <div>
            <line-chart :chart-data="memoryDatacollection" :options="memoryUsageOptions" :height="80"></line-chart>
        </div>
        <div>
            <line-chart :chart-data="networkInDatacollection" :options="cpuUsageOptions" :height="80"></line-chart>
        </div>
        <div>
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
                                        return `${(value / 1024 / 1024).toFixed(2)}MiB`;
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
                await this.$store.dispatch("getMetric", "cpu_usage");
                await this.$store.dispatch("getMetric", "memory_usage");
                await this.$store.dispatch("getMetric", "network_in_usage");
                await this.$store.dispatch("getMetric", "network_out_usage");
                this.$store.commit("SET_DATA", {data: false, id: "loading"});
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
