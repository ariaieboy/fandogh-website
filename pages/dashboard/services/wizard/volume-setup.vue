<template>
    <div>
        <div style="margin-top: 12px;">

            <config-box :section-title="sections.volume_type" :tooltip="sections.volume_type_tooltip">
                <div style="display: flex; flex-wrap: wrap; justify-content: center">

                    <span v-for="(volume, index) in manifest_model.volumes.volume_kind_obj"
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
                                :rules="[rules.is_root_addressed, rules.required, rules.redundant]"
                                v-model="manifest_model.volumes.volume.mount_path"
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
                                :rules="[rules.required, rules.no_slash]"
                                v-model="manifest_model.volumes.volume.sub_path"
                                :label="volume_obj.sub_path_label"
                                :hint="volume_obj.sub_path_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.sub_path"></popover>


                    </div>

                    <div v-if="manifest_model.volumes.volume_kind.local_name === 'Dedicated Volume'"
                         style="display: flex">

                        <v-text-field ref="volume_name_selector"
                                      style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                      dir="ltr"
                                      color="#0093ff"
                                      :rules="[rules.volume_name_regex, rules.required]"
                                      v-model="manifest_model.volumes.volume.volume_name"
                                      :label="volume_obj.volume_name_label"
                                      :hint="volume_obj.volume_name_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.volume_name"></popover>


                    </div>

                    <div style="display: flex; margin-top: 16px; width: 100%">

                        <span @click="addVolume" class="create-volume-button">{{(isEditing ? 'بروزرسانی متغیر' : 'افزودن به جدول')}}</span>
                        <span v-if="isEditing" style="margin-right: 16px" @click="cancelEdit" class="cancel-button">{{'انصراف'}}</span>

                    </div>

                </form>
            </config-box>

            <volume-table class="row"
                          :titles="titleRow"
                          :items="manifest_model.volumes.volume_list"
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

    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";
    import VolumeTable from "../../../../components/wizard/table/volume-table";

    export default {
        name: "volume-setup",
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
            Popover,
            ConfigBox,
            VolumeTable

        },
        data() {
            return {

                rules: {
                    required: value => value !== '' || 'مقدار این فیلد نمی‌تواند خالی باشد',
                    is_root_addressed: value => value.toString().startsWith('/') || value.toString() === '' || 'آدرس وارد شده، باید از root (/) شروع شود',
                    no_space: value => !value.toString().includes(' ') || 'فاصله مجاز نیست',
                    no_slash: value => !value.toString().startsWith('/') || '/ مجاز نیست',
                    volume_name_regex: value => new RegExp('^[a-z]+(-*[a-z0-9]+)*$').test(value) || 'نام وارد شده صحیح نمی‌باشد (تنها ترکیب حروف کوچک a تا z، اعداد و خط تیره (-) معتبر هستند)',
                    redundant: value => (this.allowed_name === null ? this.manifest_model.volumes.volume_list.filter(e => e.mount_path === value).length === 0 : this.allowed_name === value || this.manifest_model.volumes.volume_list.filter(e => e.mount_path === value).length === 0) || 'مقدار تکراری است',
                },
                editing_index: -1,
                isEditing: false,
                allowed_name: null,
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
                sections: {
                    volume_type: 'نوع Volume',
                    volume_type_tooltip: {
                        title: 'نوع Volume',
                        text: 'با انتخاب نوع سرویس می‌توانید مشخص کنید که داده‌های شما بر روی SharedVolume ذخیره شوند یا بر روی Dedicated Volumes',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#volume-mounts'
                    },
                    volume_config: 'تنظیمات Volume',
                    volume_config_tooltip: {
                        title: 'تنظیمات Volume',
                        text: 'این بخش مربوط به تنظیمات سرویس External است که با تنظیم کردن آن می‌تواند مشحخص کنید سرویس شما بر روی چه دامنه‌هایی از بیرون دسترسی پذیر بوده و کدام پورت‌ها به پورت 80 مپ شوند',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#%D9%81%DB%8C%D9%84%D8%AF-spec-%D8%AF%D8%B1-externalservice-%D9%87%D8%A7'
                    }
                },
                titleRow: [
                    {title: 'mount path', width: '30%', name: 'mount_path'},
                    {title: 'sub path', width: '30%', name: 'sub_path'},
                    {title: 'نام volume', width: '20%', name: 'volume_name'},
                    {title: 'نوع حافظه', width: '16%', name: 'volume_type'},
                    {title: '', width: '4%', name: ''},

                ],
                menuList: [
                    {method: this.editVolume, icon: 'ic-upload.svg', title: 'ویرایش volume', style: {}},
                    {method: this.removeVolume, icon: 'ic_delete.svg', title: 'حذف  volume', style: {color: '#fd3259'}},
                ],
            }
        },
        methods: {
            editVolume(index) {
                this.isEditing = true
                this.editing_index = index
                if (this.manifest_model.volumes.volume_list[index].hasOwnProperty('volume_name')) {
                    this.onKindClicked(1)
                    this.manifest_model.volumes.volume.volume_name = this.manifest_model.volumes.volume_list[index].volume_name
                } else {
                    this.onKindClicked(0)
                    this.manifest_model.volumes.volume.volume_name = null
                }
                this.manifest_model.volumes.volume.mount_path = this.manifest_model.volumes.volume_list[index].mount_path
                this.manifest_model.volumes.volume.sub_path = this.manifest_model.volumes.volume_list[index].sub_path
                this.allowed_name = this.manifest_model.volumes.volume_list[index].mount_path

                this.$refs.mount_path_selector.focus()
            },
            cancelEdit() {
                this.isEditing = false
                this.manifest_model.volumes.volume.mount_path = null
                this.manifest_model.volumes.volume.sub_path = null
                if (this.manifest_model.volumes.volume_list[this.editing_index].hasOwnProperty('volume_name')) {
                    this.manifest_model.volumes.volume.volume_name = null
                }
                this.onKindClicked(0)
                this.editing_index = -1
                this.allowed_name = null
            },
            removeVolume(index) {
                this.manifest_model.volumes.volume_list.splice(index, 1)
            },
            onKindClicked(index) {
                this.manifest_model.volumes.volume_kind_obj.forEach(item => {
                    item.is_active = false
                });
                this.manifest_model.volumes.volume_kind_obj[index].is_active = true;
                this.manifest_model.volumes.volume_kind = this.manifest_model.volumes.volume_kind_obj[index]

                if (this.manifest_model.volumes.volume_kind_obj[index].local_name === 'Dedicated Volume') {
                    this.manifest_model.volumes.volume.volume_name = null
                }
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

                if (this.manifest_model.volumes.volume.mount_path === null) {
                    this.$refs.mount_path_selector.focus()
                    return;
                }

                if (this.manifest_model.volumes.volume.sub_path === null) {
                    this.$refs.sub_path_selector.focus()
                    return;
                }


                if (this.manifest_model.volumes.volume.mount_path.trim().length === 0) {
                    this.$refs.mount_path_selector.focus()
                    return;
                }

                if (this.rules.is_root_addressed(this.manifest_model.volumes.volume.mount_path) !== true ||
                    this.rules.no_space(this.manifest_model.volumes.volume.mount_path) !== true) {
                    this.$refs.mount_path_selector.focus()
                    return;
                }

                if(this.rules.redundant(this.manifest_model.volumes.volume.mount_path) !== true){
                    this.$refs.mount_path_selector.focus()
                    return;
                }


                if (this.manifest_model.volumes.volume.sub_path.trim().length === 0 ||
                    this.rules.no_slash(this.manifest_model.volumes.volume.sub_path) !== true) {
                    this.$refs.sub_path_selector.focus()
                    return;
                }

                if (this.manifest_model.volumes.volume_kind.local_name === 'Dedicated Volume') {

                    if (this.manifest_model.volumes.volume.volume_name === null) {
                        this.$refs.volume_name_selector.focus()
                        return;
                    }


                    if (this.manifest_model.volumes.volume.volume_name.trim().length === 0) {
                        this.$refs.volume_name_selector.focus()
                        return;
                    }

                    if (this.rules.volume_name_regex(this.manifest_model.volumes.volume.volume_name.trim()) !== true ||
                        this.rules.no_space(this.manifest_model.volumes.volume.volume_name.trim()) !== true) {
                        this.$refs.volume_name_selector.focus()
                        return;
                    }

                }


                if (this.isEditing) {
                    if (this.manifest_model.volumes.volume_kind.local_name === 'Dedicated Volume') {
                        this.manifest_model.volumes.volume_list.splice(this.editing_index, 1, {
                            mount_path: this.manifest_model.volumes.volume.mount_path.trim(),
                            sub_path: this.manifest_model.volumes.volume.sub_path.trim(),
                            volume_name: this.manifest_model.volumes.volume.volume_name.trim()
                        })
                    } else {
                        this.manifest_model.volumes.volume_list.splice(this.editing_index, 1, {
                            mount_path: this.manifest_model.volumes.volume.mount_path.trim(),
                            sub_path: this.manifest_model.volumes.volume.sub_path.trim(),
                        })
                    }

                } else {
                    if (this.manifest_model.volumes.volume_kind.local_name === 'Dedicated Volume') {
                        this.manifest_model.volumes.volume_list.push({
                            mount_path: this.manifest_model.volumes.volume.mount_path.trim(),
                            sub_path: this.manifest_model.volumes.volume.sub_path.trim(),
                            volume_name: this.manifest_model.volumes.volume.volume_name.trim()
                        })
                    } else {
                        this.manifest_model.volumes.volume_list.push({
                            mount_path: this.manifest_model.volumes.volume.mount_path.trim(),
                            sub_path: this.manifest_model.volumes.volume.sub_path.trim()
                        })
                    }
                }

                this.manifest_model.volumes.volume.mount_path = null
                this.manifest_model.volumes.volume.sub_path = null
                this.manifest_model.volumes.volume.volume_name = null
                this.isEditing = false
                this.allowed_name = null
                this.editing_index = -1

            }
        },
        computed: {},
        watch: {
            'manifest_model.volumes.volume_list': {
                handler: function (value, oldValue) {
                    if (value.length === 0) {
                        this.deleteFromManifest('spec.volume_mounts')
                    } else {
                        this.addToManifest(value, 'spec.volume_mounts')
                    }

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
