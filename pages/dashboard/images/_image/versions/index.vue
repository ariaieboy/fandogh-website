<template>
  <div class="wrapper-image">
    <f-empty v-if="versions.length" title="هنوز ورژنی اضافه نشده !">
       <f-button
          styles="red"
          @onClick="$router.push('/dashboard/images/front/versions/create')"
        >افزودن ورژن</f-button>
    </f-empty>
    <div class="images" v-else>
      <div class="row-block">
        <f-button
          styles="red"
          @onClick="$router.push('/dashboard/images/front/versions/create')"
        >افزودن ورژن</f-button>
      </div>
      <div class="table-title">ورژن های شما</div>
      <vue-good-table :columns="header" :rows="versions" :rtl="true" styleClass="vgt-table">
        <div slot="emptystate">
          <p class="empty-table center">دیتایی وجود ندارد</p>
        </div>
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <action-button
              class="action-button-s"
              @onClick="craeteVersions(props.row)"
              icon="ic-add.svg"
              label="ایجاد سرویس"
            />
            <action-button
              class="action-button-s"
              @onClick="logs(props.row)"
              icon="ic-add.svg"
              label="مشاهده لاگ"
            />
          </span>
          <!-- <span v-else-if="props.column.field == 'action'">
          </span>-->
          <span v-else>{{props.formattedRow[props.column.field]}}</span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import FTable from "~/components/Dashboard/table";
import FButton from "~/components/elements/button";
import Alert from "~/components/Dashboard/alert";
import FDate from "~/utils/date";
import ActionButton from "~/components/Dashboard/table/action-button";
import { setValue } from "~/utils/cookie";
import FEmpty from "~/components/Dashboard/empty";

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
    ActionButton,
    FEmpty
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

