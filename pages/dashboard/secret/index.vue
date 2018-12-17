<template>
  <div class="wrapper-secrets">
    <f-empty v-if="!secrets" title="هنوز سکرتی اضافه نشده !">
      <f-button styles="red" path="/dashboard/secrets/create">افزودن سکرت</f-button>
    </f-empty>
    <div class="secretss" v-else>
      <div class="row-block">
        <f-button styles="red" path="/dashboard/secret/create">افزودن سکرت</f-button>
      </div>
      <div class="table-title">سکرت‌های شما</div>
      <vue-good-table :columns="header" :rows="secrets" :rtl="true" styleClass="vgt-table">
        <div slot="emptystate">
          <p class="empty-table center">دیتایی وجود ندارد</p>
        </div>
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <action-button
              class="action-button-s"
              @onClick="edit(props.row)"
              icon="edit.svg"
              label="ویرایش"
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
import FFromDate from "~/utils/fromDate";
import ActionButton from "~/components/Dashboard/table/action-button";
import FEmpty from "~/components/Dashboard/empty";

export default {
  layout: "dashboard",
  async asyncData({ store, route }) {
    await store.dispatch("getSecret");
  },
  data() {
    return {
      header: [
        {
          label: "نام سکرت",
          sortable: false,
          field: "name",
          tdClass: "ellipsis"
        },
        {
          label: "نوع سکرت",
          sortable: false,
          field: "type"
        },
        {
          label: "تاریخ ساخت سکرت",
          sortable: false,
          field: "created_at"
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
    secrets() {
      let secrets = this.$store.state.secrets;
      if (secrets) {
        return secrets.map(
          ({ memory, created_at, name, type, state }) => {
            return {
              name,
              type: type,
              memory: `Mi ${memory}`,
              created_at: FFromDate(created_at)
            };
          }
        );
      }
    }
  },
  components: {
    FTable,
    FButton,
    ActionButton,
    FEmpty
  },
  methods: {
    edit(){

    },
    remove({ name }) {
      this.$alertify(
        {
          title: `سرویس ${name} حذف شود؟`,
          description: " آیا از حذف شدن سرویس خود مطمئن هستید؟"
        },
        status => {
          if (status) {
            this.$store
              .dispatch("deleteSecret", name)
              .then(res => {
                this.$store.dispatch("getSecrets");
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
  }
};
</script>

