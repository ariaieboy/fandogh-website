<template>
    <div class="row"
         style="display: block; border-radius: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.07); width: 100%; background-color: #fefefe; margin: 0 0 14px 0;">

        <div class="col-xs"
             style="background-color: #0045ff;height: 35px; border-top-left-radius: 3px; border-top-right-radius: 3px; display: flex">
            <p style="font-family: iran-yekan; font-size: .9em; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 35px;
                        margin: 0;letter-spacing: normal; text-align: right; color: #fefefe;">
                {{sectionTitle}}</p>

            <v-popover offset="16" :disabled="!isEnabled" v-if="tooltip">
                <img @click="isEnabled = !isEnabled" src="../../../assets/svg/ic_info.svg" alt="tooltip"
                     style="vertical-align: middle; cursor: pointer; height: 35px; padding: 7px"/>

                <template slot="popover">
                    <p class="tooltip-content"
                       style="font-family: iran-yekan;font-weight: bold; font-size: 1.2em; color:#222222; margin-bottom: 7px">
                        {{tooltip.title}}</p>
                    <div style="height: 1px; background-color: #00e5ff; margin-bottom: 5px"></div>

                    <p style="font-size: 1em; font-family: iran-yekan; line-height: 1.7; color: #333333">
                        {{tooltip.text}}</p>

                    <div style="width: 100%; display: flex;">
                        <a :href="tooltip.url" target="_blank"
                           rel="noopener"
                           style=" cursor: pointer; background-color: #0045ff;box-shadow: 0 0 6px rgba(0,69, 255, 0.7), 0 0 8px rgba(0,69, 255, 0.4); font-weight: bold; padding: 7px 12px; border-radius: 3px">مطالعه‌ی
                            مستندات</a>
                        <a v-close-popover
                           rel="noopener"
                           style="cursor: pointer;margin-right: 12px; font-weight: bold; padding: 7px 12px; color: #2c2c2c;">بستن</a>
                    </div>
                </template>

            </v-popover>


        </div>
        <div class="row"
             style="padding: 24px 16px; display: flex; flex-direction: row; box-sizing: padding-box; margin-left: 0!important; margin-right: 0!important;">
            <slot dir="rtl" class="row"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "config-box",
        props: ['section-title', 'tooltip'],
        data() {
            return {
                isEnabled: false,
            }
        }
    }
</script>

<style lang="stylus" scoped>


</style>
