<template>
  <div class="radio-option">
      <div @click="onSelect" class="radio-option-circle">
          <div v-if="isSelected" class="radio-selected">

          </div>
      </div>
      <div class="radio-option-title">
          {{title}}
      </div>
  </div>
</template>

<script>
  export default {
    props:['selected', 'title'],
    computed: {
      isSelected(){
        return this.title === this.selected
      }
    },
    methods:{
      onSelect(){
        this.$emit('onSelect', this.title)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .radio-option
        display flex
        flex-flow wrap row
        &-option-title
            font-family: IRANYekan
            font-size: 16px
        &-circle
                border 1px solid #00e3dc
                border-radius 50%
                background #fff
                width 16px
                height 16px
                display flex
                align-items center
                justify-content center
                margin-left 10px
                .radio-selected
                    border 1px solid #00e3dc
                    border-radius 50%
                    background #00e3dc
                    width 10px
                    height 10px
</style>