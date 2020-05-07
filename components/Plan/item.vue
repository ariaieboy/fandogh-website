<template>

    <div class="middle-xs middle-lg middle-md middle-sm">

        <div class="box middle-xs middle-lg middle-md middle-sm">

            <div class="title-box">

                <img :alt="title" :src="image"/>
                <p class="box-title">{{title}}</p>
                <p class="description-button">توضیحات بیشتر</p>

            </div>

            <div class="divider">
            </div>

            <div class="description-box">

                <div>
                    <img :alt="title" src="~/assets/svg/ic-storage.svg"/>
                    <p class="description-title">حافظه ذخیره‌سازی</p>
                    <p class="value">{{dedicatedVolume}} گیگابایت</p>
                </div>

                <div>
                    <img :alt="title" src="~/assets/svg/ic-memory.svg"/>
                    <p class="description-title">رم اختصاصی</p>
                    <p class="value">{{memory}} گیگابایت</p>
                </div>

                <div>
                    <img :alt="title" src="~/assets/svg/ic-cpu.svg"/>
                    <p class="description-title">پردازنده اختصاصی</p>
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
                "base-plan": require("~/assets/svg/plans/basic-plan.svg"),
                "economy-plan": require("~/assets/svg/plans/economy-plan.svg"),
                "startup-plan": require("~/assets/svg/plans/startup-plan.svg"),
                "mid-scale-plan": require("~/assets/svg/plans/mid-scale-plan.svg"),
                "big-scale-plan": require("~/assets/svg/plans/big-scale-plan.svg")
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
    *
        cursor pointer
</style>


