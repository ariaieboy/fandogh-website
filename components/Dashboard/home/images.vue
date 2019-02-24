<template>
  <div class="images">
    <div class="dashboard-home-wrapper">
      <div class="dashboard-home-header">
        <div class="dashboard-home-title">
          <img src="~assets/img/icons/ic_images.svg" alt="images">
          <span>ایمیج های شما</span>
          <router-link to="/dashboard/images">لیست ایمیج ها</router-link>
        </div>
      </div>
      <div class="table-responsive dashboard-home-table" v-bar v-if="images && images.length">
        <b-table
          :fixed="true"
          :fields="header"
          stacked="lg"
          :items="images"
          empty-text="دیتایی وجود ندارد"
        ></b-table>
        <!-- <div class="dashboard-home-sum">
          <span>تعداد ایمیج ها:</span>
          <span>10</span>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import FDate from "~/utils/date";
import FFromDate from "~/utils/fromDate";

export default {
  data() {
    return {
      header: [
        {
          label: "نام ایمیج",
          sortable: false,
          key: "name",
          tdClass: "ltr ellipsis"
        },

        {
          label: "ورژن",
          sortable: false,
          key: "version",
          tdClass: "ltr ellipsis"
        },
        {
          label: "آخرین آپدیت",
          sortable: false,
          key: "date"
        }
        // {
        //   label: "مبداء رجیستری",
        //   sortable: false,
        //   key: "date"
        // }
      ]
    };
  },
  computed: {
    images() {
      let images = this.$store.state.images;
      if (images) {
        return images.map(({ created_at, name, last_version }) => {
          if (last_version) {
            return {
              name,
              // created_at: FDate({ date: created_at }),
              version: last_version.version,
              date: FFromDate(last_version.date)
            };
          } else {
            return {
              name,
              date: FFromDate(created_at)
            };
          }
        });
      }
    }
  }
};
</script>

