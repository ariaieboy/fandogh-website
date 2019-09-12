<template>
    <div>
        <div style="margin-top: 12px;">

            <config-box :section-title="sections.port_mapping" :tooltip="sections.port_mapping_tooltip">
                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0">

                    <div style="display: flex">

                        <v-text-field
                                ref="port_selector"
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0045ff"
                                :rules="[rules.valid_port, rules.redundant]"
                                type="number"
                                v-model.number="manifest_model.port_mapping.port_map.port"
                                :label="port_map_obj.port_label"
                                :hint="port_map_obj.port_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.port"></popover>


                    </div>

                    <div style="display: flex">

                        <v-text-field
                                ref="traget_port_selector"
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0045ff"
                                :rules="[rules.valid_port]"
                                type="number"
                                v-model.number="manifest_model.port_mapping.port_map.target_port"
                                :label="port_map_obj.target_port_label"
                                :hint="port_map_obj.target_port_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.target_port"></popover>


                    </div>

                    <div class="protocol-container">
                        <span style="height: 35px; display: flex; margin-left: 12px; background-color: #0045ff; border-radius: 25px;">
                            <span style="line-height: 35px; font-size: 1em; margin-right: 12px;color: #fefefe; font-family: iran-yekan">Protocol</span>
                            <popover class="popover-style" :tooltip="tooltips.protocol"></popover>
                        </span>

                        <div>
                            <fan-checkbox v-for="(protocol ,index) in manifest_model.port_mapping.protocol_list"
                                          :key="index"
                                          @click.native="checkBoxSelected(index)"
                                          :object="protocol">

                            </fan-checkbox>
                        </div>

                    </div>


                    <div style="display: flex; margin-top: 16px; width: 100%">

                        <span @click="addPortMap" class="create-port-map-button">{{(isEditing ? 'بروزرسانی متغیر' : 'افزودن به جدول')}}</span>
                        <span v-if="isEditing" style="margin-right: 16px" @click="cancelEdit" class="cancel-button">{{'انصراف'}}</span>

                    </div>

                </form>
            </config-box>

            <port-map-table class="row"
                            :titles="titleRow"
                            :items="manifest_model.port_mapping.port_map_list"
                            :menu="menuList">
                <span style="width: 100%; background-color: #EBF4FF; text-align: center; padding: 43px; font-family: iran-yekan; font-size: 1em;
                            border-radius: 3px; border: 1px solid #0045ff; color: #3C3C3C">پورتی ذخیره نشده است</span>
            </port-map-table>

        </div>

    </div>

</template>

