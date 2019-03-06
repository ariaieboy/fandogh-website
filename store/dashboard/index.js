import * as actions from "./actions";
import * as mutations from "./mutations";

export default {
  namespaced: true,
  state: () => ({
    badgsService: [
      {
        color: "red",
        label: "کل سرویس‌ها",
        value: "۲۴"
      },
      {
        color: "#3ccc38",
        label: "در حال اجرا",
        value: "۱۶"
      },
      {
        color: "#fd3259",
        label: "ارورها",
        value: "5"
      },
      {
        color: "#24d5d8",
        label: "درحال ساخت",
        value: "2"
      }
    ]
  }),
  actions,
  mutations
};
