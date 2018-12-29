<template>
  <div class="wrapper-image" v-if="!loading">
    <f-loading :isFull="true" v-if="isLoading"/>
    <f-empty v-if="!images || !images.length" title="هنوز ایمیجی اضافه نشده !">
      <f-button styles="red" @onClick="$router.push('/dashboard/images/create')">افزودن ایمیج</f-button>
    </f-empty>
    <div class="images" v-else>
      <div class="row-block">
        <f-button styles="red" @onClick="$router.push('/dashboard/images/create')">افزودن ایمیج</f-button>
      </div>
      <div class="table-title">ایمیج های شما</div>
      <vue-good-table :columns="header" :rows="images" :rtl="true" styleClass="vgt-table">
        <div slot="emptystate">
          <p class="empty-table center">دیتایی وجود ندارد</p>
        </div>
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <action-button
              v-if="props.row.name !== ''"
              class="action-button-s"
              @onClick="versions(props.row)"
              icon="ic-time.svg"
              label="ورژن ها"
            />
            <action-button
              v-if="props.row.name !== ''"
              class="action-button-s"
              @onClick="createVersion(props.row)"
              icon="ic-upload.svg"
              label="آپلود"
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
import Alert from "~/components/Dashboard/alert";
import ActionButton from "~/components/Dashboard/table/action-button";
import FLoading from "~/components/Loading";
import FEmpty from "~/components/Dashboard/empty";

export default {
  layout: "dashboard",
  data() {
    return {
      isLoading: false,
      header: [
        {
          label: "نام دامنه",
          sortable: false,
          field: "name",
          tdClass: "ellipsis ltr"
        },
        {
          label: "تاریخ ساخت ایمیج",
          sortable: false,
          field: "created_at"
        },
        {
          label: "آخرین ورژن",
          sortable: false,
          field: "version",
          tdClass: "ellipsis ltr"
        },
        {
          label: "آخرین به روز‌رسانی",
          sortable: false,
          field: "date"
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
    FLoading,
    FEmpty,
    FTable,
    FButton,
    ActionButton
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    images() {
      let images = this.$store.state.images;
      if (images) {
        return images.map(({ created_at, name, last_version }) => {
          if (last_version) {
            return {
              name,
              created_at: FDate({ date: created_at }),
              version: last_version.version,
              date: FDate({ date: last_version.date })
            };
          } else {
            return {
              name,
              created_at: FDate({ date: created_at })
            };
          }
        });
      }
    }
  },

  destroyed() {
    this.$store.commit("SET_DATA", { data: null, id: "images" });
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch("getImages");
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
    versions({ name }) {
      this.$ga.event({
        eventCategory: "image",
        eventAction: "click btn list version image"
        // eventLabel:'user',
        // eventValue:'userId'
      });
      this.$router.push(`/dashboard/images/${name}/versions`);
    },
    createVersion({ name }) {
      this.$ga.event({
        eventCategory: "image",
        eventAction: "click btn upload version image"
        // eventLabel:'user',
        // eventValue:'userId'
      });
      this.$router.push(`/dashboard/images/${name}/versions/create`);
    },
    remove({ name }) {
      this.$ga.event({
        eventCategory: "image",
        eventAction: "click btn remove image"
        // eventLabel:'user',
        // eventValue:'userId'
      });
      this.$alertify(
        {
          title: "حذف ایمیج",
          description: `آیا از حذف ${name} مطمئن هستید؟`
        },
        status => {
          if (status) {
            this.isLoading = true;
            this.$store
              .dispatch("deleteImage", name)
              .then(res => {
                this.getData();
                this.isLoading = false;
                this.$notify({
                  title: res.message,
                  type: "success"
                });
                this.$ga.event({
                  eventCategory: "image",
                  eventAction: "remove image"
                  // eventLabel:'user',
                  // eventValue:'userId'
                });
              })
              .catch(e => {
                this.isLoading = false;
                this.$notify({
                  title: e.data.message,
                  type: "error"
                });
                this.$ga.event({
                  eventCategory: "image",
                  eventAction: "canceled remove image"
                  // eventLabel:'user',
                  // eventValue:'userId'
                });
              });
          }
        }
      );
    }
  }
};
</script>

