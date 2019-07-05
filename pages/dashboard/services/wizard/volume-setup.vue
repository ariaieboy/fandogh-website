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


        </div>
    </div>

</template>

<script>

    import Banner from "../../../../components/wizard/banner/banner";
    import Popover from "../../../../components/wizard/tooltip/popover";
    import ConfigBox from "../../../../components/wizard/box/config-box";


    export default {
        name: "volume-setup",
        components: {
            Banner,
            Popover,
            ConfigBox

        },
        data() {
            return {

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
                    service_config: 'تنظیمات سرویس',
                    external_service_config: 'تنظیمات سرویس External',
                    external_service_config_tooltip: {
                        title: 'تنظیمات سرویس External',
                        text: 'این بخش مربوط به تنظیمات سرویس External است که با تنظیم کردن آن می‌تواند مشحخص کنید سرویس شما بر روی چه دامنه‌هایی از بیرون دسترسی پذیر بوده و کدام پورت‌ها به پورت 80 مپ شوند',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#%D9%81%DB%8C%D9%84%D8%AF-spec-%D8%AF%D8%B1-externalservice-%D9%87%D8%A7'
                    }
                },
                volume_kind_obj: [
                    {
                        local_name: 'Dedicated Volume',
                        is_active: true,
                        tooltip: 'با انتخاب این گزینه داده‌های شما بر روی آدرس Dedicated Volumeای که وارد کرده‌اید ذخیره می‌شود.'
                    },
                    {
                        local_name: 'Shared Volume',
                        is_active: false,
                        tooltip: 'با انتخاب این گزینه داده‌های شما بر روی آدرس Shared Volumeای که وارد کرده‌اید ذخیره می‌شود.'
                    },
                ]

            }
        },
        methods: {
            onKindClicked(index) {
                this.volume_kind_obj.forEach(item => {
                    item.is_active = false
                });
                this.volume_kind_obj[index].is_active = true;
                this.volume_kind = this.volume_kind_obj[index]
                //
                // if (this.kind.name === 'ExternalService') {
                //     this.port.number = null
                //     this.port.number = this.port.default
                // } else {
                //     this.domains = []
                //     this.port.number = null
                // }

            },
        },
        computed: {},
        watch: {},
        mounted() {

        },
        created() {

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


</style>