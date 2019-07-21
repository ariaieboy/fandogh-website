<template>
    <div class="row" style="margin: 0" v-if="service.urls">
        <div style="width: 100%">
            <span class="vs__selected" v-for="(item, index) in service.urls" style="float: left">

                <button style="outline: none; border: none" class="vs__deselect"
                        @click.prevent="openWindow(item)">
                    <img src="../../../../assets/img/external-link.png" alt="open new window">
                </button>
                <a :href="(!item.toString().startsWith('http://') && !item.toString().startsWith('https://') ?
                    'https://'.concat(item): item)" style="color: #fefefe; direction: ltr; font-family: iran-yekan" target="_blank">{{item}}</a>

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

                let _url = (!url.toString().startsWith('http://') && !url.toString().startsWith('https://') ?
                    'https://'.concat(url) : url)
                window.open(_url, "_blank")
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
