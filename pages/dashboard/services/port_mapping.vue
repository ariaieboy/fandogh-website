<template>
  <div>
    <h2>راه اندازی سرویس</h2>
    <div class="row">
      <div class="col-md-6 col-xs-12">
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
            <f-select v-model="protocol" :options="protocols" placeholder="Protocol"></f-select>
          </div>

          <div class="fandogh-form-group">
            <f-button @onClick="addPath" styles="transparent border black">افزودن به جدول</f-button>
          </div>

          <div class="fandogh-form-group margin-top-100">
            <div class="table-title font-roboto">Port Mapping</div>
            <vue-good-table :columns="header" :rows="envsData" :rtl="true" styleClass="vgt-table">
              <div slot="emptystate">
                <p class="empty-table center">دیتایی وجود ندارد</p>
              </div>
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
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
import FSelect from "~/components/elements/select";
import ErrorReporter from "~/utils/ErrorReporter";
import Wizard from "~/components/Dashboard/wizard";
import ActionButton from "~/components/Dashboard/table/action-button";

export default {
  layout: "dashboard",
  data() {
    return {
      image: this.$route.params.image,
      header: [
        {
          label: "Inside Port",
          sortable: false,
          field: "port"
        },
        {
          label: "Outside Port",
          sortable: false,
          field: "target_port"
        },
        {
          label: "Protocol",
          sortable: false,
          field: "protocol"
        },
        {
          label: "مدیریت",
          sortable: false,
          field: "action",
          html: true
        }
      ],
      port: "",
      target_port: "",
      protocol: "",
      protocols: [
        {
          title: "TCP"
        },
        {
          title: "UDP"
        }
      ],
      port_mapping: []
    };
  },
  components: {
    FInput,
    ActionButton,
    FButton,
    FCheckbox,
    FTable,
    FSelect,
    Wizard
  },
  computed: {
    envsData() {
      return this.port_mapping;
    }
  },
  methods: {
    async deleteItem(port) {
      return (this.port_mapping = await this.port_mapping.filter(item => item.port !== port));
    },
    remove({ port }) {
      this.$alertify(
        {
          title: `پورت ${port} حذف شود؟`,
          description: " آیا از حذف شدن پورت خود مطمئن هستید؟"
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
      if(this.port_mapping.filter(p=>p.port === this.port).length > 0) {
        this.$notify({
            title: 'نباید مقداره یکسان وارد کنید...!!',
            time: 4000,
            type: 'error'
        });
        return
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
