<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <div class="fandogh-form-group">
          <f-input v-model="image" styles="input-white input-block input-dashboard input-disable"></f-input>
        </div>
        <div class="fandogh-form-group">
          <f-input v-model="version" styles="input-white input-block input-dashboard input-disable"></f-input>
        </div>
        <div class="fandogh-form-group">
          <f-input v-model="date" styles="input-white input-block input-dashboard input-disable"></f-input>
        </div>
      </div>
      <div class="col-sm-6"></div>
    </div>
    <log :logs="logs"/>
  </div>
</template>

<script>
import Log from "~/components/Dashboard/log/‌index";
import FInput from "~/components/elements/input";
import FDate from "~/utils/date";
export default {
  layout: "dashboard",
  async asyncData({ store, route, redirect }) {
    try {
      await store.dispatch("getImageVersionBuilds", {
        name: route.params.image,
        version: route.params.version
      });
    } catch (e) {
      redirect("/");
    }
  },
  data() {
    return {
      image: "نام ایمیج‌: " + this.$route.params.image,
      version: "ورژن‌: " + this.$route.params.version,
      date: "",
      logInterval: null
    };
  },
  mounted() {
    this.$store.commit("SET_DATA", { data: false, id: "loading" });
    this.date = "تاریخ ساخت: " + FDate({ date: this.builds.start_date });
    let state = this.builds.state.toLowerCase();
    if (state === "building") {
      this.logInterval = setInterval(() => {
        this.$store
          .dispatch("getImageVersionBuilds", {
            name: this.$route.params.image,
            version: this.$route.params.version
          })
          .then(res => { }).catch(e => {
            if (e.status === 401) {
              clearInterval(this.logInterval);
              this.$router.push("/user/login");
            }
          });
        if (state !== "building") clearInterval(this.logInterval);
      }, 1000);
    }
    if (state !== "building") clearInterval(this.logInterval);
  },
  computed: {
    builds() {
      return this.$store.state.builds;
    },
    logs() {
      if (this.builds) {
        return this.builds.logs.split("\n");
      }
    }
  },
  components: {
    Log,
    FInput
  },
  beforeDestroy() {
    clearInterval(this.logInterval);
  }
};
</script>

