<template>
    <div style="background-image: linear-gradient(to bottom, #0045ff, #002380); min-height: 1000px">

        <div class="pod-container">

        </div>

        <div class="invitation-container">

            <Vinvitation></Vinvitation>
        </div>

    </div>
</template>

<script>
    import Vinvitation from "../../../components/Auth/vinvitation";

    export default {
        name: "_id",
        components:{
            Vinvitation,

        },
        data(){
            return{

            }
        },
    }
</script>

<style lang="stylus" scoped>

    .pod-container
        background url("../../../assets/svg/pod_bg.svg") no-repeat top
        width 100%
        background-size 50%
        background-position center
        height 275px
        position absolute
        filter invert(1)
        @media only screen and (max-width 992px)
            background-size 100%
            height 200px

    .invitation-container
        width: 100%;
        height: 100%;
        min-height: 1000px;
        background-image: linear-gradient(to bottom, rgba(0, 69, 255, 0.7), #0045ff 17%, #002380);
        position: absolute
        @media only screen and (max-width 992px)
            background-image: linear-gradient(to bottom, rgba(0, 69, 255, 0.7), #0045ff 14%, #002380);

</style>
