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