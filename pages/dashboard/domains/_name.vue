<template>
  <div v-if="domain">
    <h2>جزئیات دامنه</h2>
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <div class="fandogh-form-group">
          <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
          <f-label-disable label="نام دامنه :" :value="name"/>
        </div>

        <div class="fandogh-form-group">
          <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
          <f-label-disable label="تاریخ ثبت دامنه :" :value="FDate(domain.created_at)"/>
        </div>

        <!-- <div class="fandogh-form-group">
          <f-lable :value="domain.verification_key" title="کد فعالسازی"></f-lable>
        </div>-->
        <!-- <div class="fandogh-form-group margin-top-100">
          <f-button @onClick="verify" styles="red block">بررسی دامنه</f-button>
        </div>-->
      </div>
    </div>
    <h2>تأیید دامنه</h2>
    <div class="row" v-if="domain.verified">
      <div class="col-md-6 col-xs-12">
        <div class="fandogh-form-group">
          <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
          <f-label-disable label="وضعیت دامنه :" :value="textVeify"/>
        </div>
      </div>
    </div>
    <div class="row" v-if="!domain.verified">
      <div class="col-md-6 col-xs-12">
        <f-collaps :selected="true">
          <div slot="collapse-header">
            <div class="domain-label">
              <span>وضعیت دامنه :</span>
              <span class="error-text">تایید نشده</span>
            </div>
          </div>
          <div slot="collapse-body">
            <div class="domain-description domain-column">
              <p>{{description}}</p>
            </div>
            <div class="domain-description">
              <span>کد فعال سازی :</span>
              <span class="pending-text">{{domain.verification_key}}</span>
            </div>
          </div>
          <div slot="collapse-footer">
            <div class="mt-45">
              <f-button @onClick="verify" styles="red block">بررسی تأیید دامنه</f-button>
            </div>
          </div>
        </f-collaps>
      </div>
    </div>
    <h2>گواهینامه SSL</h2>
    <div class="row" v-if="!domain.verified">
      <div class="col-md-6 col-xs-12">
        <f-collaps :selected="false" :disabled="true">
          <div slot="collapse-header">
            <div class="domain-label">
              <span>وضعیت گواهینامه SSL :</span>
              <span class="error-text">دامنه خود را تایید کنید</span>
            </div>
          </div>
        </f-collaps>
        <div class="mt-45">
          <f-button styles="gray block">برای درخواست SSL دامنه خود را تایید کنید</f-button>
        </div>
      </div>
    </div>
    <div class="row" v-if="domain.verified && !domain.certificate">
      <div class="col-md-6 col-xs-12">
        <f-collaps :selected="false" :disabled="true">
          <div slot="collapse-header">
            <div class="domain-label">
              <span>وضعیت گواهینامه SSL :</span>
              <span class="pending-text">درخواست نداده‌اید</span>
            </div>
          </div>
        </f-collaps>
        <div class="mt-45">
          <f-button @onClick="certificateDomain" styles="blue block">درخواست SSL</f-button>
        </div>
      </div>
    </div>
    <div class="row" v-if="domain.verified && domain.certificate">
      <div class="col-md-6 col-xs-12">
        <f-collaps :selected="true">
          <div slot="collapse-header">
            <div class="domain-label">
              <span>وضعیت گواهینامه SSL :</span>
              <span class="pending-text">درخواست داده‌اید</span>
            </div>
          </div>
          <div slot="collapse-body">
            <div class="domain-description">
              <span>تاریخ درخواست :</span>
              <span>{{FDate(domain.certificate.created_at)}}</span>
            </div>
            <div class="domain-description">
              <span>وضعیت :</span>
              <span
                :class="getStatus"
                :data-balloon="domain.certificate.details.info"
                data-balloon-pos="up"
              >
                {{domain.certificate.details.status | status}}
                <img
                  src="~/static/icons/plans/info-button.png"
                >
              </span>
            </div>
          </div>
          <!-- <div slot="collapse-footer">
            <div class="mt-45">
              <f-button @onClick="certificateDomain" styles="blue block">درخواست SSL</f-button>
            </div>
          </div>-->
        </f-collaps>
      </div>
    </div>
    <div class="row" v-if="domain.service">
      <div class="col-md-6 col-xs-12 mt-45">
        <div class="fandogh-form-group">
          <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
          <f-label-disable label="متصل به سرویس :" :value="textService"/>
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
import FLabelDisable from "~/components/elements/label/label-disable";
import FDate from "~/utils/date";
import FCollaps from "~/components/elements/collaps";

export default {
  layout: "dashboard",
  components: {
    FCollaps,
    FInput,
    FButton,
    FTextarea,
    FLable,
    FLabelDisable
  },
  data() {
    return {
      name: this.$route.params.name,
      test: "",
      textService: ``,
      textVeify: `
      <span class="success-text">تایید شده</span>`,
      description:
        "لطفا روی دامنه مورد نظر یک رکورد با مقدار TXT زیر ایجاد کنید و روی کلید بررسی دامنه کلیک کنید "
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
    getStatus() {
      let certificate = this.domain.certificate
      if (!certificate) return ''
      const { status } = certificate.details;
      if (!status) return "";
      let value = status.toLowerCase();
      if (value === "ready") {
        return "success-text";
      }
      if (value === "error") {
        return "error-text";
      }
      if (value === "unknown") {
        return "pending-text";
      }
    },
  },

  filters: {
    status: function (value) {
      if (!value) return "";
      let state = value.toLowerCase();
      if (state === "ready") {
        return "فعال";
      }
      if (state === "error") {
        return "خطا";
      }
      if (state === "unknown") {
        return "نامشخص";
      }
    }
  },
  created() {
    this.getData();
  },
  destroyed() { },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch("getDomain", {
          name: this.$route.params.name
        });
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
        if (this.domain.service) {
          this.textService = `<a href="/dashboard/services/${this.domain.service}" >
            ${this.domain.service}
            <img src="/icons/plans/info-button.png" >
            </a>`
        }

      } catch (e) {
        if (e.status === 401) {
          this.$router.push("/user/login");
        }
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      }
    },
    FDate(date) {
      return FDate({ date: date })
    },
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
            this.getData();
            // this.$router.push("/dashboard/domains");
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
    },
    certificateDomain() {
      let name = this.domain.name
      this.$ga.event({
        eventCategory: "domain",
        eventAction: "click btn certificate domain",
        eventLabel: "domain name",
        eventValue: name
      });
      this.$store
        .dispatch("certificateDomain", { name })
        .then(res => {
          this.getData();
          this.$ga.event({
            eventCategory: "domain",
            eventAction: "send certificate domain",
            eventLabel: "domain name",
            eventValue: name
          });
          this.$notify({
            title: "درخواست شما با موفقیت ثبت شد",
            type: "success"
          });
        })
        .catch(e => {
          this.$ga.event({
            eventCategory: "domain",
            eventAction: "fail certificate domain",
            eventLabel: "domain name",
            eventValue: name
          });

          // this notify for themploery
          if (typeof e === "object") {
            this.$notify({
              title: e.domain_name[0],
              time: 4000,
              type: "error"
            });
          } else {
            this.$notify({
              title: ErrorReporter(e, this.$data),
              time: 4000,
              type: "error"
            });
          }
        });
    },
  }
};
</script>

<style  lang="stylus" scoped>
.domain
  &-description
    display flex
    margin-bottom 10px
    padding 0 15px
    img
      vertical-align top
  &-column
    flex-direction column
</style>