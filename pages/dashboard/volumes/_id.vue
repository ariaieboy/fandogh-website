<template>
    <div>
        <h2 class="title_header">افزایش فضای ذخیره‌سازی</h2>
        <div class="fandogh-form-group" style="margin-bottom: 32px">
            <div style="background: #0045ff; width: 100%; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0, 0.4)">
                <p style="padding: 32px 16px; text-align: center; color: #fefefe; " v-html="description"></p>
            </div>
        </div>

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
                                      v-model="volume_name"
                                      :disabled="true">

                        </v-text-field>

                    </div>

                    <div style="display: flex; margin-bottom: 24px; width: 100%">

                        <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                                      color="#0045ff"
                                      type="number"
                                      dir="ltr"
                                      required
                                      :rules="[rules.required]"
                                      v-model.number="volume.capacity.value"
                                      :hint="volume.capacity.hint"
                                      :label="volume.capacity.label">

                        </v-text-field>

                        <popover :tooltip="tooltips.capacity"></popover>

                    </div>

                </div>

            </div>

            <div style="display: flex; width: 100%; padding: 32px 16px">
                <button style="background: #00E5FF; width: 100%; margin: auto; padding: 12px 0; border-radius: 3px; box-shadow: 0 2px 6px rgba(0, 229, 255, 0.4);
                        max-width: 350px; outline: none; font-family: iran-yekan; color: #1d1d1d"
                        @click="increaseCapacity">
                    افزایش فضای ذخیره‌سازی
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
        name: "_id",
        layout: 'dashboard',
        components: {
            Popover,
            FCharts,
        },
        data() {
            return {
                volume_name: this.$route.params.id,
                name: "",
                volume_object: null,
                loading: false,
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
                rules: {
                    required: value => !!value || 'پر کردن این فیلد اجباری‌ است',
                    volume_name_regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                    counter: value => value.length <= 100 || 'مقدار وارد شده نباید بیش از ۱۰۰ کاراکتر باشد'
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
                description: ` توجه داشته باشید عمل افزایش فضای ذخیره‌سازی بدون بازگشت است و شما دیگر قادر به کاهش آن نخواهید بود
      <br>
       <b style="margin-top: 8px;display: inline-block;"> همچنین افزایش فضای ذخیره‌سازی ممکن است در موارد خاص منجر به حذف داده‌های شما شود، لذا قبل از افزایش حجم از داده‌های خود بکاپ تهیه نمایید.</b>.`

            }
        },
        computed: {
            volumeUsage() {
                let planObject = JSON.parse(localStorage.getItem('vuex')).activePlan;
                const used = planObject.current_used_resources.volume_usage;
                const free = planObject.quota.volume_limit - used;
                const usage = [free, used];
                return usage
            }
        },
        created() {
            this.getData();
        },
        methods: {
            verifyUserAccess(permitted_roles) {
                return RoleAccessHandler(permitted_roles)
            },
            increaseCapacity() {

                if (this.rules.required(this.volume.capacity.value) !== true) {
                    this.$notify({
                        title: 'میزان حجم فضای ذخیره‌سازی نمی‌تواند خالی باشد.',
                        time: 4000,
                        type: "error"
                    });
                    return
                }

                if (this.volume.capacity.value <= parseInt(this.volume_object.capacity.toString().replace('Gi', ''))) {
                    this.$notify({
                        title: `شما نمی‌توانید فضای ذخیره‌سازی را کاهش دهید`,
                        time: 4000,
                        type: "error"
                    });
                    return
                }

                this.$ga.event({
                    eventCategory: "volume",
                    eventAction: "click btn resize volume",
                    eventLabel: "volume name",
                    eventValue: this.volume_name
                });
                this.$alertify(
                    {
                        title: `افزایش حجم فضای ذخیره‌سازی`,
                        img: require("../../../components/Dashboard/alert/images/resize_volume.svg"),
                        description: ` از انجام فرآیند افزایش فضای ذخیره‌سازی ${this.volume_name} مطمئن هستید؟`,
                        label: 'افزایش فضا'
                    },
                    status => {
                        if (status) {
                            this.$store.commit("SET_DATA", {data: true, id: "loading"});

                            this.$store
                                .dispatch("resizeSelectedVolume", {
                                    volume_name: this.volume_name,
                                    volume_size: this.volume.capacity.value
                                })
                                .then(res => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$router.replace('/dashboard/volumes');
                                    this.$notify({
                                        title: res.message,
                                        type: "success"
                                    });
                                    this.$ga.event({
                                        eventCategory: "volume",
                                        eventAction: "volume resize completed",
                                        eventLabel: "volume name",
                                        eventValue: this.volume_name
                                    });
                                })
                                .catch(e => {
                                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                                    this.$ga.event({
                                        eventCategory: "volume",
                                        eventAction: "failed to resize volume",
                                        eventLabel: "volume name",
                                        eventValue: this.volume_name
                                    });
                                    this.$notify({
                                        title: e.data.message,
                                        type: "error"
                                    });
                                });
                        }
                    }
                );
            },
            async getData() {
                try {
                    this.volume_object = await this.$store.dispatch("getVolumeDetails", this.volume_name);
                    this.volume.capacity.value = parseInt(this.volume_object.capacity.toString().replace('Gi', ''));
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                } catch (e) {
                    this.$store.commit("SET_DATA", {data: false, id: "loading"});
                    if (e.status === 401) {
                        this.$router.push("/user/login");
                    } else {
                        this.$notify({
                            title: e.data.message,
                            time: 4000,
                            type: "error"
                        });
                    }
                }
            },
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
