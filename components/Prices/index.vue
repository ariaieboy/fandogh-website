<template>
  <section id="prices">
  <div class="container">
      <div class="inner-content">
        <div class="text">
          <h2 class="title">
        <progress-hover>تعرفه</progress-hover> سرویس‌های فندق
        </h2>
        <p class="description">
            تعرفه فندق رایگان است، که در آن به شما توانایی اجرای دو سرویس مجزا داده می‌شود که می‌توانید  هر دو سرویس را همزمان در حال اجرا داشته باشید. در حال حاضر تمامی سرویس های فندق رایگان هستند و در قالب ارائه کنونی رایگان خواهند ماند. ما برای تداوم این امر نهایت تلاش خود را می‌کنیم.
        </p>

        </div>
      <div class="row options">
        <div class="col-md-6 col-xs-12">
          <price-option styles="red" title="سرویس رایگان">
            <ul>
              <li>۲ سرویس در حال اجرا</li>
              <li>نگهداری ۲۰ نسخه از داکر ایمیج‌ها</li>
              <li>۲ گیگابایت فضای هدیه</li>
            </ul>
          </price-option>
        </div>
        <div class="col-md-6 col-xs-12">
           <price-option styles="blue blur" title="سرویس ویژه">
            <ul>
              <li>فکر کردی زرنگی؟  :/</li>
              <li>بزودی ویژگی های  سرویس ویژه اعلام میشه</li>
              <li>ممنون از حسن توجهت :)</li>
            </ul>
          </price-option>
        </div>
      </div>
      </div>
    </div>
  </section>

</template>

<script>
import PriceOption from "./option";

export default {
  components: {
    PriceOption
  }
};
</script>

<style lang="stylus" scoped>
  .text
    margin-top -100px
    margin-bottom 100px
  .options
    div
     margin 10px 0
  @media only screen and (max-width: 991px)
    #prices
      margin-top 100px
</style>
