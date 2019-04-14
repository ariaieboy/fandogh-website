<template>
  <f-modal ref="modal" :show="show" v-show="show">
    <p class="_message">{{message}}</p>
    <div class="fandogh-form-group center margin-20">
      <f-button @onClick="close" styles="red 80">تایید</f-button>
    </div>
  </f-modal>
</template>

<script>

import FModal from '~/components/elements/modal'
import FButton from '~/components/elements/button'


export default {
  components: {
    FModal,
    FButton,
  },
  mounted() {
    this.$refs.modal.$on('onOverlay', function () {
      this.$store.dispatch('showModal', false)
      this.$store.dispatch('setMessage', null)
    })
  },
  methods: {
    close() {
      this.$store.dispatch('showModal', false)
      this.$store.dispatch('setMessage', null)
    },
  },
  computed: {
    show() {
      return this.$store.state.modals.message
    },
    message() {
      return this.$store.state.message
    }
  }
}
</script>

<style scoped lang="stylus">
._message
  margin-bottom 30px
  color #fff
  text-align center
  line-height 2
</style>
