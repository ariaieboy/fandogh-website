<template>
    <div v-if="service && !loading">
        <p class="title">جزییات سرویس</p>

        <div class="box-row row" style="box-sizing: content-box">
            <div @click="sectionClicked('detail')"
                 :class="[(activeSectionName === 'detail' ? 'enabled' : 'disabled')]">
                <p :style="{borderLeft: '1px solid #2979ff'}">جزئیات سرویس</p>
            </div>

            <div @click="sectionClicked('monitor')"
                 :class="[(activeSectionName === 'monitor' ? 'enabled' : 'disabled')]">
                <p :style="{borderLeft: '1px solid #2979ff'}">مانیتورینگ</p>
            </div>

        </div>

        <keep-alive>
            <component v-bind:is="activeSectionName" :service="service"></component>
        </keep-alive>
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
                // service: "MS.Dos",
                version: "داخلی",
                date: "512MB",
                activeSectionName: 'detail',
                image: this.$route.params.image,
                header: [
                    {
                        sortable: false,
                        label: "نام متغییر",
                        key: "name",
                        tdClass: "ellipsis ltr"
                    },
                    {
                        sortable: false,
                        label: "مقدار",
                        key: "value",
                        tdClass: "ellipsis ltr"
                    }
                ],
                data: [{name: "NODE_ENV", value: "Production"}]
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
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        background-color #ffffff

    .box-row
        height fit-content
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        background-color #ffffff
        margin-top 5px
        display block
        margin-bottom 32px
        white-space nowrap
        overflow-x scroll
        overflow-y hidden
        -ms-overflow-style none
        scrollbar-width none

        div.disabled
            display inline-flex
            padding 0
            margin-left -5px
            cursor pointer

            p
                font-style normal
                font-stretch normal
                min-width 200px
                line-height 24px
                margin-top 8px
                text-align center
                font-family iran-yekan
                font-size .9em
                outline none
                margin-bottom 8px
                letter-spacing normal
                color #000000


        div.enabled
            display inline-flex
            padding 0
            margin-right -1px
            background-color #2979ff
            cursor pointer

            p
                font-style normal
                font-stretch normal
                min-width 200px
                line-height 24px
                margin-top 8px
                text-align center
                font-family yekan-bold
                font-size .9em
                outline none
                margin-bottom 8px
                letter-spacing normal
                color #ffffff

    .box-row::-webkit-scrollbar
        display none


</style>