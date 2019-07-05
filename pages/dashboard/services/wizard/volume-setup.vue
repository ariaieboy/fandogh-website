<template>
    <div>
        <banner :page="page"></banner>
    </div>
    
</template>

<script>

    import Banner from "../../../../components/wizard/banner/banner";
    import Popover from "../../../../components/wizard/tooltip/popover";


    export default {
        name: "volume-setup",
        components:{
            Banner,
            Popover

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