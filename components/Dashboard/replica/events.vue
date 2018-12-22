<template>
  <div class="replica-events">
    <h4>رخداد‌ها</h4>
    <table class="font-roboto">
      <thead>
        <tr>
          <th>Reason</th>
          <th>Message</th>
          <th>Count</th>
          <!-- <th>First Seen</th> -->
          <th>Last Seen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td>{{item.reason}}</td>
          <td>{{item.message}}</td>
          <td>{{item.count}}</td>
          <!-- <td>2018-10-03</td> -->
          <td>{{FDate(item.last_timestamp)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FDate from "~/utils/date";

export default {
  name: "replica-events",
  props:{
    items:{
      type:Array,
    }
  },
    methods:{
    FDate(value,format= ' HH:mm:ss'){
      if(!value) return ''
      return FDate({date:value,format})
    }
  }
};
</script>
<style lang="stylus" scoped>
.replica-events
  padding 15px
  font-family yekan
  table
    width 100%
    text-align center
    border-spacing: 0px;
    th
      border-bottom:1pt solid black;
      padding 5px 0
      font-size 16px
      color #4f4f4f
    td
      max-width 250px
      color #4f4f4f
      font-size 12px
      padding 5px 0
</style>
