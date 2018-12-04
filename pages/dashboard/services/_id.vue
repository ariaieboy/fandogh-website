<template>
  <div>
    <h2>جزییات سرویس</h2>
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <div class="fandogh-form-group">
          <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
          <f-label-disable label="نام سرویس :" :value="service"/>
        </div>
        <div class="fandogh-form-group">
          <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
          <f-label-disable label="نوع سرویس :" :value="version"/>
        </div>
        <div class="fandogh-form-group">
          <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
          <f-label-disable label="مقدار رم مصرف شده :" :value="date"/>
        </div>
        <!-- <div class="row">
          <div class="col-sm-6">
            <div class="fandogh-form-group">
              <f-input v-model="port"  styles="input-white input-block input-dashboard input-disable" > </f-input>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="fandogh-form-group">
              <f-input v-model="internal"  styles="input-white input-block input-dashboard input-disable" > </f-input>
            </div>
          </div>
        </div>-->
      </div>
      <div class="col-md-6 col-xs-12">
        <f-table :small="true" :header="header" :data="data" title="env"/>
      </div>
    </div>
    <h3>رپلیکاها :</h3>
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <div class="mb-45" v-for="item in 3">
          <f-collaps :selected="true">
            <div slot="collapse-header">
              <f-replica-header/>
            </div>
            <div slot="collapse-body">
              <f-replica-details/>
              <f-replica-containers/>
              <f-replica-events/>
            </div>
          </f-collaps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FInput from "~/components/elements/input";
import FButton from "~/components/elements/button";
import File from "~/components/elements/file";
import FLabelDisable from "~/components/elements/label/label-disable";
import FTable from "~/components/Dashboard/table";
import FCollaps from "~/components/elements/collaps";
import FReplicaHeader from "~/components/Dashboard/replica/header";
import FReplicaDetails from "~/components/Dashboard/replica/details";
import FReplicaContainers from "~/components/Dashboard/replica/containers";
import FReplicaEvents from "~/components/Dashboard/replica/events";

export default {
  layout: "dashboard",
  components: {
    FReplicaEvents,
    FReplicaContainers,
    FReplicaHeader,
    FReplicaDetails,
    FCollaps,
    FInput,
    FButton,
    File,
    FTable,
    FLabelDisable
  },
  data() {
    return {
      service: "MS.Dos",
      version: "داخلی",
      date: "512MB",
      image: this.$route.params.image,
      header: ["نام متغییر", "مقدار متغیر"],
      data: [
        {
          rows: ["NODE_ENV", "Production"]
        }
      ]
    };
  }
};
</script>
