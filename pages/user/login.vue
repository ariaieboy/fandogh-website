<template>
    <div style="  background-image: linear-gradient(to bottom, #0045ff, #002380); min-height: 1000px">
        <vlogin></vlogin>
    </div>
</template>

<script>
    import Login from '~/components/Auth/Login.vue'
    import Vlogin from "../../components/Auth/vlogin";

    export default {
        components: {
            Vlogin,
            Login
        },
        mounted() {
            // this.$store.dispatch('logout')
        }
    }
</script>
