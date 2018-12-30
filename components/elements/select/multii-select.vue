<template>
  <div class="dropdown">
    <div class="dropdown-container" :tabindex="tabindex" @click="show=true" @blur="show=false">
      <div class="dropdown--arrow">
        <img v-if="!show" src="./images/arrow-d.svg">
        <img v-if="show" src="./images/arrow-u.svg">
      </div>
      <div v-if="!selected.length" class="dropdown--placeholder">
        <span class="dropdown--title">{{title}}</span>
      </div>
      <div v-else class="dropdown-options">
        <span class="dropdown--option">
          <span v-for="(item,index) in filterSelected">
            {{item}}
            <img src="./images/close.svg" @click.stop="remove(item,index)">
          </span>
        </span>
      </div>
    </div>
    <div v-show="show" class="dropdown-selector">
      <ul>
        <li v-for="option in options" :class="{'selected':selected.includes(option.title)}">
          <a @focus="selectOption(option)" href="#">{{option.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: ""
    },
    tabindex: {
      default: "1"
    },
    options: {
      default: []
    },
    title: {
      default: ""
    },
    multiselect: {
      default: false,
      type: Boolean
    },
    select: {
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      show: false,

    };
  },
  computed: {
    filterSelected() {
      return this.selected.filter((obj, pos, arr) => { return arr.map(mapObj => mapObj).indexOf(obj) === pos; });
    }
  },
  mounted() {
    if (this.value) {
      this.selected.push(this.value)
    }
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    selectOption(option, noToggle) {
      this.show = false
      this.selected.push(option.value || option.title);
      this.$emit("input", this.selected);
    },
    remove(item, index) {
      this.show = false
      this.$delete(this.selected, index)
    }
  }
};
</script>

<style scoped lang="stylus">
.dropdown
  position relative
  ul, li
    margin 0
    padding 0
  .dropdown-selector, .dropdown-container
    border solid 1px #e7e8ea
    border-radius 10px
    background-color #ffffff
  .dropdown-container
    position relative
    display flex
    align-items center
    margin-bottom 8px
    min-height 48px
    cursor pointer
    .dropdown--placeholder
      padding 16px
      line-height 0
      span
        color #bfbfbf
        font-size 12px
    .dropdown-options
      .dropdown--option
        display inline-block
        margin-right 16px
        span
          display inline-block
          margin 10px 0 10px 5px
          padding 0 10px
          height 23px
          border 1px solid #e7e8ea
          border-radius 5px
          color rgb(0, 0, 0)
          text-align center
          font-size 12px
          line-height 23px
          img
            margin-right 10px
    .dropdown--arrow
      cursor pointer
      img
        position absolute
        top calc(50% - 5px)
        left 16px
        width 16px
        height 10px
  .dropdown-selector
    position absolute
    top 47px
    top 98%
    right 10px
    left 10px
    z-index 1
    box-sizing border-box
    border-top none
    border-top-left-radius 0
    border-top-right-radius 0
    direction ltr
    ul
      li
        &.selected
          display none
          background-color #e3e3e3
        a
          display block
          padding 5px 15px
          font-size 12px
          font-family Roboto, sans-serif, yekan
          transition all ease 0.6s
          &:hover
            background #f7f8fb
        &:first-child
          a
            padding-top 10px
        &:last-child
          a
            padding-bottom 10px
</style>