<template>

    <div>

        <banner :page="page"></banner>

        <div style="margin-top: 12px">


            <config-box :section-title="sections.create_env" :tooltip="sections.create_env_tooltip">

                <div style="display: flex; flex-wrap: wrap; justify-content: center">


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
        name: "env-setup",
        components:{
            Banner,
            Popover,
            ConfigBox

        },
        data(){
            return{

                page: {
                    title: 'Environment variables',
                    description: 'برای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند در\n' +
                        '                ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که می‌ماند\n' +
                        '                در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق که\n' +
                        '                می‌ماند در ذهن‌هابرای انتحا توه سرویس برای آنکه این متن بک تست بمانید سمنیا در دست داشتن است برای فندق\n' +
                        '                که می‌ماند در ذهن‌ها'
                },
                sections:{
                    create_env: 'ساخت Environment Variable',
                    create_env_tooltip: {
                        title: 'ساخت Environment Variable',
                        text: 'برای آنکه بتوانید از Environment Variableها استفاده نمایید، باید آن‌ها را در مانیفست خود اضافه نمایید.',
                        url: 'https://docs.fandogh.cloud/docs/service-manifest.html#env'
                    },
                }

            }
        },
        methods:{

        },
        watch:{

        },
        computed:{

        },
        created(){

        },
        mounted(){

        }
    }
</script>

<style lang="stylus" scoped>

</style>