<template>
    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 " style="padding: 0 8px">
        <div class="box middle-xs">
            <div style="display: inline-flex; box-sizing: content-box; width: 100%">

                <div class="text-container">
                    <p class="title">{{title}}</p>
                </div>
                <div class="image-container">
                    <img :alt="title" :src="require('../../../assets/svg/'+ icon +'.svg')" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "service-card",
        props:['title', 'icon']
    }
</script>

<style lang="stylus" scoped>



    .box
        display block
        margin 1rem 0
        padding 16px 16px 16px 16px
        border-radius 3px
        background-color #fefefe
        text-align center
        cursor pointer
        box-sizing padding-box
        transition 0.3s ease-in-out all, 0.3s ease-in-out all
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.3)

        div.text-container
            margin auto
            display block
            flex 0.7 0 auto

        p.title
            color: #3e3e3e
            font-size 1.3em
            margin 0
            font-family iran-yekan
            font-weight bold

        div.divider
            background-color #0045ff
            height 2px
            border-radius 25px

        p.description
            font-size 1.1em
            color #7c7c7c
            margin 0
            font-family iran-yekan


    .box:hover
        background-color #0045ff
        box-shadow 0 2px 10px 5px rgba(0, 69, 255, 0.42)
        transition 0.3s ease-in-out all

        p.title
            color: #fefefe

        div.divider
            background-color #fefefe

        p.description
            color #fefefe


    div.image-container
        display inline-flex
        height 90px
        width 90px
        float left
        margin-top auto
        margin-bottom auto
        margin-right 12px
        margin-left 0
        padding 0
        background-color #0045ff
        border-radius 100px
        img
            margin auto
            width 52px
            height 52px
            @media only screen and (max-width: 766px)
                width 42px
                height 42px

</style>
