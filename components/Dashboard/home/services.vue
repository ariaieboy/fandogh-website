<template>
  <div class="services" v-if="services || services.length">
    <div class="dashboard-home-wrapper">
      <div class="dashboard-home-header">
        <div class="dashboard-home-title">
          <img src="~assets/img/icons/ic_images.svg" alt="images">
          <span>سرویس های شما</span>
          <router-link to="/dashboard/services">لیست سرویس ها</router-link>
        </div>
      </div>
      <div class="table-responsive dashboard-home-table" v-bar>
        <b-table :fields="header" stacked="lg" :items="services" empty-text="دیتایی وجود ندارد">
          <template slot="state" slot-scope="props">{{props.item.state | state}}</template>
          <template slot="url" slot-scope="props">
            <!-- {{props.}} -->
            داخلی
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import FButton from "~/components/elements/button";
import FDate from "~/utils/date";
import ActionButton from "~/components/Dashboard/table/action-button";
import FEmpty from "~/components/Dashboard/empty";
import FLoading from "~/components/Loading";
import FFromDate from "~/utils/fromDate";

export default {
  layout: "dashboard",
  components: {
    FLoading,
    FButton,
    ActionButton,
    FEmpty
  },
  data() {
    return {
      header: [
        {
          label: "نام سرویس",
          sortable: false,
          key: "name",
          tdClass: "ellipsis ltr"
        },
        // {
        //   label: "نوع سرویس",
        //   sortable: false,
        //   key: "service_type"
        // },
        // {
        //   label: "حافظه",
        //   sortable: false,
        //   key: "memory"
        // },
        {
          label: "تاریخ ساخت",
          sortable: false,
          key: "start_date"
        },
        {
          label: "وضعیت",
          sortable: false,
          key: "state",
          tdClass: this.stateColor
        },
        {
          label: "لینک اجرا",
          sortable: false,
          key: "url"
        }
      ]
    };
  },
  filters: {
    state(value) {
      if (!value) return "";
      let val = value.toLowerCase();
      return val === "running"
        ? "در حال اجرا"
        : val === "pendding"
        ? "درحال ساخت"
        : "نا مشخص";
    }
  },
  computed: {
    services() {
      let services = this.$store.state.services;
      if (services) {
        return services.map(
          ({ memory, start_date, name, service_type, state, url }) => {
            return {
              url,
              name,
              state,
              //version: last_version.version,
              service_type: service_type,
              // memory: `Mi ${memory}`,
              start_date: FFromDate(start_date)
            };
          }
        );
      }
    }
  },
  methods: {
    stateColor(state) {
      if (!state) return "";
      let val = state.toLowerCase();
      console.log(val);
      return val === "running"
        ? "success-text"
        : val === "pendding"
        ? "pending-text"
        : "error-text";
    }
  }
};
</script>

