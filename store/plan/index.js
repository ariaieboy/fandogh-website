import * as actions from "./actions";
import * as mutations from "./mutations";

export default {
    namespaced: true,
    state: () => ({
        plans: [
            {
                icon: "bicycle.png", // to see  more icons open dir : ROOT/static/icons/plans/services-icon
                title: "Free",
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
            },
            {
                icon: "sail-boat.png", // to see  more icons open dir : ROOT/static/icons/plans/services-icon
                title: "Plan-1",
                price: '120,000',
                cpu: "1 Core",
                ram: "1GB",
                space: "5GB",
                list: [
                    "امکان داشتن ۲ دامنه غیر فندقی "
                ],
                description:
                    "این پلن مناسب کاربرانی است که مصرف منابع زیادی ندارند. مانند وبلاگ‌ها - چت بات‌ها و همچنین برای ایجاد نمونه اولیه محصولات است. شما در هر زمان که نیاز به منابع بیشتری داشته باشید میتوانید پلن خود را ارتقا دهید."
            },
            {
                icon: "blimp.png", // to see  more icons open dir : ROOT/static/icons/plans/services-icon
                title: "Plan-2",
                price: '240,000',
                cpu: "1 Core",
                ram: "2GB",
                space: "5GB",
                list: [
                    "امکان داشتن ۴ دامنه غیر فندقی "
                ],
                description:
                    "این پلن مناسب محصولاتی است که میزان قابل توجهی کاربر دارند و نیاز به در دسترس بودن بالا دارند. شما در هر زمان که نیاز به منابع بیشتری داشته باشید میتوانید پلن خود را ارتقا دهید."
            },
            {
                icon: "truck.png", // to see  more icons open dir : ROOT/static/icons/plans/services-icon
                title: "Plan-4",
                price: '480,000',
                cpu: "2 Core",
                ram: "4GB",
                space: "30GB",
                list: [
                    "امکان داشتن ۸ دامنه غیر فندقی ",
                    "امکان  Horizontal Scaling"
                ],
                description:
                    "این پلن مناسب محصولاتی است که میزان قابل توجهی کاربر دارند و نیاز به در دسترس بودن بالا دارند. شما در هر زمان که نیاز به منابع بیشتری داشته باشید میتوانید پلن خود را ارتقا دهید."
            },
            {
                icon: "helicopter.png", // to see  more icons open dir : ROOT/static/icons/plans/services-icon
                title: "Plan-8",
                price: '960,000',
                cpu: "4 Core",
                ram: "8GB",
                space: "30GB",
                list: [
                    "امکان داشتن ۸ دامنه غیر فندقی ",
                    "امکان  Horizontal Scaling"
                ],
                description:
                    "این پلن مناسب محصولاتی است که میزان قابل توجهی کاربر دارند و نیاز به در دسترس بودن بالا دارند. شما در هر زمان که نیاز به منابع بیشتری داشته باشید میتوانید پلن خود را ارتقا دهید."
            },
            {
                icon: "rocket.png", // to see  more icons open dir : ROOT/static/icons/plans/services-icon
                title: "Plan-16",
                price: '1,920,000',
                cpu: "8 Core",
                ram: "16GB",
                space: "40GB",
                list: [
                    "امکان داشتن ۸ دامنه غیر فندقی ",
                    "امکان  Horizontal Scaling"
                ],
                description:
                    "این پلن مناسب محصولاتی است که میزان قابل توجهی کاربر دارند و نیاز به در دسترس بودن بالا دارند. شما در هر زمان که نیاز به منابع بیشتری داشته باشید میتوانید پلن خود را ارتقا دهید."
            }
        ],
        activePlan: null
    }),
    actions,
    mutations
};
