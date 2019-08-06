<template>
  <div class="wrapper-default">
    <f-header/>
    <nuxt/>
    <div class="row" style="width: 100%; background-color: #001069; height: max-content; position: relative; display: flex">

      <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12" style="display: flex; box-sizing: padding-box">
        <div style=" padding: 32px 24px; width: max-content">
          <p style="  font-family: iran-yekan; font-size: 1.4em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #fefefe;">محصولات</p>
          <p style="  font-family: iran-yekan; font-size: 1.2em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #c4c2c2;">سرویس‌های مدیریت شده</p>
          <p style="  font-family: iran-yekan; font-size: 1.2em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #c4c2c2;">سرویس‌های مستقیم</p>
          <p style="  font-family: iran-yekan; font-size: 1.2em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #c4c2c2;">ذخیره سازی</p>
        </div>
        <div style="width: max-content; padding: 32px 24px;">
          <p style="  font-family: iran-yekan; font-size: 1.4em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #fefefe;">منابع</p>
          <p style="  font-family: iran-yekan; font-size: 1.2em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #c4c2c2;">مستندات</p>
          <p style="  font-family: iran-yekan; font-size: 1.2em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #c4c2c2;">آموزش‌ها</p>
          <p style="  font-family: iran-yekan; font-size: 1.2em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #c4c2c2;">وبلاگ</p>
        </div>
        <div style="width: max-content; padding: 32px 24px;">
          <p style="  font-family: iran-yekan; font-size: 1.4em;font-weight: bold;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #fefefe;">پشتیبانی</p>
          <p style="  font-family: iran-yekan; font-size: 1.2em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #c4c2c2;">پشتیبانی</p>
          <p style="  font-family: iran-yekan; font-size: 1.2em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #c4c2c2;">درباره ما</p>
          <p style="  font-family: iran-yekan; font-size: 1.2em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: right;color: #c4c2c2;">تماس با ما</p>
        </div>
      </div>

      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12" style="display: flex; flex-direction: column;padding: 32px 24px;">


        <p style="  font-family: iran-yekan; font-size: 1.1em;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.72;letter-spacing: normal;text-align: center;color: #fefefe; margin-top: 0">ثبت‌نام در خبرنامه قندق</p>
        <div style="width: 100%; max-width: 450px;  border-radius: 10px; background-color: #ffffff; height: 54px;display: flex; padding: 4px; margin: 0 auto;">
          <button style="width: 100px; height: 100%; background-color: #00ffff; border-radius: 10px; color: #3c3c3c; text-align: center; font-weight: bold">
            تایید
          </button>
          <input style="flex: 1; padding: 0 12px; outline: none;"
                 type="email"
            placeholder="آدرس ایمیل شما"/>
        </div>

        <div style="width: 100%; display: flex; justify-content: right; max-width: 450px; margin: 16px auto 0 auto">

          <img src="../assets/img/twitter-logo-button.png" style="margin-left: 12px"/>
          <img src="../assets/img/github-logo.png" style="margin-left: 12px"/>
          <img src="../assets/img/closed-envelope-circle.png" style="margin-left: 12px"/>

        </div>



      </div>

      <div style="width: 100%; margin-top: 16px; display: flex; flex-direction: column">

        <img src="../assets/svg/ic-fandogh-mini.svg" style="margin-left: auto; margin-right: auto" width="54px">
        <p style=" margin-top: 12px; width: 100%; padding-left: 25%; padding-right: 25%;  font-family: iran-yekan; font-size: 1.3em; font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.75;letter-spacing: normal;text-align: center;color: #f8f8f8;">
          تمام حقوق مادی و معنوی این سایت متعلق به سکوی ابری فندق است
        </p>

      </div>

    </div>
    <alert/>
  </div>
</template>

<script>
import FHeader from '~/components/Header'
import FFooter from '~/components/Footer'
import Alert from "~/components/Dashboard/alert";

import 'normalize.css'
export default {
  components: {
    FHeader,
    FFooter,
    Alert
  },
  computed: {
    message() {
      return this.$store.state.message
    }
  },
  mounted() {
    let elm = document.querySelector('#raychatFrame')
    if (!elm) {
      const raychatScript = document.createElement('script')
      raychatScript.innerText = '!function(){function t(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,localStorage.getItem("rayToken")?t.src="https://app.raychat.io/scripts/js/"+o+"?rid="+localStorage.getItem("rayToken")+"&href="+window.location.href:t.src="https://app.raychat.io/scripts/js/"+o;var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}var e=document,a=window,o="b34779ab-3e49-4256-8f71-ec8ae7e76d64";"complete"==e.readyState?t():a.attachEvent?a.attachEvent("onload",t):a.addEventListener("load",t,!1)}();'
      document.head.appendChild(raychatScript)
    }

  },
  watch: {
    $route() {
      if (this.message) {
        this.$store.dispatch('setMessage', this.message)
        this.$store.dispatch('showModal', 'message')
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/main.styl'

.wrapper-default
  display block
  box-sizing border-box
  width 100%
</style>
