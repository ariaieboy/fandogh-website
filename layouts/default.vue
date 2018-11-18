<template>
  <div class="wrapper" >
    <f-header />
    <nuxt/>
    <f-footer />
  </div>
</template>

<script>
  import FHeader from '~/components/Header'
  import FFooter from '~/components/Footer'
  import 'normalize.css'
  export default {
    components: {
      FHeader,
      FFooter
    },
    computed:{
      message(){
        return this.$store.state.message
      }
    },
    mounted() {
      const raychatScript = document.createElement('script')
      raychatScript.innerText = '!function(){function t(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,localStorage.getItem("rayToken")?t.src="https://app.raychat.io/scripts/js/"+o+"?rid="+localStorage.getItem("rayToken")+"&href="+window.location.href:t.src="https://app.raychat.io/scripts/js/"+o;var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}var e=document,a=window,o="b34779ab-3e49-4256-8f71-ec8ae7e76d64";"complete"==e.readyState?t():a.attachEvent?a.attachEvent("onload",t):a.addEventListener("load",t,!1)}();'
      document.head.appendChild(raychatScript)
    },
    watch:{
      $route(){
        if(this.message) {
          this.$store.dispatch('setMessage', this.message)
          this.$store.dispatch('showModal', 'message')
        }
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/css/main.styl'
  .wrapper
    width 100%
    background linear-gradient(to left, #0f0050, #160074)
    display block
    box-sizing border-box
</style>
