<template>
  <div class="row">
    <div class="col-md-6 col-xs-12">
      <h2>تنظیمات</h2>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="نام کاربری :" :value="account.username"/>
      </div>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="آدرس ایمیل :" :value="account.email"/>
      </div>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="نام :" :value="account.name"/>
      </div>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="نام خانوادگی :" :value="account.last_name"/>
      </div>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="کد ملی :" :value="account.code"/>
      </div>
      <div class="fandogh-form-group right">
        <div class="box-checkbox">
          <div class="box-checkbox-input">
            <f-checkbox
              styles="light input-checkbox-disable"
              v-model="account.news"
              id="news"
              title="دریافت خبرنامه"
            />
          </div>
          <div class="box-checkbox-info">
            <span class="mute-text">(مایل به دریافت خبرنامه‌های فندق هستم.)</span>
          </div>
        </div>
      </div>
      <div class="fandogh-form-group margin-top-100">
        <f-button @onClick="accountEdit" styles="blue">ویرایش اطلاعات</f-button>
        <!-- <f-button v-if="loading && !loadingProgress" styles="red block">در حال ساخت</f-button> -->
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
  components: {
    FInput,
    FButton,
    File,
    ProgressBar,
    FLabelDisable,
    FCheckbox
  },
  mounted() {
    this.$store.commit("SET_DATA", { data: false, id: "loading" });
    this.$ga.event({
      eventCategory: "account",
      eventAction: "show information"
    });
  },
  methods: {
    accountEdit() {
      this.$ga.event({
        eventCategory: "account",
        eventAction: "click btn edit information"
      });
      this.$router.push("/dashboard/account/edit");
    }
  }
};
</script>


<style lang="stylus">
.box-checkbox
  display flex
.fandogh-form-group
  margin-bottom 45px
</style>