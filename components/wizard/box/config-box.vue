<template>
    <div class="row" style="display: block; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.07); width: 100%; background-color: #fefefe; margin: 0 0 14px 0;">

        <div class="col-xs" style="background-color: #2979ff;height: 35px; border-top-left-radius: 3px; border-top-right-radius: 3px; display: flex">
            <p style="font-family: iran-yekan; font-size: 16px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 35px;
                        margin: 0;letter-spacing: normal; text-align: right; color: #fefefe;">
                {{sectionTitle}}</p>



            <v-popover offset="16" :disabled="!isEnabled" v-if="tooltip">
                <img @click="isEnabled = !isEnabled" src="../../../assets/svg/ic_info.svg" alt="tooltip" style="vertical-align: middle; cursor: pointer; height: 35px; padding: 7px"/>

                <template slot="popover">
                    <p class="tooltip-content" style="font-family: iran-yekan;font-weight: bold; font-size: 1.2em; color:#222222; margin-bottom: 7px">{{tooltip.title}}</p>
                    <div style="height: 1px; background-color: #00e5ff; margin-bottom: 5px"></div>

                    <p style="font-size: 1em; font-family: iran-yekan; line-height: 1.7; color: #333333">{{tooltip.text}}</p>

                    <div style="width: 100%; display: flex; justify-items: center; justify-content: center">
                        <a :href="tooltip.url" target="_blank" style=" cursor: pointer; background-color: #2979ff;box-shadow: 0 0 6px rgba(41,121, 255, 0.7), 0 0 8px rgba(41,121, 255, 0.4); font-weight: bold; padding: 7px 12px; border-radius: 3px">مطالعه‌ی مستندات</a>
                        <a v-close-popover style=" cursor: pointer;margin-right: 12px; border: 1px solid #00e5ff; font-weight: bold; padding: 7px 12px; border-radius: 3px; color: #00e5ff">بستن</a>
                    </div>
                </template>

            </v-popover>


        </div>
        <div style="padding: 24px 16px; display: flex; flex-direction: row; box-sizing: padding-box">
            <slot dir="rtl" class="row"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "config-box",
        props: ['section-title', 'tooltip'],
        data(){
            return{
                isEnabled: false,
            }
        }
    }
</script>

<style lang="stylus" scoped>



</style>
