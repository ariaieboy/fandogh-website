<template>
    <div>
        <metrics-chart metric-name="cpu_usage" :options="cpuOptions"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="{title: service.name, value: service.name}"
                       :title="'میزان مصرف CPU سرویس ' + serviceName ">
        </metrics-chart>

        <metrics-chart metric-name="memory_usage" :options="memoryUsageOptions"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="{title: service.name, value: service.name}"
                       :title="'میزان مصرف حافظه سرویس ' + serviceName ">
        </metrics-chart>

        <metrics-chart metric-name="network_in_usage" :options="networkOptions"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="{title: service.name, value: service.name}"
                       :title="'میزان ترافیک دریافتی سرویس‌ ' + serviceName ">
        </metrics-chart>

        <metrics-chart metric-name="network_out_usage" :options="networkOptions"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="{title: service.name, value: service.name}"
                       :title="'میزان ترافیک خروجی سرویس ' + serviceName ">
        </metrics-chart>
    </div>

</template>

<script>
    import MetricsChart from "~/components/Dashboard/chart/MetricsChart";

    export default {
        name: "monitor",
        props: {
            service: {
                type: Object,
                default: null
            }
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
                cpuOptions: {
                    legend: {
                        display: false,
                        position: 'bottom',
                        fullWidth: true,
                        labels: {
                            boxWidth: 15
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
                                source: 'data'
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    return `${value}%`;
                                },
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
                        display: false,
                        position: 'bottom',
                        fullWidth: true,
                        labels: {
                            boxWidth: 15
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
                                source: 'data'
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    return `${value}MBps`;
                                },
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
                        display: false,
                        position: 'bottom',
                        fullWidth: true,
                        labels: {
                            boxWidth: 15,
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
                                source: 'data'
                            }, labels: {
                                fontFamily: 'iran-sans'
                            }
                        }],
                        yAxes: [
                            {
                                ticks: {
                                    callback: function (value, index, values) {
                                        return `${value} MB`;
                                    },
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
        components: {
            MetricsChart,

        }, computed: {
            serviceName() {
                return this.service === null ? '' : this.service.name
            }
        }, methods: {}
    }
</script>

<style scoped lang="stylus">

</style>