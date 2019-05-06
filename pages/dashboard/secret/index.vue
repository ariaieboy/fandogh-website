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

      <box-table :titles="titleRow" :items="secrets" :func="edit" :menu="menuList"></box-table>

    </div>
  </div>
</template>

<script>

import FButton from "~/components/elements/button";
import FFromDate from "~/utils/fromDate";
import ActionButton from "~/components/Dashboard/table/action-button";
import FEmpty from "~/components/Dashboard/empty";
import FLoading from "~/components/Loading";
import BoxTable from "../../../components/Dashboard/table/box-table";
import Moment from 'moment-jalaali'

export default {
  layout: "dashboard",
  components: {
    FLoading,
    FButton,
    ActionButton,
    FEmpty,
    BoxTable,
    Moment
  },
  data() {
    return {
      isLoading: false,
      titleRow: [
        {title: 'نام سکرت', width: '39%', name: 'name', class: {}},
        {title: 'تاریخ ساخت', width: '19%', name: 'created_at', class: {}},
        {title: 'نوع سکرت', width: '39%', name: 'type', class: {}},
      ],
      menuList: [
        {method: this.edit, icon: 'edit.svg', title: 'ویرایش سکرت', style: {}},
        {method: this.remove, icon: 'ic_delete.svg', title: 'حذف سکرت', style: {color: '#fd3259'}},
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
            created_at: Moment(created_at).format('jYYYY/jMM/jDD')
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
    edit(index) {
      this.$ga.event({
        eventCategory: "secret",
        eventAction: "click btn edit secret",
        eventLabel: "secret name",
        eventValue: this.secrets[index].name
      });
      this.$router.push(`/dashboard/secret/edit/${this.secrets[index].name}`);
    },
    remove(index) {
      this.$ga.event({
        eventCategory: "secret",
        eventAction: "click btn remove secret",
        eventLabel: "secret name",
        eventValue: this.secrets[index].name
      });
      this.$alertify(
        {
          title: `حذف سکرت`,
          description: ` آیا از حذف ${this.secrets[index].name} مطمئن هستید؟`
        },
        status => {
          if (status) {
            this.isLoading = true;
            this.$store
              .dispatch("deleteSecret", this.secrets[index].name)
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
                  eventValue: this.secrets[index].name
                });
              })
              .catch(e => {
                this.isLoading = false;
                this.$ga.event({
                  eventCategory: "secret",
                  eventAction: "fail remove secret",
                  eventLabel: "secret name",
                  eventValue: this.secrets[index].name
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

