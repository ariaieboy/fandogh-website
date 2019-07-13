<template>
  <div class="replica-events">
    <h4 style="margin-bottom: 12px">رخداد‌ها</h4>
    <table class="font-roboto" v-if="windowWidth >= 992">
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
    <table class="font-roboto mobile-table" v-else>
      <tbody v-for="item in items">
        <tr>
          <td>{{item.reason}}</td>
          <th>Reason</th>
        </tr>
        <tr>
          <td>{{item.message}}</td>
          <th>Message</th>
        </tr>
        <tr>
          <td>{{item.count}}</td>
          <th>Count</th>
        </tr>
        <!-- <td>2018-10-03</td> -->
        <tr>
          <td class="border">{{FDate(item.last_timestamp)}}</td>
          <th class="border">Last Seen</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FDate from "~/utils/date";

export default {
  name: "replica-events",
  props: {
    items: {
      type: Array
    }
  },
  methods: {
    FDate(value, format = " HH:mm:ss") {
      if (!value) return "";
      return FDate({ date: value, format });
    }
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth;
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
    border-spacing 0px
    text-align center
    th
      padding 5px 0
      border-bottom 1pt solid black
      color #4f4f4f
      font-size 16px
    td
      padding 5px 0
      max-width 250px
      color #4f4f4f
      font-size 12px
  .mobile-table
    text-align left
    .border
      border-bottom 1pt solid black
    th
      width 150px
      border none
    tbody:last-child
      .border
        border-bottom none
</style>
