<template>
    <div class="fan-checkbox-container" :class="[object.selected ? 'selected': '']">

        <span>{{object.label}}</span>

        <div class="circle-border"><div class="circle-fill"></div></div>
    </div>
</template>

<script>
    export default {
        name: "fan-checkbox",
        props:['object']
    }
</script>

<style lang="stylus" scoped>

    .fan-checkbox-container
        width max-content
        margin-left 16px
        height 30px
        user-select none
        border-radius 50px
        border 1px solid #7c7c7c
        font-size .9em
        font-family: iran-yekan
        box-sizing padding-box
        padding 0 12px
        display inline-flex
        cursor pointer


        span
            min-width 75px
            vertical-align middle
            text-align center
            line-height 30px
            color #7c7c7c
            font-family: iran-yekan
            transition all .3s ease-in-out
            @media only screen and (max-width: 500px)
                min-width 50px

        div.circle-border
            width 20px
            height 20px
            padding 1px
            border-radius 50%
            border 1px solid #7c7c7c
            margin auto 12px auto -6px
            box-sizing padding-box
            transition all .3s ease-in-out

        div.circle-fill
            width 16px
            height 16px
            background-color transparent
            border-radius 50%
            transition all .3s ease-in-out

        &.selected
            border-color: #0045ff
            transition all .3s ease-in-out
            span
                color: #0045ff
                transition all .3s ease-in-out

            div.circle-border
                border-color: #0045ff
                transition all .3s ease-in-out

            div.circle-fill
                background-color #0045ff
                transition all .3s ease-in-out

</style>
