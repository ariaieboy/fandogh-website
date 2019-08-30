<template>
    <section style="background: #fefefe; width: 100%;">
        <div class="row" style="width: 100%">

            <slider/>
            <languages/>
            <audiences/>
            <!--<language-tutorials/>-->
            <platform-features/>
            <business-solution/>
            <!--<success-story/>-->
            <price/>

        </div>
    </section>
</template>
<script>
    import Slider from "../components/Landing/sections/slider";
    import Languages from "../components/Landing/sections/languages";
    import Audiences from "../components/Landing/sections/audiences";
    import LanguageTutorials from "../components/Landing/sections/language-tutorials";
    import PlatformFeatures from "../components/Landing/sections/platform-features";
    import BusinessSolution from "../components/Landing/sections/business-solution";
    import SuccessStory from "../components/Landing/sections/success-story";
    import Price from "../components/Landing/sections/price";

    export default {
        components: {
            SuccessStory,
            BusinessSolution,
            Slider,
            Languages,
            Audiences,
            LanguageTutorials,
            PlatformFeatures,
            Price
        },
        data() {
            return {}
        }
    }
</script>

<style lang="stylus" scoped>

    .bottom-curve
        background: url('~/assets/svg/bottom_curve.svg');
        background-size cover
        width 100%

</style>

<style lang="stylus" scoped>
    .row
        margin 0
</style>

<style lang="stylus">

    *
        user-select text
        -moz-user-select text
        -ms-user-select text
        -webkit-user-select text

    row
        margin-left 0 !important
        margin-right 0 !important


    .plyr__controls > .plyr__control:first-child, .plyr__controls > .plyr__control:first-child + [data-plyr=pause] {
        margin-left: 0;
        margin-right: 0 !important;
    }

    .plyr__progress__container
        width available !important
        flex 1 !important


    .plyr--full-ui.plyr--video .plyr__control--overlaid
        display: block;
        background: rgba(0, 69, 255, 0.7) !important;
        border-radius: 5px !important;
        padding 24px !important

    .success_player
        .plyr
            border-radius 25px !important
            width 100% !important
            @media only screen and (max-width: 992px) {
                border-radius 0 !important
            }


    .tut_player
        .plyr
            border-radius 0 0 5px 5px !important
            width 100% !important
            @media only screen and (max-width: 992px) {
                border-radius 0 !important
            }


    .plyr--video .plyr__control.plyr__tab-focus, .plyr--video .plyr__control:hover, .plyr--video .plyr__control[aria-expanded=true] {
        background: transparent !important;
        color: #fff;
        outline none !important
    }

    .plyr--full-ui input[type=range] {
        border-radius: 25px !important;
        color: rgba(255, 255, 255, 0.99) !important;
        @media only screen and (max-width: 992px) {
            border-radius 0 !important
        }

    }

    .plyr--video .plyr__controls {
        background: rgba(0, 69, 255, 0.7) !important;
        bottom: 0;
        color: #fff;
        left: 0;
        padding: 5px !important;
        position: absolute;
        margin 12px !important
        border-radius 25px !important
        right: 0;
        outline none !important
        transition: opacity .4s ease-in-out, -webkit-transform .4s ease-in-out;
        transition: opacity .4s ease-in-out, transform .4s ease-in-out;
        transition: opacity .4s ease-in-out, transform .4s ease-in-out, -webkit-transform .4s ease-in-out;
        z-index: 3;
    }
</style>
