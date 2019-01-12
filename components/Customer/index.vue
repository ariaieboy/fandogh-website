<template>
  <div class="customer">
    <div class="container">
      <div class="text">
        <h2 class="title">فندقی‌ها</h2>
        <p class="description">برخی از مشتری‌های فندق</p>
      </div>
      <div class="customer-wrapper">
        <div class="customer-item-wrapper">
          <div class="customer-items" v-for="item in items">
            <div class="customer-item" v-for="image in item" @click="setActive(image)">
              <img :src="`${image.logo}`" alt>
              <a :href="image.link">{{image.text}}</a>
            </div>
          </div>
        </div>
        <div class="customer-banner">
          <div class="customer-banner-item">
            <!-- <img :src="activeImage" alt> -->
            <span :style="{'background-image':'url('+activeImage+')'}"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customer",

  data() {
    return {
      activeImage: "img/customer/cover-roozame.png",
      items: [
        [
          {
            logo: "img/customer/logo-roozame.png",
            id: 1,
            cover: "img/customer/cover-roozame.png",
            text: "roozame.com",
            link: "https://roozame.com/"
          },
          {
            logo: "img/customer/logo-salameno.png",
            id: 2,
            cover: "img/customer/cover-salameno.png",
            text: "salameno.ir",
            link: "http://salameno.ir"
          }
        ],
        [
          {
            logo: "img/customer/logo-botick.png",
            id: 3,
            cover: "img/customer/botick-v.jpg",
            text: "botick.com",
            link: "https://botick.com"
          },
          {
            logo: "img/customer/logo-pay-ping-small.png",
            id: 4,
            cover: "img/customer/cover-payping.jpg",
            text: "payping.ir",
            link: "https://www.payping.ir"
          }
        ]
      ]
    };
  },
  methods: {
    setActive(item) {
      this.activeImage = item.cover;
    }
  }
};
</script>

<style lang="stylus" scoped>
.customer
  display flex
  padding-bottom 100px
  height 850px
  &-wrapper
    display flex
    margin-top 40px
  &-items
    display flex
    align-items center
    align-content center
  &-item
    display flex
    flex-direction column
    justify-content center
    align-items center
    align-content center
    margin-bottom 20px
    margin-left 30px
    min-width 270px
    min-height 180px
    border-radius 10px
    background-color rgba(0, 0, 0, 0.14)
    a
      margin-top 20px
      color #fff
      font-weight bold
      font-size 24px
      font-family Roboto
    &:last-child
      margin-left 0
  &-banner
    margin-right 30px
    width 100%
  &-banner-item
    position relative
    overflow hidden
    margin 0
    padding-top 66%
    width 100%
    span
      position absolute
      top 0
      right 0
      width 100%
      height 100%
      border-radius inherit
      background-position 50%
      background-size cover
</style>
