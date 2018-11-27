<template>
    <div :class="{'show-sidebar': sidebar,'show-half':showHalf}" class="admin-sidebar">
        <closeHalf/>        
        <profile />
        <namespace />
        <my-plan />
        <sidebar-menu />
    </div>
</template>

<script>
    import Profile from './profile'
    import Namespace from './namespace'
    import SidebarMenu from './menu'
    import MyPlan from './myPlan'
    import closeHalf from './close-half'
    export default {
      components:{
        Profile,
        closeHalf,
        Namespace,
        SidebarMenu,
        MyPlan
      },
      computed:{
      	sidebar(){
          return this.$store.state.sidebar === 2
        },
      	showHalf(){
          return this.$store.state.sidebar === 3
        }
      },
    }
</script>

<style lang="stylus" scoped>
    .admin-sidebar
        background-image: linear-gradient(to bottom, rgb(47, 30, 161), rgb(11, 0, 58));
        box-shadow -2px 0 6px 0 rgba(21, 0, 113, 0.36);
        height 100vh
        width 350px
        position fixed
        top 110px
        right 0
        transition all ease .5s
        z-index 9999
        &.show-half
          right -350px
    @media only screen and (max-width: 1230px)
      .admin-sidebar
        top 60px
        transform translate(-100%)
        left 0
        right initial
        position fixed
      &.show-sidebar
        transform translate(0)
    

</style>
