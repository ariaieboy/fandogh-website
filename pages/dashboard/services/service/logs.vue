<template>
    <div >
        <log :logs="logs"/>
    </div>
</template>

<script>

    import Log from "~/components/Dashboard/log/‌index";
    import FInput from "~/components/elements/input";
    import FDate from "~/utils/date";
    import {removeValue} from "~/utils/cookie";
    import moment from "moment-jalaali";

    moment.loadPersian();


    export default {
        name: "logs",
        layout: "dashboard",
        props: ['service'],
        data() {
            return {
                image: "نام سرویس: " + this.service.name,
                logInterval: null
            };
        },
        created() {
            this.getData();
        },
        destroyed() {
        },
        methods: {
            FDate(value) {
                return FDate({date: value})
            },
            async getData() {
                try {
                    await this.$store.dispatch("getServiceLog", {
                        name: this.service.name
                    });
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                }
            }
        },
        mounted() {
            this.$store.commit("SET_DATA", {id: "manifest", data: {}});
            removeValue("name");
            removeValue("versions");
        },
        computed: {
            builds() {
                return this.$store.state.serviceLog;
            },
            logs() {
                if (this.builds) {
                    if (!this.builds.logs) return;
                    return this.builds.logs.split("\n");
                }
            },
            date() {
                if (this.builds) {
                    let date = moment.unix(this.builds.last_logged_time).format("jD jMMMM jYYYY");
                    return "تاریخ ساخت: " + date
                }
            }
        },
        components: {
            Log,
            FInput
        },
        beforeDestroy() {
            clearInterval(this.logInterval);
        }
    }
</script>

<style scoped>

</style>