<template>
  <div>
    <h2>راه اندازی سرویس</h2>
    <div class="row">
      <div class="col-lg-6 col-md-12 col-xs-12">
        <wizard btn_title="مرحله بعد">
          <div class="fandogh-form-group">
            <f-radio v-model="image_type" :options="image_types" title="نوع ایمیج"/>
          </div>
          <a
            v-if="!images.length && !loading"
            href="https://docs.fandogh.cloud/docs/getting-started.html"
            target="_blank"
          >
            <f-label
              value="شما هیچ تصویری پابلیش نکرده اید٬ برای آپلود کردن تصویر می توانید از این لینک  استفاده کنید."
            />
          </a>
          <div v-if="internal" class="row">
            <div class="col-sm-8 col-xs-12">
              <div class="fandogh-form-group">
                <label>نام ایمیج</label>
                <v-select
                  v-model="image"
                  :options="images"
                  dir="rtl"
                  label="name"
                  :clearable="false"
                  placeholder="نام ایمیج را انتخاب کنید"
                ></v-select>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12">
              <div class="fix-list fandogh-form-group">
                <label>ورژن ایمیج</label>
                <v-select
                  v-model="version"
                  :options="versions"
                  placeholder="ورژن ایمیج را انتخاب کنید"
                  dir="rtl"
                  label="version"
                  :clearable="false"
                  :loading="version_loaded"
                ></v-select>
              </div>
            </div>
          </div>

          <div v-else class="row">
            <div class="col-sm-8 col-xs-12">
              <div class="fandogh-form-group">
                <label>نام یا آدرس ایمیج</label>
                <f-input
                  v-model="image_external"
                  styles="input-white input-block input-dashboard"
                  placeholder="نام ایمیج خارجی بنویسید"
                ></f-input>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12">
              <div class="fandogh-form-group">
                <label>ورژن ایمیج</label>
                <f-input
                  v-model="version_external"
                  styles="input-white input-block input-dashboard"
                  placeholder="آخرین ورژن"
                ></f-input>
              </div>
            </div>
          </div>

          <div class="fandogh-form-group">
            <label>Replicas</label>
            <f-input
              v-model="replicas"
              styles="input-white input-block input-dashboard"
              type="number"
              placeholder="تعداد رپلیکاها را در این قسمت بنویسید"
            ></f-input>
          </div>

          <div class="fandogh-form-group" v-if="image_type === 'خارجی'">
            <label>Image Pull Policy</label>
            <v-select
              dir="rtl"
              :v-model="image_pull_policy"
              :options="['Always','IfNotPresent']"
              placeholder="Image Pull Policy"
            ></v-select>
          </div>

          <div class="fandogh-form-group" v-if="image_type === 'خارجی'">
            <label>Image Pull Secret</label>
            <v-select
              dir="rtl"
              v-model="image_pull_secret"
              title="Image Pull Secret"
              :options="secretList"
              placeholder="Image Pull Secret "
            ></v-select>
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
import FLabel from "~/components/Dashboard/label";
import Wizard from "~/components/Dashboard/wizard";
import FRadio from "~/components/elements/radio";
import { getValue, setValue } from "~/utils/cookie";

// yaml generator
import jsyaml from "js-yaml";

export default {
  components: {
    FInput,
    FButton,
    FCheckbox,
    FLabel,
    Wizard,
    FRadio
  },
  data() {
    return {
      replicas: "",
      image: "",
      image_external: "",
      version_external: "latest",
      version_loaded: false,
      version: "",
      image_type: "",
      image_pull_policy: "",
      image_pull_secret: "",
      image_types: ["داخلی فندق", "خارجی"],
      isMount: false
    };
  },

  computed: {
    loading() {
      return this.$store.state.loading;
    },
    secretList() {
      return this.$store.state.secrets.map(item => {
        return item.name
      });
    },
    nameImage() {
      return getValue("name");
    },
    versionsImage() {
      return getValue("versions");
    },
    internal() {
      return this.image_types[0] === this.image_type;
    },
    images() {
      if (!this.$store.state.images) return [];
      return this.$store.state.images
    },
    // spec_image() {
    //   return ((this.$store.state.manifest || {}).spec || {}).image;
    // },
    versions() {
      if (!this.$store.state.versions) return [];
      return this.$store.state.versions
    },
  },
  layout: "dashboard",
  watch: {
    // nameImage(val) {
    //   console.log(val);
    //   if (val) {
    //     if (this.nameImage) {
    //       this.image = this.nameImage;
    //       this.version = this.versionsImage;
    //     }
    //   }
    // },
    image(val, oldValue) {
      if (!val) return
      let value = val.name
      if (!value) return
      this.getImageV(value)
    },
    version(value) {
      this.setImageNameV()
    },
    image_external(value) {
      this.setImageNameV()
    },
    version_external(value) {
      this.setImageNameV()
    },
    image_type(value) {
      // this.image = ""
      this.setImageNameV()
    },
    replicas(value, oldValue) {
      this.$store.dispatch("manifestGenerator", {
        value,
        path: "spec.replicas"
      });
    },
    image_pull_policy(value, oldValue) {
      this.$store.dispatch("manifestGenerator", {
        value,
        path: "spec.image_pull_policy"
      });
    },
    image_pull_secret(value, oldValue) {
      this.$store.dispatch("manifestGenerator", {
        value,
        path: "spec.image_pull_secret"
      });
    }
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
        if (e.status === 401) {
          this.$router.push("/user/login");
        }
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      }
    },
    setImageV() {
      var value = value = this.spec_image
      if (!value) return
      let imageAndVersion = value.split(":");
      if (imageAndVersion.length > 1) {
        setValue({ key: "versions", value: imageAndVersion[1] });
        setValue({ key: "name", value: imageAndVersion[0] });
      }
      this.isMount = false
    },
    getImageV(value) {
      this.version_loaded = false;
      this.$store.dispatch("getImageVersions", value).then(res => {
        this.version_loaded = false;
      });
    },
    setImageNameV() {
      let val = this.internal ? this.image.name + ":" + this.version.version : this.image_external + ":" + this.version_external;
      let check = val.split(':')[0] && val.split(':')[1]
      if (check !== 'undefined') {
        this.$store.dispatch("manifestGenerator", { value: val, path: "spec.image" });
      }
    },
    nextStep() {
      this.$router.push("/dashboard/services/create/step3");
    }
  },
  destroyed() {
    this.setImageV()
  },

  mounted() {
    this.$store.dispatch("getSecret");
  }
};
</script>

<style scoped lang="stylus">
.field-description
  color #b5b5b5
  font-size 14px
</style>