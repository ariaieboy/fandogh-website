<template>
    <div>
        <div class="metrics-widget">
            <div class="title font-roboto">
                {{title}}
                <span v-if="loading">
                    <img src="~/assets/img/icons/loading.svg" width="32px" height="32px"></img>
                </span>
            </div>
            <line-chart :chart-data="chartData" :options="options" :height="100"></line-chart>
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
                type: Object
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
                loading: true
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
                }
                this.loading = false;
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
    .chart
        display flex
        flex-direction column

        &-label
            display flex
            align-items center
            margin-bottom 25px

            img
                margin-left 10px

            span
                color #333333
                font-size 12px

        &-items
            display flex

        &-canvas
            margin-right 10%
            margin-left 30px

        &-info
            display flex
            flex-wrap wrap
            align-items center
            max-width 300px
</style>

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