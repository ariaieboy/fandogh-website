<template>
  <div class="domains" v-if="domains || domains.length">
    <div class="dashboard-home-wrapper">
      <div class="table-responsive dashboard-home-table">
        <div class="dashboard-home-header">
          <div class="dashboard-home-title">
            <img src="~assets/img/icons/ic_domain.svg" alt="images">
            <span>دامنه های شما</span>
            <router-link to="/dashboard/domains">لیست دامنه ها</router-link>
          </div>
        </div>
        <b-table :fields="header" stacked="lg" :items="domains" empty-text="دیتایی وجود ندارد">
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
import FDate from "~/utils/date";
import FFromDate from "~/utils/fromDate";
import { getData } from "~/utils/getData";

export default {
  layout: "dashboard",
  components: {},
  data() {
    return {
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
          formatter: this.getDate
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
          tdClass: this.getStatus
        },
        {
          label: "وضعیت",
          sortable: false,
          key: "verified",
          formatter: this.getDomainStatus,
          tdClass: this.getClass,
          html: true
        }
      ]
    };
  },

  filters: {
    status: function(value) {
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
  methods: {
    getDate(date) {
      return FDate({ date: date });
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
      if (!certificate) return "";
      if (!certificate.details) return "";
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
    }
  }
};
</script>
<style lang="stylus" scoped>
.scroll
  overflow-x auto
</style>
