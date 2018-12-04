<template>
  <div class="images">
    <div class="row-block">
      <f-button styles="red" @onClick="$router.push('/dashboard/domains/create')">افزودن دامنه</f-button>
    </div>
    <!-- <f-table title="ایمیج های شما" :header="header" :data="_domains" :actions="[ {title:`<img src='/icons/ic-tick.svg' /> <span>تایید</span> `, action:'verify'}, {title:`<img src='/icons/ic-delete.svg' /> <span>حذف</span> `, action:'delete'}]"></f-table> -->
    <vue-good-table :columns="header" :rows="domains" :rtl="true">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'action'">
            <action-button :title="`<img src='/icons/ic-tick.svg' /> <span>تایید</span>`"></action-button>
          <!-- <span style="font-weight: bold; color: blue;">{{props.row.age}}</span>  -->
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import FTable from "~/components/Dashboard/table";
import FButton from "~/components/elements/button";
import FDate from "~/utils/date";
import Alert from "~/components/Dashboard/alert";
import ActionButton from '~/components/Dashboard/table/action-button'

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
      // 'نام دامنه','متصل به سرویس', 'تاریخ افزودن دامنه', 'وضعیت'
      header: [
        {
          label: "نام دامنه",
          field: "name"
        },
        {
          label: "وضعیت",
          field: this.getDomainStatus,
          tdClass: this.getClass,
          html: true
        },
        {
          label: "تغییرات",
          field: "action",
          html: true
        }
      ],
      data: []
    };
  },
  components: {
    FTable,
    FButton,
    ActionButton
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
            verified
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
    getDomainStatus({ verified }) {
      return verified ? "در حال استفاده" : "تایید نشده";
    },
    getClass({ verified }) {
      return verified ? "success-text" : "error-text";
    },
    // getAction(){
    //     return `<button @click=verify>عملیات</button>`
    // },
    verify(id) {
      console.log(id);
    },
    verify(id) {},
    delete(id) {}
  }
};
</script>
