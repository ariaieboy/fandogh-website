<template>
  <div class="replica-events">
    <h4>رخداد‌ها</h4>
    <table class="font-roboto">
      <thead>
        <tr>
          <th>Reason</th>
          <th>Message</th>
          <th>Count</th>
          <th>First Seen</th>
          <th>Last Seen</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Scheduled</td>
          <td>Successfully assigned Behrooz/db-6996b848c-r7bk6 to fandogh-k8s-node6</td>
          <td>1</td>
          <td>2018-10-03</td>
          <td>2018-10-03</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "replica-events"
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
