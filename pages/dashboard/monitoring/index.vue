<template>
    <div>
        <div>
            <p style="color: #7c7c7c; line-height: 1.75; font-family: iran-yekan; font-size: 1.2em;">
                مانیتورینگ
            </p>
        </div>

        <div style="margin-bottom: 16px">
            <div class="row"
                 style="margin: 0; padding: 16px; background-color: #2979ff; box-shadow: 0 3px 6px 0 rgba(41, 121, 255, 0.42); border-radius: 3px;">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <p class="profile-entity-title">انتخاب سرویس:</p>
                    <v-select
                            dir="rtl"
                            :clearable="false"
                            :searchable="false"
                            label="title"
                            v-model="selectedService"
                            :options="services"
                            @input="serviceChanged"
                            placeholder="انتخاب سرویس"
                    ></v-select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <p class="profile-entity-title">انتخاب بازه زمانی:</p>
                    <v-select
                            dir="rtl"
                            :clearable="false"
                            v-model="selectedTimeFilter"
                            :searchable="false"
                            :options="timeFilter"
                            @input="dateChanged"
                            label="title"
                            placeholder="انتخاب بازه زمانی"
                    ></v-select>
                </div>

            </div>

        </div>
        <metrics-chart metric-name="cpu_usage" :options="cpuOptions"
                       title="میزان مصرف CPU سرویس‌ها"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="selectedService">

        </metrics-chart>

        <metrics-chart metric-name="memory_usage" :options="memoryUsageOptions"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="selectedService"
                       title="میزان مصرف حافظه سرویس‌ها"></metrics-chart>

        <metrics-chart metric-name="network_in_usage" :options="networkOptions"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="selectedService"
                       title="میزان ترافیک دریافتی سرویس‌ها"></metrics-chart>

        <metrics-chart metric-name="network_out_usage" :options="networkOptions"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="selectedService"
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
                selectedService: {
                    title: 'همه سرویس‌ها',
                    value: null
                },
                selectedTimeFilter: {
                    title: '۶ ساعت پیش',
                    value: 6
                },
                timeFilter: [
                    {
                        title: '۶ ساعت پیش',
                        value: 6

                    },
                    {
                        title: '۱۲ ساعت پیش',
                        value: 12

                    },
                    {
                        title: '۱ روز پیش',
                        value: 24

                    },
                    {
                        title: '۲ روز پیش',
                        value: 48

                    },
                    {
                        title: '۷ روز پیش',
                        value: 168

                    }
                ],
                cpuOptions: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        fullWidth: true,
                        labels: {
                            boxWidth: 15
                        }
                    },
                    tooltips:{
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                                if (label) {
                                    label += ' -> ';
                                }
                                if(tooltipItem.yLabel === 0){
                                    label += 0;
                                } else if(Math.round(tooltipItem.yLabel * 100) === 0){
                                    label += (tooltipItem.yLabel * 100).toFixed(4) + '%';
                                }else {
                                    label += (tooltipItem.yLabel * 100).toFixed(0) + '%';
                                }
                                return label;
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            gridLines: {
                                display: false,
                            },
                            time: {
                                unit: 'minute',
                                displayFormats: {
                                    minute: 'HH:mm'
                                }
                                // tooltipFormat: 'mm'
                            }, ticks: {
                                fontFamily: 'iran-sans',
                                source: 'data',
                                autoSkip: true,
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    if(value === 0){
                                        return value
                                    } else if(Math.round(value * 100) === 0){
                                        return `${(value * 100).toFixed(4)}%`;
                                    }else {
                                        return `${(value * 100).toFixed(0)}%`;
                                    }

                                },
                                min: 0,
                                fontFamily: 'iran-sans',
                            },
                            gridLines: {
                                display: false,
                            }
                        }]
                    }
                },
                networkOptions: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        fullWidth: true,
                        labels: {
                            boxWidth: 15
                        }
                    },
                    tooltips:{
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                                if (label) {
                                    label += ' -> ';
                                }

                                if(tooltipItem.yLabel > 1000 && tooltipItem.yLabel < 1000000){
                                    label += (tooltipItem.yLabel / 1000).toFixed(0) + 'KBps';
                                } else if(tooltipItem.yLabel >= 1000000){
                                    label += (tooltipItem.yLabel / 1000000).toFixed(0) + 'MBps';
                                }else {
                                    label += (tooltipItem.yLabel).toFixed(0) + 'Bps';
                                }
                                return label;
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            gridLines: {
                                display: false,
                            },
                            time: {
                                unit: 'minute',
                                displayFormats: {
                                    minute: 'HH:mm'
                                }
                                // tooltipFormat: 'mm'
                            }, ticks: {
                                fontFamily: 'iran-sans',
                                source: 'data',
                                autoSkip: true,
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    if(value > 1000 && value < 1000000){
                                        return `${(value / 1000).toFixed(0)}KBps`
                                    }else if(value >= 1000000){
                                        return `${(value / 1000000).toFixed(0)}MBps`
                                    }else {
                                        return `${value.toFixed(0)}Bps`;
                                    }
                                },
                                min: 0,
                                fontFamily: 'iran-sans',
                            },
                            gridLines: {
                                display: false,
                            }
                        }]
                    }
                },
                memoryUsageOptions: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        fullWidth: true,
                        labels: {
                            boxWidth: 15,
                        }
                    },
                    tooltips:{
                        callbacks:{
                            label: function (tooltipItem, data) {

                                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                                if (label) {
                                    label += ' -> ';
                                }

                                if(tooltipItem.yLabel > 1024 * 1024 * 1024 ){
                                    label += (tooltipItem.yLabel / 1024 / 1024 / 1024).toFixed(2) + 'GB';
                                }else {
                                    label += (tooltipItem.yLabel / 1024 / 1024).toFixed(2) + 'MB';
                                }
                                return label;
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            gridLines: {
                                display: false,
                            },
                            time: {
                                unit: 'minute',
                                displayFormats: {
                                    minute: 'HH:mm'
                                }
                                // tooltipFormat: 'mm'
                            }, ticks: {
                                fontFamily: 'iran-sans',
                                source: 'data',
                                autoSkip: true,
                            }, labels: {
                                fontFamily: 'iran-sans'
                            }
                        }],
                        yAxes: [
                            {
                                ticks: {
                                    callback: function (value, index, values) {
                                        if(value > 1024 * 1024 * 1024 ){
                                            return `${(value / 1024 / 1024 / 1024).toFixed(2)}GB`;
                                        }else {
                                            return `${(value / 1024 / 1024).toFixed(2)}MB`;
                                        }
                                    },
                                    min: 0,
                                    fontFamily: 'iran-sans',
                                },
                                gridLines: {
                                    display: false,
                                },
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
            this.getData();
        },
        methods: {
            async getData() {
                this.getServiceList()
            },
            async getServiceList() {
                try {
                    await this.$store.dispatch("getServices");
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }
            },
            dateChanged(date) {
                this.selectedTimeFilter = date
            },
            serviceChanged(service) {
                this.selectedService = service
            }
        },
        computed: {
            services() {
                let services = this.$store.state.services;
                let finalServices = [];
                if (services) {
                    finalServices.push({
                        title: 'همه سرویس‌ها',
                        value: null
                    });
                    services.forEach(service => {
                        finalServices.push({
                            title: service['name'],
                            value: service['name']
                        })
                    });
                    return finalServices;
                }
            }
        }
    }
</script>

<style scoped lang="stylus">

    .profile-entity-title
        font-family yekan-bold
        font-size 1em
        min-width 120px
        font-style normal
        display inline-block
        font-stretch normal
        margin auto
        line-height 1.75
        letter-spacing normal
        color #fefefe


</style>
