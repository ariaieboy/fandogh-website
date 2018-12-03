<template>
  <div class="images">
    <div class="row-block">
      <f-button styles="red" @onClick="$router.push('/dashboard/domains/create')">افزودن دامنه</f-button>
    </div>
    <f-table
      title="ایمیج های شما"
      :header="header"
      :data="_domains"
      :actions="[ 
       {title:`<img src='/icons/ic-tick.svg' /> <span>تایید</span> `, action:'verify'},
       {title:`<img src='/icons/ic-delete.svg' /> <span>حذف</span> `, action:'delete'}
       ]"
    ></f-table>
  </div>
</template>

<script>
import FTable from "~/components/Dashboard/table";
import FButton from "~/components/elements/button";
import FDate from "~/utils/date";
import Alert from "~/components/Dashboard/alert";
export default {
  layout: "dashboard",
  async asyncData({ store, route, redirect }) {
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
      header: ["نام دامنه", "متصل به سرویس", "تاریخ افزودن دامنه", "وضعیت"],
      data: []
    };
  },
  components: {
    FTable,
    FButton
  },
  computed: {
    domains() {
      let domains = this.$store.state.domains;
      if (domains) {
        return domains.map(({ name, verified }) => {
          return {
            name,
            service: "",
            created_at: "",
            _verified: this.getDomainStatus(verified, name),
          };
        });
      }
    },
    _domains() {
      if (this.domains) {
        return this.$dataTable({
          rows: this.domains,
          length: 4,
          props: ["name", "service", "created_at", "_verified"],
          id: "name"
        });
      }
    }
  },
  methods: {
    getDomainStatus(status, name) {
      return status
        ? `<span class="success-text">در حال استفاده </span>`
        : `<span class="error-text">تایید نشده</span>`;
    },
    verify(id) {
      this.$router.push(`/dashboard/domains/verification/${id}`);
    },
    delete(id) {}
  }
};
</script>
