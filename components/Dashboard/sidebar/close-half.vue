<template>
  <div class="close-half" @click="toggleMenu('halfSidebar')">
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
  computed: {
    showHalf() {
      return this.$store.state.sidebar === "halfSidebar";
    }
  },
  methods: {
    toggleMenu(type) {
      if (this.showHalf) {
        this.$store.dispatch("TOGGLE_NAV", { data: null, id: "sidebar" });
      } else {
        this.$store.dispatch("TOGGLE_NAV", { data: type, id: "sidebar" });
      }
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
    transition all 0.3s ease-out
    transform scale(-1, 1)
</style>
