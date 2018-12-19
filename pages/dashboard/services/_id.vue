<template>
  <div>
    <h2>جزییات سرویس</h2>
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <div class="fandogh-form-group">
          <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
          <f-label-disable label="نام سرویس :" :value="service.name"/>
        </div>
        <div class="fandogh-form-group">
          <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
          <f-label-disable label="نوع سرویس :" :value="service.service_type"/>
        </div>
        <div class="fandogh-form-group">
          <f-input styles="input-white input-block input-dashboard input-disable"></f-input>
          <f-label-disable label="مقدار رم مصرف شده :" :value="service.memory"/>
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
        <div class="table-title font-roboto">ENV</div>
        <vue-good-table :columns="header" :rows="service.env" :rtl="true" styleClass="vgt-table">
          <div slot="emptystate">
            <p class="empty-table center">دیتایی وجود ندارد</p>
          </div>
        </vue-good-table>
      </div>
    </div>
    <h3>رپلیکاها :</h3>
    <div class="row">
      <div class="col-md-6 col-xs-12">
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
import FButton from "~/components/elements/button";
import File from "~/components/elements/file";
import FLabelDisable from "~/components/elements/label/label-disable";
import FTable from "~/components/Dashboard/table";
import FCollaps from "~/components/elements/collaps";
import FReplicaHeader from "~/components/Dashboard/replica/header";
import FReplicaDetails from "~/components/Dashboard/replica/details";
import FReplicaContainers from "~/components/Dashboard/replica/containers";
import FReplicaEvents from "~/components/Dashboard/replica/events";
import FDate from "~/utils/date";

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
      // service: "MS.Dos",
      version: "داخلی",
      date: "512MB",
      image: this.$route.params.image,
      header: [
        {
          sortable: false,
          label: "نام متغییر",
          field: "name",
          tdClass: "ellipsis"
        },
        {
          sortable: false,
          label: "مقدار",
          field: "value",
          tdClass: "ellipsis"
        }
      ],
      data: [{ name: "NODE_ENV", value: "Production" }]
    };
  },
  async asyncData({ store, route, redirect }) {
    try {
      await store.dispatch("getServices");
    } catch (e) {
      if (e.status === 401) {
        redirect("/user/login");
      }
    }
  },
  computed: {
    service() {
      return {
        state: "RUNNING",
        url: "https://front-salameno.fandogh.cloud",
        urls: ["https://front-salameno.fandogh.cloud"],
        name: "front",
        start_date: "2018-11-07T08:45:39Z",
        last_update: "2018-12-19T12:15:15Z",
        service_type: "external",
        pods: [
          {
            containers: [
              {
                ready: true,
                waiting: null,
                name: "front",
                image: "registry.fandogh.cloud/salameno/front:63"
              }
            ],
            events: [
              {
                count: 1,
                last_timestamp: "2018-12-19T12:15:15Z",
                reason: "Scheduled",
                first_timestamp: "2018-12-19T12:15:15Z",
                kind: null,
                message:
                  "Successfully assigned salameno/front-77bcdc8d75-h7n7r to fandogh-k8s-node01"
              },
              {
                count: 1,
                last_timestamp: "2018-12-19T12:15:16Z",
                reason: "Pulling",
                first_timestamp: "2018-12-19T12:15:16Z",
                kind: null,
                message:
                  'pulling image "registry.fandogh.cloud/salameno/front:63"'
              },
              {
                count: 1,
                last_timestamp: "2018-12-19T12:15:44Z",
                reason: "Pulled",
                first_timestamp: "2018-12-19T12:15:44Z",
                kind: null,
                message:
                  'Successfully pulled image "registry.fandogh.cloud/salameno/front:63"'
              },
              {
                count: 1,
                last_timestamp: "2018-12-19T12:15:44Z",
                reason: "Created",
                first_timestamp: "2018-12-19T12:15:44Z",
                kind: null,
                message: "Created container"
              },
              {
                count: 1,
                last_timestamp: "2018-12-19T12:15:44Z",
                reason: "Started",
                first_timestamp: "2018-12-19T12:15:44Z",
                kind: null,
                message: "Started container"
              }
            ],
            name: "front-77bcdc8d75-h7n7r",
            created_at: "2018-12-19T12:15:15Z",
            phase: "Running"
          }
        ],
        env: [],
        memory: "400",
        volume_mounts: [],
        volumes: []
      };
      // this.$store.state.services;
      // let item = items[0];
      // console.log(item)
      // if (item) {
      //   // item.memory = `Mi ${item.memory}`;
      //   // item.start_date = FDate({ date: item.start_date });
      //   return item;
      // }
    }
  }
};
</script>
