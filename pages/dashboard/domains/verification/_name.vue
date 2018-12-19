<template>
  <div>
    <h2>ایجاد دامنه</h2>
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <div class="fandogh-form-group">
          <f-input v-model="name" styles="input-white input-block input-dashboard input-disable"></f-input>
        </div>
        <div class="fandogh-form-group">
          <f-textarea :placeholder="description" disable="true" class="textarea-disable"/>
        </div>
        <div class="fandogh-form-group">
          <f-lable :value="domain.verification_key" title="کد فعالسازی"></f-lable>
        </div>

        <div class="fandogh-form-group margin-top-100">
          <f-button @onClick="verify" styles="red block">بررسی دامنه</f-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FInput from "~/components/elements/input";
import FButton from "~/components/elements/button";
import FTextarea from "~/components/Dashboard/textarea";
import FLable from "~/components/Dashboard/label";

export default {
  async asyncData({ store, dispatch, redirect }) {
    try {
      await store.dispatch("getDomains");
    } catch (e) {
      if (e.status === 401) {
        redirect("/user/login");
      }
    }
  },
  data() {
    return {
      name: this.$route.params.name,
      test: "",
      description:
        "لطفا روی دامنه مورد نظر یک رکورد با مقدار TXT زیر ایجاد کنید و روی کلید بررسی دامنه کلیک کنید"
    };
  },
  computed: {
    domain() {
      if (!this.name) return null;
      let domain = this.$store.state.domains.find(domain => {
        return domain.name === this.name;
      });
      return domain ? domain : {};
    }
  },
  layout: "dashboard",
  components: {
    FInput,
    FButton,
    FTextarea,
    FLable
  },
  methods: {
    verify() {
      this.$ga.event({
        eventCategory: "domain",
        eventAction: "verify domain",
        eventLabel: "domain name",
        eventValue: this.name
      });
      this.$store
        .dispatch("verificationDomain", { name: this.name })
        .then(res => {
          if (res.verified) {
            this.$notify({
              title: "دامنه شما با موفقیت به سرویس متصل شد.",
              type: "success"
            });
            this.$ga.event({
              eventCategory: "domain",
              eventAction: "verified domain",
              eventLabel: "domain name",
              eventValue: this.name
            });
            this.$router.push("/dashboard/domains");
          } else {
            this.$ga.event({
              eventCategory: "domain",
              eventAction: "fail verified domain",
              eventLabel: "domain name",
              eventValue: this.name
            });
            this.$notify({
              title: "رکورد TXT شما روی دامنه صحیح نیست",
              type: "error"
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped lang="stylus">
.field-description
  color #b5b5b5
  font-size 14px
</style>