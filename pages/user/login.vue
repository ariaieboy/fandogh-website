<template>
  <div class="flex centered-page">
    <login :disableOverlay="true" :noModal="true" force="true"> </login>
  </div>
</template>

<script>
  import Login from  '~/components/Auth/Login.vue'
  export default {
    components: {
      Login
    },
    mounted(){
      this.$store.dispatch('logout')
    }
  }
</script>