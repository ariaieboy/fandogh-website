<template>
    <div class="service" @click="redirectToPlan(plan,configs)" >
        <box :hasShadow="plan.isActive ? false : true ">
            <div class="service---box" >
                <div class="service----item">
                    <div class="service-----image">
                        <img :src="'/icons/plans/services-icon/'+plan.icon">
                    </div>
                    <div class="service-----text">
                        <span class="service------title">
                            {{plan.title}}
                            <img src="~/static/icons/plans/info-button.png">
                        </span>
                        <span class="service------price">
                            {{plan.price}}
                        </span>
                    </div>
                </div>
                <div class="service----line"></div>
                <div class="service----item service----item-second">
                    <div class="service-----information" v-for="config in configs">
                        <span class="service------image">
                            <img :src="'/icons/plans/'+config.icon" alt="">
                        </span>
                        <span class="service------name">
                            {{config.title}}
                        </span>
                        <span class="service------info">
                            {{config.value}}
                        </span>
                    </div>
                </div>

            </div>
        </box>
        <div class="service-description">
            <div class="service-description-content" v-show="isShow === index">
                <h3 class="service-description-heading">ویژگی‌ها :</h3>
                <div class="bullet-list" v-for="feature in description.features">
                <span class="bullet"></span>
                <p>امکان اجرای دو سرویس همزمان</p>
                </div>
                <h3 class="service-description-heading">توضیحات :</h3>
                <p class="service-description-text">{{description.text}}</p>                
            </div>
            <div class="plan-description-toggle" @click="toggle(index)">
                <p>توضیحات</p>
                
            </div>
        </div>
    </div>

</template>

<script>
import Box from "~/components/Dashboard/plans/panel-box/box.vue";

export default {
  components: {
    Box
  },
   data() {
    return {
      isShow:-1,
    }
   },
    props: {
        index :{
            type:Number , 
            default : 1 
        },
        description : {
            type : Object , 
            default : {
                features : [
                'امکان اجرای دو سرویس همزمان',
                'در صورت وجود فضای اضافه',
                'هر سرویس ۲۰۰ مگابایت حافظه اصلی'
                ],
                text:'این پلن مناسب کاربرانی است که مصرف منابع زیادی ندارند. مانند وبلاگها - چت باتها و همچنین برای ایجاد نمونه اولیه محصولات است. شما در هر زمان که نیاز به منابع بیشتری داشته باشید می‌توانید پلن خود را ارتقا دهید.'
            }
        },
           plan: {
      type: Object,
      default: {
        icon: "blimp.png",
        title: "پلن فعلی",
        price: "پلن 2",
        isActive: false
      }
    },
    configs: {
      type: Array,
      default: [
        {
          icon: "ram.png",
          title: "RAM",
          value: "2GB"
        }
      ]
    },

        },
    
  methods: {
    redirectToPlan(plan,configs){
        this.$store.dispatch('setPlan', {plan,configs}).then(res => {
          this.$router.push('/dashboard/plans/1')
        }).catch(e => {
          console.log(e,'eee')
        })
    },
    toggle(index) {
      if (index === this.isShow) {
        this.isShow = -1;
        return;
      }
      this.isShow = index;
    }
  }
};
</script>

<style lang="stylus" scoped>
.active
    box-shadow none
.service
    width 100%
    &-wrapper
        display flex
    &--half
        width 50%
    &---box
        position relative
        display flex
    &----item
        display flex
        // padding 0 10px 0 25px
        flex 1 1
        justify-content space-around
        align-items center
        &-second
            width 100%
        @media (max-width: 992px)
            flex inherit
            min-width 130px
        @media (max-width: 566px)
            min-width: 51px;                        
    &----line
        width 2px
        background-color #e7e8ea
        // width 50%
    &-----image
        @media (max-width: 992px)
            display none
    &-----text
        display flex
        flex-direction column
    &------title
        margin-bottom 20px
        color #4f4f4f
        font-size 18px
        line-height 1.72
        @media (max-width 566px)
            font-size 12px
        img
            @media (max-width: 992px)
                display none
            @media (max-width 566px)
                width 16px
    &------price
        color #4f4f4f
        font-weight bold
        font-size 18px
        line-height 1.72
        @media (max-width 566px)
            font-size 12px
    &-----information
        display flex
        flex-direction column
        justify-content space-between
        align-items center
        padding-top 10px
    &------name
        margin 10px 0 10px 0
        color #4f4f4f
        font-size 16px
        font-family Roboto-Bold
        line-height 1.19
        @media (max-width 566px)
            font-size 12px
    &------info
        color #4f4f4f
        font-size 16px
        font-family Roboto
        line-height 1.19
        @media (max-width 566px)
            font-size 12px
.service-description
    display flex
    flex-direction column
    margin 0 15px
    margin-bottom 20px
    text-align center
    @media (min-width: 992px)
        display none
    .service-description-content
        border solid 1px #e7e8ea
        background-color #ffffff
        line-height 1.75
        display: flex;
        flex-direction: column;
        align-items: flex-start;
.plan-description-toggle
    z-index 1
    display inline-block
    margin 0 auto
    margin-bottom 20px
    width 40px * 2
    height 40px
    border-bottom-right-radius 40px * 2
    border-bottom-left-radius 40px * 2
    background-color #ff859e
    box-shadow 0 3px 6px 0 rgba(255, 133, 158, 0.92)
    p
        color #fff
        font-weight bold
        font-size 12px
.bullet-list
    display flex
    align-items baseline
    padding 0 11px 0  5px
.bullet
    width: 8px;
    height: 8px;
    background-color: #ff859e;
    border-radius 50%
    margin-left 10px
.service-description-heading
    margin-right 10px
.service-description-text
    margin: 5px;
</style>
