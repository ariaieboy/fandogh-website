<template>
    <div v-if="service && !loading">
        <p class="title">جزییات سرویس</p>

        <div class="row" style="margin: 0 0 16px 0;">
            <div class="service-header">

                <span class="service-name">
                    <canvas
                            style="border-radius: 100px; width: 16px; height: 16px; display: inline-block; margin-left: 7px;"
                            :style="{ backgroundColor: (service.state.toString().toLowerCase() === 'running' ? '#3ccc38' : '#fd3259')}"></canvas>
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

            </div>

        </div>

        <div class="row main" style="margin: 0;">
            <div class="box-row row col-lg-3 col-md-3 col-sm-3 col-xs-12 padding">
                <div @click="sectionClicked('detail')"
                     :class="[(activeSectionName === 'detail' ? 'enabled' : 'disabled')]">
                    <p>رپلیکاها</p>
                </div>

                <div @click="sectionClicked('env')"
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
            </div>

            <keep-alive>
                <component class="col-lg-9 col-md-9 col-xs-12 col-sm-9 padding"
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
            domains
        },
        data() {
            return {
                activeSectionName: 'detail',
                image: this.$route.params.image,
            };
        },
        created() {
            this.$store.commit("SET_DATA", {id: "manifest", data: {}});
            this.getData();
        },
        methods: {
            async getData() {
                try {
                    let res = await this.$store.dispatch("getServicesName", {
                        name: this.$route.params.id
                    });
                    let internal = null;
                    if (res.state !== "RUNNING") {
                        setTimeout(() => {
                            this.getData();
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

    .title
        font-family iran-yekan
        font-style normal
        font-weight bold
        font-size 1.2em
        font-stretch normal
        line-height 1.75
        color #7c7c7c
        letter-spacing normal

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
                margin-left  -5px
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
                margin-right  -1px
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
            canvas
                animation moved 2s infinite ease-in-out
                -webkit-animation moved 2s infinite ease-in-out


        @keyframes moved {
            0% {opacity: 1; transform scale(1)}
            10% {opacity: .95; transform scale(.99)}
            20% {opacity: .9; transform scale(.98)}
            30% {opacity: .85; transform scale(.97)}
            40% {opacity: .8; transform scale(.96)}
            50% {opacity: .75; transform scale(.95)}
            60% {opacity: .8; transform scale(.96)}
            70% {opacity: .85; transform scale(.97)}
            80% {opacity: .9; transform scale(.98)}
            90% {opacity: .95; transform scale(.99)}
            100% {opacity: 1; transform scale(1)}
        }


        @-webkit-keyframes moved{
            0% {opacity: 1; transform scale(1)}
            10% {opacity: .95; transform scale(.99)}
            20% {opacity: .9; transform scale(.98)}
            30% {opacity: .85; transform scale(.97)}
            40% {opacity: .8; transform scale(.96)}
            50% {opacity: .75; transform scale(.95)}
            60% {opacity: .8; transform scale(.96)}
            70% {opacity: .85; transform scale(.97)}
            80% {opacity: .9; transform scale(.98)}
            90% {opacity: .95; transform scale(.99)}
            100% {opacity: 1; transform scale(1)}
        }

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
