<template>
    <div class="panel-box">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "box"
};
</script>

<style lang="stylus" scoped>
.panel-box
    margin-bottom 20px
    padding 45px 60px
    min-height 100px
    border solid 1px #e7e8ea
    border-radius 10px
    background-color #ffffff
    @media (max-width: 1500px) and (min-width:992px)
        padding 45px 15px
    @media (max-width: 566px)
        padding 45px 20px
    
</style>
