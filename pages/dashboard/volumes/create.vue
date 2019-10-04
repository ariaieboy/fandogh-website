<template>
    <div>
        <h2 class="title_header">ساخت فضای ذخیره‌سازی</h2>


        <div style="background: #fefefe; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0, 0.17); padding: 16px">
            <div class="row" style="display: flex; width: 100%">

                <div style="display: flex; margin-bottom: 24px"
                     class="col-xs-12 col-sm-12 col-md-6 col-lg-6 volume-chart">
                    <f-charts
                            class="pr-lg-25"
                            title="فضای ذخیره‌سازی"
                            :data="volumeUsage"
                            unit="گیگابایت"
                            :colors="['#086375','#3ccc38']"/>
                </div>

                <div style="display: flex; margin-bottom: 24px; flex-direction: column"
                     class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

                    <div style="display: flex; margin-bottom: 24px; width: 100%">

                        <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                                      color="#0045ff"
                                      type="text"
                                      dir="ltr"
                                      required
                                      :rules="[rules.counter, rules.required, rules.volume_name_regex]"
                                      :counter="volume.name.counter"
                                      :maxlength="volume.name.counter"
                                      v-model="volume.name.value"
                                      :hint="volume.name.hint"
                                      :label="volume.name.label">

                        </v-text-field>

                        <popover :tooltip="tooltips.name"></popover>

                    </div>

                    <div style="display: flex; margin-bottom: 24px; width: 100%">

                        <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                                      color="#0045ff"
                                      type="number"
                                      dir="ltr"
                                      :min="10"
                                      required
                                      :rules="[rules.required, rules.min_value]"
                                      v-model.number="volume.capacity.value"
                                      :hint="volume.capacity.hint"
                                      :maxlength="volume.capacity.counter"
                                      :label="volume.capacity.label">

                        </v-text-field>

                        <popover :tooltip="tooltips.capacity"></popover>

                    </div>

                </div>

            </div>

            <div style="display: flex; width: 100%; padding: 32px 16px">
                <button style="background: #00E5FF; width: 100%; margin: auto; padding: 12px 0; border-radius: 3px; box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4);
                        max-width: 350px; outline: none; font-family: iran-yekan; color: #1d1d1d"
                        @click="createVolume">ایجاد فضای ذخیره‌سازی جدید
                </button>
            </div>

        </div>
    </div>

</template>

<script>
    import RoleAccessHandler from "../../../utils/RoleAccessHandler";
    import Popover from "../../../components/wizard/tooltip/popover";
    import {getValue} from "../../../utils/cookie";
    import ErrorReporter from "../../../utils/ErrorReporter";
    import FCharts from "~/components/Dashboard/home/usage.vue";

    export default {
        name: "create",
        layout: 'dashboard',
        components: {
            Popover,
            FCharts,
        },
        data() {
            return {
                name: "",
                loading: false,
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    volume_name_regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                    counter: value => value.length <= 100 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد',
                    min_value: value => value >= 10 || 'میزان حافظه ذخیره‌سازی نمی‌تواند کمتر از ۱۰ گیگابایت باشد'
                },
                volume: {
                    name: {
                        label: 'نام فضای ذخیره‌سازی',
                        hint: 'نام فضای ذخیره‌سازی که می‌خواهید ایجاد کنید',
                        default: '',
                        counter: 100,
                        value: ''
                    },
                    capacity: {
                        label: 'میزان فضای ذخیره‌سازی',
                        hint: 'میزان فضای ذخیره‌سازی که نیاز دارید تا به این فضای ذخیره‌سازی تخصیص داده شود.',
                        default: '',
                        value: 10
                    }
                },
                tooltips: {
                    name: {
                        title: 'نام فضای ذخیره‌سازی',
                        text: 'برای آنکه بتوانید بعد از ساخت به volume جدید دسترسی داشته باشید نیاز است تا یک نام برای آن انتخاب کنید تا در آینده برای استفاده راحت‌ باشید',
                        url: 'https://docs.fandogh.cloud/docs/dedicated-volume.html#%DA%86%DA%AF%D9%88%D9%86%DA%AF%DB%8C-%D8%B3%D8%A7%D8%AE%D8%AA-volume'
                    },
                    capacity: {
                        title: 'میزان فضای ذخیره‌سازی یا capacity',
                        text: 'هر فضا یا volume باید حجم مشخصی داشته باشد که شما آن را تعیین می‌کنید. توجه داشته باشید حداقل فضای قابل ساخت ۱۰ گیگابایت است و کمتر از آن امکان‌پذیر نیست.',
                        url: 'https://docs.fandogh.cloud/docs/dedicated-volume.html#%DA%86%DA%AF%D9%88%D9%86%DA%AF%DB%8C-%D8%B3%D8%A7%D8%AE%D8%AA-volume'
                    },
                },
                description: ` برای ساخت ایمیج لازم است که محتویات پروژه خود را با فرمت zip فشرده کنید و سپس آن را آپلود نمایید.
      <br>
       <b style="margin-top: 8px;display: inline-block;"> در هنگام فشرده سازی حتما توجه داشته باشید که Dockerfile مستقیما در Root  فایل zip قرار بگیرد </b>.`
            };
        },
        created() {

            this.$store.commit("SET_DATA", {data: false, id: "loading"});

        },
        methods: {

            verifyUserAccess(permitted_roles) {
                return RoleAccessHandler(permitted_roles)
            },
            createVolume() {
                this.$store.commit("SET_DATA", {data: true, id: "loading"});

                this.$ga.event({
                    eventCategory: "volume",
                    eventAction: "click btn create volume",
                    eventLabel: 'namespace',
                    eventValue: getValue('namespace')
                });

                if (this.rules.required(this.volume.name.value) !== true) {
                    this.$notify({
                        title: 'نام فضای ذخیره‌سازی نمی‌تواند خالی باشد.',
                        time: 4000,
                        type: "error"
                    });
                    return
                }

                if (this.rules.required(this.volume.capacity.value) !== true) {
                    this.$notify({
                        title: 'میزان حجم فضای ذخیره‌سازی نمی‌تواند خالی باشد.',
                        time: 4000,
                        type: "error"
                    });
                    return
                }


                if (this.rules.volume_name_regex(this.volume.name.value) !== true) {
                    this.$notify({
                        title: 'نام فضای ذخیره‌سازی وارد شده صحیح نمی‌باشد',
                        time: 4000,
                        type: "error"
                    });
                    return
                }

                if (this.rules.min_value(this.volume.capacity.value) !== true) {
                    this.$notify({
                        title: 'حداقل فضای قابل ساخت ۱۰ گیگابایت است',
                        time: 4000,
                        type: "error"
                    });
                    return
                }

                this.$store
                    .dispatch("createNewVolume", {
                        volume_name: this.volume.name.value,
                        volume_capacity: this.volume.capacity.value
                    })
                    .then(res => {
                        this.$notify({
                            title: res.message,
                            time: 3000,
                            type: "success"
                        });
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
                        this.$router.replace("/dashboard/volumes");
                    })
                    .catch(e => {
                        this.$store.commit("SET_DATA", {data: false, id: "loading"});
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
        computed: {
            volumeUsage(){
                let planObject = JSON.parse(localStorage.getItem('vuex')).activePlan;
                const used = planObject.current_used_resources.volume_usage;
                const free = planObject.quota.volume_limit - used;
                const usage = [free, used];
                return usage
            }
        }
    }
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

    .volume-chart
        order 1
        @media only screen and (max-width: 992px)
            order 0

</style>
