<template>
  <div class="row">
    <div class="col-md-6 col-xs-12">
      <h2>ساخت سکرت</h2>
      <div class="fandogh-form-group">
        <label>نام سکرت</label>
        <f-input
          name="name"
          v-model="name"
          styles="input-white input-block input-dashboard input-disable"
          placeholder="نام سکرت"
        ></f-input>
      </div>
      <div class="fandogh-form-group">
        <label>نوع سکرت</label>
        <f-input v-model="type" styles="input-white input-block input-dashboard input-disable"></f-input>
      </div>
      <div class="fandogh-form-group">
        <label>سرور</label>
        <f-input
          name="server"
          v-model="server"
          styles="input-white input-block input-dashboard"
          placeholder="آدرس URL رجیستری"
        ></f-input>
      </div>
      <div class="fandogh-form-group">
        <label>نام کاربری</label>
        <f-input
          name="username"
          v-model="username"
          styles="input-white input-block input-dashboard"
          placeholder="نام‌کاربری برای احراز هویت در رجیستری"
        ></f-input>
      </div>
      <div class="fandogh-form-group">
        <label>پسورد</label>
        <f-input
          name="password"
          v-model="password"
          styles="input-white input-block input-dashboard"
          placeholder="رمزعبور برای احراز هویت در رجیستری"
        ></f-input>
      </div>
      <div class="fandogh-form-group">
        <label>ایمیل (اختیاری)</label>
        <f-input
          name="email"
          v-model="email"
          styles="input-white input-block input-dashboard"
          placeholder="آدرس ایمیل"
        ></f-input>
      </div>
      <div class="fandogh-form-group margin-top-100">
        <f-button v-if="!loading" @onClick="putSecret" styles="red block">اتمام ساخت</f-button>
        <f-button v-if="loading && !loadingProgress" styles="red block">در حال ساخت</f-button>
        <progress-bar v-if="loadingProgress" :progress="progress"></progress-bar>
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

export default {
  layout: "dashboard",
  name: "secret-name",
  data() {
    return {
      type: "docker-registry",
      server: "",
      username: "",
      password: "",
      email: "",
      loading: false,
      loadingProgress: false
    };
  },
  computed: {
    progress() {
      return this.$store.state.progress;
    },
    name() {
      return this.$route.params.name;
    }
  },
  components: {
    FInput,
    FButton,
    File,
    ProgressBar
  },
  destroyed() { },
  mounted() {
    this.$store.commit("SET_DATA", { data: false, id: "loading" });
    this.$ga.event({
      eventCategory: "secret",
      eventAction: "put secret"
    });
  },
  methods: {
    putSecret() {
      this.loading = true;
      if (!FormValidator(this.$data, { server: { required: true }, username: { required: true }, password: { required: true } })) return false;

      this.$store
        .dispatch("putSecret", {
          name: this.name,
          type: this.type,
          fields: {
            server: this.server,
            username: this.username,
            password: this.password,
            email: this.email
          }
        })
        .then(res => {
          this.$ga.event({
            eventCategory: "secret",
            eventAction: "secret put",
            eventLabel: "secret name",
            eventValue: this.name
          });
          this.$notify({
            title: res.message,
            time: 3000,
            type: "success"
          });
          this.$router.push(`/dashboard/secret`);
        })
        .catch(e => {
          this.loading = false;
          this.$ga.event({
            eventCategory: "secret",
            eventAction: "fail create  secret",
            eventLabel: "secret name",
            eventValue: this.name
          });
          ErrorReporter(e, this.$data, true).forEach(error => {
            this.$notify({
              title: error,
              time: 4000,
              type: "error"
            });
          });
        });
    }
  }
};
</script>