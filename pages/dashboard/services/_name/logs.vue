<template>
    <div>
        <h2 class="title_header">لاگ‌های سرویس {{service_name}}</h2>
        <div class="log-header-container">
            <div style="display: flex">
                <img src="../../../../components/Dashboard/sidebar/icons/ic-service.svg" alt="service"
                     class="image-header">
            </div>
            <div class="row" style="flex: 1;">

                <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12 log-spec-row">
                    <f-input v-model="image" styles="input-white input-block input-dashboard input-disable"></f-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12 log-spec-row">
                    <f-input v-model="date" styles="input-white input-block input-dashboard input-disable"></f-input>

                </div>
            </div>

        </div>
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
        layout: "dashboard",
        data() {
            return {
                image: "نام سرویس: " + this.$route.params.name,
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
                        name: this.$route.params.name
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
            // this.date = "تاریخ ساخت: " + FDate({ date: this.builds.last_logged_time });
            // let state = this.builds.state.toLowerCase();
            // if (state === "building") {
            //   this.logInterval = setInterval(() => {
            //     this.$store
            //       .dispatch("getServiceLog", {
            //         name: this.$route.params.name,
            //       })
            //       .then(res => {});
            //     if (state !== "building") clearInterval(this.logInterval);
            //   }, 1000);
            // }
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
            },
            service_name(){
                return this.$route.params.name
            }
        },
        components: {
            Log,
            FInput
        },
        beforeDestroy() {
            clearInterval(this.logInterval);
        },
    };
</script>

<style lang="stylus" scoped>
    .title_header
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal

    .log-header-container
        width: 100%;
        margin-top: 16px;
        border-radius: 3px;
        background: #fefefe;
        box-shadow: 0 2px 6px rgba(0,0,0, 0.17);
        padding: 16px;
        margin-bottom: 16px;
        display: flex
        @media only screen and (max-width: 992px)
            display: block


    .image-header
        width 128px
        height 128px
        margin-left 16px
        filter invert(41%) sepia(59%) saturate(4513%) hue-rotate(185deg) brightness(100%) contrast(108%)
        @media only screen and (max-width: 992px)
            width 64px
            height 64px
            margin-bottom 16px
            margin-left auto
            margin-right auto


    .log-spec-row
        margin-bottom auto
        margin-top auto
        @media only screen and (max-width: 992px)
            margin-bottom 12px
</style>

