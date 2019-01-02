<template>
  <div class="row">
    <div class="col-md-6 col-xs-12">
      <h2>تغییر رمز عبور</h2>
      <div class="fandogh-form-group">
        <label>رمز عبور قبلی</label>
        <f-input
          v-model="current_password"
          styles="input-white input-block input-dashboard"
          placeholder="رمز عبور قبلی را وارد کنید"
        ></f-input>
      </div>
      <div class="fandogh-form-group">
        <label>رمز عبور جدید</label>
        <f-input
          v-model="new_password"
          styles="input-rtl input-yekan input-white input-block input-dashboard"
          placeholder="رمز عبور جدید را وارد کنید"
        ></f-input>
      </div>
      <div class="fandogh-form-group">
        <label>تکرار رمز عبور</label>
        <f-input
          v-model="re_new_password"
          styles="input-rtl input-yekan input-white input-block input-dashboard"
          placeholder="رمز عبور خود را تکرار کنید"
        ></f-input>
      </div>
      <div class="fandogh-form-group margin-top-100">
        <f-button @onClick="saveEdit" styles="red block">تغییر رمز عبور</f-button>
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
      loadingProgress: false,
      re_new_password: '',
      new_password: '',
      current_password: '',
    };
  },
  computed: {
    username() {
      return getValue("username")
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

  methods: {
    async saveEdit() {
      if (this.new_password !== this.re_new_password) {
        this.$notify({
          title: 'رمز عبور و تکرار رمز عبور شما یکسان نیست',
          time: 4000,
          type: 'error'
        })
        return
      }
      if (!FormValidator(this.$data, { current_password: { required: true, name: 'پسورد فعلی' } })) return
      this.loadingProgress = true;
      this.$ga.event({
        eventCategory: "account",
        eventAction: "save update information password"
      });
      this.$store.dispatch("updateAccount", {
        username: getValue("username"),
        "current_password": this.current_password,
        "new_password": this.new_password,
      }).then(res => {
        this.$notify({
          title: 'رمز عبور شما با موفقیت بروز رسانی شد.',
          time: 4000,
          type: 'success'
        })
        this.$router.push("/dashboard/account");
      }).catch(e => {
        this.$notify({
          title: ErrorReporter(e, this.$data),
          time: 4000,
          type: "error"
        });
      })

      this.loadingProgress = false;
    }
  }
};
</script>