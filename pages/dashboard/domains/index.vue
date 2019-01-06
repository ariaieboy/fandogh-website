<template>
  <div class="wrapper-image" v-if="!loading">
    <f-loading :isFull="true" v-if="isLoading"/>
    <f-empty v-if="!domains || !domains.length" title="هنوز دامنه‌ای اضافه نشده !">
      <f-button styles="red" @onClick="$router.push('/dashboard/domains/create')">افزودن دامنه</f-button>
    </f-empty>
    <div class="images" v-else>
      <div class="row-block">
        <f-button styles="red" @onClick="$router.push('/dashboard/domains/create')">افزودن دامنه</f-button>
      </div>
      <div class="table-title">دامنه های شما</div>
      <vue-good-table :columns="header" :rows="domains" styleClass="vgt-table" :rtl="true">
        <div slot="emptystate">
          <p class="empty-table center">دیتایی وجود ندارد</p>
        </div>
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <action-button
              v-if="!props.row.verified"
              class="action-button-m"
              @onClick="verify(props.row)"
              icon="ic-tick.svg"
              label="تایید"
            />
            <action-button
              v-if="props.row.verified"
              class="action-button-m disabled"
              @onClick="verify(props.row)"
              icon="ic_tConfirm.svg"
              label="تایید"
            />
            <action-button
              v-if="!props.row.certificate"
              class="action-button-m"
              @onClick="certificateDomain(props.row)"
              icon="ssl.svg"
              label="درخواست ssl"
            />
            <action-button
              v-if="props.row.certificate"
              class="action-button-m"
              @onClick="removeCertificateDomain(props.row)"
              icon="remove-ssl.svg"
              label="حذف ssl"
            />
            <action-button
              class="action-button-m"
              @onClick="remove(props.row)"
              icon="ic-delete.svg"
              label="حذف"
            />
          </span>
          <span v-else-if="props.column.field == 'certificate'">
            <span
              v-if="props.row.certificate"
              :data-balloon="FDate(props.row.certificate.created_at)"
              data-balloon-pos="up"
            >{{props.row.certificate.details.status | status}}</span>
            <span v-else>ندارد</span>
          </span>
          <span v-else-if="props.column.field == 'service'">
            <span v-if="props.row.service">{{props.row.service}}</span>
            <span v-else>ندارد</span>
          </span>
          <span v-else-if="props.column.field == 'created_at'">{{FDate(props.row.created_at)}}</span>
          <span v-else>{{props.formattedRow[props.column.field]}}</span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import FTable from "~/components/Dashboard/table";
import FButton from "~/components/elements/button";
import FDate from "~/utils/date";
import FFromDate from "~/utils/fromDate";
import { getData } from "~/utils/getData";
import Alert from "~/components/Dashboard/alert";
import ActionButton from "~/components/Dashboard/table/action-button";
import FEmpty from "~/components/Dashboard/empty";
import ErrorReporter from "~/utils/ErrorReporter";
import FLoading from "~/components/Loading";

