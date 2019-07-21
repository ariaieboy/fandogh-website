<template>
    <div class="row" style="margin: 0" v-if="service.urls">
        <div style="width: 100%">
            <!--<div v-for="item in service.urls"-->
            <!--style="float: left;-->
            <!--direction: ltr;-->
            <!--margin: 2px;-->
            <!--padding: 5px 12px;-->
            <!--background-color: #fefefe;-->
            <!--box-shadow: 0 2px 6px rgba(0,0,0,0.07);-->
            <!--height: 32px;-->
            <!--border-radius: 25px;-->
            <!--width: max-content">-->
            <!--<a :href="item" style="color: dodgerblue; direction: ltr; line-height: 32px"-->
            <!--target="_blank">{{item}}</a>-->
            <!--</div>-->

            <span class="vs__selected" v-for="(item, index) in service.urls" style="float: left">

                <button style="outline: none; border: none" class="vs__deselect"
                        @click.prevent="openWindow(item)">
                    <img src="../../../../assets/img/external-link.png" alt="open new window">
                </button>
                <a :href="item" style="color: #fefefe; direction: ltr; font-family: iran-yekan" target="_blank">{{item}}</a>

            </span>

        </div>

    </div>
</template>

<script>
    export default {
        name: "domains",
        props: ['service'],
        methods:{
            openWindow(url){
                window.open(url, "_blank");
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .vs__selected
        display flex !important
        align-items center !important
        background-color rgba(41, 121, 255, .5) !important
        border 1px solid #0093ff !important
        border-radius 25px !important
        color #ffffff !important
        font-family iran-yekan !important
        line-height 1.4 !important
        margin 4px 2px 0 !important
        padding 0 0 0 16px !important

    .vs__deselect
        padding 6px !important
        img
            width 20px
            height 20px
            opacity 0.8
            @media only screen and (max-width: 760px)
                width 14px
                height 14px

</style>
