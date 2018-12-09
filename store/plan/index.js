import * as actions from "./actions";
import * as mutations from "./mutations";

export default {
  namespaced: true,
  state: () => ({
    plans: [
      {
        icon: "bicycle.png", // to see  more icons open dir : ROOT/static/icons/plans/services-icon
        title: "مفتی",
        price: '0',
        cpu: "Unknown",
        ram: "400MB",
        space: "2GB",
        list: [
          "امکان اجرای دو سرویس همزمان",
          "در صورت وجود فضای اضافه",
          "هر سرویس ۲۰۰ مگابایت حافظه اصلی"
        ],
        description:
          "این پلن مناسب کاربرانی است که مصرف منابع زیادی ندارند. مانند وبلاگها - چت باتها و همچنین برای ایجاد نمونه اولیه محصولات است. شما در هر زمان که نیاز به منابع بیشتری داشته باشید می‌توانید پلن خود را ارتقا دهید."
      }
    ],
    activePlan: null
  }),
  actions,
  mutations
};
