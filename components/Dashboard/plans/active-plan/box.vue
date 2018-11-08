<template>
    <div class="box box-shadow" >
        <slot></slot>
    </div>
</template>

<script>
export default {
    props : {
        hasShadow : {
            type : Boolean ,
            default : true 
        }
    }
};
</script>

<style lang="stylus" scoped>
.box
    padding 20px 30px
    border-radius 10px
    background-color #ffffff
    position relative
    cursor pointer
    &:before
        position absolute
        content ''
        display block
        top 0
        left 0
        right 0
        bottom 0
        background rgba(248, 248, 248, 0.43)
        visibility hidden
        z-index 2
        transition all 0.3s ease-in
        opacity 0.2
    &:hover 
        &:before
            visibility visible
            opacity 0.9
            transition all 0.2s ease-out

    @media (max-width: 1500px) and (min-width:992px)
        padding 20px 5px   
    &.box-shadow
        border solid 1px #e7e8ea
    @media (max-width:992px)
        margin-bottom 62px
        padding  20px 30px 20px 15px
        margin-bottom 0
    @media (max-width:566px)
        padding: 10px 12px 6px 3px;

</style>
