<template>
    <div v-if="service && !loading">
        <p class="title">جزییات سرویس</p>

        <div class="row" style="margin: 0 0 16px 0;">
            <div class="wrapper"
                 style="padding: 16px; background-color: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07); height: 64px; width: 100%; display: flex">

                <span style=" margin-top: auto; margin-bottom: auto; font-size: 1.6em; font-family: iran-yekan; font-weight: bold">{{service.name}}</span>

                <div style="width: 1px; background-color: #7c7c7c; margin-left: 12px; margin-right: 12px; border-radius: 25px"></div>

                <span style="color: #7c7c7c; margin-top: auto; margin-bottom: auto; font-size: 1em; font-family: iran-yekan; font-weight: normal">
                    نوع سرویس:
                    <span style="font-size: 1.2em; color: black;padding-right: .2em">{{service.service_type}}</span>
                </span>

                <span style="color: #7c7c7c; margin-top: auto; margin-bottom: auto; margin-right: 16px; font-size: 1em; font-family: iran-yekan; font-weight: normal">
                    رم مصرفی (مگابایت):
                    <span style="font-size: 1.2em; color: black;padding-right: .2em; font-family: iran-sans">{{service.memory}}</span>
                </span>

            </div>

        </div>

        <div class="row" style="margin: 0;">
            <div class="box-row row col-lg-2 col-md-2 col-sm-2 col-xs-12" style="padding: 0">
                <div @click="sectionClicked('detail')"
                     :class="[(activeSectionName === 'detail' ? 'enabled' : 'disabled')]">
                    <p>جزئیات سرویس</p>
                </div>

                <div @click="sectionClicked('monitor')"
                     :class="[(activeSectionName === 'monitor' ? 'enabled' : 'disabled')]">
                    <p>مانیتورینگ</p>
                </div>
            </div>

            <keep-alive>
                <component class="col-lg-10 col-md-10 col-xs-12 col-sm-10" style="padding-left: 0" v-bind:is="activeSectionName"
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
            monitor
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
                margin-bottom 8px
                letter-spacing normal
                color #000000
                @media only screen and (max-width: 766px)
                    min-width 200px
                    border-left: 1px solid #2979ff
                    border-radius 0
                    box-shadow none
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
                font-family yekan-bold
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
                    margin-top 8px
                    margin-bottom 8px
                    background-color transparent

    .box-row::-webkit-scrollbar
        display none


</style>