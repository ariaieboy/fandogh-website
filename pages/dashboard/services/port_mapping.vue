<template>
  <div>
    <h2>راه اندازی سرویس</h2>
    <div class="row">
      <div class="col-lg-6 col-md-12 col-xs-12">
        <wizard btn_title="مرحله بعد">
          <div class="fandogh-form-group">
            <label>Inside Port</label>
            <f-input
              v-model="port"
              styles="input-white input-block input-dashboard"
              placeholder="Inside Port"
            ></f-input>
          </div>
          <div class="fandogh-form-group">
            <label>Outside Port</label>
            <f-input
              v-model="target_port"
              styles="input-white input-block input-dashboard"
              placeholder="Outside Port"
            ></f-input>
          </div>
          <div class="fandogh-form-group">
            <label>Protocol</label>
            <v-select
              v-model="protocol"
              :options="protocols"
              dir="rtl"
              :clearable="false"
              placeholder="Protocol"
            ></v-select>
          </div>

          <div class="fandogh-form-group">
            <f-button @onClick="addPath" styles="transparent border black">افزودن به جدول</f-button>
          </div>

          <div class="fandogh-form-group margin-top-100">
            <div class="table-responsive table-multicolor">
              <div class="table-title font-roboto">Port Mapping</div>
              <b-table
                :fields="header"
                stacked="lg"
                :items="envsData"
                empty-text="دیتایی وجود ندارد"
              >
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
          label: "Inside Port",
          sortable: false,
          key: "port"
        },
        {
          label: "Outside Port",
          sortable: false,
          key: "target_port"
        },
        {
          label: "Protocol",
          sortable: false,
          key: "protocol"
        },
        {
          label: "مدیریت",
          sortable: false,
          key: "action",
          html: true
        }
      ],
      port: "",
      target_port: "",
      protocol: "TCP",
      protocols: ["TCP", "UDP"],
      port_mapping: []
    };
  },
  components: {
    FInput,
    ActionButton,
    FButton,
    FCheckbox,
    Wizard
  },
  computed: {
    envsData() {
      return this.port_mapping;
    }
  },
  mounted() {
    this.$store.commit("SET_DATA", { data: false, id: "loading" });
  },
  methods: {
    async deleteItem(port) {
      return (this.port_mapping = await this.port_mapping.filter(
        item => item.port !== port
      ));
    },
    remove({ port }) {
      this.$alertify(
        {
          title: `حذف پورت`,
          description: `آیا از حذف ${port} مطمئن هستید؟`
        },
        status => {
          if (status) {
            this.deleteItem(port).then(res => {
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
      if (
        !FormValidator(this.$data, {
          target_port: {
            required: true,
            name: "Inside Port"
          },
          port: {
            required: true,
            name: "Outside Port "
          }
        })
      )
        return;
      if (this.port_mapping.filter(p => p.port === this.port).length > 0) {
        this.$notify({
          title: `نگاشت پورت ${this.port} تکراری است`,
          time: 4000,
          type: "error"
        });
        return;
      }
      if (
        this.port_mapping.filter(p => p.target_port === this.target_port)
          .length > 0
      ) {
        this.$notify({
          title: `شما قبلا به پورت ${this.target_port} یک نگاشت ایجاد کرده‌اید`,
          time: 4000,
          type: "error"
        });
        return;
      }
      this.port_mapping.push({
        port: this.port,
        target_port: this.target_port,
        protocol: this.protocol
      });
    }
  },
  watch: {
    port_mapping(value, oldValue) {
      this.$store.dispatch("manifestGenerator", {
        value,
        path: "spec.port_mapping"
      });
    }
  }
};
</script>
