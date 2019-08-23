<template>
  <div>
    <f-modal
      :noModal="noModal"
      :message="error"
      ref="modal"
      :disableOverlay="disableOverlay"
      v-show="force || show">
      <h2 style="margin-bottom: 32px">وارد شوید</h2>
      <!-- @submit.prevent -->
      <form>
        <div class="fandogh-form-group" style="margin-bottom: 8px">
          <f-input
            name="username"
            v-model="username"
            styles="input-color-blue"
            type="text"
            placeholder="نام کاربری یا ایمیل"
          />
        </div>
        <div class="fandogh-form-group" style="margin-bottom: 8px">
          <f-input
            name="password"
            v-model="password"
            styles="password-login input-color-blue"
            type="password"
            placeholder="رمز عبور"
          />
        </div>
        <!-- <div class="fandogh-form-group margin-20">
          <f-checkbox
            v-model="remind_me"
            :id="noModal ? 'checkbox1' : 'checkbox2'"
            title="مرا بخاطر بسپار"
          />
        </div>-->
        <div class="fandogh-form-group center margin-20">
          <f-button @onClick="login" styles="green block 80">{{title}}</f-button>
        </div>

        <div class="fandogh-form-group center margin-20">
          <a href="#" @click="showModal('forgot_password')">فراموشی رمز عبور</a>
        </div>
      </form>
    </f-modal>
    <forgot-password/>
  </div>
</template>

<script>
import FModal from "~/components/elements/modal";
import FInput from "~/components/elements/input";
import FButton from "~/components/elements/button";
import FCheckbox from "~/components/elements/checkbox";
import ForgotPassword from "./ForgotPassword";

export default {
  props: ["force", "disableOverlay", "noModal"],
  components: {
    FModal,
    FInput,
    FButton,
    FCheckbox,
    ForgotPassword
  },
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      error: null,
      remind_me: false
    };
  },
  mounted() {
    this.$refs.modal.$on("onOverlay", function () {
      this.$store.dispatch("showModal", false);
    });
  },
  methods: {
    showModal(modal) {
      this.$store.dispatch("showModal", modal);
    },
    login(e) {
      if (this.loading) return;
      this.loading = true;
      this.error = null;
      this.$store
        .dispatch("login", { username: this.username, password: this.password })
        .then(res => {
          this.loading = false;
          this.$router.push("/dashboard/general");
          this.$store.dispatch("showModal", false);

          this.$ga.event({
            eventCategory: "account",
            eventAction: "login"
          });
          this.$store.dispatch("TOGGLE_NAV", { data: 'halfSidebar', id: "sidebar" });

        })
        .catch(e => {
          this.loading = false;
          this.error = e;
        });
    }
  },
  computed: {
    show() {
      return this.$store.state.modals.login;
    },
    title() {
      return this.loading ? "..." : "ورود";
    }
  }
};
</script>
<style lang="stylus">
  .raw
    margin-left unset !important
    margin-right unset !important
</style>
