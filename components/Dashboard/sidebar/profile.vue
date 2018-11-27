<template>
  <div class="profile">
    <div class="profile--pic">
      <img
        :src="avatar"
        alt="profile"
      >
    </div>
    <div class="profile--name">
      <h6> {{username}} </h6>
    </div>
  </div>
</template>

<script>
import { getValue } from "~/utils/cookie";
import Gravatar from "~/utils/gravatar";

export default {
  computed: {
    username() {
      return getValue("username");
    }
    // avatar(){
    //   let email = getValue('email')
    //   return Gravatar(email, 150)
    // }
  },
  data() {
    return {
      avatar: "http://via.placeholder.com/150x150"
    };
  },
  mounted() {
    this.getAvatar();
  },
  methods: {
    getAvatar() {
      let email = getValue("email");
      this.avatar = Gravatar(email, 150);
    }
  }
};
</script>

<style lang="stylus" scoped>
.profile
  display flex
  align-items center
  .profile--pic
    padding 30px
    img
      width 64px
      border-radius 64px
@media only screen and (min-width: 1400px)
  .profile
    .profile--pic
      padding 0
      padding-top 20px
    flex-direction column
    justify-content center
</style>