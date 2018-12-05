<template>
  <div
    class="close-half"
    @click="toggleMenu(3)"
  >
    <img 
      src="./icons/ic_arrowRight.svg"
      alt="arrow-right"
      class="close-half-icon"
      :class="{'revers-icon':showHalf}"
    >
  </div>
</template>

<script>
export default {
  name: "close-half",
  computed:{
    showHalf() {
      return this.$store.state.sidebar === 3;
    }
  },
  methods: {
    toggleMenu(type) {
      this.$store.dispatch("toggleSidebar", type);
    }
  }
};
</script>

<style lang="stylus" scoped>
.close-half
  position absolute
  left -30px
  z-index 99
  display flex
  justify-content center
  width 30px
  height 70px
  border-bottom-left-radius 20px
  background-color rgb(47, 30, 161)
  box-shadow -2px 0 6px 0 rgba(21, 0, 113, 0.36)
  &-icon
    align-self center
    width 8px
    transition all 0.3s ease-in
  .revers-icon 
     transform scale(-1,1)
     transition all 0.3s ease-out

</style>
