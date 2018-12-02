<template>
  <div class="replica-containers">
    <h4>کانتینرها</h4>
    <div class="row">
      <div class="col-md-6 col-xs-12" v-for="item in 2">
        <container-item />
      </div>
    </div>
  </div>
</template>

<script>
import containerItem from './container-item'
export default {
  name: "replica-containers",
  components:{
      containerItem
  }

  
};
</script>

<style lang="stylus" scoped>
.replica-containers
  padding 0 15px
  border-bottom 1px solid #b5b5b5
  font-family yekan

</style>
