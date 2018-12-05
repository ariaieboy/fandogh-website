<template>
  <div class="images">
    <div class="row-block">
      <f-button styles="red" @onClick="$router.push('/dashboard/domains/create')">افزودن دامنه</f-button>
    </div>
    <div class="table-title">دامنه های شما</div>
    <vue-good-table :columns="header" :rows="domains" :rtl="true"   styleClass="vgt-table">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'action'">
            <action-button class="action-button-m" v-if="!props.row.verified" @onClick="verify(props.row)">
              <img src='/icons/ic-tick.svg' /> 
              <span>تایید</span>
            </action-button>
            <action-button class="action-button-m disabled" v-if="props.row.verified">
              <img src='/icons/ic_tConfirm.svg' /> 
              <span>تایید</span>
            </action-button>
            <action-button class="action-button-m" @onClick="remove(props.row)" >
              <img src='/icons/ic-delete.svg' /> 
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
      header: [
        {
          sortable: false,
          label: "نام دامنه",
          field: "name"
        },
        {
          sortable: false,
          label: "متصل به سرویس",
          field: "service"
        },
        {
          sortable: false,
          label: "گواهینامه ssl",
          field: "ssl"
        },
        {
          label: "وضعیت",
          sortable: false,
          field: this.getDomainStatus,
          tdClass: this.getClass,
          html: true
        },
        {
          label: "مدیریت",
          sortable: false,
          field: "action",
          html: true
        }
      ],
    };
  },
  components: {
    FTable,
    FButton,
    ActionButton
  },
  computed: {
    domains() {
      return this.$store.state.domains;
    },
  },
  methods: {
    getDomainStatus({ verified }) {
      return verified ? "در حال استفاده" : "تایید نشده";
    },
    getClass({ verified }) {
      return verified ? "success-text" : "error-text";
    },
    verify({name}) {
      this.$router.push(`/dashboard/domains/verification/${name}`)
    },
    remove({name}) {
      this.$alertify({
          title: `دامنه ${name} حذف شود؟`,
          description: ' آیا از حذف شدن دامنه خود مطمئن هستید؟'
        }, (status) =>{
          if(status){
            this.$store.dispatch('removeDomain', name).then(res =>{
              this.$store.dispatch('getDomains')
              this.$notify({
                title: res.message,
                type: 'success'
              })
            }).catch(e => {
              this.$notify({
                title: e.message,
                type: 'error'
              })
            })
          }
        })
    }
  }
};
</script>