<template>
  <div class="checkbox" :class="color">
    <label>
      <input type="checkbox" :value="value" @change="onChange">
      <span class="checkbox-material">
        <span class="check"></span>
      </span>
      <span class="checkbox-label">{{label}}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "checkbox",
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    label: {
      type: String,
      default: "برچسب چک باکس"
    },
    color: {
      type: String,
      default: "green"
    }
  },
  methods: {
    onChange(event) {
      this.$emit("input", event.target.checked);
    }
  }
};
</script>

<style lang="stylus" scoped>
.checkbox
  display inline-block
  transform translateZ(0)
  -webkit-transform translateZ(0)
  .checkbox-label
    display inline-block
    margin-right 5px
    color #000000
    font-weight bold
    font-size 1em
    font-family yekan
.checkbox label
  padding-left 0
  cursor pointer
.checkbox input[type=checkbox]
  position absolute
  left 0
  z-index -1
  overflow hidden
  margin 0
  width 0
  height 0
  opacity 0
  pointer-events none
.checkbox .checkbox-material
  position relative
  top 6px
.checkbox .checkbox-material:before
  position absolute
  top 2px
  left 8px
  z-index 1
  margin 0
  width 4px
  height 4px
  border-radius 100%
  background-color rgba(0, 0, 0, 0.5)
  content ''
  opacity 0
.checkbox .checkbox-material .check
  position relative
  z-index 1
  display inline-block
  overflow hidden
  width 16px
  height 16px
  border 1px solid #e7e8ea
  border-radius 4px
  background-color #fff
.checkbox .checkbox-material .check:before
  position absolute
  left 6px
  display block
  margin-top -3px
  width 0
  height 0
  box-shadow 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0, 0 0 0 0 inset
  content ''
  transform rotate(45deg)
  animation checkbox-off 0.3s forwards ease-out
  -webkit-transform rotate(45deg)
  -webkit-animation checkbox-off 0.3s forwards ease-out
.checkbox input[type=checkbox]:focus + .checkbox-material .check:after
  opacity 0.2
.checkbox input[type=checkbox]:checked + .checkbox-material .check:before
  box-shadow 0 0 0 10px, 10px -10px 0 10px, 32px 0px 0 20px, 0px 32px 0 20px, -5px 5px 0 10px, 20px -12px 0 11px
  animation checkbox-on 0.3s forwards ease-out
  -webkit-animation checkbox-on 0.3s forwards ease-out
.checkbox input[type=checkbox]:not(:checked) + .checkbox-material:before
  animation rippleOff 700ms forwards ease-out
  -webkit-animation rippleOff 700ms forwards ease-out
.checkbox input[type=checkbox]:checked + .checkbox-material:before
  animation rippleOn 700ms forwards ease-out
  -webkit-animation rippleOn 700ms forwards ease-out
.checkbox input[type=checkbox]:not(:checked) + .checkbox-material .check:after
  animation rippleOff 700ms forwards ease-out
  -webkit-animation rippleOff 700ms forwards ease-out
.checkbox input[type=checkbox]:checked + .checkbox-material .check:after
  animation rippleOn 700ms forwards ease-out
  -webkit-animation rippleOn 700ms forwards ease-out
.checkbox input[type=checkbox][disabled]:not(:checked) ~ .checkbox-material .check:before, .checkbox input[type=checkbox][disabled] + .circle
  opacity 0.5
.checkbox input[type=checkbox][disabled] + .checkbox-material .check:after
  background-color rgba(0, 0, 0, 0.84)
  transform rotate(-45deg)
  -webkit-transform rotate(-45deg)
.blue .checkbox-material .check
  color #00e3dc
.blue .checkbox-matderial:before
  background-color #00e3dc
.blue input[type=checkbox]:checked + .checkbox-material .check
  color #00e3dc
// .green .checkbox-material .check
// color $green
// .green .checkbox-material:before
// background-color $green
// .green input[type=checkbox]:checked + .checkbox-material .check
// color $green
@keyframes checkbox-on
  0%
    box-shadow 0 0 0 10px, 10px -10px 0 10px, 32px 0px 0 20px, 0px 32px 0 20px, -5px 5px 0 10px, 15px 2px 0 11px
  50%
    box-shadow 0 0 0 10px, 10px -10px 0 10px, 32px 0px 0 20px, 0px 32px 0 20px, -5px 5px 0 10px, 20px 2px 0 11px
  100%
    box-shadow 0 0 0 10px, 10px -10px 0 10px, 32px 0px 0 20px, 0px 32px 0 20px, -5px 5px 0 10px, 20px -12px 0 11px
@keyframes rippleOn
  0%
    opacity 0.5
  100%
    opacity 0
    transform scale(13, 13)
    -webkit-transform scale(13, 13)
@keyframes rippleOff
  0%
    opacity 0.5
  100%
    opacity 0
    transform scale(13, 13)
    -webkit-transform scale(13, 13)
</style>
