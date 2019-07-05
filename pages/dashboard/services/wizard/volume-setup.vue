<template>
    <div>
        <banner :page="page"></banner>
        <div style="margin-top: 12px">

            <config-box :section-title="sections.volume_type" :tooltip="sections.volume_type_tooltip">
                <div style="display: flex; flex-wrap: wrap; justify-content: center">

                    <span v-for="(inner_kind, index) in kinds"
                          :key="index"
                          v-tooltip="inner_kind.tooltip"
                          :class="['kind-button', {'is-active': inner_kind.is_active}]"
                          @click="onKindClicked(index)">
                        {{inner_kind.local_name}}
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
        components:{
            Banner,
            Popover,
            ConfigBox

        },
        data(){
            return{

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

            }
        },
        methods:{

        },
        computed:{

        },
        watch:{

        },
        mounted(){

        },
        created(){

        }
    }
</script>

<style scoped>

</style>