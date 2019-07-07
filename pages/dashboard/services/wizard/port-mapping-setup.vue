<template>
    <div>
        <banner :page="page"></banner>

        <div style="margin-top: 12px">

            <config-box :section-title="sections.port_mapping" :tooltip="sections.port_mapping_tooltip">
                <form class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0">

                    <div style="display: flex">

                        <v-text-field
                                ref="port_selector"
                                style="font-family: iran-yekan;font-size: 1em; margin-left: -15px"
                                dir="ltr"
                                color="#0093ff"
                                required
                                type="number"
                                v-model="port_map.port"
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
                                color="#0093ff"
                                required
                                type="number"
                                v-model="port_map.target_port"
                                :label="port_map_obj.target_port_label"
                                :hint="port_map_obj.target_port_hint">

                        </v-text-field>

                        <popover :tooltip="tooltips.target_port"></popover>


                    </div>

                    <div class="protocol-container">
                        <span style="height: 35px; display: flex; margin-left: 12px; background-color: #0093ff; border-radius: 25px;">
                            <span style="line-height: 35px; font-size: 1em; margin-right: 12px;color: #fefefe; font-family: iran-yekan">Protocol</span>
                            <popover class="popover-style" :tooltip="tooltips.protocol"></popover>
                        </span>

                        <div>
                            <fan-checkbox v-for="(protocol ,index) in protocol_list"
                                          :key="index"
                                          @click.native="checkBoxSelected(index)"
                                          :object="protocol">

                            </fan-checkbox>
                        </div>

                    </div>


                    <div style="display: flex; margin-top: 16px; width: 100%">

                        <span @click="addPortMap" class="create-port-map-button">{{(isEditing ? 'بروزرسانی متغیر' : 'افزودن به جدول')}}</span>

                    </div>

                </form>
            </config-box>

            <port-map-table class="row"
                            :titles="titleRow"
                            :items="port_map_list"
                            :menu="menuList">
                <span style="width: 100%; background-color: #EBF4FF; text-align: center; padding: 43px; font-family: iran-yekan; font-size: 1em;
                            border-radius: 3px; border: 1px solid #0093FF; color: #3C3C3C">پورتی ذخیره نشده است</span>
            </port-map-table>

        </div>

    </div>

</template>

<script>

    import Banner from "../../../../components/wizard/banner/banner";
    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";
    import FanCheckbox from "../../../../components/wizard/select-box/fan-checkbox";
    import PortMapTable from "../../../../components/wizard/table/port-map-table";

    export default {
        name: "port-mapping-setup",
        components: {
            Banner,
            Popover,
            ConfigBox,
            FanCheckbox,
            PortMapTable

        },
        data() {
            return {

                editing_index: -1,
                isEditing: false,
                port_map: {
                    port: null,
                    target_port: null,
                    protocol: 'TCP'
                },
                port_map_obj: {
                    port_label: 'Inside Port',
                    port_hint: 'شماره پورت داخل سرویس که قرار است map شود',
                    target_port_label: 'Outside Port',
                    target_port_hint: 'شماره پورتی که قرار سات port بر روی آن map شود',
                    protocol_label: 'Protocol',
                    protocol_hint: '',

                },
                page: {
                    title: 'Port Mapping',
                    description: 'برای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند در\n' +
                        '                ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند\n' +
                        '                در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که\n' +
                        '                می‌ماند در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق\n' +
                        '                که می‌ماند در ذهن‌ها'
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
                protocol_list: [
                    {
                        label: "TCP",
                        value: "TCP",
                        selected: true
                    },
                    {
                        label: "UDP",
                        value: "UDP",
                        selected: false
                    }
                ],
                titleRow: [
                    {title: 'Inside Port', width: '40%', name: 'port'},
                    {title: 'Outside Port', width: '40%', name: 'target_port'},
                    {title: 'Protocol', width: '16%', name: 'protocol'},
                    {title: '', width: '4%', name: ''},

                ],
                menuList: [
                    {method: '', icon: 'ic-logs.svg', title: 'ورژن‌های ایمیج', style: {}},
                    {method: this.editPortMap, icon: 'ic-upload.svg', title: 'ویرایش متغیر', style: {}},
                    {method: this.removePortMap, icon: 'ic_delete.svg', title: 'حذف  متغیر', style: {color: '#fd3259'}},
                ],
                port_map_list: []

            }
        },
        methods: {
            editPortMap(index) {
                this.isEditing = true
                this.editing_index = index

                this.port_map.port = this.port_map_list[index].port
                this.port_map.target_port = this.port_map_list[index].target_port
                this.port_map.protocol = this.port_map_list[index].protocol

                this.protocol_list.forEach(item => {
                    item.selected = false
                    if (item.value === this.port_map.protocol) {
                        item.selected = true
                    }
                })
            },
            removePortMap(index) {
                this.port_map_list.splice(index, 1)
            },
            checkBoxSelected(index) {
                this.protocol_list.forEach(item => {
                    item.selected = false
                });
                this.protocol_list[index].selected = true;
                this.port_map.protocol = this.protocol_list[index].value;
            },
            addPortMap() {

                if (this.port_map.port === null) {
                    this.$refs.port_selector.focus();
                    return;
                }

                if (this.port_map.target_port === null) {
                    this.$refs.target_port_selector.focus();
                    return;
                }


                if (this.port_map.port.toString().trim().length === 0) {
                    this.$refs.port_selector.focus();
                    return;
                }


                if (this.port_map.target_port.toString().trim().length === 0) {
                    this.$refs.traget_port_selector.focus();
                    return;
                }


                if (this.isEditing) {

                    this.port_map_list.splice(this.editing_index, 1, {
                        port: parseInt(this.port_map.port),
                        target_port: parseInt(this.port_map.target_port),
                        protocol: this.port_map.protocol
                    })


                } else {

                    this.port_map_list.push({
                        port: parseInt(this.port_map.port),
                        target_port: parseInt(this.port_map.target_port),
                        protocol: this.port_map.protocol
                    })

                }

                this.port_map.port = null;
                this.port_map.target_port = null;
                this.checkBoxSelected(0);
                this.isEditing = false;
                this.editing_index = -1

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
        },
        watch: {
            port_map_list: {
                handler: function (value, oldValue) {
                    if (value.length === 0) {
                        this.deleteFromManifest('spec.port_mapping')
                    } else {
                        this.addToManifest(value, 'spec.port_mapping')
                    }

                }
            }
        },
        mounted() {

        }, created() {

            let manifest = JSON.parse(localStorage.getItem('vuex')).manifest;

            if (manifest.hasOwnProperty('spec')) {
                let spec = manifest.spec

                if (spec.hasOwnProperty('port_mapping')) {

                    spec.port_mapping.forEach(item => {
                        this.port_map_list.push(item)
                    })
                }
            }

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
