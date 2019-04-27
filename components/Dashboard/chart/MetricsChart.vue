<template>
    <div style="margin-bottom: 32px">
        <div class="metrics-widget">
            <div class="title">
                {{title}}
                <span v-if="loading">
                    <img style="filter: invert(100%); margin-top: auto; margin-bottom: auto; width: 32px; height: 32px" src="~/assets/img/icons/loading.svg"/>
                </span>
            </div>
            <div>
                <div style="border-radius: 3px; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); background-color: #fefefe; box-sizing: padding-box; padding: 16px">
                    <line-chart :chartData="chartData" :options="options" :height="200"></line-chart>
                    <div style="min-height: 35px" id='chartjsLegend' class='chartjsLegend'></div>
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
            }
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
                await this.$store.dispatch("getMetric", this.metricName);
                this.chartData = {
                    datasets: this.$store.state[this.metricName]
                };

                Object.keys(this.chartData.datasets).forEach(key => {
                    this.chartData.datasets[key]['pointBackgroundColor'] = this.chartData.datasets[key]['backgroundColor'];
                    this.chartData.datasets[key]['pointRadius'] = 2;

                    this.gradient = this.$children[0].$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

                    this.gradient.addColorStop(0, this.getGradientColor(this.chartData.datasets[key]['backgroundColor'], ', 0.5'));
                    this.gradient.addColorStop(0.5, this.getGradientColor(this.chartData.datasets[key]['backgroundColor'], ', 0.25'));
                    this.gradient.addColorStop(1, this.getGradientColor(this.chartData.datasets[key]['backgroundColor'], ', 0'));

                    this.chartData.datasets[key]['fill'] = true;
                    this.chartData.datasets[key]['backgroundColor'] = this.gradient;
                });
                this.loading = false;
            },
            getGradientColor(color, opacity) {
                return color.replace(')', opacity ).replace('rgb', 'rgba');
            }
        },
        components: {
            FLoading,
            FButton,
            ActionButton,
            FEmpty,
            LineChart
        }
    };
</script>

<style lang="stylus" scoped>
    /*.chart*/
    /*display flex*/
    /*flex-direction column*/

    /*&-label*/
    /*display flex*/
    /*align-items center*/
    /*margin-bottom 25px*/

    /*img*/
    /*margin-left 10px*/

    /*span*/
    /*color #333333*/
    /*font-size 12px*/

    /*&-items*/
    /*display flex*/

    /*&-canvas*/
    /*margin-right 10%*/
    /*margin-left 30px*/

    /*&-info*/
    /*display flex*/
    /*flex-wrap wrap*/
    /*align-items center*/
    /*max-width 300px*/
</style>

<style lang="stylus" scoped>
    @font-face
        font-style normal
        font-family roboto
        src url('~/assets/fonts/Roboto-Regular.ttf')

    .metrics-widget .title
        text-align center
        background-color rgba(217, 217, 217, 0.2)
        border-top-right-radius 3px
        border-top-left-radius 3px
        box-shadow
        margin auto
        line-height 45px
        height 45px
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.07);
        background-image: linear-gradient(to right, #2979ff, #24d5d8);
        color #fefefe
        font-family iran-yekan
        font-size 16px

    .chartjsLegend li span
        display inline-block
        width 12px
        height 12px
        margin-right 5px
        border-radius 25px


</style>