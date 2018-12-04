<template>
    <div class="label-disable">
        <label>
            {{label}}
        </label>
        <span>
            {{value}}
        </span>
    </div>
</template>

<script>
    export default {
        name:'label-disable',
        props:{
            label:{
                type:String,
                default:''
            },
            value:{
                default:''
            }
        }
    }
</script>

<style lang="stylus" scoped>
.label-disable
    position absolute
    top:50% 
    right 15px
    transform translateY(-40%)
    bottom 0
    margin auto 
    left 0
    label 
        font-size: 14px;
        font-weight: bold;
        color: rgb(79, 79, 79);  
    span 
        font-weight inherit
        font-size: 14px;
        color: rgb(79, 79, 79);  
      

</style>
