<template>

    <div class="row">
        <div class="row-custom">
            <div ref="cint" style="overflow-x: scroll" class="center col-lg-12 col-md-12 col-xs-12 container-fluid">
                <plan title="پلن پایه" icon="base-plan" dedicated-volume="10" memory="1" cpu="0.5"
                      v-bind:class="(selected === 0 ? 'selected' : 'unselected')"
                      @click.native="clicked(0)"/>

                <plan title="پلن اقتصادی" icon="economy-plan" dedicated-volume="50" memory="2" cpu="1"
                      v-bind:class="(selected === 1 ? 'selected' : 'unselected')"
                      @click.native="clicked(1)"/>

                <plan title="پلن استارتاپی" icon="startup-plan" dedicated-volume="100" memory="4" cpu="2"
                      v-bind:class="(selected === 2 ? 'selected' : 'unselected')"
                      @click.native="clicked(2)"/>

            </div>
        </div>
        <div class="container-fluid">
            <div class="right-cursor" @click="swipeLeft">
                <img src="../../assets/svg/arrow.svg" alt="arrow"/>
            </div>
            <div class="left-cursor" @click="swipeRight">
                <img src="../../assets/svg/arrow.svg" alt="arrow"/>
            </div>
        </div>
    </div>

</template>

<script>
    import Plan from './item.vue'


    export default {
        name: "index",
        components: {
            Plan,
        },
        data() {
            return {
                selected: -1
            }
        },
        methods: {
            clicked(position) {
                this.selected = position;
                switch (position) {

                    case 0:
                        this.$emit('update:memory', 1);
                        this.$emit('update:dedicatedVolume', 10);
                        break;
                    case 1:
                        this.$emit('update:memory', 2);
                        this.$emit('update:dedicatedVolume', 50);
                        break;
                    case 2:
                        this.$emit('update:memory', 4);
                        this.$emit('update:dedicatedVolume', 100);
                        break;
                }
            },
            scrollTo(element, scrollPixels, duration) {
                const scrollPos = element.scrollLeft;
                // Condition to check if scrolling is required
                if (!((scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0))) {
                    // Get the start timestamp
                    const startTime =
                        "now" in window.performance
                            ? performance.now()
                            : new Date().getTime();

                    function scroll(timestamp) {
                        //Calculate the timeelapsed
                        const timeElapsed = timestamp - startTime;
                        //Calculate progress
                        const progress = Math.min(timeElapsed / duration, 1);
                        //Set the scrolleft
                        element.scrollLeft = scrollPos + scrollPixels * progress;
                        //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
                        if (timeElapsed < duration) {
                            //Request for animation
                            window.requestAnimationFrame(scroll);
                        } else {
                            return;
                        }
                    }

                    //Call requestAnimationFrame on scroll function first time
                    window.requestAnimationFrame(scroll);
                }
            },
            swipeLeft() {
                const content = this.$refs.cint;
                this.scrollTo(content, 400, 300);
            },
            swipeRight() {
                const content = this.$refs.cint;
                this.scrollTo(content, -400, 300);
            }
        }
    }
</script>

<style lang="stylus">

    .selected {
        @import "../../assets/css/selected-plan.styl"
    }

    .unselected {
        @import "../../assets/css/inactive-plan.styl"
    }

    ::-webkit-scrollbar
        display none

    -ms-overflow-style none
    scrollbar-width none

    .row-custom
        height 230px
        width 100%
        display flex
        margin-top 55px
        @media only screen and (max-width: 900px)
            height 180px


    .left-cursor
        border-radius 100px
        display inline-flex
        height 48px
        width 48px
        margin-right 8px
        margin-top 18px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.16)
        background-color #fefefe
        @media only screen and (max-width: 900px)
            width 34px
            height 34px
            top 12px

        img
            display flex
            margin auto
            transform rotate(180deg)
            pointer-events none
            filter invert(100%)
            @media only screen and (max-width: 900px)
                width 6px


    .right-cursor
        border-radius 100px
        height 48px
        width 48px
        display inline-flex
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.16)
        background-color #fefefe
        margin-top 18px
        margin-left 8px
        @media only screen and (max-width: 900px)
            width 34px
            height 34px
            margin-top 12px

        img
            display flex
            margin auto
            pointer-events none
            filter invert(100%)
            @media only screen and (max-width: 900px)
                width 6px



    .center
        overflow hidden
        display flex
        flex-direction row-reverse
        vertical-align bottom
        flex-wrap nowrap
        height 100%
        width 100%

</style>
