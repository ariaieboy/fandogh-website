<template>
    <div v-if="service && !loading">
        <p class="title">جزییات سرویس</p>

        <div class="row" style="margin: 0 0 16px 0;">
            <div class="service-header">

                <span class="service-name">
                    <img
                            style="border-radius: 100px; width: 24px; height: 24px; display: inline-block; margin-left: 7px;vertical-align: middle"
                            :src="(service.state.toString().toLowerCase() === 'running' ? require('../../../components/Dashboard/home/icons/ic-service-successfull.svg') : require('../../../components/Dashboard/home/icons/ic-service-failed.svg'))"
                            :class="[service.state.toString().toLowerCase() === 'running' ? 'success' : 'failed']"
                            >
                    {{service.name}}
                </span>

                <div v-if="windowWidth > 766"
                     style="width: 1px; background-color: #7c7c7c; margin-left: 12px; margin-right: 12px; border-radius: 25px"></div>
                <div class="col-xs-12" v-else
                     style="height: 1px; background-color: #7c7c7c; border-radius: 25px; margin-bottom: 12px"></div>

                <span class="service-spec">
                    نوع سرویس<br>
                    <span style="font-size: 1.2em; color: black;padding-right: .2em">{{service.service_type}}</span>
                </span>

                <span class="service-spec">
                    رم مصرفی (مگابایت)<br>
                    <span style="font-size: 1.2em; color: black;padding-right: .2em; font-family: iran-sans">{{service.memory}}</span>
                </span>

                <span class="service-edit" @click="$router.push({ path: '/dashboard/services/wizard', query: {service: service_name} })">
                    تغییر مانیفست
                </span>

            </div>

        </div>

        <div class="row main" style="margin: 0;">
            <div class="box-row row col-lg-2 col-md-2 col-sm-2 col-xs-12 padding">
                <div @click="sectionClicked('detail')"
                     :class="[(activeSectionName === 'detail' ? 'enabled' : 'disabled')]">
                    <p>رپلیکاها</p>
                </div>

                <div @click="sectionClicked('env')"
                     style="font-size: 0.8em"
                     :class="[(activeSectionName === 'env' ? 'enabled' : 'disabled')]">
                    <p>Environment Variables</p>
                </div>


                <div @click="sectionClicked('domains')"
                     v-if="service.urls && service.urls.length > 0"
                     :class="[(activeSectionName === 'domains' ? 'enabled' : 'disabled')]">
                    <p>دامنه‌ها</p>
                </div>

                <div @click="sectionClicked('monitor')"
                     :class="[(activeSectionName === 'monitor' ? 'enabled' : 'disabled')]">
                    <p>مانیتورینگ</p>
                </div>

                <div @click="sectionClicked('logs')"
                     :class="[(activeSectionName === 'logs' ? 'enabled' : 'disabled')]">
                    <p>لاگ‌ها</p>
                </div>
            </div>

            <keep-alive>
                <component class="col-lg-10 col-md-10 col-xs-12 col-sm-10 padding"
                           v-bind:is="activeSectionName"
                           style="padding: 0"
                           :service="service"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import FInput from "~/components/elements/input";
    import FButton from "~/components/elements/button";
    import File from "~/components/elements/file";
    import FLabelDisable from "~/components/elements/label/label-disable";

    import FCollaps from "~/components/elements/collaps";
    import FReplicaHeader from "~/components/Dashboard/replica/header";
    import FReplicaDetails from "~/components/Dashboard/replica/details";
    import FReplicaContainers from "~/components/Dashboard/replica/containers";
    import FReplicaEvents from "~/components/Dashboard/replica/events";
    import detail from "./service/detail"
    import monitor from "./service/monitor"
    import env from "./service/env"
    import domains from "./service/domains"
    import logs from "./service/logs"

    export default {
        layout: "dashboard",
        components: {
            FReplicaEvents,
            FReplicaContainers,
            FReplicaHeader,
            FReplicaDetails,
            FCollaps,
            FInput,
            FButton,
            File,
            FLabelDisable,
            detail,
            monitor,
            env,
            domains,
            logs
        },
        data() {
            return {
                activeSectionName: 'detail',
                service_name: '',
                image: this.$route.params.image,
            };
        },
        created() {
            this.$store.commit("SET_DATA", {id: "manifest", data: {}});
            this.service_name = this.$route.params.id;
            this.getData(this.service_name);
        },
        methods: {
            async getData(service_name) {
                try {
                    let res = await this.$store.dispatch("getServicesName", {
                        name: service_name
                    });
                    let internal = null;
                    if (res.state !== "RUNNING") {
                        setTimeout(() => {
                            this.getData(this.service_name);
                        }, 5000);
                    } else {
                        clearInterval(internal);
                    }
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    }
                }
            },
            sectionClicked(sectionName) {
                this.activeSectionName = sectionName;
            },
        },
        destroyed() {
            this.$store.commit("SET_DATA", {data: null, id: "service"});
        },
        computed: {
            loading() {
                return this.$store.state.loading;
            },
            windowWidth() {
                return this.$store.state.windowWidth;
            },
            service() {
                return this.$store.state.service;
            }
        }
    };
