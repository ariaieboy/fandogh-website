<template>
    <div class="row" style="margin-right: 0; margin-left: 0;width: 100%; height: max-content">
        <div class="member-invite-container">

        </div>

    </div>

</template>

<script>
    export default {
        name: "team-management"
    }
</script>

<style lang="stylus" scoped>

    @import "../../../assets/css/variables.styl"

    .member-invite-container
        display flex
        flex-direction row
        background $totalWhite
        border-radius 5px
        box-shadow 0 2px 6px rgba(0, 0, 0, 0.17)

</style>
