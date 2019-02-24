<template>
  <div class="secrets">
    <div class="secretss">
      <div class="dashboard-home-header">
        <div class="dashboard-home-title">
          <img src="~assets/img/icons/ic_secret.svg" alt="images">
          <span>سکرت های شما</span>
          <router-link to="/dashboard/domains">لیست سکرت ها</router-link>
        </div>
      </div>
      <div class="table-responsive dashboard-home-table" v-bar v-if="secrets && secrets.length">
        <b-table :fields="header" stacked="lg" :items="secrets" empty-text="دیتایی وجود ندارد"></b-table>
      </div>
    </div>
  </div>
</template>

<script>
import FFromDate from "~/utils/fromDate";

export default {
  layout: "dashboard",
  components: {},
  data() {
    return {
      header: [
        {
          label: "نام سکرت",
          sortable: false,
          key: "name",
          tdClass: "ellipsis ltr"
        },
        {
          label: "نوع سکرت",
          sortable: false,
          key: "type"
        },
        {
          label: "تاریخ ساخت سکرت",
          sortable: false,
          key: "created_at"
        }
      ]
    };
  },
  computed: {
    secrets() {
      let secrets = this.$store.state.secrets;
      if (secrets) {
        return secrets.map(({ memory, created_at, name, type, state }) => {
          return {
            name,
            type: type,
            memory: `Mi ${memory}`,
            created_at: FFromDate(created_at)
          };
        });
      }
    }
  }
};
</script>

