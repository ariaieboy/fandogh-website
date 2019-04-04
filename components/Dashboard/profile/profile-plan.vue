<template>

    <div style="margin-bottom: 50px">
        <div class="row plan-container" style="padding: 12px">

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div class="container-fluid row" style="width: 100%;">
                    <img class="col-lg-6 col-md-6 col-sm-5 col-xs-5" alt="cpu" src="../../../assets/svg/ic-docker.svg"
                         style="width: 80px; height: 80px; display: inline-block">

                    </img>
                    <div class="col-lg-6 col-md-6 col-sm-7 col-xs-7"
                         style="display: inline-block; margin: auto; width: 100%">

                        <p style="width:100%; margin: 0;font-family: yekan-bold; font-size: 1.1em">پردازنده</p>
                        <p style="width:100%; margin: 0; font-family: 'IRANYekanMobile(FaNum)';font-size: 1em">۳
                            هسته</p>

                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div class="container-fluid row" style="width: 100%;">
                    <img class="col-lg-6 col-md-6 col-sm-5 col-xs-5" alt="cpu" src="../../../assets/svg/ic-docker.svg"
                         style="width: 80px; height: 80px; display: inline-block">

                    </img>
                    <div class="col-lg-6 col-md-6 col-sm-7 col-xs-7"
                         style="display: inline-block; margin: auto; width: 100%">

                        <p style="width:100%; margin: 0;font-family: yekan-bold; font-size: 1.1em">پردازنده</p>
                        <p style="width:100%; margin: 0; font-family: 'IRANYekanMobile(FaNum)';font-size: 1em">۳
                            هسته</p>

                    </div>
                </div>
            </div>


            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div class="container-fluid row" style="width: 100%;">
                    <img class="col-lg-6 col-md-6 col-sm-5 col-xs-5" alt="cpu" src="../../../assets/svg/ic-docker.svg"
                         style="width: 80px; height: 80px; display: inline-block">

                    </img>
                    <div class="col-lg-6 col-md-6 col-sm-7 col-xs-7"
                         style="display: inline-block; margin: auto; width: 100%">

                        <p style="width:100%; margin: 0;font-family: yekan-bold; font-size: 1.1em">پردازنده</p>
                        <p style="width:100%; margin: 0; font-family: 'IRANYekanMobile(FaNum)';font-size: 1em">۳
                            هسته</p>

                    </div>
                </div>
            </div>

        </div>

        <div class="row " style="width: 100%; display: flex; margin-top: 40px">
            <div style="margin-left: auto; margin-right: auto; display: block">
                <button style="width: 200px; height: 40px; display: inline-block; background-color: #2979ff; outline: none;
border: none;  border-radius: 3px; box-shadow: 0 2px 6px 0 rgba(41, 121, 255, 0.42);color: #ffffff;
font-family: IRANYekan; font-size: 0.9em; margin-left: 5px; cursor: pointer">
                    ساخت پلن جدید
                </button>

                <button style="width: 200px; height: 40px; display: inline-block;   border-radius: 3px;
                outline: none; border: none; box-shadow: 0 2px 6px 0 rgba(126, 211, 33, 0.42); background-color: #7ed321;color: #ffffff;
font-family: IRANYekan; font-size: 0.9em; margin-right: 5px; cursor: pointer">
                    تمدید پلن فعلی
                </button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: ['cpu', 'memory', 'dedicatedVolume'],
        name: "profile-plan"
    }
</script>

<style lang="stylus" scoped>

    .plan-container
        border-radius 3px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
        background-color #ffffff


</style>