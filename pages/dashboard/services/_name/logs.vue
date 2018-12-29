<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <div class="fandogh-form-group">
          <f-input v-model="image" styles="input-white input-block input-dashboard input-disable"></f-input>
        </div>
        <!-- <div class="fandogh-form-group">
          <f-input v-model="version" styles="input-white input-block input-dashboard input-disable"></f-input>
        </div>-->
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
import { removeValue } from "~/utils/cookie";

export default {
  layout: "dashboard",
  data() {
    return {
      image: "نام سرویس: " + this.$route.params.name,
      logInterval: null
    };
  },
  created() {
    this.getData();
  },
  destroyed() {},
  methods: {
    async getData() {
      try {
        await this.$store.dispatch("getServiceLog", {
          name: this.$route.params.name
        });
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      } catch (e) {
        if (e.status === 401) {
          this.$router.push("/user/login");
        }
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      }
    }
  },
  mounted() {
    this.$store.commit("SET_DATA", { id: "manifest", data: {} });
    removeValue("name");
    removeValue("versions");
    // this.date = "تاریخ ساخت: " + FDate({ date: this.builds.last_logged_time });
    // let state = this.builds.state.toLowerCase();
    // if (state === "building") {
    //   this.logInterval = setInterval(() => {
    //     this.$store
    //       .dispatch("getServiceLog", {
    //         name: this.$route.params.name,
    //       })
    //       .then(res => {});
    //     if (state !== "building") clearInterval(this.logInterval);
    //   }, 1000);
    // }
  },
  computed: {
    builds() {
      return this.$store.state.serviceLog;
    },
    logs() {
      if (this.builds) {
        if (!this.builds.logs) return;
        return this.builds.logs.split("\n");
      }
    },
    date() {
      if (this.builds) {
        return "تاریخ ساخت: " + FDate({ date: this.builds.last_logged_time });
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

