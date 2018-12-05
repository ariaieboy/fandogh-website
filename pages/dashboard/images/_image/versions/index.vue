<template>
  <div class="images">
    <div class="row-block">
      <f-button
        styles="red"
        @onClick="$router.push('/dashboard/images/front/versions/create')"
      >افزودن ورژن</f-button>
    </div>
    <div class="table-title">ورژن های شما</div>
    <vue-good-table :columns="header" :rows="versions" :rtl="true" styleClass="vgt-table">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'action'">
          <action-button class="action-button-s" @onClick="craeteVersions(props.row)">
            <img src="/icons/ic-add.svg">
            <span>ایجاد سرویس</span>
          </action-button>
          <action-button class="action-button-s" @onClick="logs(props.row)">
            <img src="/icons/ic-logs.svg">
            <span>مشاهده لاگ</span>
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
import Alert from "~/components/Dashboard/alert";
import FDate from "~/utils/date";
import ActionButton from "~/components/Dashboard/table/action-button";
import { setValue } from "~/utils/cookie";

export default {
  layout: "dashboard",
  async asyncData({ store, route }) {
    try {
      await store.dispatch("getImageVersions", route.params.image);
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      header: [
        {
          label: "ورژن",
          sortable: false,
          field: "version"
        },
        {
          label: "تاریخ",
          sortable: false,
          field: "date"
        },
        {
          label: "حجم",
          sortable: false,
          field: "size"
        },
        {
          label: "وضعیت",
          sortable: false,
          field: "state"
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
  components: {
    FTable,
    FButton,
    Alert,
    ActionButton
  },
  computed: {
    versions() {
      let versions = this.$store.state.versions;
      if (versions) {
        return versions.map(({ date, version, state, size }) => {
          return {
            version,
            date: FDate({ date: date }),
            state: this.getState(state),
            size: `Mb ${(size / 1000000).toFixed(1)}`
          };
        });
      }
    }
  },
  methods: {
    craeteVersions({ version }) {
      this.$router.push(`/dashboard/services/setup`);
      setValue({ key: "versions", value: version });
      setValue({ key: "name", value: this.$route.params.image });
    },
    getState(state) {
      return state === "FAILED"
        ? "خطا"
        : state === "BUILT"
        ? "ساخته شده"
        : "در حال ساخت ...";
    },
    logs({ version }) {
      this.$router.push(
        `/dashboard/images/${this.$route.params.image}/versions/${version}/logs`
      );
    }
  }
};
</script>

