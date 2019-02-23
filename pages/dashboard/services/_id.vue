<template>
  <div v-if="service && !loading">
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
      <div class="col-md-6 col-xs-12" v-if="windowWidth >= 992">
        <div class="table-responsive table-multicolor">
          <div class="table-title font-roboto">ENV</div>
          <b-table
            :fields="header"
            stacked="lg"
            :items="service.env"
            empty-text="دیتایی وجود ندارد"
          ></b-table>
        </div>
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
      <div class="col-md-6 col-xs-12" v-if="windowWidth <= 992">
        <div class="table-responsive table-multicolor">
          <div class="table-title font-roboto">ENV</div>
          <b-table
            :fields="header"
            stacked="lg"
            :items="service.env"
            empty-text="دیتایی وجود ندارد"
          ></b-table>
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
          key: "name",
          tdClass: "ellipsis ltr"
        },
        {
          sortable: false,
          label: "مقدار",
          key: "value",
          tdClass: "ellipsis ltr"
        }
      ],
      data: [{ name: "NODE_ENV", value: "Production" }]
    };
  },
  created() {
    this.$store.commit("SET_DATA", { id: "manifest", data: {} });
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let res = await this.$store.dispatch("getServicesName", {
          name: this.$route.params.id
        });
        let internal = null;
        if (res.state !== "RUNNING") {
          setTimeout(() => {
            this.getData();
          }, 5000);
        } else {
          clearInterval(internal);
        }
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      } catch (e) {
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
        if (e.status === 401) {
          this.$router.push("/user/login");
        }
      }
    }
  },
  destroyed() {
    this.$store.commit("SET_DATA", { data: null, id: "service" });
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
    service() {
      return this.$store.state.service;
    }
  }
};
</script>
