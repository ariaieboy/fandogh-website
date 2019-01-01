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
            <div class="customer-item" v-for="image in item">
              <img :src="`${image.src}`" alt>
              <a href>botick.com</a>
            </div>
          </div>
        </div>
        <div class="customer-banner">
          <div class="customer-banner-item">
            <img src="./images/img-roozame-cover.png" alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customer',
  data() {
    return {
      items: [
        [
          { src: 'img/customer/logo-dark.png', id: 1 },
          { src: 'img/customer/salameno.png', id: 2 }
        ],
        [
          { src: 'img/customer/botick.png', id: 3 },
          { src: 'img/customer/roozame.png', id: 4 }
        ],
      ]
    }
  },
}
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
</style>
