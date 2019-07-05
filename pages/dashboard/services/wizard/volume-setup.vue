<template>
    <div>
        <banner :page="page"></banner>
        <div style="margin-top: 12px">

            <config-box :section-title="sections.volume_type" :tooltip="sections.volume_type_tooltip">
                <div style="display: flex; flex-wrap: wrap; justify-content: center">

                    <span v-for="(volume, index) in volume_kind_obj"
                          :key="index"
                          v-tooltip="volume.tooltip"
                          :class="['kind-button', {'is-active': volume.is_active}]"
                          @click="onKindClicked(index)">
                        {{volume.local_name}}
                    </span>

                </div>
            </config-box>

            <config-box :section-title="sections.volume_config" :tooltip="sections.volume_config_tooltip">
                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0">

                    <div style="display: flex">

                        <v-text-field
                                ref="mount_path_selector"
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                v-model="volume.mount_path"
                                :label="volume_obj.mount_path_label"
                                :hint="volume_obj.mount_path_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.mount_path"></popover>


                    </div>

                    <div style="display: flex">

                        <v-text-field
                                ref="sub_path_selector"
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                v-model="volume.sub_path"
                                :label="volume_obj.sub_path_label"
                                :hint="volume_obj.sub_path_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.sub_path"></popover>


                    </div>

                    <div v-if="volume_kind.local_name === 'Dedicated Volume'" style="display: flex">

                        <v-text-field ref="volume_name_selector"
                                      style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                      dir="ltr"
                                      color="#0093ff"
                                      required
                                      v-model="volume.volume_name"
                                      :label="volume_obj.volume_name_label"
                                      :hint="volume_obj.volume_name_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.volume_name"></popover>


                    </div>

                    <div style="display: flex; margin-top: 16px; width: 100%">

                        <span @click="addVolume" class="create-volume-button">{{(isEditing ? 'بروزرسانی متغیر' : 'افزودن به جدول')}}</span>

                    </div>

                </form>
            </config-box>

            <volume-table class="row"
                          :titles="titleRow"
                          :items="volume_list"
                          :menu="menuList">
                <span style="width: 100%; background-color: #EBF4FF; text-align: center; padding: 43px; font-family: iran-yekan; font-size: 1em;
border-radius: 3px; border: 1px solid #0093FF; color: #3C3C3C">
                volumeای ذخیره نشده است
                    </span>
            </volume-table>


        </div>
    </div>

</template>

