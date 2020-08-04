<template>

</template>

<script>
    export default {
      beforeMount(){
          this.$store.dispatch('activation', {code: this.$route.query.code, id: this.$route.query.user_id}).then(res => {
            this.$store.dispatch('setMessage', res.message)
            this.$router.push('/')
          }).catch(e => {
            this.$store.dispatch('setMessage', e)
            this.$router.push('/')
          })
      }
    }
</script>