<template>
  <div>
    <div class="box middle-xs ">

      <div>
        <div class="wrap">
          <img :alt="title" :src="image" />
        </div>
        <div class="text-container">
          <p class="title"> {{title}} </p>
          <p class="local_title"> {{local_title}} </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import img from "~/assets/svg/ic-auto-scale.svg";
export default {
  props: ["icon", "title", "local_title"],
  data() {
    return {
      "auto-scale": require("~/assets/svg/ic-auto-scale.svg"),
      "cost-effective": require("~/assets/svg/ic-cost-effective.svg"),
      docker: require("~/assets/svg/ic-docker.svg"),
      database: require("~/assets/svg/ic-managed-d-bs.svg"),
      ready: require("~/assets/svg/ic-ready-tg.svg"),
      highly: require("~/assets/svg/ic-highly-av.svg")
    };
  },
  computed: {
    image() {
      return this.$data[this.icon];
    }
  }
};
</script>

<style lang="stylus" scoped>
.box
  display flex
  margin 1rem 0
  min-height 270px
  border-radius 10px
  background-color rgba(0, 0, 0, 0.1)
  text-align center
.box
  .wrap
    display inline-block
    padding 5px
    width 100px
    height 100px
    vertical-align top
    img
      position relative
      top 50%
      margin-right auto
      margin-left auto
      width 100px
      transform translateY(-50%)
  div.text-container
    width auto
.title
  font-weight bold
.box
  margin-left 0
  div
    top 0
    display block
    width 100%
    text-align center
    transform none
/* @media only screen and (max-width: 991px) */
/*  */
/*  */
/*  */
</style>