<script>

    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";
    import FanCheckbox from "../../../../components/wizard/select-box/fan-checkbox";
    import PortMapTable from "../../../../components/wizard/table/port-map-table";

    export default {
        name: "port-mapping-setup",
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
            FanCheckbox,
            PortMapTable

        },
        data() {
            return {

                rules: {
                    valid_port: value => value >= 1 && value <= 65535 || value === null || 'مقدار پورت باید بین ۱ تا ۶۵۵۳۵ باشد',
                    redundant: value => (this.allowed_name === null ? this.manifest_model.port_mapping.port_map_list.filter(e => e.port === value).length === 0 : this.allowed_name === value || this.manifest_model.port_mapping.port_map_list.filter(e => e.port === value).length === 0) || 'مقدار تکراری است'
                },
                editing_index: -1,
                isEditing: false,
                allowed_name: null,
                port_map_obj: {
                    port_label: 'Inside Port',
                    port_hint: 'شماره پورت از داخل سرویس که قرار است به بیرون map شود',
                    target_port_label: 'Outside Port',
                    target_port_hint: 'شماره پورتی که قرار است inside port بر روی آن map شود',
                    protocol_label: 'Protocol',
                    protocol_hint: '',

                },
                tooltips: {
                    port: {
                        title: 'Inside Port',
                        text: 'آدرس port از سرویس که میخواهید expose شود',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#port-mapping'
                    },
                    target_port: {
                        title: 'Outside Port',
                        text: 'آدرس port جدیدی که میخواهید port تعریف شده در قسمت بالا روی آن expose شود',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#port-mapping'
                    },
                    protocol: {
                        title: 'Protocol',
                        text: 'از این قسمت مشخص میکنید که protocol مورد نظر UDP باشد یا TCP',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#port-mapping'
                    }
                },
                sections: {
                    port_mapping: 'تنظیمات Port ها',
                    port_mapping_tooltip: {
                        title: 'تنظیمات Port ها',
                        text: 'در این بخش می‌توانید مشخص کنید داخل namespace یا همان فضانام شما، کدام portها از سرویس شما بر روی کدام پورت‌ها expose شده و داخل namespace در دسترسی دیگر سرویس‌ها باشند',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#port-mapping'
                    },
                    volume_config: 'تنظیمات Volume',
                    external_service_config: 'تنظیمات سرویس External',
                    volume_config_tooltip: {
                        title: 'تنظیمات Volume',
                        text: 'این بخش مربوط به تنظیمات سرویس External است که با تنظیم کردن آن می‌تواند مشحخص کنید سرویس شما بر روی چه دامنه‌هایی از بیرون دسترسی پذیر بوده و کدام پورت‌ها به پورت 80 مپ شوند',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#%D9%81%DB%8C%D9%84%D8%AF-spec-%D8%AF%D8%B1-externalservice-%D9%87%D8%A7'
                    }
                },
                titleRow: [
                    {title: 'Inside Port', width: '40%', name: 'port'},
                    {title: 'Outside Port', width: '40%', name: 'target_port'},
                    {title: 'Protocol', width: '16%', name: 'protocol'},
                    {title: '', width: '4%', name: ''},

                ],
                menuList: [
                    {method: this.editPortMap, icon: 'ic-upload.svg', title: 'ویرایش متغیر', style: {}},
                    {method: this.removePortMap, icon: 'ic_delete.svg', title: 'حذف  متغیر', style: {color: '#fd3259'}},
                ],


            }
        },
        methods: {
            editPortMap(index) {
                this.isEditing = true
                this.editing_index = index

                this.manifest_model.port_mapping.port_map.port = this.manifest_model.port_mapping.port_map_list[index].port
                this.manifest_model.port_mapping.port_map.target_port = this.manifest_model.port_mapping.port_map_list[index].target_port
                this.manifest_model.port_mapping.port_map.protocol = this.manifest_model.port_mapping.port_map_list[index].protocol

                this.allowed_name =  this.manifest_model.port_mapping.port_map_list[index].port


                this.manifest_model.port_mapping.protocol_list.forEach(item => {
                    item.selected = false
                    if (item.value === this.manifest_model.port_mapping.port_map.protocol) {
                        item.selected = true
                    }
                })
            },
            cancelEdit() {
                this.isEditing = false

                this.manifest_model.port_mapping.port_map.port = null
                this.manifest_model.port_mapping.port_map.target_port = null
                this.checkBoxSelected(0)

                this.allowed_name =  null

                this.editing_index = -1
            },
            removePortMap(index) {
                this.manifest_model.port_mapping.port_map_list.splice(index, 1)
            },
            checkBoxSelected(index) {
                this.manifest_model.port_mapping.protocol_list.forEach(item => {
                    item.selected = false
                });
                this.manifest_model.port_mapping.protocol_list[index].selected = true;
                this.manifest_model.port_mapping.port_map.protocol = this.manifest_model.port_mapping.protocol_list[index].value;
            },
            addPortMap() {

                if (this.manifest_model.port_mapping.port_map.port === null) {
                    this.$refs.port_selector.focus();
                    return;
                }

                if (this.manifest_model.port_mapping.port_map.target_port === null) {
                    this.$refs.target_port_selector.focus();
                    return;
                }


                if (this.manifest_model.port_mapping.port_map.port.toString().trim().length === 0) {
                    this.$refs.port_selector.focus();
                    return;
                }


                if (this.manifest_model.port_mapping.port_map.target_port.toString().trim().length === 0) {
                    this.$refs.traget_port_selector.focus();
                    return;
                }

                if (this.rules.valid_port(this.manifest_model.port_mapping.port_map.port) !== true) {
                    this.$refs.port_selector.focus();
                    return;
                }

                if (this.rules.valid_port(this.manifest_model.port_mapping.port_map.target_port) !== true) {
                    this.$refs.traget_port_selector.focus();
                    return;
                }

                if(this.rules.redundant(this.manifest_model.port_mapping.port_map.port) !== true){
                    this.$refs.port_selector.focus();
                    return;
                }

                if (this.isEditing) {

                    this.manifest_model.port_mapping.port_map_list.splice(this.editing_index, 1, {
                        port: this.manifest_model.port_mapping.port_map.port,
                        target_port: this.manifest_model.port_mapping.port_map.target_port,
                        protocol: this.manifest_model.port_mapping.port_map.protocol
                    })


                } else {

                    this.manifest_model.port_mapping.port_map_list.push({
                        port: this.manifest_model.port_mapping.port_map.port,
                        target_port: this.manifest_model.port_mapping.port_map.target_port,
                        protocol: this.manifest_model.port_mapping.port_map.protocol
                    })

                }

                this.manifest_model.port_mapping.port_map.port = null;
                this.manifest_model.port_mapping.port_map.target_port = null;
                this.checkBoxSelected(0);
                this.isEditing = false;
                this.editing_index = -1
                this.allowed_name = null

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
        }
    }
</script>

<style lang="stylus" scoped>

    .create-port-map-button
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
        transition all .3s ease-in-out

        &:hover
            box-shadow 0 1px 10px 0 rgba(36, 213, 216, 0.3), 0 1px 15px 0 rgba(36, 213, 216, 0.6)
            transition all .3s ease-in-out


    .protocol-container
        display flex
        margin-top 16px

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
            margin-top
        -8px !important

</style>
