<template>
  <div class="wrapper-image" v-if="!loading">
    <f-empty v-if="!versions || !versions.length" title="هنوز ورژنی اضافه نشده !">
      <f-button
        styles="red"
        @onClick="$router.push(`/dashboard/images/${image}/versions/create`)"
      >افزودن ورژن</f-button>
    </f-empty>
    <div class="images" v-else>
      <div class="row-block">
        <f-button
          styles="red"
          @onClick="$router.push(`/dashboard/images/${image}/versions/create`)"
        >افزودن ورژن</f-button>
      </div>
      <div class="table-title">ورژن های شما</div>
      <div class="table-responsive">
        <b-table :fields="header" stacked="lg" :items="versions" empty-text="دیتایی وجود ندارد">
          <template slot="action" slot-scope="props">
            <action-button
              class="action-button-s"
              @onClick="craeteVersions(props.item)"
              icon="ic-add.svg"
              label="ایجاد سرویس"
            />
            <action-button
              class="action-button-s"
              @onClick="logs(props.item)"
              icon="file.svg"
              label="مشاهده لاگ"
            />
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>

import FButton from "~/components/elements/button";
import Alert from "~/components/Dashboard/alert";
import FDate from "~/utils/date";
import ActionButton from "~/components/Dashboard/table/action-button";
import { setValue } from "~/utils/cookie";
import FEmpty from "~/components/Dashboard/empty";

export default {
  layout: "dashboard",
  data() {
    return {
      header: [
        {
          label: "ورژن",
          sortable: false,
          key: "version"
        },
        {
          label: "تاریخ",
          sortable: false,
          key: "date",
          formatter: this.getDate
        },
        {
          label: "حجم",
          sortable: false,
          key: "size",
          tdClass: "ltr",
          formatter: this.getSize

        },
        {
          label: "وضعیت",
          sortable: false,
          key: "state",
          tdClass: this.getClass,
          formatter: this.getState
        },
        {
          label: "مدیدریت", tdClass: 'width-larg',
          sortable: false,
          key: "action",
          html: true
        }
      ]
    };
  },
  components: {
    FButton,
    Alert,
    ActionButton,
    FEmpty
  },
  computed: {
    image() {
      return this.$route.params.image
    },
    loading() {
      return this.$store.state.loading;
    },
    versions() {
      return this.$store.state.versions;
    }
  },
  created() {
    this.getData();
  },
  destroyed() {
    this.$store.commit("SET_DATA", { data: null, id: "versions" });
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch(
          "getImageVersions",
          this.$route.params.image
        );
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      } catch (e) {
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
        if (e.status === 401) {
          this.$router.push("/user/login");
        } else {
          this.$notify({
            title: e.data.message,
            time: 4000,
            type: "error"
          });
        }
      }
    },
    getDate(date) {
      return FDate({ date: date })
    },
    getSize(size) {
      return `${(size / 1000000).toFixed(1)} Mb`
    },

    getClass(state) {
      return state === "FAILED"
        ? "error-text"
        : state === "BUILT"
          ? "success-text"
          : "pending-text";
    },
    getState(state) {
      return state === "FAILED"
        ? "خطا"
        : state === "BUILT"
          ? "ساخته شده"
          : "در حال ساخت ...";
    },
    craeteVersions({ version }) {
      this.$router.push(`/dashboard/services/setup`);
      setValue({ key: "versions", value: version });
      setValue({ key: "name", value: this.$route.params.image });
    },
    logs({ version }) {
      this.$ga.event({
        eventCategory: "images-version",
        eventAction: "click btn logs version image"
      });
      this.$router.push(
        `/dashboard/images/${this.$route.params.image}/versions/${version}/logs`
      );
    }
  }
};
</script>