export default {
  layout: "dashboard",

  data() {
    return {
      isLoading: false,
      header: [
        {
          sortable: false,
          label: "نام دامنه",
          field: "name",
          tdClass: "ellipsis ltr"
        },
        {
          sortable: false,
          label: "تاریخ ساخت",
          field: "created_at"
        },
        {
          sortable: false,
          label: "متصل به سرویس",
          field: "service"
        },
        {
          sortable: false,
          label: "گواهینامه ssl",
          field: "certificate",
          tdClass: this.getStatus
        },
        {
          label: "وضعیت",
          sortable: false,
          field: this.getDomainStatus,
          tdClass: this.getClass,
          html: true
        },
        {
          label: "مدیدریت",
          tdClass: "width-larg",
          sortable: false,
          field: "action",
          html: true
        }
      ]
    };
  },
  components: {
    FTable,
    FButton,
    ActionButton,
    FEmpty,
    FLoading
  },
  filters: {
    status: function (value) {
      if (!value) return "";
      let state = value.toLowerCase();
      if (state === "ready") {
        return "فعال";
      }
      if (state === "error") {
        return "خطا";
      }
      if (state === "unknown") {
        return "نامشخص";
      }
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    domains() {
      return this.$store.state.domains;
    }
  },
  destroyed() {
    this.$store.commit("SET_DATA", { data: null, id: "domains" });
  },
  created() {
    this.getData();
  },

  methods: {
    async getData() {
      try {
        await this.$store.dispatch("getDomains");
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      } catch (e) {
        if (e.status === 401) {
          this.$router.push("/user/login");
        }
        this.$store.commit("SET_DATA", { data: false, id: "loading" });
      }
    },

    FFromDate(value) {
      return FFromDate(value);
    },
    FDate(value) {
      return FDate({ date: value });
    },
    getDomainStatus({ verified }) {
      return verified ? "تایید شده" : "تایید نشده";
    },
    getStatus({ certificate }) {
      if (!certificate) return ''
      const { status } = certificate.details;
      if (!status) return "";
      let value = status.toLowerCase();
      if (value === "ready") {
        return "success-text";
      }
      if (value === "error") {
        return "error-text";
      }
      if (value === "unknown") {
        return "pending-text";
      }
    },
    getClass({ verified }) {
      return verified ? "success-text" : "error-text";
    },
    verify({ name }) {
      this.$ga.event({
        eventCategory: "domain",
        eventAction: "click btn verify domain",
        eventLabel: "domain name",
        eventValue: name
      });
      this.$router.push(`/dashboard/domains/verification/${name}`);
    },
    certificateDomain({ name }) {
      this.$ga.event({
        eventCategory: "domain",
        eventAction: "click btn certificate domain",
        eventLabel: "domain name",
        eventValue: name
      });
      this.$store
        .dispatch("certificateDomain", { name })
        .then(res => {
          this.$store.dispatch("getDomains");
          this.$ga.event({
            eventCategory: "domain",
            eventAction: "send certificate domain",
            eventLabel: "domain name",
            eventValue: name
          });
          this.$notify({
            title: "درخواست شما با موفقیت ثبت شد",
            type: "success"
          });
        })
        .catch(e => {
          this.$ga.event({
            eventCategory: "domain",
            eventAction: "fail certificate domain",
            eventLabel: "domain name",
            eventValue: name
          });

          // this notify for themploery
          if (typeof e === "object") {
            this.$notify({
              title: e.domain_name[0],
              time: 4000,
              type: "error"
            });
          } else {
            this.$notify({
              title: ErrorReporter(e, this.$data),
              time: 4000,
              type: "error"
            });
          }
        });
    },
    removeCertificateDomain({ name }) {
      this.$ga.event({
        eventCategory: "domain",
        eventAction: "click btn remove certificate domain",
        eventLabel: "domain name",
        eventValue: name
      });
      this.$alertify(
        {
          title: `حذف گواهی SLL`,
          description: `آیا از حذف SSL دامنه ${name} مطمئن هستید؟`
        },
        status => {
          if (status) {
            this.isLoading = true;
            this.$store
              .dispatch("removeCertificateDomain", { name })
              .then(res => {
                this.$store.dispatch("getDomains");
                this.isLoading = false;
                this.$ga.event({
                  eventCategory: "domain",
                  eventAction: "remove ssl domain",
                  eventLabel: "domain name",
                  eventValue: name
                });
                this.$notify({
                  title: res.message,
                  type: "success"
                });
              })
              .catch(e => {
                this.isLoading = false;
                this.$ga.event({
                  eventCategory: "domain",
                  eventAction: "fail remove ssl domain",
                  eventLabel: "domain name",
                  eventValue: name
                });
                this.$notify({
                  title: e.data.message,
                  type: "error"
                });
              });
          }
        }
      );
    },
    remove({ name }) {
      this.$ga.event({
        eventCategory: "domain",
        eventAction: "click btn remove domain",
        eventLabel: "domain name",
        eventValue: name
      });
      this.$alertify(
        {
          title: `حذف دامنه`,
          description: ` آیا از حذف دامنه ${name} مطمئن هستید؟`
        },
        status => {
          if (status) {
            this.$store
              .dispatch("removeDomain", name)
              .then(res => {
                this.$store.dispatch("getDomains");
                this.$ga.event({
                  eventCategory: "domain",
                  eventAction: "remove domain",
                  eventLabel: "domain name",
                  eventValue: name
                });
                this.$notify({
                  title: res.message,
                  type: "success"
                });
              })
              .catch(e => {
                this.$ga.event({
                  eventCategory: "domain",
                  eventAction: "fail remove domain",
                  eventLabel: "domain name",
                  eventValue: name
                });
                this.$notify({
                  title: e.data.message,
                  type: "error"
                });
              });
          }
        }
      );
    }
  }
};
</script>
<style lang="stylus" scoped>
.scroll
  overflow-x auto
</style>
