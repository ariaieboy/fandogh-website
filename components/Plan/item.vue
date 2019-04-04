<template>

    <div class="middle-xs middle-lg middle-md middle-sm">

        <div class="box middle-xs middle-lg middle-md middle-sm">

            <div class="title-box">

                <img :alt="title" :src="image"/>
                <p class="title">{{title}}</p>
                <p class="description-button">توضیحات بیشتر</p>

            </div>

            <div class="divider">
            </div>

            <div class="description-box">

                <div>
                    <img :alt="title" :src="image"/>
                    <p class="title">هارد اختصاصی</p>
                    <p class="value">{{dedicatedVolume}} گیگابایت</p>
                </div>

                <div>
                    <img :alt="title" :src="image"/>
                    <p class="title">رم اختصاصی</p>
                    <p class="value">{{memory}} گیگابایت</p>
                </div>

                <div>
                    <img :alt="title" :src="image"/>
                    <p class="title">پردازنده اختصاصی</p>
                    <p class="value">{{cpu}} هسته</p>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props: ["icon", "title", "dedicatedVolume", "memory", "cpu"],
        data() {
            return {
                "auto-scale": require("~/assets/svg/ic-auto-scale.svg"),
                "cost-effective": require("~/assets/svg/ic-cost-effective.svg"),
                docker: require("~/assets/svg/ic-docker.svg"),
                database: require("~/assets/svg/ic-managed-d-bs.svg"),
                ready: require("~/assets/svg/ic-ready-tg.svg"),
                highly: require("~/assets/svg/ic-highly-av.svg")
            };
        },
        computed: {
            image() {
                return this.$data[this.icon];
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../assets/css/inactive-plan.styl"
</style>


