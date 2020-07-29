<template>
    <div class="replica-containers">
        <h4>کانتینرها</h4>
        <div class="row" style="margin-top: 24px">
            <div class="col-md-12 col-sm-12 col-lg-12 col-xs-12" v-for="item in items">
                <!-- color="item.color" -->
                <container-item :name="item.name"
                                :image="item.image"
                                :state="item.ready"
                                :terminated="item.terminated"
                                :waiting="item.waiting"/>
            </div>
        </div>
    </div>
</template>

<script>
    import containerItem from "./container-item";

    export default {
        name: "replica-containers",
        components: {
            containerItem
        },
        props: {
            items: {
                type: Array
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .replica-containers
        padding 0 15px
        display flex
        margin-top 12px
        flex-direction column
        white-space nowrap
        border-bottom 1px solid #b5b5b5
        font-family yekan
</style>
