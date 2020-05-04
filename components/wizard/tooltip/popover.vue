<template>
    <v-popover offset="16" :disabled="!isEnabled"
               style="align-self: baseline; float: left; margin-top: 6px; margin-left: 0">
        <img @click="isEnabled = !isEnabled" src="../../../assets/svg/ic_info.svg" alt="tooltip"
             style="cursor: pointer; width: 16px; margin-bottom: -23px; z-index: 1000; position: relative;
                                        filter: invert(27%) sepia(27%) saturate(7260%) hue-rotate(143deg) brightness(105%) contrast(108%)"/>

        <template slot="popover">
            <p class="tooltip-content"
               style="font-family: iran-yekan;font-weight: bold; font-size: 1.2em; color:#222222; margin-bottom: 7px">{{tooltip.title}}</p>
            <div style="height: 1px; background-color: #00e5ff; margin-bottom: 7px"></div>

            <p style="font-size: 1em; font-family: iran-yekan; line-height: 1.7; color: #333333">
                {{tooltip.text}}</p>

            <div style="width: 100%; display: inline-flex;">
                <a :href="tooltip.url"
                   target="_blank"
                   rel="noopener"
                   style=" cursor: pointer; background-color: #0045ff;box-shadow: 0 0 6px rgba(0,69, 255, 0.7), 0 0 8px rgba(0,69, 255, 0.4); font-weight: bold; padding: 7px 12px; border-radius: 3px">مطالعه‌ی مستندات</a>
                <a v-close-popover
                   rel="noopener"
                   style="cursor: pointer;margin-right: 12px; font-weight: bold; padding: 7px 12px; color: #2c2c2c;">بستن</a>
            </div>
        </template>

    </v-popover>
</template>

<script>
    export default {
        name: "popover",
        props:['tooltip'],
        data(){
            return{
                isEnabled: false,
            }
        }
    }
</script>

<style scoped>

</style>
