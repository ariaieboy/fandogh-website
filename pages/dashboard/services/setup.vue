<template>
    <div>
        <h2>ایجاد سرویس</h2>
        <div class="row">
            <div class="col-lg-9 col-md-12 col-xs-12">
                <wizard :prevent="prevent" btn_title="مرحله بعد">
                    <div class="fandogh-form-group" style="max-width: 500px">
                        <label>نام سرویس</label>
                        <f-input
                                v-required
                                v-model="name"
                                styles="input-white input-block input-dashboard"
                                placeholder="نام سرویس را در این قسمت بنویسید"
                        ></f-input>
                    </div>
                    <div class="fandogh-form-group" style="max-width: 500px">
                        <label>نوع سرویس</label>
                        <!-- <f-select v-required v-model="kind" :options="service_types" title="انتخاب نوع سرویس"/> -->
                        <v-select
                                v-required
                                dir="rtl"
                                :clearable="false"
                                v-model="kind"
                                :searchable="false"
                                :options="service_types"
                                placeholder="انتخاب نوع سرویس"
                        ></v-select>
                    </div>

                    <div class="fandogh-form-group" style="max-width: 500px">
                        <div class="custom-row">
                            <div style="flex: 3;">
                                <p>مقدار رم سرویس:</p>
                            </div>
                            <div style="margin-left: 12px; margin-right: 12px">
                                <span>MB</span>
                            </div>
                            <div style="flex: 3;">
                                <f-input
                                        v-required
                                        v-model="memory"
                                        type="number"
                                        styles="input-white input-block input-dashboard"
                                        placeholder="میزان رم مورد نیاز"
                                ></f-input>
                            </div>
                        </div>
                    </div>

                    <div v-if="kind && kind.label === 'ExternalService'" class="margin-top-50">
                        <h2>External Option</h2>
                        <div class="fandogh-form-group" style="max-width: 500px">
                            <f-checkbox title="HTTP فعال باشد" id="http" styles="light" v-model="allow_http"/>
                            <!-- <f-v-checkbox color="blue" label="HTTP فعال باشد" v-model="allow_http"/> -->
                        </div>
                        <div class="fandogh-form-group" style="max-width: 500px">
                            <label class="font-roboto">Port</label>
                            <f-input
                                    v-model.number="port"
                                    styles="input-white input-block input-dashboard"
                                    type="number"
                                    placeholder="80"
                            ></f-input>
                        </div>
                        <div class="fandogh-form-group" style="max-width: 500px">
                            <label>دامنه</label>
                            <!-- <f-input v-model="domains"  styles="input-white input-block input-dashboard" placeholder="دامنه خود را وارد نمایید"> </f-input> -->
                            <v-select
                                    dir="rtl"
                                    :clearable="false"
                                    v-model="domains"
                                    :searchable="false"
                                    :options="domainsList"
                                    label="title"
                                    language="fa-IR"
                                    placeholder="انتخاب دامنه‌ها"
                                    multiple
                            ></v-select>
                            <!-- <f-multi-select
                              tabindex="2"
                              v-model="domains"
                              title="لیست دامنه ها را وارد کنید "
                              :options="domainsList"
                              styles="input-white input-block input-dashboard"
                              placeholder="دامنه خود را وارد نمایید"
                            />-->
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

    import FVCheckbox from '~/components/elements/checkbox/checkbox.vue'
    import FCheckbox from '~/components/elements/checkbox'
    // yaml generator
    import Wizard from "~/components/Dashboard/wizard";
    import {Validation} from "~/plugins/validation";


    export default {
        components: {
            FVCheckbox,
            FCheckbox,
            FInput,
            FButton,
            Wizard,
        },
        data() {
            return {
                internal: false,
                name: JSON.parse(localStorage.getItem('vuex')).manifest.name,
                kind: JSON.parse(localStorage.getItem('vuex')).manifest.kind,
                prevent: true,
                port: 80,
                path: "",
                memory: 200,
                allow_http: false,
                domains: "",
                service: "",
                service_types: [
                    {
                        label: "ExternalService"
                    },
                    {
                        label: "InternalService"
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
                if (!this.$store.state.domains) return []
                return this.$store.state.domains.map(item => {
                    return {
                        title: item.name,
                        value: item.name
                    };
                });
            },
        },
        watch: {
            name(value, oldValue) {
                this.$store.dispatch("manifestGenerator", {value, path: "name"});
            },
            kind(value, oldValue) {
                if (value && value.label === 'ExternalService' && !this.allow_http) {
                    this.$store.dispatch("getDomains", {verified: true});
                    let elm = document.querySelector('#http')
                    elm.click()
                }
                this.$store.dispatch("manifestGenerator", {value: value ? value.label : '', path: "kind"});
            },
            allow_http(value, oldValue) {
                this.$store.dispatch("manifestGenerator", {value, path: "spec.allow_http"});
            },
            port(value, oldValue) {
                this.$store.dispatch("manifestGenerator", {value, path: "spec.port"});
            },
            domains(value, oldValue) {
                let list = [...value]
                let mapList = list.map(v => {
                    return {name: v.title}
                })
                this.$store.dispatch("manifestGenerator", {value: mapList, path: "spec.domains"});
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

            console.log('biaaaaaaaaa')
            console.log(JSON.parse(localStorage.getItem('vuex')).manifest.name)
            this.name = JSON.parse(localStorage.getItem('vuex')).manifest.name;
            this.kind = JSON.parse(localStorage.getItem('vuex')).manifest.kind;


            this.$ga.event({
                eventCategory: "service",
                eventAction: "start setup new service"
            });
            this.$store.dispatch("getDomains", {verified: true});
            this.$store.commit("SET_DATA", {id: "manifest", data: {}});
            Validation.$on("validation", ({isValid, keys}) => {
                this.prevent = !isValid;
            });
            this.$store.commit("SET_DATA", {data: false, id: "loading"});
        },
        methods: {
            nextStep() {
                this.$router.push("/dashboard/services/create/step2");
            }
        },

    };
</script>

<style scoped lang="stylus">
    .field-description
        color #b5b5b5
        font-size 14px
</style>
