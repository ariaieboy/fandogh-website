<template>
  <div class="wrapper-image" v-if="!loading">
    <f-loading :isFull="true" v-if="isLoading"/>
    <f-empty v-if="!domains || !domains.length" title="هنوز دامنه‌ای اضافه نشده !">
      <f-button styles="red" @onClick="$router.push('/dashboard/domains/create')">افزودن دامنه</f-button>
    </f-empty>
    <div class="images" v-else>
      <div class="row-block">
        <f-button styles="red" @onClick="$router.push('/dashboard/domains/create')">افزودن دامنه</f-button>
      </div>
      <div class="table-title">دامنه های شما</div>
      <div class="table-responsive">
        <b-table :fields="header" stacked="lg" :items="domains" empty-text="دیتایی وجود ندارد">
          <template slot="action" slot-scope="props">
            <action-button
              class="action-button-mini"
              @onClick="details(props.item)"
              icon="edit.svg"
              label="جزییات"
            />

            <action-button
              class="action-button-mini"
              @onClick="remove(props.item)"
              icon="ic-delete.svg"
              label="حذف"
            />
          </template>
          <template slot="certificate" slot-scope="props">
            <span
              v-if="props.item.certificate && props.item.certificate.details"
              :data-balloon="FDate(props.item.certificate.created_at)"
              data-balloon-pos="up"
            >{{props.item.certificate.details.status | status}}</span>
            <span v-else>ندارد</span>
          </template>
          <template slot="service" slot-scope="props">
            <span v-if="props.item.service">{{props.item.service}}</span>
            <span v-else>ندارد</span>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>

import FButton from "~/components/elements/button";
import FDate from "~/utils/date";
import FFromDate from "~/utils/fromDate";
import { getData } from "~/utils/getData";
import Alert from "~/components/Dashboard/alert";
import ActionButton from "~/components/Dashboard/table/action-button";
import FEmpty from "~/components/Dashboard/empty";
import ErrorReporter from "~/utils/ErrorReporter";
import FLoading from "~/components/Loading";

export default {
  layout: "dashboard",
  components: {
    FButton,
    ActionButton,
    FEmpty,
    FLoading
  },
  data() {
    return {
      isLoading: false,
      header: [
        {
          sortable: false,
          label: "نام دامنه",
          key: "name",
          tdClass: "ellipsis ltr"
        },
        {
          sortable: false,
          label: "تاریخ ساخت",
          key: "created_at",
          formatter: this.getDate,

        },
        {
          sortable: false,
          label: "متصل به سرویس",
          key: "service"
        },
        {
          sortable: false,
          label: "گواهینامه ssl",
          key: "certificate",
          tdClass: this.getStatus,
        },
        {
          label: "وضعیت",
          sortable: false,
          key: 'verified',
          formatter: this.getDomainStatus,
          tdClass: this.getClass,
          html: true
        },
        {
          label: "مدیریت",
          tdClass: "width-larg",
          sortable: false,
          key: "action",
          html: true
        }
      ]
    };
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
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    domains() {
      return this.$store.state.domains;
    }
  },
  destroyed() {
    this.$store.commit("SET_DATA", { data: null, id: "domains" });
  },
  created() {
    this.getData();
  },

  methods: {
    async getData() {
      try {
        await this.$store.dispatch("getDomains");
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      } catch (e) {
        if (e.status === 401) {
          this.$router.push("/user/login");
        }
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      }
    },
    getDate(date) {
      return FDate({ date: date })
    },
    FFromDate(value) {
      return FFromDate(value);
    },
    FDate(value) {
      return FDate({ date: value });
    },
    getDomainStatus(verified) {
      return verified ? "تایید شده" : "تایید نشده";
    },
    getStatus(certificate) {
      if (!certificate) return ''
      if (!certificate.details) return ''
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
    getClass(verified) {
      return verified ? "success-text" : "error-text";
    },
    verify({ name }) {
      this.$ga.event({
        eventCategory: "domain",
        eventAction: "click btn verify domain",
        eventLabel: "domain name",
        eventValue: name
      });
      this.$router.push(`/dashboard/domains/verification/${name}`);
    },
    details({ name }) {
      this.$router.push(`/dashboard/domains/${name}`);
    },

    removeCertificateDomain({ name }) {
      this.$ga.event({
        eventCategory: "domain",
        eventAction: "click btn remove certificate domain",
        eventLabel: "domain name",
        eventValue: name
      });
      this.$alertify(
        {
          title: `حذف گواهی SLL`,
          description: `آیا از حذف SSL دامنه ${name} مطمئن هستید؟`
        },
        status => {
          if (status) {
            this.isLoading = true;
            this.$store
              .dispatch("removeCertificateDomain", { name })
              .then(res => {
                this.$store.dispatch("getDomains");
                this.isLoading = false;
                this.$ga.event({
                  eventCategory: "domain",
                  eventAction: "remove ssl domain",
                  eventLabel: "domain name",
                  eventValue: name
                });
                this.$notify({
                  title: res.message,
                  type: "success"
                });
              })
              .catch(e => {
                this.isLoading = false;
                this.$ga.event({
                  eventCategory: "domain",
                  eventAction: "fail remove ssl domain",
                  eventLabel: "domain name",
                  eventValue: name
                });
                this.$notify({
                  title: e.data.message,
                  type: "error"
                });
              });
          }
        }
      );
    },
    remove({ name }) {
      this.$ga.event({
        eventCategory: "domain",
        eventAction: "click btn remove domain",
        eventLabel: "domain name",
        eventValue: name
      });
      this.$alertify(
        {
          title: `حذف دامنه`,
          description: ` آیا از حذف دامنه ${name} مطمئن هستید؟`
        },
        status => {
          if (status) {
            this.$store
              .dispatch("removeDomain", name)
              .then(res => {
                this.$store.dispatch("getDomains");
                this.$ga.event({
                  eventCategory: "domain",
                  eventAction: "remove domain",
                  eventLabel: "domain name",
                  eventValue: name
                });
                this.$notify({
                  title: res.message,
                  type: "success"
                });
              })
              .catch(e => {
                this.$ga.event({
                  eventCategory: "domain",
                  eventAction: "fail remove domain",
                  eventLabel: "domain name",
                  eventValue: name
                });
                this.$notify({
                  title: e.data.message,
                  type: "error"
                });
              });
          }
        }
      );
    }
  }
};
</script>
<style lang="stylus" scoped>
.scroll
  overflow-x auto
</style>
