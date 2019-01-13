<template>
  <div class="wrapper-secrets" v-if="!loading">
    <f-loading :isFull="true" v-if="isLoading"/>
    <f-empty v-if="!secrets || !secrets.length" title="هنوز سکرتی اضافه نشده است !">
      <f-button styles="red" path="/dashboard/secret/create">افزودن سکرت</f-button>
    </f-empty>
    <div class="secretss" v-else>
      <div class="row-block">
        <f-button styles="red" path="/dashboard/secret/create">افزودن سکرت</f-button>
      </div>
      <div class="table-title">سکرت‌های شما</div>
      <div class="table-responsive">
        <b-table :fields="header" stacked="lg" :items="secrets" empty-text="دیتایی وجود ندارد">
          <template slot="action" slot-scope="props">
            <span>
              <action-button
                class="action-button-s"
                @onClick="edit(props.item)"
                icon="edit.svg"
                label="ویرایش"
              />
              <action-button
                class="action-button-s"
                @onClick="remove(props.item)"
                icon="ic-delete.svg"
                label="حذف"
              />
            </span>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>

import FButton from "~/components/elements/button";
import FFromDate from "~/utils/fromDate";
import ActionButton from "~/components/Dashboard/table/action-button";
import FEmpty from "~/components/Dashboard/empty";
import FLoading from "~/components/Loading";

export default {
  layout: "dashboard",
  components: {
    FLoading,
    FButton,
    ActionButton,
    FEmpty
  },
  data() {
    return {
      isLoading: false,
      header: [
        {
          label: "نام سکرت",
          sortable: false,
          key: "name",
          tdClass: "ellipsis ltr"
        },
        {
          label: "نوع سکرت",
          sortable: false,
          key: "type"
        },
        {
          label: "تاریخ ساخت سکرت",
          sortable: false,
          key: "created_at"
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
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    secrets() {
      let secrets = this.$store.state.secrets;
      if (secrets) {
        return secrets.map(({ memory, created_at, name, type, state }) => {
          return {
            name,
            type: type,
            memory: `Mi ${memory}`,
            created_at: FFromDate(created_at)
          };
        });
      }
    }
  },

  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch("getSecret");
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      } catch (e) {
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
        if (e.status === 401) {
          this.$router.push("/user/login");
        }
      }
    },
    edit({ name }) {
      this.$ga.event({
        eventCategory: "secret",
        eventAction: "click btn edit secret",
        eventLabel: "secret name",
        eventValue: name
      });
      this.$router.push(`/dashboard/secret/edit/${name}`);
    },
    remove({ name }) {
      this.$ga.event({
        eventCategory: "secret",
        eventAction: "click btn remove secret",
        eventLabel: "secret name",
        eventValue: name
      });
      this.$alertify(
        {
          title: `حذف سکرت`,
          description: ` آیا از حذف ${name} مطمئن هستید؟`
        },
        status => {
          if (status) {
            this.isLoading = true;
            this.$store
              .dispatch("deleteSecret", name)
              .then(res => {
                this.getData();
                this.isLoading = false;
                this.$notify({
                  title: res.message,
                  type: "success"
                });
                this.$ga.event({
                  eventCategory: "secret",
                  eventAction: "remove secret",
                  eventLabel: "secret name",
                  eventValue: name
                });
              })
              .catch(e => {
                this.isLoading = false;
                this.$ga.event({
                  eventCategory: "secret",
                  eventAction: "fail remove secret",
                  eventLabel: "secret name",
                  eventValue: name
                });
                this.$notify({
                  title: e.data.message,
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

