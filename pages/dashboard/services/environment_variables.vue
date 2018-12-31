<template>
  <div>
    <h2>مرحله سوم</h2>
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <wizard btn_title="مرحله بعد">
          <div class="fandogh-form-group">
            <label>نام متغیر</label>
            <f-input
              v-model="name"
              styles="input-white input-block input-dashboard focus"
              placeholder="نام متغیر"
            ></f-input>
          </div>
          <div class="fandogh-form-group">
            <label>مقدار متغیر</label>
            <f-input
              v-model="value"
              styles="input-white input-block input-dashboard"
              placeholder="مقدار متغییر"
            ></f-input>
          </div>
          <div class="box-checkbox center-item w-100 flex-space">
            <div
              class="flex margin-40"
              data-balloon-length="medium"
              data-balloon="با فعال سازی این گزینه مقدار وارد شده نمایش داده نمیشود"
              data-balloon-pos="down"
            >
              <f-checkbox
                v-model="hidden"
                id="checkbox3"
                styles="input-light"
                title="مقدار محرمانه"
              />
              <img src="~/static/icons/plans/info-button.png">
            </div>
            <div class="fandogh-form-group">
              <f-button @onClick="addEnv" styles="transparent black border">افزودن به جدول</f-button>
            </div>
          </div>
          <div class="fandogh-form-group margin-top-100 td-medium">
            <div class="table-title font-roboto">Environment Variables</div>
            <vue-good-table :columns="header" :rows="envsData" :rtl="true" styleClass="vgt-table">
              <div slot="emptystate">
                <p class="empty-table center">دیتایی وجود ندارد</p>
              </div>
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'hidden'">
                  <div v-if="props.row.hidden">
                    <img src="/icons/success.svg">
                  </div>
                  <div v-else>
                    <img src="/icons/fail.svg">
                  </div>
                </span>
                <!-- <span v-else-if="props.column.field == 'name'">{{props.row.name}}</span> -->
                <span v-else-if="props.column.field == 'value'">
                  <div v-if="props.row.hidden">********</div>
                  <div v-else class="position-relative">
                    <i
                      data-balloon-pos="up"
                      :data-balloon="props.row.value"
                      class="balloon-tip"
                      @click="copy(props.row.value)"
                    ></i>
                    <div class="flex-td">
                      <img src="~static/icons/copy.svg" class="space-image">
                      <span>{{props.row.value}}</span>
                    </div>
                  </div>
                </span>
                <span v-else-if="props.column.field == 'action'">
                  <action-button
                    class="action-button-x"
                    @onClick="remove(props.row)"
                    icon="ic-delete.svg"
                    label="حذف"
                  />
                </span>
                <span v-else>{{props.formattedRow[props.column.field]}}</span>
              </template>
            </vue-good-table>
          </div>
        </wizard>
      </div>
    </div>
  </div>
</template>

<script>
import FInput from "~/components/elements/input";
import FButton from "~/components/elements/button";
import FTable from "~/components/Dashboard/table";
import FCheckbox from "~/components/elements/checkbox";
import MultiSelect from "~/components/Dashboard/multiselect";
import Wizard from "~/components/Dashboard/wizard";
import ActionButton from "~/components/Dashboard/table/action-button";
import FMarquee from '~/components/Dashboard/MarqueeText'

export default {
  layout: "dashboard",
  components: {
    FMarquee,
    FInput,
    FButton,
    FCheckbox,
    FTable,
    MultiSelect,
    Wizard,
    ActionButton
  },
  data() {
    return {
      image: this.$route.params.image,
      header: [
        {
          label: "متغییر",
          sortable: false,
          field: "name",
          tdClass: "ltr"
        },
        {
          label: "مقدار متغیر",
          sortable: false,
          field: "value",
          tdClass: "ltr"
        },
        // {
        //   label: "مقدار محرمانه",
        //   sortable: false,
        //   field: "hidden",

        // },
        {
          label: "مدیریت",
          sortable: false,
          field: "action",
          html: true
        }
      ],
      name: "",
      value: "",
      hidden: false,
      env: []
    };
  },

  computed: {
    envsData() {
      return this.env;
    }
  },
  mounted() {
    this.$store.commit("SET_DATA", { data: false, id: "loading" });
    this.name = ""
  },
  methods: {
    copy(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          this.$notify({
            title: `مقدار ${text} کپی شد.`,
            time: 4000,
            type: "error"
          });
        })
        .catch(err => {
          // This can happen if the user denies clipboard permissions:
          console.error('Could not copy text: ', err);
        });
    },
    focus() {
      let elm = document.querySelector(".focus");
      elm.focus();
    },
    async removeRow(name) {
      return (this.env = await this.env.filter(item => item.name !== name));
    },
    remove({ name }) {
      this.removeRow(name).then(res => {
        this.$notify({
          title: "با موفقیت حذف شد",
          type: "success"
        });
      });
    },
    addEnv() {
      this.focus();
      if (this.env.filter(e => e.name === this.name).length > 0) {
        this.$notify({
          title: `شما برای متغییر ${this.name} مقدار تعریف کرده اید.`,
          time: 4000,
          type: "error"
        });
        return;
      }
      let name = this.name;
      let value = this.value;
      let hidden = this.hidden;
      this.env.unshift({ name, value, hidden });
      this.name = "";
      this.value = "";
      this.hidden = false;
    },
    nextStep() {
      this.$router.push("/dashboard/services/create/step4");
    }
  },
  watch: {
    env(value, oldValue) {
      this.$store.dispatch("manifestGenerator", { value, path: "spec.env" });
    }
  }
};
</script>

<style scoped lang="stylus">
.field-description
  color #b5b5b5
  font-size 14px
</style>