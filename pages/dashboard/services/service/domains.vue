<template>
    <div class="row" style="margin: 0" v-if="service.urls">
        <div style="width: 100%">
            <div v-for="item in service.urls"
                 style="float: left; direction: ltr; margin: 2px; padding: 5px 12px; background-color: #fefefe; box-shadow: 0 2px 6px rgba(0,0,0,0.07); border-radius: 2px;height: 32px;  width: max-content">
                <a :href="item" style="color: dodgerblue; direction: ltr; line-height: 32px" target="_blank">{{item}}</a>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "domains",
        props: ['service']
    }
</script>

<style scoped>

</style>