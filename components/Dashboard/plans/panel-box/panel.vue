<template>
  <div class="service" @click.stop="$emit('onClick')">
    <box :hasShadow="!isActive">
      <div class="service---box">
        <div class="service----item">
          <div class="service-----image">
            <img :src="'/icons/plans/services-icon/'+icon">
          </div>
          <div class="service-----text">
            <span class="service------title">
              {{title}}
              <img
                src="~/static/icons/plans/info-button.png"
                @click.stop.prevent="$emit('clickInfo')"
              >
              <!-- tooltipShow -->
            </span>
            <tooltip v-if="tooltipShow" :list="list" :description="description"/>
            <span class="service------price">
              {{price}}
              <label class="font-10">تومان</label>
            </span>
          </div>
        </div>
        <div class="service----line"></div>
        <div class="service----item service----item-second">
          <!-- <div class="service-----information">
            <span class="service------image">
              <img :src="'/icons/plans/cpu.png'" alt>
            </span>
            <span class="service------name font-roboto">CPU</span>
            <span class="service------info">{{cpu}}</span>
          </div>-->
          <div class="service-----information">
            <span class="service------image">
              <img :src="'/icons/plans/memory.png'" alt>
            </span>
            <span class="service------name font-roboto">RAM</span>
            <span class="service------info">{{ram}}</span>
          </div>
          <div class="service-----information">
            <span class="service------image">
              <img :src="'/icons/plans/dedicatedVolume.png'" alt>
            </span>
            <span class="service------name font-roboto">Storage</span>
            <span class="service------info">{{space}}</span>
          </div>
        </div>
      </div>
    </box>
    <div class="service-description">
      <div class="service-description-content" v-show="isShow">
        <h3 class="service-description-heading">ویژگی‌ها :</h3>
        <div class="bullet-list" v-for="item in list">
          <span class="bullet"></span>
          <p>{{item}}</p>
        </div>
        <h3 class="service-description-heading">توضیحات :</h3>
        <p class="service-description-text">{{description}}</p>
      </div>
      <div class="plan-description-toggle" v-on:click.stop="$emit('toggle')">
        <p>توضیحات</p>
      </div>
    </div>
  </div>
</template>

<script>
import Box from "~/components/Dashboard/plans/panel-box/box.vue";
import tooltip from "./tooltip";

export default {
  name: "panel",
  components: {
    Box,
    tooltip
  },
  props: [
    "tooltipShow",
    "isShow",
    "isActive",
    "features",
    "text",
    "icon",
    "title",
    "price",
    "space",
    "memory",
    "cpu",
    "description",
    "list"
  ],

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
      width 100%
    @media (max-width: 992px)
      flex inherit
      min-width 130px
    @media (max-width: 566px)
      min-width 51px
  &----line
    width 2px
    background-color #e7e8ea
    // width 50%
  &-----image
    @media (max-width: 992px)
      display none
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
    img
      // &:hover
      // .tooltip-container
      // display block !important
      @media (max-width: 992px)
        display none
      @media (max-width: 566px)
        width 16px
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
.service-description
  display flex
  flex-direction column
  margin 0 15px
  margin-bottom 20px
  @media (min-width: 992px)
    display none
  .service-description-content
    display flex
    flex-direction column
    align-items flex-start
    padding 5px 10px
    border solid 1px #e7e8ea
    background-color #ffffff
    line-height 1.75
.plan-description-toggle
  z-index 1
  display inline-block
  margin 0 auto
  margin-bottom 20px
  width 99%
  height 40px
  border solid 1px #e7e8ea
  border-bottom-right-radius 10px
  border-bottom-left-radius 10px
  background-color #e7e8ea
  box-shadow 0 3px 6px 0 rgba(0, 0, 0, 0.16)
  text-align center
  p
    color #fff
    font-weight bold
    font-size 12px
.bullet-list
  display flex
  align-items baseline
  p
    margin 0
    line-height 1.75
.bullet
  margin-left 10px
  width 8px
  height 8px
  border-radius 50%
  background-color #ff859e
.service-description-heading
  color #000
  font-size 14px
.service-description-text
  margin 0
  color rgb(79, 79, 79)
  text-align justify
  font-size 12px
</style>
