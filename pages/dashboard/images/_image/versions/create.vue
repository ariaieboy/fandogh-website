<template>
  <div class="row">
    <div class="col-md-6 col-xs-12">
      <h2>آپلود ورژن</h2>
      <div class="fandogh-form-group">
        <f-input
          v-model="name"
          styles="input-white input-block input-dashboard input-disable"
          placeholder="نام ایمیج را در این قسمت بنویسید"
        ></f-input>
      </div>
      <div class="fandogh-form-group">
        <f-input
          v-model="version"
          styles="input-white input-block input-dashboard"
          placeholder="ورژن ایمیج را در این قسمت بنویسید"
        ></f-input>
      </div>
      <div class="fandogh-form-group margin-40">
        <file id="source"/>
      </div>
      <div class="fandogh-form-group margin-top-100">
        <f-button @onClick="createImageVersion" styles="red block" v-if="!loading">آپلود نسخه جدید</f-button>
        <progress-bar v-if="loading" :progress="progress"></progress-bar>
      </div>
    </div>
  </div>
</template>

<script>
import FInput from "~/components/elements/input";
import FButton from "~/components/elements/button";
import File from "~/components/elements/file";
import { formData } from "~/utils/formData";
import ProgressBar from "~/components/Dashboard/progress-bar";
import ErrorReporter from "~/utils/ErrorReporter";
import FormValidator from "~/utils/formValidator";

export default {
  layout: "dashboard",
  data() {
    return {
      name: this.$route.params.image,
      version: "",
      loading: false,
      source: null
    };
  },
  computed: {
    progress() {
      return this.$store.state.progress;
    }
  },
  destroyed() {},
  mounted() {
    this.$store.commit("SET_DATA", { data: false, id: "loading" });
    this.$ga.event({
      eventCategory: "images-version",
      eventAction: "add version image"
    });
    var vm = this;
    let btnfile = document.querySelector("#source");
    btnfile.addEventListener("change", function(e) {
      var files = e.target.files[0];
      if (!files) {
        vm.source = null;
        return;
      }
      vm.source = files;
    });
  },
  components: {
    FInput,
    FButton,
    File,
    ProgressBar
  },
  methods: {
    createImageVersion() {
      if (!FormValidator(this.$data, { version: { required: true } }))
        return false;
      if (this.version.length && this.source) {
        this.loading = true;

        let fd = formData([
          {
            name: "version",
            value: this.version
          },
          {
            type: "image",
            name: "source"
          }
        ]);
        this.$store
          .dispatch("createImageVersion", { name: this.name, formData: fd })
          .then(res => {
            this.$ga.event({
              eventCategory: "images-version",
              eventAction: "create version image"
            });
            this.$notify({
              title: res.message,
              time: 4000,
              type: "success"
            });
            this.$router.push(
              `/dashboard/images/${this.name}/versions/${this.version}/logs`
            );
          })
          .catch(e => {
            this.loading = false;
            this.$ga.event({
              eventCategory: "images-version",
              eventAction: "fail create version image"
            });
            ErrorReporter(e, this.$data, true).forEach(error => {
              this.$notify({
                title: error,
                time: 5000,
                type: "error"
              });
            });
          });
      } else {
        this.$ga.event({
          eventCategory: "images-version",
          eventAction: "fail create version image upload file"
        });
        this.$notify({
          title: "شما فایلی آپلود نکرده اید",
          time: 4000,
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>


  .title_header
    font-family iran-yekan
    font-style normal
    font-weight bold
    font-size 1.2em
    font-stretch normal
    line-height 1.75
    color #7c7c7c
    letter-spacing normal

</style>
