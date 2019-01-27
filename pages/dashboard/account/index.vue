<template>
  <div class="row">
    <div class="col-xs-12" :class="{'col-md-9':openSidebar , 'col-md-6':!openSidebar}">
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="نام کاربری :" :value="username"/>
      </div>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="آدرس ایمیل :" :value="email"/>
      </div>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="نام :" :value="account.first_name"/>
      </div>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="نام خانوادگی :" :value="account.last_name"/>
      </div>
      <div class="fandogh-form-group">
        <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
        <f-label-disable label="کد ملی :" :value="account.national_id"/>
      </div>
      <div class="fandogh-form-group right">
        <div class="box-checkbox">
          <div class="box-checkbox-input">
            <f-checkbox
              styles="light input-checkbox-disable"
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
        <f-button @onClick="accountEdit" styles="blue ml-45" class>ویرایش اطلاعات</f-button>
        <f-button @onClick="accountPassword" styles="red">تغییر رمز عبور</f-button>
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
  components: {
    FInput,
    FButton,
    File,
    ProgressBar,
    FLabelDisable,
    FCheckbox
  },
  data() {
    return {
      // account: {
      //   username: "Ramin",
      //   name: "رامین",
      //   email: "Ramin.esmaeili91@yahoo.com",
      //   last_name: "اسماعیلی",
      //   code: "۰۰۱۱۴۶۵۸۲۹۸۷",
      //   news: false
      // },
      loading: false,
      loadingProgress: false
    };
  },
  computed: {
    openSidebar() {
      return this.$store.state.sideMunu
    },
    account() {
      return this.$store.state.account;
    },
    email() {
      return getValue("email");
    },
    progress() {
      return this.$store.state.progress;
    },
    username() {
      return getValue("username");
    }
  },

  mounted() {
    this.$ga.event({
      eventCategory: "account",
      eventAction: "show information"
    });
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let res = await this.$store.dispatch("getAccount", {
          username: getValue("username")
        });
        if (res.newsletter_subscriber) {
          let elm = document.querySelector("#newsletter_subscriber");
          elm.click();
        }
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      } catch (e) {
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
        if (e.status === 401) {
          this.$router.push("/user/login");
        }
      }
    },
    accountEdit() {
      this.$ga.event({
        eventCategory: "account",
        eventAction: "click btn edit information"
      });
      this.$router.push("/dashboard/account/edit");
    },
    accountPassword() {
      this.$ga.event({
        eventCategory: "account",
        eventAction: "click btn edit information"
      });
      this.$router.push("/dashboard/account/password");
    }
  }
};
</script>


<style lang="stylus">
.box-checkbox
  display flex
  @media only screen and (max-width: 768px)
    flex-direction column
    > div
      margin-bottom 15px
</style>