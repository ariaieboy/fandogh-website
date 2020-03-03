<template>
    <div>

        <div style="margin-top: 12px;">


            <config-box :section-title="sections.image_registry" :tooltip="sections.image_registry_tooltip">

                <div style="display: flex; flex-wrap: wrap; justify-content: center">

                    <span v-for="(registry, index) in manifest_model.image.registries"
                          :key="index"
                          v-tooltip="registry.tooltip"
                          :class="['registry-button', {'is-active': registry.is_active}]"
                          @click="onRegistryClicked(index)">
                        {{registry.local_name}}
                        <img :src="require('../../../../assets/svg/' + registry.icon)"
                             :style="{width:(registry.local_name === 'Docker' ? '34px': '30px'),
                             marginRight: (registry.local_name === 'Other' ? '40px': '27px')}"/>
                    </span>

                </div>


            </config-box>

            <config-box :section-title="sections.image_info">

                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0;">

                    <div v-if="manifest_model.image.registry.local_name === 'Fandogh'"
                         style="display: flex; margin-top: 12px; position: relative; margin-bottom: 0;">

                        <div class="fandogh-form-group"
                             style="display: block; width: 100%; margin-left: -15px; margin-bottom: 16px;">
                            <label style="font-size: 12px; color: #6c6c6c; margin-bottom: 7px; z-index: 1002; position: relative;">{{image_name_obj.label}}</label>
                            <v-select
                                    ref="name_selector"
                                    style="height: 38px; font-family: iran-yekan;margin-top: -5px; position: relative; z-index: 1001;"
                                    dir="rtl"
                                    @input="changedImage"
                                    :clearable="clearable"
                                    :options="images"
                                    v-model="manifest_model.image.image_object.name"
                                    label="name"
                                    language="fa-IR"
                                    :searchable="searchable"
                                    :reduce="name => name.name"
                                    placeholder="نام ایمیج مورد نظر خود را وارد نمایید">
                            </v-select>

                        </div>

                        <popover style="z-index: 1001" :tooltip="tooltips.image_name"></popover>
                    </div>

                    <div v-else style="display: flex;">

                        <v-text-field
                                style="font-family: iran-yekan; font-size: 1em;margin-left: -15px; padding-left: 0;"
                                :rules="[rules.required]"
                                color="#0045ff"
                                type="text"
                                dir="ltr"
                                required
                                :placeholder="manifest_model.image.registry.local_name === 'Docker' ? 'library/image-name OR organization-name/image-name' : ''"
                                v-model="manifest_model.image.image_object.name"
                                :hint="image_name_obj.hint"
                                :label="image_name_obj.label">

                        </v-text-field>

                        <popover :tooltip="tooltips.image_name"></popover>

                    </div>


                    <div v-if="manifest_model.image.registry.local_name === 'Fandogh'"
                         style="display: flex; margin-top: 12px; position: relative">

                        <div class="fandogh-form-group"
                             style="display: block; width: 100%; margin-left: -15px; margin-bottom: 16px">
                            <label style="font-size: 12px; color: #6c6c6c; margin-bottom: 7px; z-index: 100; position: relative;">
                                {{image_version_obj.label}}</label>
                            <v-select
                                    ref="version_selector"
                                    style="height: 38px;margin-bottom: 0; font-family: iran-yekan;margin-top: -5px; position: relative;"
                                    dir="rtl"
                                    :clearable="clearable"
                                    :options="versions"
                                    v-model="manifest_model.image.image_object.version"
                                    label="version"
                                    language="fa-IR"
                                    :loading="version_loaded"
                                    :searchable="searchable"
                                    :reduce="version => version.version"
                                    :placeholder="image_version_obj.hint">
                            </v-select>

                        </div>

                        <popover :tooltip="tooltips.image_version"></popover>

                    </div>

                    <div v-else style="display: flex;">

                        <v-text-field style="font-family: iran-yekan; font-size: 1em;margin-left: -15px"
                                      :rules="[rules.required]"
                                      color="#0045ff"
                                      type="text"
                                      dir="ltr"
                                      required
                                      v-model="manifest_model.image.image_object.version"
                                      :hint="image_version_obj.hint"
                                      :clearable="false"
                                      :label="image_version_obj.label">

                        </v-text-field>

                        <popover :tooltip="tooltips.image_version"></popover>

                    </div>


                </form>

            </config-box>


            <config-box :section-title="sections.image_settings" :tooltip="sections.image_settings_tooltip">

                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0;">

                    <div v-if="manifest_model.image.registry.local_name !== 'Fandogh'"
                         style="display: flex; margin-top: 12px; position: relative; margin-bottom: 16px;">

                        <div class="fandogh-form-group"
                             style="display: block; width: 100%; margin-left: -15px; margin-bottom: 16px;">
                            <label style="font-size: 12px; color: #6c6c6c; margin-bottom: 7px; z-index: 1002; position: relative;">{{manifest_model.image.secret_obj.label}}</label>
                            <v-select
                                    ref="secret_selector"
                                    style="height: 38px; font-family: iran-yekan;margin-top: -5px; position: relative; z-index: 1001;"
                                    dir="rtl"
                                    :clearable="clearable"
                                    :options="secretList"
                                    v-model="manifest_model.image.secret_obj.value"
                                    language="fa-IR"
                                    :searchable="searchable"
                                    :placeholder="manifest_model.image.secret_obj.hint">
                            </v-select>

                        </div>

                        <popover style="z-index: 1001" :tooltip="tooltips.image_secret"></popover>

                    </div>

                    <div class="image-pull-policy-container">
                        <span style="height: 35px; display: flex; margin-left: 12px; background-color: #0045ff; border-radius: 25px;">
                            <span style="line-height: 35px; font-size: 1em; margin-right: 12px;color: #fefefe; font-family: iran-yekan">Image Pull Policy</span>
                            <popover class="popover-style" :tooltip="tooltips.image_pull_policy"></popover>
                        </span>

                        <div>
                            <fan-checkbox v-for="(policy,index) in manifest_model.image.image_pull_policy_obj"
                                          :key="index"
                                          @click.native="checkBoxSelected(index)"
                                          v-tooltip="policy.tooltip"
                                          :object="policy">

                            </fan-checkbox>
                        </div>

                    </div>

                </form>

            </config-box>


        </div>

    </div>
