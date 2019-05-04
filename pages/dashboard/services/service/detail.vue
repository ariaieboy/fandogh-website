<template>

    <div>
        <div class="row">
            <div class="col-xs-12 col-md-12 col-lg-12 col-sm-12">
                <div class="mb-45" v-for="item in service.pods" v-if="service.pods.length">
                    <f-collaps :selected="true">
                        <div slot="collapse-header">
                            <f-replica-header
                                    :name="item.name"
                                    :state="item.phase"
                                    :count="item.containers.length"
                                    color="success-text"
                            />
                        </div>
                        <div slot="collapse-body">
                            <f-replica-details
                                    :date="item.created_at"
                                    :name="item.name"
                                    :state="item.phase"
                                    :count="item.containers.length"
                                    color="success-text"
                            />
                            <f-replica-containers :items="item.containers"/>
                            <f-replica-events :items="item.events"/>
                        </div>
                    </f-collaps>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import FInput from "~/components/elements/input";
    import FLabelDisable from "~/components/elements/label/label-disable";
    import FCollaps from "~/components/elements/collaps";
    import FReplicaHeader from "~/components/Dashboard/replica/header";
    import FReplicaDetails from "~/components/Dashboard/replica/details";
    import FReplicaContainers from "~/components/Dashboard/replica/containers";
    import FReplicaEvents from "~/components/Dashboard/replica/events";

    export default {
        name: "detail",
        props: ['service'],
        data() {
            return {
                image: this.$route.params.image,
            }
        },
        components: {
            FInput,
            FLabelDisable,
            FReplicaEvents,
            FReplicaContainers,
            FReplicaHeader,
            FReplicaDetails,
            FCollaps,
        }
    }
</script>

<style scoped lang="stylus">

</style>