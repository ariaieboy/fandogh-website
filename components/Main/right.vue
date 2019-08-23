<template>
    <section class="right-main">
        <div class="text">
            <h1>
                همه چیز با یه <progress-hover>داکرفایل</progress-hover> شروع میشه ...
            </h1>
            <p>
                فندق یه PaaS است که به شما این امکان رو میده که سرویس‌های خودتون رو بر روی سرورهای ابری مستقر کنید و نگران مدیریت سرورها و سرویس‌هایی که نیاز دارید نباشید.
            </p>
        </div>
        <div class="registration">

            <f-button v-if="!loggedIn" path="/user/login" styles="red small login" > ورود </f-button>
            <f-button v-if="!loggedIn" path="/user/register" styles="blue small" > ثبت نام </f-button>

            <f-button v-if="loggedIn" @onClick="logout" styles="red small login">خروج</f-button>
            <f-button v-if="loggedIn" path="/dashboard/images" styles="blue small">داشبورد</f-button>
        </div>

    </section>
</template>

<script>
import FButton from '~/components/elements/button'
export default{
  components:{
    FButton
  },
  methods:{
    showModal(modal){
       this.$store.dispatch('showModal', modal)
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    }
  },
  computed:{
    loggedIn() {
      return this.$store.state.user.token;
    },
  }
}
</script>

<style lang="stylus" scoped>

    .registration
        margin-top 50px
        button
            margin-left 10px
    .right-main
        position relative
        margin-top 60px
        .message
            color greenyellow
        .error
            color red


    input
        padding 20px
        width 100%
        box-sizing: border-box
        border-radius 10px
        border none

    @media only screen and (max-width: 576px)
        .right-main
            .text
                padding 0 15px
        .registration
            text-align center
        .registration
            button
                margin 5px


</style>
