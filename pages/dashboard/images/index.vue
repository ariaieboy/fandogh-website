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
      <div class="table-responsive">
        <b-table :fields="header" stacked="lg" :items="images" empty-text="دیتایی وجود ندارد">
          <template slot="action" slot-scope="row">
            <action-button
              v-if="row.item.name !== ''"
              class="action-button-s"
              @onClick="versions(row.item)"
              icon="ic-time.svg"
              label="ورژن ها"
            />
            <action-button
              v-if="row.item.name !== ''"
              class="action-button-s"
              @onClick="createVersion(row.item)"
              icon="ic-upload.svg"
              label="آپلود"
            />
            <action-button
              v-if="row.item.name !== ''"
              class="action-button-s"
              @onClick="remove(row.item)"
              icon="ic-delete.svg"
              label="حذف"
            />
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>

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
          key: "name",
          tdClass: "ellipsis ltr"
        },
        {
          label: "تاریخ ساخت ایمیج",
          sortable: false,
          key: "created_at"
        },
        {
          label: "آخرین ورژن",
          sortable: false,
          key: "version",
          tdClass: "ellipsis ltr"
        },
        {
          label: "آخرین به روز‌رسانی",
          sortable: false,
          key: "date"
        },
        {
          label: "مدیدریت",
          tdClass: 'width-larg',
          sortable: false,
          key: "action",
          html: true
        }
      ]
    };
  },

  components: {
    FLoading,
    FEmpty,
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

