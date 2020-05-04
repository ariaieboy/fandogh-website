<template>
    <div>
        <h2 class="title_header">لاگ‌های ایمیج</h2>
        <div class="log-header-container">
            <div style="display: flex">
                <img src="../../../../../../components/Dashboard/sidebar/icons/ic-image.svg" alt="image" class="image-header">
            </div>
            <div class="row" style="flex: 1;">
                <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12 log-spec-row">
                    <f-input v-model="image" styles="input-white input-block input-dashboard input-disable"></f-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12 log-spec-row">
                    <f-input v-model="version" styles="input-white input-block input-dashboard input-disable"></f-input>
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12 col-sm-12 log-spec-row">
                    <f-input v-model="date" styles="input-white input-block input-dashboard input-disable"></f-input>
                </div>
            </div>

        </div>
        <log :logs="logs" :is_image_log="true"/>
    </div>
</template>

<script>
    import Log from "~/components/Dashboard/log/‌index";
    import FInput from "~/components/elements/input";
    import FDate from "~/utils/date";

    export default {
        layout: "dashboard",
        async asyncData({store, route, redirect}) {
            try {
                await store.dispatch("getImageVersionBuilds", {
                    name: route.params.image,
                    version: route.params.version
                });
            } catch (e) {
                redirect("/");
            }
        },
        data() {
            return {
                image: "نام ایمیج‌: " + this.$route.params.image,
                version: "ورژن‌: " + this.$route.params.version,
                date: "",
                logInterval: null
            };
        },
        mounted() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
            this.date = "تاریخ ساخت: " + FDate({date: this.builds.start_date});
            let state = this.builds.state.toLowerCase();
            if (state === "building") {
                this.logInterval = setInterval(() => {
                    this.$store
                        .dispatch("getImageVersionBuilds", {
                            name: this.$route.params.image,
                            version: this.$route.params.version
                        })
                        .then(res => {
                        }).catch(e => {
                        if (e.status === 401) {
                            clearInterval(this.logInterval);
                            this.$router.push("/user/login");
                        }
                    });
                    if (state !== "building") clearInterval(this.logInterval);
                }, 1000);
            }
            if (state !== "building") clearInterval(this.logInterval);
        },
        computed: {
            builds() {
                return this.$store.state.builds;
            },
            logs() {
                if (this.builds) {
                    return this.builds.logs.split("\n");
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
        margin-top -24px
        margin-left 16px
        filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)
        @media only screen and (max-width: 992px)
            width 64px
            height 64px
            margin-top -14px
            margin-bottom 16px
            margin-left auto
            margin-right auto


    .log-spec-row
        margin-bottom unset
        @media only screen and (max-width: 992px)
            margin-bottom 12px




</style>

