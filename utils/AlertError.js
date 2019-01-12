import Vue from "vue";

export const alertReport = async res => {
  let params = (res && res.data) || null;
  if (!params) {
    Vue.prototype.$notify({
      title: "خطا در حال بررسی میباشد لطفا شکیبا باشید",
      type: "error",
      time: 4000
    });
    return;
  }
  if (typeof params === "object") {
    Object.keys(params).map(m => {
      Vue.prototype.$notify({
        title: params[m].join(),
        type: "error",
        time: 4000
      });
    });
  } else {
    Vue.prototype.$notify({
      title: params.join(),
      type: "error",
      time: 4000
    });
  }
};

Vue.prototype.$alertReport = alertReport;
