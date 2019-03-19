<template>
    <div>
        <line-chart :chart-data="datacollection"></line-chart>
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
                datacollection: null
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
                await this.$store.dispatch("getCpuUsage", "ns");
                this.$store.commit("SET_DATA", {data: false, id: "loading"});
                this.fillData()
            },
            fillData() {
                console.log('cpu_usage', this.$store.state.cpuUsage)
                this.datacollection = {
                    datasets: this.$store.state.cpuUsage
                }
            },
            getRandomInt() {
                return Math.floor(Math.random() * (100 - 5 + 1)) + 5
            }
        }
    }
</script>
