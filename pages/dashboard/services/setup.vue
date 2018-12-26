<template>
  <div>
    <h2>ایجاد سرویس</h2>
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <wizard :prevent="prevent" btn_title="مرحله بعد">
          <div class="fandogh-form-group">
            <label>نام سرویس</label>
            <f-input
              v-required
              v-model="name"
              styles="input-white input-block input-dashboard"
              placeholder="نام سرویس را در این قسمت بنویسید"
            ></f-input>
          </div>
          <div class="fandogh-form-group">
            <label>نوع سرویس</label>
            <f-select v-required v-model="kind" :options="service_types" title="انتخاب نوع سرویس"/>
          </div>

          <div class="fandogh-form-group">
            <div class="custom-row">
              <div style="flex: 3;">
                <p>مقدار رم سرویس:</p>
              </div>
              <div style="flex: 1">
                <span>MB</span>
              </div>
              <div style="flex: 3;">
                <f-input
                  v-required
                  v-model="memory"
                  styles="input-white input-block input-dashboard"
                  placeholder="Min:128, Max:2048"
                ></f-input>
              </div>
            </div>
          </div>

          <div v-if="kind === 'ExternalService'" class="margin-top-50">
            <h2>External Option</h2>
            <div class="fandogh-form-group">
              <f-checkbox title="HTTP" id="http" styles="light" v-model="allow_http"/>
            </div>
            <div class="fandogh-form-group">
              <label class="font-roboto">Path</label>
              <f-input
                v-model="path"
                styles="input-white input-block input-dashboard"
                placeholder="Path"
              ></f-input>
            </div>
            <div class="fandogh-form-group">
              <label>دامنه</label>
              <!-- <f-input v-model="domains"  styles="input-white input-block input-dashboard" placeholder="دامنه خود را وارد نمایید"> </f-input> -->
              <f-select
                tabindex="2"
                v-model="domains"
                title="ورژن "
                :options="domainsList"
                styles="input-white input-block input-dashboard"
                placeholder="دامنه خود را وارد نمایید"
              ></f-select>
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
import FTable from "~/components/Dashboard/table";
import FCheckbox from "~/components/elements/checkbox";
import FSelect from "~/components/elements/select";

// yaml generator
import Wizard from "~/components/Dashboard/wizard";
import { Validation } from "~/plugins/validation";

export default {
  data() {
    return {
      internal: false,
      name: this.$route.params.image,
      kind: "",
      prevent: true,
      port: "",
      path: "",
      memory: "200",
      allow_http: false,
      domains: "",
      service: "",
      service_types: [
        {
          title: "ExternalService"
        },
        {
          title: "InternalService"
        }
      ],
      data: [
        {
          rows: ["NODE_ENV", "Production"]
        }
      ]
    };
  },
  layout: "dashboard",
  computed: {
    domainsList() {
      return this.$store.state.domains.map(item => {
        return {
          title: item.name,
          value: item.name
        };
      });
    }
  },
  watch: {
    name(value, oldValue) {
      this.$store.dispatch("manifestGenerator", { value, path: "name" });
    },
    kind(value, oldValue) {
      this.$store.dispatch("manifestGenerator", { value, path: "kind" });
    },
    allow_http(value, oldValue) {
      this.$store.dispatch("manifestGenerator", { value, path: "allow_http" });
    },
    path(value, oldValue) {
      this.$store.dispatch("manifestGenerator", { value, path: "path" });
    },
    domains(value, oldValue) {
      this.$store.dispatch("manifestGenerator", { value, path: "domains" });
    },

    memory(value, oldValue) {
      let memory = value.toLowerCase().includes("mi") ? value : value + "Mi";
      this.$store.dispatch("manifestGenerator", {
        value: memory,
        path: "spec.resources.memory"
      });
    }
  },
  mounted() {
    this.$store.dispatch("getDomains");
    this.$store.commit("SET_DATA", { id: "manifest", data: {} });
    this.$ga.event({
      eventCategory: "service",
      eventAction: "start setup new service"
    });
    Validation.$on("validation", ({ isValid, keys }) => {
      this.prevent = !isValid;
    });
  },
  methods: {
    nextStep() {
      this.$router.push("/dashboard/services/create/step2");
    }
  },
  components: {
    FInput,
    FButton,
    FCheckbox,
    FTable,
    FSelect,
    Wizard
  }
};
</script>

<style scoped lang="stylus">
.field-description
  color #b5b5b5
  font-size 14px
</style>
