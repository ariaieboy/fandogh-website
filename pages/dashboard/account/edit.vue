<template>
  <div class="row">
    <div class="col-md-6 col-xs-12">
      <h2>تنظیمات</h2>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="نام کاربری :" :value="account.username"/>
      </div>
      <div class="fandogh-form-group">
        <label>آدرس ایمیل</label>
        <f-input
          v-model="account.email"
          styles="input-white input-block input-dashboard"
          placeholder="آدرس ایمیل خود را وارد کنید"
        ></f-input>
      </div>
      <div class="fandogh-form-group">
        <label>نام</label>
        <f-input
          v-model="account.name"
          styles="input-rtl input-yekan input-white input-block input-dashboard"
          placeholder="نام خود را وارد کنید"
        ></f-input>
      </div>
      <div class="fandogh-form-group">
        <label>نام خانوادگی</label>
        <f-input
          v-model="account.last_name"
          styles="input-rtl input-yekan input-white input-block input-dashboard"
          placeholder="نام خانوادگی خود را وارد کنید"
        ></f-input>
      </div>
      <div class="fandogh-form-group">
        <label>کد ملی</label>
        <f-input
          v-model="account.code"
          styles="input-rtl input-yekan input-white input-block input-dashboard"
          placeholder="کد ملی خود را وارد کنید"
        ></f-input>
      </div>
      <div class="fandogh-form-group right">
        <div class="box-checkbox">
          <div class="box-checkbox-input">
            <f-checkbox styles="light" v-model="account.news" id="news" title="دریافت خبرنامه"/>
          </div>
          <div class="box-checkbox-info">
            <span class="mute-text">(مایل به دریافت خبرنامه‌های فندق هستم.)</span>
          </div>
        </div>
      </div>
      <div class="fandogh-form-group margin-top-100">
        <f-button v-if="!loadingProgress" @onClick="saveEdit" styles="red block">ویرایش</f-button>
        <f-button v-if="loadingProgress" styles="red block">در حال آپدیت ...</f-button>
        <!-- <progress-bar v-if="loadingProgress" :progress="progress"></progress-bar> -->
      </div>
    </div>
  </div>
</template>

<script>
import FInput from "~/components/elements/input";
import FButton from "~/components/elements/button";
import File from "~/components/elements/file";
import { formData } from "~/utils/formData";
import ProgressBar from "~/components/Dashboard/progress-bar";
import ErrorReporter from "~/utils/ErrorReporter";
import FormValidator from "~/utils/formValidator";
import FLabelDisable from "~/components/elements/label/label-disable";
import FCheckbox from "~/components/elements/checkbox";

export default {
  layout: "dashboard",
  name: "account",
  data() {
    return {
      account: {
        username: "Ramin",
        name: "رامین",
        email: "Ramin.esmaeili91@yahoo.com",
        last_name: "اسماعیلی",
        code: "۰۰۱۱۴۶۵۸۲۹۸۷",
        news: false
      },
      loading: false,
      loadingProgress: false
    };
  },
  computed: {
    progress() {
      return this.$store.state.progress;
    }
  },
  mounted() {
    this.$store.commit("SET_DATA", { data: false, id: "loading" });
  },
  components: {
    FInput,
    FButton,
    File,
    ProgressBar,
    FLabelDisable,
    FCheckbox
  },
  methods: {
    saveEdit() {
      this.loadingProgress = true;
      this.$ga.event({
        eventCategory: "account",
        eventAction: "save update information"
      });
      this.loadingProgress = false;
    }
  }
};
</script>