<template>
  <div class="images">
    <div class="row-block">
      <f-button styles="red" path="/dashboard/services/setup">اجرای سرویس جدید</f-button>
    </div>
    <div class="table-title">سرویس‌ های شما</div>
    <vue-good-table :columns="header" :rows="services" :rtl="true" styleClass="vgt-table">
      <div slot="emptystate">
        <p class="empty-table center">دیتایی وجود ندارد</p>
      </div>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'action'">
          <action-button class="action-button-s" @onClick="logs(props.row)">
            <img src="/icons/ic-logs.svg">
            <span>مشاهده جزییات</span>
          </action-button>
          <action-button class="action-button-s" @onClick="remove(props.row)">
            <img src="/icons/ic-delete.svg">
            <span>حذف</span>
          </action-button>
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
import ActionButton from "~/components/Dashboard/table/action-button";

export default {
  layout: "dashboard",
  async asyncData({ store, route }) {
    await store.dispatch("getServices");
  },
  data() {
    return {
      header: [
        {
          label: "نام سرویس",
          sortable: false,
          field: "name"
        },
        {
          label: "نوع سرویس",
          sortable: false,
          field: "service_type"
        },
        {
          label: "حافظه",
          sortable: false,
          field: "memory"
        },
        {
          label: "تاریخ ساخت سرویس",
          sortable: false,
          field: "start_date"
        },
        {
          label: "مدیریت",
          sortable: false,
          field: "action",
          html: true
        }
      ]
    };
  },
  computed: {
    services() {
      let services = this.$store.state.services;
      if (services) {
        return services.map(
          ({ memory, start_date, name, service_type, state }) => {
            return {
              name,
              //version: last_version.version,
              service_type: service_type,
              memory: `Mi ${memory}`,
              start_date: FDate({ date: start_date })
            };
          }
        );
      }
    }
  },
  components: {
    FTable,
    FButton,
    ActionButton
  },
  methods: {
    remove({ name }) {
      this.$alertify(
        {
          title: `سرویس ${name} حذف شود؟`,
          description: " آیا از حذف شدن سرویس خود مطمئن هستید؟"
        },
        status => {
          if (status) {
            this.$store
              .dispatch("deleteService", name)
              .then(res => {
                this.$store.dispatch("getServices");
                this.$notify({
                  title: res.message,
                  type: "success"
                });
              })
              .catch(e => {
                this.$notify({
                  title: e.message,
                  type: "error"
                });
              });
          }
        }
      );
    },
    logs({ name }) {
      this.$router.push(`/dashboard/services/${name}`);
    }
  }
};
</script>

