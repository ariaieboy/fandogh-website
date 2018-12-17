<template>
  <div class="wrapper-image">
    <f-empty v-if="!images.length" title="هنوز ایمیجی اضافه نشده !">
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
              class="action-button-s"
              @onClick="versions(props.row)"
              icon="ic-time.svg"
              label="ورژن ها"
            />
            <action-button
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
import FEmpty from "~/components/Dashboard/empty";
export default {
  layout: "dashboard",
  async asyncData({ store, route, redirect }) {
    try {
      await store.dispatch("getImages");
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
          label: "نام دامنه",
          sortable: false,
          field: "name",
          tdClass: "ellipsis"
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
          tdClass: "ellipsis"
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
    FEmpty,
    FTable,
    FButton,
    ActionButton
  },
  computed: {
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
    this.$store.commit('SET_DATA',{data:null,id:'images'})
  },
  methods: {
    some(){
        this.$ga.event({
          eventCategory: 'image',
          eventAction: 'add image',
          // eventLabel:'user',
          // eventValue:'userId'
        })
    },
    versions({ name }) {
      this.$router.push(`/dashboard/images/${name}/versions`);
    },
    createVersion({ name }) {
      this.$router.push(`/dashboard/images/${name}/versions/create`);
    },
    remove({ name }) {
      this.$alertify(
        {
          title: "ایمیج حذف شود؟",
          description: " آیا از حذف شدن ایمیج خود مطمئن هستید؟"
        },
        status => {
          if (status) {
            this.$store
              .dispatch("deleteImage", name)
              .then(res => {
                this.$store.dispatch("getImages");
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
    }
  }
};
</script>

