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
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
        },
        methods: {
            fillData() {
                this.datacollection = {

                    datasets: [
                        {
                            "label": "{'pod_name': 'nginx-85768f8fbf-4sbrk'}",
                            "data": [
                                {
                                    "x": 1552768630.219,
                                    "y": "0.0000033803590286110965"
                                },
                                {
                                    "x": 1552768966.219,
                                    "y": "0"
                                },
                                {
                                    "x": 1552769302.219,
                                    "y": "0"
                                }
                            ]
                        },
                        {
                            "label": "{'pod_name': 'nginx-85768f8fbf-kc5xx'}",
                            "data": [
                                {
                                    "x": 1552767622.219,
                                    "y": "0.000003498241518222225"
                                }
                            ]
                        }
                    ]
                }
            },
            getRandomInt() {
                return Math.floor(Math.random() * (100 - 5 + 1)) + 5
            }
        }
    }
</script>
