<template>
  <div class="wrapper-image">
    <f-empty v-if="!services || !services.length" title="هنوز سرویسی اضافه نشده !">
      <f-button styles="red" path="/dashboard/services/setup">اجرای سرویس جدید</f-button>
    </f-empty>
    <div class="images" v-else>
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
            <action-button
              class="action-button-s"
              @onClick="logs(props.row)"
              icon="ic-logs.svg"
              label="مشاهده جزییات"
            />
            <action-button
              class="action-button-s"
              @onClick="remove(props.row)"
              icon="ic-delete.svg"
              label="حذف"
            />
          </span>
          <span v-else>{{props.formattedRow[props.column.field]}}</span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import FTable from "~/components/Dashboard/table";
import FButton from "~/components/elements/button";
import FDate from "~/utils/date";
import ActionButton from "~/components/Dashboard/table/action-button";
import FEmpty from "~/components/Dashboard/empty";

export default {
  layout: "dashboard",
  async asyncData({ store, route, redirect }) {
    try {
      await store.dispatch("getServices");
    } catch (e) {
      if (e.status === 401) {
        redirect("/user/login");
      }
    }
  },
  data() {
    return {
      header: [
        {
          label: "نام سرویس",
          sortable: false,
          field: "name",
          tdClass: "ellipsis"
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
  destroyed() {
    this.$store.commit("SET_DATA", { data: null, id: "services" });
  },
  components: {
    FTable,
    FButton,
    ActionButton,
    FEmpty
  },
  methods: {
    remove({ name }) {
      this.$ga.event({
          eventCategory: 'service',
          eventAction: 'click btn remove service',
          eventLabel:'service name',
          eventValue:name
      })
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
                this.$ga.event({
                    eventCategory: 'service',
                    eventAction: 'remove service',
                    eventLabel:'service name',
                    eventValue:name
                })
                this.$notify({
                  title: res.message,
                  type: "success"
                });
              })
              .catch(e => {
                this.$ga.event({
                    eventCategory: 'service',
                    eventAction: 'fail remove service',
                    eventLabel:'service name',
                    eventValue:name
                })
                this.$notify({
                  title: e.data.message,
                  type: "error"
                });
              });
          }
        }
      );
    },
    logs({ name }) {
      this.$ga.event({
            eventCategory: 'service',
            eventAction: 'click btn detail service',
            eventLabel:'service name',
            eventValue:name
      })
      this.$router.push(`/dashboard/services/${name}`);
    }
  }
};
</script>

