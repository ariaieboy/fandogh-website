<template>
    <div class="namespace">
        <div class="namespace--icon">
            <img src="~/assets/svg/ic-fandogh-mini.svg" />
        </div>
        <div class="namespace--name">
            <span> نام فضا</span>
            <h6>{{namespace}}</h6>
        </div>
    </div>
</template>

<script>
    import {getValue} from "~/utils/cookie";

    export default {
      computed:{
        namespace(){
          return getValue('namespace')
        }
      }
    }
</script>

<style lang="stylus" scoped>
   .namespace
       width 290px
       height 72px
       border-radius 5px
       background-image linear-gradient(to top, #2b18ae, #4f3eae)
       margin 0 auto
       display flex
       align-items center
       box-sizing border-box
       padding 12px
       .namespace--icon
           display flex
           justify-content center
           align-items center
           border-radius 18px
           background-color rgba(0, 0, 0, 0.19)
           width 48px
           height 48px
           img
               width 24px
        .namespace--name
            padding 15px
            span
                font-size 11px
            h6
                margin 5px 0




</style>