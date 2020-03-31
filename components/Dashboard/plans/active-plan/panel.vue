<template>
  <div class="service">
      <!-- :hasShadow="isActive" -->
    <box >
      <div class="service---box">
        <div class="service----item">
          <div class="service-----text">
            <span class="service------title">پلن فعلی</span>
            <span class="service------price">{{type}}</span>
          </div>
          <div class="service-----image">
            <img :src="'/icons/plans/services-icon/blimp.png'" alt="services">
          </div>
        </div>
        <div class="service----line"></div>
        <div class="service----item service----item-second">
          <div class="service-----information">
            <span class="service------image">
              <img :src="'/icons/plans/memory.png'" alt="memory">
            </span>
            <span class="service------name font-roboto">RAM</span>
            <span class="service------info">{{memory_limit}}</span>
          </div>
          <div class="circle-container">
            <circle-progress :percent="percent"/>
          </div>
        </div>
      </div>
    </box>
  </div>
</template>

<script>
import Box from "~/components/Dashboard/plans/active-plan/box.vue";
import CircleProgress from "~/components/Dashboard/circle-progress-bar";

export default {
  name: "ActivePlan",
  components: {
    Box,
    CircleProgress
  },
  props: ['type','title','memory_limit','percent'],
  methods: {
    toggle(index) {
      if (index === this.isShow) {
        this.isShow = -1;
        return;
      }
      this.isShow = index;
    }
  }
};
</script>

<style lang="stylus" scoped>
.active
  box-shadow none
.service
  width 100%
  &-wrapper
    display flex
  &--half
    width 50%
  &---box
    position relative
    display flex
  &----item
    display flex
    // padding 0 10px 0 25px
    flex 1 1
    justify-content space-around
    align-items center
    &-second
      justify-content space-around
      width 100%
    @media (max-width: 992px)
      flex inherit
      min-width 160px
    @media (max-width: 566px)
      flex 1
      justify-content space-around
      min-width 30px
  &----line
    width 2px
    background-color #e7e8ea
  &-----text
    display flex
    flex-direction column
  &------title
    margin-bottom 20px
    color #4f4f4f
    font-size 18px
    line-height 1.72
    @media (max-width: 566px)
      font-size 12px
  &------price
    color #4f4f4f
    font-weight bold
    font-size 18px
    line-height 1.72
    @media (max-width: 566px)
      font-size 12px
  &-----information
    display flex
    flex-direction column
    justify-content space-between
    align-items center
    padding-top 10px
  &------name
    margin 10px 0 10px 0
    color #4f4f4f
    font-size 16px
    font-family Roboto-Bold
    line-height 1.19
    @media (max-width: 566px)
      font-size 12px
  &------info
    color #4f4f4f
    font-size 16px
    font-family Roboto
    line-height 1.19
    @media (max-width: 566px)
      font-size 12px
.circle-container
  width 40%
</style>
