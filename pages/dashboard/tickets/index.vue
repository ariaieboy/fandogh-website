<template>
    <div>
        <table>
            <thead>
            <tr>
                <td class="col-2"> لیست تیکت ها</td>
                <td class="col-2 vgt-pull-left">
                    <nuxt-link to="/dashboard/tickets/create">
                        <button class="btn btn-blue">ساخت تیکت</button>
                    </nuxt-link>
                </td>
            </tr>
            </thead>
        </table>

    </div>
</template>

<script>
    import TableHeader from "../../../components/Dashboard/home/children/table-header";
    import TableTitle from "../../../components/Dashboard/home/children/table-title";

    export default {
        name: "index",
        components: {TableTitle, TableHeader},
        layout: 'dashboard'
    }
</script>

<style scoped>

</style>