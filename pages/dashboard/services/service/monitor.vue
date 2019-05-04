<template>
    <div>
        <metrics-chart metric-name="cpu_usage" :options="cpuOptions"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="{title: service.name, value: service.name}"
                       title="میزان مصرف CPU سرویس">
        </metrics-chart>

        <metrics-chart metric-name="memory_usage" :options="memoryUsageOptions"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="{title: service.name, value: service.name}"
                       title="میزان مصرف حافظه سرویس">
        </metrics-chart>

        <metrics-chart metric-name="network_in_usage" :options="networkOptions"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="{title: service.name, value: service.name}"
                       title="میزان ترافیک دریافتی سرویس‌">
        </metrics-chart>

        <metrics-chart metric-name="network_out_usage" :options="networkOptions"
                       :dateFilter="selectedTimeFilter"
                       :serviceFilter="{title: service.name, value: service.name}"
                       title="میزان ترافیک خروجی سرویس">
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
                        display: false,
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
                        display: false,
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