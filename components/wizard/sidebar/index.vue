<template>
    <div :class="['sidebar-dashboard ', {open}]">
        <div :class="['sidebar-dashboard-list open']" >
            <div :class="['sidebar-dashboard-item open', {'is-active':item.active }, {'is-edited': (!item.active && item.edited)}]"
                 v-for="(item,index) in items"
                 :key="index"
                 v-on:click="menuItemSelected(item.step)">
                <span class="step">{{item.step + 1}}</span>
                <span>{{item.text}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sidebar-dashboard',
        props: ['items'],
        data() {
            return {
            }
        },
        computed: {
            open() {
                return this.$store.state.sideMunu
            }
        },
        methods: {
            menuItemSelected(index) {
                this.items.forEach(item => {
                    item.active = false;
                });

                this.items[index].active = true;

                this.$emit('update:step', this.items[index].step);
                this.$emit('update:text', this.items[index].text);
                this.$emit('update:component', this.items[index].component);
                this.$emit('update:active', this.items[index].active);
                this.$emit('update:step_name', this.items[index].step_name);
                this.$emit('update:edited', this.items[index].edited);
                this.$emit('update:page', this.items[index].page);



            }
        }

    }
</script>

<style lang="stylus" scoped>
    @import '../../../assets/css/variables.styl'

    .sidebar-dashboard
        position fixed
        top 0
        right 0
        bottom 0
        z-index 88
        display flex
        flex-direction column
        justify-content space-between
        padding-top 113px
        padding-bottom 47px
        min-width $widthWizardSidebarOpen
        background-color transparent
        transition $transitionMain


        &.open
            min-width $widthWizardSidebarOpen
            @media only screen and (max-width: $sizeMd)
                right 0
                background-color #fefefe
        @media only screen and (max-width: $sizeMd)
            right -17em
            padding-bottom 0

        @media only screen and (max-height: 500px)
            padding-top 48px


        &-list
            overflow auto

            &::-webkit-scrollbar
                width 7px

            &::-webkit-scrollbar-track
                box-shadow inset 0 0 6px rgba(0, 0, 0, 0.3)

            &::-webkit-scrollbar-thumb
                outline 1px solid slategrey
                background-color darkgrey

        &-item
            position relative
            display flex
            justify-content center
            align-items center
            border-bottom-left-radius 3px
            border-top-left-radius 3px
            padding 7px
            margin-left 8px
            cursor pointer
            text-align right
            background-color #fefefe
            box-shadow 0 1px 6px rgba(0, 0, 0, 0.06)
            margin-bottom 3px

            &.is-active
                span
                    position static
                    visibility visible
                    opacity 9
                    font-family iran-yekan
                    color $colorPrimary
                    font-weight bold
                    transform none

                span.step
                    margin-left 1.2em
                    background-color $colorPrimary !important
                    border-radius 100px
                    color white
                    text-align center
                    line-height 40px
                    width 40px
                    font-family iran-sans
                    height 40px
                    @media only screen and (max-width: 990px)
                        width 30px
                        height 30px
                        line-height 30px

            &.is-edited
                span
                    position static
                    visibility visible
                    opacity 9
                    font-family iran-yekan
                    color $colorAccent
                    font-weight normal
                    transform none

                span.step
                    margin-left 1.2em
                    background-color $colorAccent !important
                    border-radius 100px
                    color white
                    text-align center
                    line-height 40px
                    width 40px
                    font-family iran-sans
                    height 40px
                    @media only screen and (max-width: 990px)
                        width 30px
                        height 30px
                        line-height 30px


            &.open
                justify-content flex-start
                padding-right 16px
                box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.07)
                @media only screen and (max-width: $sizeMd)
                    box-shadow none

                span
                    position static
                    visibility visible
                    opacity 9
                    font-family iran-yekan
                    transform none

                span.step
                    margin-left 1.2em
                    background-color $disableColor
                    border-radius 100px
                    color white
                    text-align center
                    line-height 40px
                    width 40px
                    font-family iran-sans
                    height 40px
                    @media only screen and (max-width: 990px)
                        width 30px
                        height 30px
                        line-height 30px


            span.step
                margin-left 0

            span
                position absolute
                display inline-block
                visibility hidden
                color $disableColor
                font-size .9em
                opacity 0.1
                font-family iran-yekan
                transition $transitionMain
                transform translateX($widthWizardSidebarOpen)

        &-collaps
            position fixed
            right 0
            bottom 0
            min-width $widthWizardSidebarOpen
            border-top 1px solid $grayMedium
            background-color $grayLight
            cursor pointer
            transition $transitionMain

            &.open
                span.step
                    background-color #0045ff
                    border-radius 100px
                    color #47494e

            span.step
                float left
                padding-top 15px
                padding-bottom 15px
                width 12px
                filter opacity(60%)
                transform scale(-1, -1)

</style>

