<template>
  <div class="services">
    <div class="dashboard-home-wrapper">
      <div class="dashboard-home-header">
        <div class="dashboard-home-title">
          <img src="~assets/img/icons/ic_services.svg" alt="images">
          <span>سرویس های شما</span>
          <router-link to="/dashboard/services">لیست سرویس ها</router-link>
        </div>
      </div>
      <div class="table-responsive dashboard-home-table" v-bar v-if="services && services.length">
        <div class="table-scrolled">
          <b-table :fields="header" stacked="lg" :items="services" empty-text="دیتایی وجود ندارد">
            <template slot="state" slot-scope="props">
              <div class="badg-state">
                <i :class="stateColor(props.item.state)"></i>
                <span>{{props.item.state | state}}</span>
              </div>
            </template>
            <template slot="url" slot-scope="props">
              <router-link :to="props.item.url" v-if="props.item.url != 'internal'" target="_blank" rel="noopener">لینک</router-link>
              <span v-else> -- </span>
            </template>
          </b-table>
        </div>
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
          key: "state"
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
      return val === "running"
        ? "success-circle"
        : val === "pending"
          ? "pending-circle"
          : "error-circle";
    }
  }
};
</script>

