<template>
    <a  @click.prevent="$emit('onClick')" class="action-button" href="#"> <slot/> </a>
</template>
<script>
    export default {

    }
</script>
<style  lang="stylus">
    .action-button
        background #eaf0f7
        border-radius 5px
        display inline-block
        padding 8px
        color #4f4f4f
        font-size 12px
        margin 15px
        margin-right 8px    
        &.disabled
            pointer-events none
            span 
               color: rgb(212, 212, 212);
        span
            width  100px
            overflow hidden
            display inline-block
            transition all ease .5s
            vertical-align middle
        &:hover
            span
                width 100px

        img
            width 16px
            height 16px
            vertical-align middle
    @media (max-width: 768px)
        .action-button
            span
                width 100px

//    @media (min-width: 1920px)
//        .action-button         
//            span
//                width 100px
</style>