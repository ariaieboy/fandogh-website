<template>
  <div class="row">
    <div class="col-md-6 col-xs-12">
      <h2>تنظیمات</h2>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="نام کاربری :" :value="username"/>
      </div>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="آدرس ایمیل :" :value="email"/>
      </div>
      <div class="fandogh-form-group">
        <label>نام</label>
        <f-input
          v-model="account.first_name"
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
          v-model="account.national_id"
          styles="input-rtl input-yekan input-white input-block input-dashboard"
          placeholder="کد ملی خود را وارد کنید"
        ></f-input>
      </div>
      <div class="fandogh-form-group right">
        <div class="box-checkbox">
          <div class="box-checkbox-input">
            <f-checkbox
              styles="light"
              v-model="account.newsletter_subscriber"
              id="newsletter_subscriber"
              title="دریافت خبرنامه"
            />
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
import { getValue } from "~/utils/cookie";

export default {
  layout: "dashboard",
  name: "account",
  data() {
    return {
      loading: false,
      loadingProgress: false
    };
  },
  computed: {
    username() {
      return getValue("username")
    },
    email() {
      return getValue("email")
    },
    progress() {
      return this.$store.state.progress;
    },
    account() {
      return this.$store.state.account
    },
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
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        let res = await this.$store.dispatch("getAccount", { username: getValue("username") });
        if (res.newsletter_subscriber) {
          let elm = document.querySelector('#newsletter_subscriber')
          elm.click()
        }
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      } catch (e) {
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
        if (e.status === 401) {
          this.$router.push("/user/login");
        }
      }
    },
    async saveEdit() {
      if (!/^\d{10}$/.test(this.account.national_id) && this.account.national_id) {
        this.$notify({
          title: 'از کاراکتر های مجاز استفاده کنید',
          time: 4000,
          type: "error"
        });
        return
      }
      this.$ga.event({
        eventCategory: "account",
        eventAction: "save update information"
      });
      let body = {
        username: getValue("username"),
        national_id: this.account.national_id !== '' ? this.account.national_id : null,
        newsletter_subscriber: this.account.newsletter_subscriber !== '' ? this.account.newsletter_subscriber : null,
        first_name: this.account.first_name,
        last_name: this.account.last_name
      }
      try {
        await this.$store.dispatch("updateAccount", body)
        this.$notify({
          title: 'پروفایل شما با موفقیت بروزرسانی شد',
          time: 4000,
          type: 'success'
        })
        this.$router.push("/dashboard/account");
      } catch (error) {
        console.log(error);
        this.$alertReport(error)
      }
    }
  }
};
</script>