<script>

    import Banner from "../../../../components/wizard/banner/banner";
    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";
    import VolumeTable from "../../../../components/wizard/table/volume-table";

    export default {
        name: "volume-setup",
        components: {
            Banner,
            Popover,
            ConfigBox,
            VolumeTable

        },
        data() {
            return {

                isEditing: false,
                volume: {
                    mount_path: null,
                    sub_path: null,
                    volume_name: null
                },
                volume_obj: {
                    mount_path_label: 'Mount Path',
                    mount_path_hint: 'آدرس محلی از سرویس که داده‌ها در آن ذخیره می‌شوند',
                    sub_path_label: 'Sub Path',
                    sub_path_hint: 'آدرس محلی که باید داده‌ها از سرویس، بر روی این مسیر جدید ذخیره شوند',
                    volume_name_label: 'Volume Name',
                    volume_name_hint: 'نام Dedicated Volume که میخواهید داده‌ها در آن ذخیره شوند.',

                },
                tooltips: {
                    mount_path: {
                        title: 'Mount Path',
                        text: 'آدرس مسیری از سرویس شما که نیاز دارید داده‌های ذخیره شده در آن مسیر، به صورت پایا ذخیره شوند.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#volume-mounts'
                    },
                    sub_path: {
                        title: 'Sub Path',
                        text: 'نام مسیر یا پوشه جدیدی که داده‌های سرویس باید در آن ذخیره شوند.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#volume-mounts'
                    },
                    volume_name: {
                        title: 'Volume Name',
                        text: 'نام Dedicated Volume که قصد دارید مسیر جدید در آن ساخته شود',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#volume-mounts'
                    }
                },
                volume_kind: {
                    local_name: 'Dedicated Volume',
                    is_active: true,
                    tooltip: 'با انتخاب این گزینه داده‌های شما بر روی آدرس Dedicated Volumeای که وارد کرده‌اید ذخیره می‌شود.'
                },
                page: {
                    title: 'Volumes',
                    description: 'برای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند در\n' +
                        '                ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند\n' +
                        '                در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که\n' +
                        '                می‌ماند در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق\n' +
                        '                که می‌ماند در ذهن‌ها'
                },
                sections: {
                    volume_type: 'نوع Volume',
                    volume_type_tooltip: {
                        title: 'نوع Volume',
                        text: 'با انتخاب نوع سرویس می‌توانید مشخص کنید که داده‌های شما بر روی SharedVolume ذخیره شوند یا بر روی Dedicated Volumes',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#volume-mounts'
                    },
                    volume_config: 'تنظیمات Volume',
                    external_service_config: 'تنظیمات سرویس External',
                    volume_config_tooltip: {
                        title: 'تنظیمات Volume',
                        text: 'این بخش مربوط به تنظیمات سرویس External است که با تنظیم کردن آن می‌تواند مشحخص کنید سرویس شما بر روی چه دامنه‌هایی از بیرون دسترسی پذیر بوده و کدام پورت‌ها به پورت 80 مپ شوند',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#%D9%81%DB%8C%D9%84%D8%AF-spec-%D8%AF%D8%B1-externalservice-%D9%87%D8%A7'
                    }
                },
                volume_kind_obj: [
                    {
                        local_name: 'Shared Volume',
                        is_active: true,
                        tooltip: 'با انتخاب این گزینه داده‌های شما بر روی آدرس Shared Volumeای که وارد کرده‌اید ذخیره می‌شود.'
                    },
                    {
                        local_name: 'Dedicated Volume',
                        is_active: false,
                        tooltip: 'با انتخاب این گزینه داده‌های شما بر روی آدرس Dedicated Volumeای که وارد کرده‌اید ذخیره می‌شود.'
                    }
                ],
                titleRow: [
                    {title: 'mount path', width: '30%', name: 'mount_path'},
                    {title: 'sub path', width: '30%', name: 'sub_path'},
                    {title: 'نام volume', width: '20%', name: 'volume_name'},
                    {title: 'نوع حافظه', width: '16%', name: 'volume_type'},
                    {title: '', width: '4%', name: ''},

                ],
                menuList: [
                    {method: '', icon: 'ic-logs.svg', title: 'ورژن‌های ایمیج', style: {}},
                    {method: '', icon: 'ic-upload.svg', title: 'ویرایش volume', style: {}},
                    {method: '', icon: 'ic_delete.svg', title: 'حذف  volume', style: {color: '#fd3259'}},
                ],
                volume_list: []

            }
        },
        methods: {
            onKindClicked(index) {
                this.volume_kind_obj.forEach(item => {
                    item.is_active = false
                });
                this.volume_kind_obj[index].is_active = true;
                this.volume_kind = this.volume_kind_obj[index]
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
            addVolume() {

                if (this.volume.mount_path === null) {
                    this.$refs.mount_path_selector.focus()
                    return;
                }

                if (this.volume.sub_path === null) {
                    this.$refs.sub_path_selector.focus()
                    return;
                }


                if (this.volume.mount_path.trim().length === 0) {
                    this.$refs.mount_path_selector.focus()
                    return;
                }


                if (this.volume.sub_path.trim().length === 0) {
                    this.$refs.sub_path_selector.focus()
                    return;
                }

                if (this.volume_kind.local_name === 'Dedicated Volume') {

                    if (this.volume.volume_name === null) {
                        this.$refs.volume_name_selector.focus()
                        return;
                    }


                    if (this.volume.volume_name.trim().length === 0) {
                        this.$refs.volume_name_selector.focus()
                        return;
                    }

                }


                if (this.isEditing) {
                    this.env_list.forEach(env => {
                        if (env.name === this.environment_variable.name) {
                            env.name = this.environment_variable.name
                            env.value = this.environment_variable.value
                            env.hidden = this.hidden_obj.selected
                        }
                    })
                } else {
                    if (this.volume_kind.local_name === 'Dedicated Volume') {
                        this.volume_list.push({
                            mount_path: this.volume.mount_path,
                            sub_path: this.volume.sub_path,
                            volume_name: this.volume.volume_name
                        })
                    } else {
                        this.volume_list.push({
                            mount_path: this.volume.mount_path,
                            sub_path: this.volume.sub_path
                        })
                    }
                }

                this.volume.mount_path = null
                this.volume.sub_path = null
                this.volume.volume_name = null
                this.isEditing = false

            }
        },
        computed: {},
        watch: {
            volume_list: {
                handler: function (value, oldValue) {

                    if (value.length === 0) {
                        this.deleteFromManifest('spec.volume_mounts')
                    } else {
                        this.addToManifest(value, 'spec.volume_mounts')
                    }

                }
            }
        },
        mounted() {

        },
        created() {
            let manifest = JSON.parse(localStorage.getItem('vuex')).manifest;

            if (manifest.hasOwnProperty('spec')) {
                let spec = manifest.spec

                if (spec.hasOwnProperty('volume_mounts')) {

                    spec.volume_mounts.forEach(item => {
                        this.volume_list.push(item)
                    })
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .kind-button
        border 1px solid #0093ff
        height 38px
        min-width 175px
        border-radius 3px
        white-space normal
        margin 5px
        text-align center
        cursor pointer
        font-size .9em
        color #606060
        font-weight normal
        background-color transparent
        line-height 38px
        @media only screen and (max-width: 766px)
            min-width 125px
            height 34px
            line-height 34px

        &.is-active
            color #fefefe
            box-shadow 0 0 3px 0 rgba(41, 121, 255, 0.2), 0 0 9px 0 rgba(41, 121, 255, 0.5)
            background-color #0093ff
            font-weight bolder
            transition all .3s ease-in-out


    .create-volume-button
        font-size .9em
        color #fefefe
        padding 8px 16px
        border-radius 3px
        font-family iran-yekan
        background-color #24d5d8
        cursor pointer
        user-select none
        box-shadow 0 1px 3px 0 rgba(36, 213, 216, 0.3), 0 1px 5px 0 rgba(36, 213, 216, 0.6)
        float: left


</style>