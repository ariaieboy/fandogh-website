<template>
  <div>
    <h2>راه اندازی سرویس</h2>
    <div class="row">
      <div class="col-lg-6 col-md-12 col-xs-12">
        <wizard btn_title="مرحله بعد">
          <div class="fandogh-form-group">
            <label>Volume path</label>
            <f-input
              v-model="mount_path"
              styles="input-white input-block input-dashboard"
              placeholder="Mount Path"
              name="نام Volume"
            ></f-input>
          </div>
          <div class="fandogh-form-group">
            <label>Storage sub path</label>
            <f-input
              v-model="sub_path"
              styles="input-white input-block input-dashboard"
              placeholder="Sub Path"
            ></f-input>
          </div>

          <div class="fandogh-form-group">
            <f-button @onClick="addPath" styles="transparent border black">افزودن به جدول</f-button>
          </div>

          <div class="fandogh-form-group margin-top-100">
            <div class="table-title font-roboto">Volume Configurations</div>
            <b-table :fields="header" stacked="lg" :items="envsData" empty-text="دیتایی وجود ندارد">
              <template slot="action" slot-scope="props">
                <action-button
                  class="action-button-s"
                  @onClick="remove(props.item)"
                  icon="ic-delete.svg"
                  label="حذف"
                />
              </template>
            </b-table>
          </div>
        </wizard>
      </div>
    </div>
  </div>
</template>

<script>
import FInput from "~/components/elements/input";
import FButton from "~/components/elements/button";

import FCheckbox from "~/components/elements/checkbox";
import MultiSelect from "~/components/Dashboard/multiselect";
import ErrorReporter from "~/utils/ErrorReporter";
import Wizard from "~/components/Dashboard/wizard";
import ActionButton from "~/components/Dashboard/table/action-button";
import FormValidator from "~/utils/formValidator";

export default {
  layout: "dashboard",
  data() {
    return {
      image: this.$route.params.image,
      header: [
        {
          label: "path",
          sortable: false,
          key: "mount_path",
          tdClass: "ellipsis ltr"
        },
        {
          label: "sub path",
          sortable: false,
          key: "sub_path",
          tdClass: "ellipsis ltr"
        },
        {
          label: "مدیدریت",
          sortable: false,
          key: "action",
          html: true
        }
      ],
      mount_path: "",
      sub_path: "",
      loading: false,
      volume_mounts: []
    };
  },
  components: {
    FInput,
    FButton,
    FCheckbox,
    MultiSelect,
    Wizard,
    ActionButton
  },
  computed: {
    envsData() {
      return this.volume_mounts;
    }
  },
  mounted() {
    this.$store.commit("SET_DATA", { data: false, id: "loading" });
  },
  methods: {
    async removeRow(mount_path) {
      return (this.volume_mounts = await this.volume_mounts.filter(
        item => item.mount_path !== mount_path
      ));
    },
    remove({ mount_path }) {
      this.$alertify(
        {
          title: `حذف Volume Configurations`,
          description: `آیا از حذف ${mount_path} مطمئن هستید؟`
        },
        status => {
          if (status) {
            this.removeRow(mount_path).then(res => {
              this.$notify({
                title: "با موفقیت حذف شد",
                type: "success"
              });
            });
          }
        }
      );
    },
    addPath() {
      if (!FormValidator(this.$data, { mount_path: { required: true, pattern: "^/.*$", msg: "مقدار Volume path را باید به صورت absolute وارد کنید" }, sub_path: { required: true } })) return;
      if (this.volume_mounts.filter(v => v.mount_path === this.mount_path).length > 0) {
        this.$notify({
          title: `شما قبلا در مسیر  ${
            this.mount_path
            } یک volume دیگر mount کرده‌اید`,
          time: 4000,
          type: "error"
        });
        return;
      }
      this.volume_mounts.push({
        mount_path: this.mount_path,
        sub_path: this.sub_path
      });
      this.mount_path = "";
      this.sub_path = "";
    }
  },
  watch: {
    volume_mounts(value, oldValue) {
      this.$store.dispatch("manifestGenerator", { value, path: "spec.volume_mounts" });
    }
  }
};
</script>