</script>

<style scoped lang="stylus">

    @import '../../../assets/css/variables.styl'

    .title
        font-family iran-yekan !important
        font-style normal !important
        font-weight bold !important
        font-size 1.2em !important
        font-stretch normal !important
        line-height 1.75 !important
        color #7c7c7c !important
        letter-spacing normal !important

    .box
        padding 16px
        box-sizing content-box
        @media only screen and (max-width: 766px)
            border-radius 3px
            box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
            background-color #ffffff


    .box-row
        height fit-content
        margin-left 0
        margin-right 0
        display block
        white-space nowrap
        overflow-x scroll
        overflow-y scroll
        -ms-overflow-style none
        scrollbar-width none
        @media only screen and (max-width: 766px)
            border-radius 3px
            box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
            background-color #fefefe
            overflow-x scroll
            overflow-y hidden
            margin-bottom 24px
            margin-top 5px

        div.disabled
            padding 0
            cursor pointer
            @media only screen and (max-width: 766px)
                margin-left -5px
                display inline-flex

            p
                font-style normal
                font-stretch normal
                line-height 40px
                text-align center
                font-family iran-yekan
                background-color #fefefe
                border-radius 3px
                box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.03)
                font-size .9em
                outline none
                margin-top 0
                font-weight normal
                margin-bottom 8px
                letter-spacing normal
                color #000000
                @media only screen and (max-width: 766px)
                    min-width 200px
                    border-left: 1px solid #2979ff
                    border-radius 0
                    box-shadow none
                    font-size 1em
                    line-height 32px
                    margin-top 8px
                    margin-bottom 8px
                    background-color transparent


        div.enabled
            padding 0
            cursor pointer
            @media only screen and (max-width: 766px)
                background-color #2979ff
                margin-right -1px
                display inline-flex

            p
                font-style normal
                font-stretch normal
                line-height 40px
                text-align center
                font-family iran-yekan
                font-weight bold
                font-size .9em
                background-color #2979ff
                border-radius 3px
                box-shadow 0 2px 6px 0 rgba(41, 121, 255, 0.2)
                outline none
                margin-top 0
                margin-bottom 8px
                letter-spacing normal
                color #ffffff
                @media only screen and (max-width: 766px)
                    min-width 200px
                    border-radius 0
                    box-shadow none
                    line-height 32px
                    font-size 1em
                    margin-top 8px
                    margin-bottom 8px
                    background-color transparent

    .box-row::-webkit-scrollbar
        display none

    .service-header
        padding 16px
        background-color #fefefe
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        min-height 64px
        width 100%
        display flex
        margin 0
        @media only screen and (max-width: 766px)
            display block

        span.service-name
            margin-top auto
            margin-bottom auto
            font-size 1.5em
            font-family iran-yekan
            font-weight bold
            text-align center
            display inline-block
            padding-right 16px
            padding-left 16px
            text-overflow ellipsis
            @media only screen and (max-width: 766px)
                font-size 1.8em
                padding-bottom 12px
                display block
                padding-right 0
                padding-left 0

            img
                &.success
                    animation rotating 5s infinite linear
                    -webkit-animation rotating 5s infinite linear
                    -moz-animation rotating 5s infinite linear
                    -o-animation  rotating 5s infinite linear
                    -ms-animation rotating 5s infinite linear
                &.failed
                    animation broken-rotating 1.5s infinite linear
                    -webkit-animation broken-rotating 1.5s infinite linear
                    -moz-animation broken-rotating 1.5s infinite linear
                    -o-animation  broken-rotating 1.5s infinite linear
                    -ms-animation broken-rotating 1.5s infinite linear



        @-webkit-keyframes rotating {
            from{
                -webkit-transform: rotate(0deg);
            }
            to{
                -webkit-transform: rotate(360deg);
            }
        }
        @keyframes rotating {
            from{
                -webkit-transform: rotate(0deg);
            }
            to{
                -webkit-transform: rotate(360deg);
            }
        }

        @-webkit-keyframes broken-rotating {

            0% {
                -webkit-transform: rotate(0deg);
            }
            10% {
                -webkit-transform: rotate(4deg);
            }
            20% {
                -webkit-transform: rotate(8deg);
            }
            30% {
                -webkit-transform: rotate(12deg);
            }
            40% {
                -webkit-transform: rotate(16deg);
            }
            50% {
                -webkit-transform: rotate(20deg);
            }
            60% {
                -webkit-transform: rotate(16deg);
            }
            70% {
                -webkit-transform: rotate(12deg);
            }
            80% {
                -webkit-transform: rotate(8deg);
            }
            90% {
                -webkit-transform: rotate(4deg);
            }
            100% {
                -webkit-transform: rotate(0deg);
            }
        }
        @keyframes broken-rotating {

            0% {
                -webkit-transform: rotate(0deg);
            }
            10% {
                -webkit-transform: rotate(4deg);
            }
            20% {
                -webkit-transform: rotate(8deg);
            }
            30% {
                -webkit-transform: rotate(12deg);
            }
            40% {
                -webkit-transform: rotate(16deg);
            }
            50% {
                -webkit-transform: rotate(20deg);
            }
            60% {
                -webkit-transform: rotate(16deg);
            }
            70% {
                -webkit-transform: rotate(12deg);
            }
            80% {
                -webkit-transform: rotate(8deg);
            }
            90% {
                -webkit-transform: rotate(4deg);
            }
            100% {
                -webkit-transform: rotate(0deg);
            }
        }


    .service-edit
        color $totalWhite
        line-height 1.75
        margin-top auto
        margin-bottom auto
        font-size 1em
        font-family iran-yekan
        font-weight normal
        background-color $green
        border-radius 3px
        box-shadow 0 2px 6px rgba(60, 204, 56, 0.7)
        text-align center
        align-self start
        padding 6px 24px
        cursor pointer
        order 2
        margin-right auto
        @media only screen and (max-width: 766px)
            font-size 1.2em
            display block
            padding-right 0
            padding-left 0

    .service-spec
        color #7c7c7c
        line-height 1.75
        margin-top auto
        margin-bottom auto
        font-size 1em
        font-family iran-yekan
        font-weight normal
        text-align center
        padding-left 24px
        padding-right 24px
        display inline-block
        @media only screen and (max-width: 766px)
            font-size 1.2em
            display block
            padding-right 0
            padding-left 0


    .main
        div.padding
            padding-right 0
            padding-left 12px
            @media only screen and (max-width: 766px)
                padding 0


</style>
