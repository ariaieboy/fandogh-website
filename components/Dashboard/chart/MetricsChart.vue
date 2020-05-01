<template>
    <div style="margin-bottom: 64px">
        <div class="metrics-widget">
            <div class="metric-title">
                {{title}}
                <span v-if="loading">
                    <img style=" margin-top: auto; margin-bottom: auto; width: 32px; height: 32px"
                         src="~/assets/img/icons/loading.svg"
                         alt="loading"/>
                </span>
            </div>
            <div>
                <div style="position: relative; border-radius: 3px; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); background-color: #fefefe; box-sizing: padding-box; padding: 16px">
                    <line-chart class="wrapper"
                                :chartData="chartData"
                                :options="options"
                                :styles="myStyles">
                    </line-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FButton from "~/components/elements/button";
    import LineChart from "~/components/Dashboard/chart/LineChart";
    import ActionButton from "~/components/Dashboard/table/action-button";
    import FEmpty from "~/components/Dashboard/empty";
    import FLoading from "~/components/Loading";

    export default {
        props: {
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
            title: {
                type: String
            },
            metricName: {
                type: String
            },
            dateFilter: null,
            serviceFilter: null
        },
        data() {
            return {
                chartData: null,
                loading: true,
                gradient: null
            }
        },
        mounted() {
            this.fillData();
            setInterval(this.fillData, 60000);
        },
        methods: {
            async fillData() {
                this.loading = true;

                await this.$store.dispatch("getMetric", {
                    metric: this.metricName,
                    service: this.serviceFilter['value'],
                    hours: this.dateFilter['value']
                });
                this.chartData = {
                    datasets: this.$store.state[this.metricName]
                };

                Object.keys(this.chartData.datasets).forEach(key => {
                    this.chartData.datasets[key]['pointBackgroundColor'] = this.chartData.datasets[key]['backgroundColor'];
                    this.chartData.datasets[key]['pointRadius'] = 2;

                    this.gradient = this.$children[0].$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

                    this.gradient.addColorStop(0, this.getGradientColor(this.chartData.datasets[key]['backgroundColor'], ', 0.5'));
                    this.gradient.addColorStop(0.5, this.getGradientColor(this.chartData.datasets[key]['backgroundColor'], ', 0.3'));
                    this.gradient.addColorStop(1, this.getGradientColor(this.chartData.datasets[key]['backgroundColor'], ', 0'));

                    this.chartData.datasets[key]['backgroundColor'] = this.gradient;
                });
                this.loading = false;
            },
            getGradientColor(color, opacity) {
                return color.replace(')', opacity).replace('rgb', 'rgba');
            }
        },
        components: {
            FLoading,
            FButton,
            ActionButton,
            FEmpty,
            LineChart
        }, watch: {
            dateFilter() {
                this.fillData()
            },
            serviceFilter() {
                this.fillData()
            }
        },
        computed: {
            myStyles() {
                return {
                    position: 'relative',
                    width: '100%',
                    height: (this.chartData === null ? '500px' : this.chartData.datasets.length * 23 > 500 ?
                        `${this.chartData.datasets.length * 23}px` : '500px')
                }
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @font-face
        font-style normal
        font-family roboto
        src url('~/assets/fonts/Roboto-Regular.ttf')

    .metrics-widget .metric-title
        text-align center
        border-radius 3px
        margin-bottom 5px
        line-height 65px
        height 65px
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.07);
        background-color #fefefe
        color #1b1b1b
        font-family iran-yekan
        font-weight bold
        font-size 18px

</style>

<style scoped lang="css">
    .chartjs-render-monitor li span {
        color: white !important;
        font-size: 100px !important;
    }


</style>