</template>

<script>
    import ConfigBox from "../../../../components/wizard/box/config-box";
    import Popover from "../../../../components/wizard/tooltip/popover";
    import FanCheckbox from "../../../../components/wizard/select-box/fan-checkbox";

    export default {
        name: "image-setup",
        props: {
            manifest_model: {
                type: Object,
                required: true
            }
        },
        model: {
            prop: 'manifest_model',
        },
        components: {
            FanCheckbox,
            ConfigBox,
            Popover
        },
        layout: 'wizard',
        data() {
            return {

                isEnabled: false,
                clearable: true,
                searchable: true,
                version_loaded: false,
                rules: {
                    required: value => !!value || 'این فیلد اجباری‌ است',
                },
                tooltips: {
                    image_name: {
                        title: 'نام ایمیج',
                        text: 'برای آنکه بتوانید سرویس جدیدی بسازید٬ نیاز دارید تا نام یک ایمیج را به فندق معرفی نمایید',
                        url: 'https://docs.fandogh.cloud/docs/images.html'
                    },
                    image_version: {
                        title: 'ورژن ایمیج',
                        text: 'هر ایمیج ممکن است چندین ورژن داشته باشد و برای آنکه فندق بتواند ایمیج درستی را برای ساخت سرویس انتخاب کند باید ورژن مورد نظر را انتخاب نمایید',
                        url: 'https://docs.fandogh.cloud/docs/images.html'
                    },
                    image_secret: {
                        title: 'سکرت',
                        text: 'اگر ایمیج شما جایی خارج از رجیستری فندق قرار داشته باشد و آن رجیستری private باشد٬ فندق برای دستیابی به آن ایمیج یک سکرت نیاز دارد.',
                        url: 'https://docs.fandogh.cloud/docs/secret.html'
                    },
                    image_pull_policy: {
                        title: 'ّImage Pull Policy',
                        text: 'زمانی که از رجیستری‌های خارجی استفاده می‌کنید بسته به اینکه چطور ورژن‌های مربوط به تصاویر خود را مدیریت می‌کنید٬ ممکن است نیاز پیدا کنید همیشه٬ صرف‌نظر از اینکه image روی سرور فندق وجود داشته باشد یا نه٬ حتما دوباره ایمیج از رجیستری دریافت شود، برای این کار باید این فیلد را روی مقدار Always‍ ست کنید، حالت پیشفرض این فیلد IfNotPresent است.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#image-pull-policy'
                    }
                },
                source: {
                    local_name: 'رجیستری فندق',
                    name: 'InternalRegistry',
                    is_active: true,
                    tooltip: 'ایمیج‌هایی که مبدا آنها داخل رجیستری فندق است'
                },
                sections: {
                    image_registry: 'مبدا رجیستری خارجی',
                    image_info: 'مشخصات ایمیج',
                    image_settings: 'تنظیمات ایمیج',
                    image_registry_tooltip: {
                        title: 'مبدا رجیستری ایمیج',
                        text: 'برای آنکه بتوانید سرویس ایجاد کنید٬ باید یک ایمیج را انتخاب نمایید. اگر ایمیج شما داخل رجیستری سکوی ابری فندق است٬ پس مبدا را داخلی انتخاب نمایید ولی چنانچه ایمیج در رجیستری دیگری مثل داکرهاب یا گیتلب و ... قرار دارد، از مبدا‌های دیگر استفاده نمایید.',
                        url: 'https://docs.fandogh.cloud/docs/images.html'
                    },
                    image_settings_tooltip: {
                        title: 'تنظیمات ایمیج',
                        text: 'برای آنکه بتوانید سرویس ایجاد کنید٬ باید یک ایمیج را انتخاب نمایید. اگر ایمیج شما داخل رجیستری سکوی ابری فندق است٬ پس مبدا را داخلی انتخاب نمایید ولی چنانچه ایمیج در رجیستری دیگری مثل داکرهاب یا گیتلب و ... قرار دارد، مبدا ایمیج را خارجی انتخاب نمایید ',
                        url: 'https://docs.fandogh.cloud/docs/images.html'
                    }
                },
                image_name_obj: {
                    label: 'نام ایمیج',
                    hint: 'نام ایمیجی که میخواهید سرویس از روی آن ساخته شود',
                    default: '',
                    value: ''
                },
                image_version_obj: {
                    label: 'ورژن ایمیج',
                    hint: 'ورژن مورد نظر از ایمیجی که میخواهید سرویس از آن ورژن ساخته شود',
                    default: 'latest',
                    value: ''
                }
            }
        },
        created() {
            this.getImages()

            let manifest = JSON.parse(localStorage.getItem('vuex')).manifest;

            if (manifest.hasOwnProperty('spec')) {
                let spec = manifest.spec

                if (spec.hasOwnProperty('image')) {
                    let image = ''
                    image = spec.image

                    if (image.split('/').length > 2) {
                        this.onRegistryClicked(2)
                    } else if (image.split('/').length === 2) {
                        this.onRegistryClicked(1)
                    } else {
                        this.onRegistryClicked(0)
                        this.getImageV(image.split(':')[0])
                    }
                }

                if (spec.hasOwnProperty('image_pull_policy')) {
                    this.manifest_model.image.image_pull_policy_obj.forEach((item, index) => {
                        if (item.value === spec.image_pull_policy) {
                            this.checkBoxSelected(index)
                        }
                    })
                } else {
                    this.checkBoxSelected(0)
                }

                if (spec.hasOwnProperty('image_pull_secret')) {
                    this.manifest_model.image.secret_obj.value = spec.image_pull_secret
                }
            }


        },
        methods: {
            checkBoxSelected(index) {
                this.manifest_model.image.image_pull_policy_obj.forEach(item => {
                    item.selected = false
                })
                this.manifest_model.image.image_pull_policy_obj[index].selected = true
                this.manifest_model.image.image_pull_policy = this.manifest_model.image.image_pull_policy_obj[index]
            },
            changedImage(value) {
                this.getImageV(value)
            },
            addToManifest(value, path) {
                this.$store.dispatch('manifestGenerator', {
                    value: value,
                    path: path
                })
            },
            deleteFromManifest(path) {
                this.$store.dispatch('manifestDeleter', {
                    path: path
                })
            },
            onRegistryClicked(index) {
                this.manifest_model.image.registries.forEach(item => {
                    item.is_active = false
                });
                this.manifest_model.image.registries[index].is_active = true;
                this.manifest_model.image.registry = this.manifest_model.image.registries[index]

                this.manifest_model.image.image_object.name = null
                this.manifest_model.image.image_object.version = null

                if (this.manifest_model.image.registry.local_name === 'Fandogh' &&
                    this.manifest_model.image.secret_obj.value !== null &&
                    this.manifest_model.image.secret_obj.value !== '') {
                    this.$refs.secret_selector.clearSelection()
                }

            },
            getImageV(value) {
                this.version_loaded = true;

                this.$store.dispatch("getImageVersions", value).then(res => {
                    this.version_loaded = false;
                });


            },
        },
        computed: {
            images() {
                if (!this.$store.state.images) return [];
                return this.$store.state.images
            },
            versions() {
                if (!this.$store.state.versions || this.manifest_model.image.image_object.name === null || this.manifest_model.image.image_object.name === '') return [];
                return this.$store.state.versions
            },
            secretList() {
                if (!this.$store.state.secrets) return [];
                return this.$store.state.secrets.map(item => {
                    if (item.type !== 'environment-secret')
                        return item.name
                });
            },
        },
        watch: {
            'manifest_model.image.image_object': {

                handler: function (value, oldValue) {

                    let image_name = value.name;
                    let image_version = value.version || '';

                    if (image_name === null) {
                        this.manifest_model.image.image_object.name = '';
                        this.manifest_model.image.image_object.version = '';
                        this.version_loaded = false
                        this.deleteFromManifest('spec.image');
                        this.$refs.version_selector.clearSelection()

                    } else if (image_name !== '') {

                        let final_image = image_name.concat(':').concat(image_version);
                        if (image_version !== '') {
                            this.addToManifest(final_image, 'spec.image')
                        }

                    }
                }, deep: true

            },
            'manifest_model.image.image_pull_policy_obj': {
                handler: function (value, oldValue) {
                    let policy = this.manifest_model.image.image_pull_policy.value
                    this.addToManifest(policy, "spec.image_pull_policy");
                }, deep: true
            },
            'manifest_model.image.secret_obj': {
                handler: function (value, oldValue) {
                    let secret = value
                    if (secret.value === null || secret.value === '') {
                        this.deleteFromManifest('spec.image_pull_secret')
                    } else {
                        this.addToManifest(secret.value, 'spec.image_pull_secret')
                    }

                }, deep: true
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .kind-button
        border 1px solid #0045ff
        height 38px
        border-radius 3px
        display inline-flex
        white-space normal
        padding 0 16px
        margin 5px
        cursor pointer
        font-size 16px
        color #606060
        background-color transparent
        line-height 38px
        text-align center

        &.is-active
            color #fefefe
            box-shadow 0 3px 6px 0 rgba(41, 121, 255, 0.5)
            background-color #0045ff
            transition all .3s ease-in-out


    .registry-button
        border 1px solid #0045ff
        height 45px
        border-radius 3px
        display inline-flex
        white-space normal
        padding 0 24px 0 16px
        margin 5px
        cursor pointer
        font-size 16px
        color #606060
        background-color transparent
        line-height 45px
        text-align center

        img
            height auto
            margin-top auto
            margin-bottom auto
            filter invert(75%) sepia(59%) saturate(4513%) hue-rotate(218deg) brightness(100%) contrast(108%)


        &.is-active
            color #fefefe
            box-shadow 0 3px 6px 0 rgba(41, 121, 255, 0.5)
            background-color #0045ff
            transition all .3s ease-in-out

            img
                filter: invert(0%)


    .image-pull-policy-container
        display flex

        div
            margin-top auto
            margin-bottom auto

        @media only screen and (max-width: 900px)
            display block

            div
                display flex
                box-sizing padding-box
                justify-content center


            span
                margin-bottom 12px !important
                margin-left 0 !important

    .popover-style
        z-index 1001 !important
        margin-top -12px !important
        margin-right 12px !important
        margin-left 12px !important
        filter invert(0%) sepia(100%) saturate(0%) hue-rotate(203deg) brightness(205%) contrast(105%) !important

        @media only screen and (max-width: 900px)
            margin-top -8px !important

</style>

<style lang="stylus">

    span.vs__selected
        display flex
        align-items center !important
        background-color transparent !important
        border none !important
        border-radius 25px !important
        color #111111 !important
        font-family iran-yekan !important
        line-height 1.4 !important
        margin 4px 2px 0 !important
        padding 0 0 0 0 !important


    .vs__actions
        margin-left 16px !important


    div.vs__selected-options
        padding 0 !important


</style>
