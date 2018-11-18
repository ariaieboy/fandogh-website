<!--<template>-->
    <!--<select @change="e => $emit('input', e.target.value)">-->
        <!--<option v-for="option in options"  :value="option.value"> {{option.title}} </option>-->
    <!--</select>-->
<!--</template>-->

<!--<script>-->
    <!--export default {-->
      <!--props:{-->
        <!--options:{-->
          <!--default: []-->
        <!--}-->
      <!--},-->
    <!--}-->
<!--</script>-->

<!--<style lang="stylus" scoped>-->

<!--</style>-->

<template>
    <div class="dropdown">

        <div  class="dropdown-container">
            <div @click="toggle" class="dropdown--arrow">
                <img v-if="!show" src="./images/arrow-d.svg" />
                <img v-if="show" src="./images/arrow-u.svg" />
            </div>
            <div v-if="!selected.length" class="dropdown--placeholder">
        <span class="dropdown--title">
          {{title}}
        </span>
            </div>
            <div v-else class="dropdown-options">
        <span  class="dropdown--option">
          <span>{{selected}}</span>
        </span>
            </div>
        </div>
        <div v-show="show" class="dropdown-selector">
            <ul>
                <li v-for="option in options">
                    <a @click.prevent="selectOption(option)" href="#">{{option.title}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    props:{
      value:{
        default: ''
      },
      options:{
        default: []
      },
      title: {
        default: ''
      },
      select:{
        default: ''
      }
    },
    data(){
      return {
        selected: this.select,
        show: false
      }
    },
    watch:{
      value(value){
        this.selectOption({title: value, value}, true)
      }
    },
    methods:{
      toggle(){
        this.show = !this.show
      },
      selectOption(option, noToggle){
        if(!noToggle) this.toggle()
        this.selected = option.title
        this.$emit('input', option.value || option.title)
      }
    }
  }
</script>

<style scoped lang="stylus">

    .dropdown
        overflow hidden
        ul, li
            padding 0
            margin 0
        .dropdown-selector, .dropdown-container
            border-radius 10px
            background-color #ffffff
            border solid 1px #e7e8ea
            width 100%
        .dropdown-container
            min-height 46px
            margin-bottom 8px
            position relative
            display flex
            align-items center
            .dropdown--placeholder
                line-height 0
                padding 16px
                span
                    color #bfbfbf
                    font-size 12px
            .dropdown-options
                .dropdown--option
                    margin-right 16px
                    padding 3px
                    display inline-block
            .dropdown--arrow
                cursor pointer
                img
                    width 16px
                    height 10px
                    position absolute
                    left 16px
                    top calc(50% - 5px)


        .dropdown-selector
            direction ltr
            box-sizing border-box
            ul
                li
                    a
                        padding 5px 15px
                        display block
                        font-size 12px
                        font-family Roboto, sans-serif, yekan
                        transition all ease .6s
                        &:hover
                            background #f7f8fb
                    &:first-child
                        a
                            padding-top 10px
                    &:last-child
                        a
                            padding-bottom 10px

</style>