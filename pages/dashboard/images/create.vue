<template>
    <div v-if="verifyUserAccess({ADMIN: 'ADMIN', DEVELOPER: 'DEVELOPER'})">
        <div>
            <h2 class="title_header">ساخت ایمیج</h2>
            <div class="fandogh-form-group">
                <div style="background: #0045ff; width: 100%; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0, 0.4)">
                    <p style="padding: 32px 16px; text-align: center; color: #fefefe; " v-html="description"></p>
                </div>
            </div>


            <div style="background: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0, 0.17); padding: 16px">
                <div class="row">

                    <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                        <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                                      color="#0045ff"
                                      type="text"
                                      dir="ltr"
                                      :rules="[rules.counter, rules.required, rules.service_regex]"
                                      :counter="image.name.counter"
                                      :maxlength="image.name.counter"
                                      v-model="image.name.value"
                                      :hint="image.name.hint"
                                      :label="image.name.label">

                        </v-text-field>

                        <popover :tooltip="tooltips.name"></popover>

                    </div>

                    <div style="display: flex; margin-bottom: 24px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                        <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                                      color="#0045ff"
                                      type="text"
                                      dir="ltr"
                                      :rules="[rules.required, rules.version_counter,rules.version_start_regex, rules.version_regex]"
                                      v-model="image.version.value"
                                      :hint="image.version.hint"
                                      :counter="image.version.counter"
                                      :maxlength="image.version.counter"
                                      :label="image.version.label">

                        </v-text-field>

                        <popover :tooltip="tooltips.version"></popover>

                    </div>

                    <div class="uploader-container fandogh-form-group col-lg-6 col-md-6 col-xs-12 col-sm-12"
                         style="display: flex;">
                        <button style="background: #00E5FF; width: 100%; margin-top: auto; margin-bottom: auto; padding: 12px 0; border-radius: 3px; box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4);
                                    outline: none; font-family: iran-yekan; color: #1d1d1d" v-if="!loading"
                                @click="createImage">ایجاد ایمیج جدید
                        </button>
                        <button
                                style="width: 100%; color: #1d1d1d; margin-top: auto; margin-bottom: auto; padding: 12px 0; border-radius: 3px;
                                    font-family: iran-yekan; outline: none; border: 1px solid #00E5FF;"
                                v-if="loading && !loadingProgress">در حال ساخت
                        </button>
                        <progress-bar v-if="loadingProgress" :progress="progress"></progress-bar>
                    </div>

                    <div class="browser-container fandogh-form-group col-lg-6 col-md-6 col-xs-12 col-sm-12"
                         style="margin-top: 16px">
                        <file class="file" id="source"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import FInput from "~/components/elements/input";
    import FButton from "~/components/elements/button";
    import File from "~/components/elements/file";
    import {formData} from "~/utils/formData";
    import ProgressBar from "~/components/Dashboard/progress-bar";
    import FTextarea from "~/components/Dashboard/textarea";
    import ErrorReporter from "~/utils/ErrorReporter";
    import FormValidator from "~/utils/formValidator";
    import FLabelDisable from "~/components/elements/label/label-disable";
    import Popover from "../../../components/wizard/tooltip/popover";
    import RoleAccessHandler from "../../../utils/RoleAccessHandler";

    export default {
        layout: "dashboard",
        data() {
            return {
                name: "",
                version: "",
                loading: false,
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    service_regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                    counter: value => value.length <= 100 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    version_counter: value => value.length <= 127 || 'مقدار وارد شده نباید بیش از ۱۲۷ کاراکتر باشد',
                    version_regex: value => new RegExp('^[a-zA-Z0-9]+([@$.a-zA-Z0-9]+)*$').test(value) || 'فقط حروف کوچک و بزرگ، اعداد، @، . و $ قابل قبول هستند',
                    version_start_regex: value => new RegExp('^[a-zA-Z0-9]').test(value) || 'نام نسخه فقط باید با عدد یا حرف شروع شود'
                },
                loadingProgress: false,
                source: "",
                image: {
                    name: {
                        label: 'نام ایمیج',
                        hint: 'نام ایمیجی که میخواهید آپلود کنید',
                        default: '80',
                        counter: 100,
                        value: ''
                    },
                    version: {
                        label: 'نسخه ایمیج',
                        hint: 'نسخه دلخواهی برای ایمیجی که میخواهید وارد کنید',
                        default: '',
                        value: '',
                        counter: 127
                    }
                },
                tooltips: {
                    name: {
                        title: 'نام ایمیج',
                        text: 'name-- یا n- پارامتر name یا n نمایانگر نام پروژه ای می باشد که میخواهید بارگذاری کنید.',
                        url: 'https://docs.fandogh.cloud/docs/images.html#%D8%B3%D8%A7%D8%AE%D8%AA-%D8%A7%DB%8C%D9%85%DB%8C%D8%AC-%D9%87%D8%A7'
                    },
                    version: {
                        title: 'نسخه ایمیج',
                        text: 'version-- یا v- پارامتر version یا v نمایانگر ورژن پروژه ای می باشد که میخواهید بارگذاری کنید.',
                        url: 'https://docs.fandogh.cloud/docs/images.html#%D8%B3%D8%A7%D8%AE%D8%AA-%D8%A7%DB%8C%D9%85%DB%8C%D8%AC-%D9%87%D8%A7'
                    },
                },
                description: ` برای ساخت ایمیج لازم است که محتویات پروژه خود را با فرمت zip فشرده کنید و سپس آن را آپلود نمایید.
      <br>
       <b style="margin-top: 8px;display: inline-block;"> در هنگام فشرده سازی حتما توجه داشته باشید که Dockerfile مستقیما در Root  فایل zip قرار بگیرد </b>.`
            };
        },
        computed: {
            progress() {
                return this.$store.state.progress;
            }
        },
        components: {
            FInput,
            FButton,
            FLabelDisable,
            File,
            ProgressBar,
            FTextarea,
            Popover
        },
        destroyed() {
        },
        methods: {
            verifyUserAccess(permitted_roles) {
                return RoleAccessHandler(permitted_roles)
            },
            createImage() {
                this.$ga.event({
                    eventCategory: "image",
                    eventAction: "click btn create image"
                    // eventLabel:'user',
                    // eventValue:'userId'
                });

                if (this.rules.required(this.image.name.value) !== true) {
                    this.$notify({
                        title: 'نام ایمیج نمی‌تواند خالی باشد.',
                        time: 4000,
                        type: "error"
                    });
                    return
                }


                if (this.rules.service_regex(this.image.name.value) !== true) {
                    this.$notify({
                        title: 'نام ایمیج وارد شده صحیح نمی‌باشد',
                        time: 4000,
                        type: "error"
                    });
                    return
                }

                if (this.rules.required(this.image.version.value) !== true) {
                    this.$notify({
                        title: 'نام نسخه نمی‌تواند خالی باشد.',
                        time: 4000,
                        type: "error"
                    });
                    return
                }


                if (this.rules.version_start_regex(this.image.version.value) !== true ||
                    this.rules.version_start_regex(this.image.version.value) !== true) {
                    this.$notify({
                        title: 'نسخه ایمیج وارد شده صحیح نمی‌باشد',
                        time: 4000,
                        type: "error"
                    });
                    return
                }


                this.loading = true;
                this.$store
                    .dispatch("createImage", {name: this.image.name.value})
                    .then(res => {
                        this.$notify({
                            title: res.message,
                            time: 3000,
                            type: "success"
                        });

                        if (this.image.version.value.length && this.source) {
                            this.loadingProgress = true;

                            let fd = formData([
                                {
                                    name: "version",
                                    value: this.image.version.value
                                },
                                {
                                    name: "source",
                                    value: this.source
                                }
                            ]);

                            this.$store
                                .dispatch("createImageVersion", {name: this.image.name.value, formData: fd})
                                .then(res => {
                                    this.$notify({
                                        title: res.message,
                                        time: 4000,
                                        type: "success"
                                    });
                                    this.loading = false;
                                    this.loadingProgress = false;
                                    this.$ga.event({
                                        eventCategory: "images",
                                        eventAction: "images create"
                                    });
                                    this.$router.push({
                                            path: `/dashboard/images/${this.image.name.value}/versions/${this.image.version.value}/logs`,
                                            query: {ns: this.$route.query.ns}
                                        }
                                    );
                                })
                                .catch(e => {
                                    this.loading = false;
                                    this.loadingProgress = false;
                                    ErrorReporter(e, this.$data, true).forEach(error => {
                                        this.$notify({
                                            title: error,
                                            time: 4000,
                                            type: "error"
                                        });
                                    });
                                });
                        } else {
                            this.loading = false;
                            this.$ga.event({
                                eventCategory: "images",
                                eventAction: "images version create"
                            });
                            this.$router.push({path: "/dashboard/images", query: {ns: this.$route.query.ns}});
                        }
                    })
                    .catch(e => {
                        this.loading = false;
                        ErrorReporter(e, this.$data, true).forEach(error => {
                            this.$notify({
                                title: error,
                                time: 4000,
                                type: "error"
                            });
                        });
                    });
            }
        },
        mounted() {
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
            this.$ga.event({
                eventCategory: "image",
                eventAction: "add image"
                // eventLabel:'user',
                // eventValue:'userId'
            });
            var vm = this;
            let btnfile = document.querySelector("#source");
            btnfile.addEventListener("change", function (e) {
                var files = e.target.files[0];
                if (!files) {
                    vm.source = null;
                    return;
                }
                vm.source = files;
            });
        }
    };
</script>
<style lang="stylus" scoped>


    .browser-container
        order 2
        @media only screen and (max-width: 993px)
            order 1

    .uploader-container
        order 1
        @media only screen and (max-width: 993px)
            order 2

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
