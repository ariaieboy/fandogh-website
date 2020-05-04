<template>
  <div class="dropdown">

    <div  class="dropdown-container">
        <div @click="toggle" class="dropdown--arrow">
          <img v-if="!show" src="./images/arrow-d.svg" alt="arrow"/>
          <img v-if="show" src="./images/arrow-u.svg" alt="arrow"/>
        </div>
      <div v-if="!_selects.length" class="dropdown--placeholder">
        <span class="dropdown--title">
          {{title}}
        </span>
      </div>
      <div v-else class="dropdown-options">
        <span v-for="select in _selects" class="dropdown--option">
          <span>{{select}}</span>
           <img @click="$emit('input', _selects.filter(item => item !== select))" src="./images/close.svg" alt="close" />
        </span>
      </div>
    </div>
    <div v-show="show && _options.length" class="dropdown-selector">
      <ul>
        <li v-for="option in _options">
          <a rel="noopener" @click="$emit('input', _selects.concat(option))" href="#">{{option}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      options:{
        default: []
      },
      selects:{
        default:[]
      }
    },
    created(){
      this._selects = this.selects
      this.$on('input', value => {
        this._selects = value
      })
    },
    data(){
      return {
        show: false,
        _selects: [],
        title: 'دامنه مورد نظر را انتخاب کنید'
      }
    },
    computed:{
      _options(){
        return this.options.filter(item => {
          return !this._selects.includes(item)
        })
      }
    },
    methods:{
      toggle(){
        this.show = !this.show
      }
    }
  }
</script>

<style scoped lang="stylus">

  .dropdown
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
          border-radius: 5px
          border: solid 1px #bfbfbf
          display inline-block
          span
            color #000
            font-size 12px
            font-family Roboto, sans-serif, yekan
          img
            width 8px
            height 8px
            cursor pointer
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
