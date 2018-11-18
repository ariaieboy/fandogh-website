<template>
    <div class="table" :class="{'small-table': small}">
        <div class="table-header">
            <h2>
                {{title}}
            </h2>
        </div>
        <div class="table-content" >
            <table cellspacing="0" >
                <tbody>
                    <tr>
                        <th v-for="(name, index) in header" :class="[index%2 ? 'gray-1' : 'white']" :key="index">{{name}}</th>
                        <th v-if="actions && actions.length">
                            تغییرات
                        </th>
                    </tr>
                    <tr v-for="(dataRow, index) in data" :key="index">
                        <td v-for="(value, jendex) in dataRow.rows" :key="jendex"
                            :class="[index%2 !== 0 && jendex%2 === 0 ? 'white' : index%2 === 0 && jendex%2 !== 0 ?
                            'gray-2': 'gray-1']" v-html="value">  </td>
                        <td v-if="actions && actions.length" :class="[index%2 !== 0 && dataRow.rows.length%2 === 0 ? 'white' : index%2 === 0 && dataRow.rows.length%2 !== 0 ? 'gray-2': 'gray-1']"  >
                            <component :class="actions.length >= 3 ? 'action-button-s' : 'action-button-m'"
                                       v-for="(action, index) in actions" :key="index" is="action-button"
                                       @onClick="actionHandler(action, dataRow)" v-html="action.title" > </component>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
  import ActionButton from '~/components/Dashboard/table/action-button'
    export default {
      props:['header', 'data', 'actions', 'title', 'small'],
      components:{
        ActionButton
      },
      methods:{
        actionHandler(action, dataRow){
          if(this.$parent[action.action]) {
            this.$parent[action.action](dataRow.meta.id)
          }
          this.$emit(action.action, dataRow.meta.id)
        }
      },
      mounted(){
        if(this.small){
          let THs  = document.querySelectorAll('.table th')
          let TDs  = document.querySelectorAll('.table td')

          THs.forEach(th => {
            th.style.width = (100 / THs.length) + '%'
            th.style.minWidth = (100 / THs.length) + '%'
          })
          TDs.forEach(td => {
            td.style.width = (100 / TDs.length) + '%'
            td.style.minWidth = (100 / TDs.length) + '%'
          })
        }
      }
    }
</script>

<style lang="stylus" >
    @import url('http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌​lic,400italic,500,500italic,700,700italic,900italic,900')
    .table
        img
          width 24px
        width 100%
        margin 0 auto
        font-family 'Roboto', yekan, sans-serif
        .table-content
            background-color #fff
            overflow-x auto
            border solid 1px #e7e8ea
            border-radius 0 0 15px 10px
        td, th
            min-width 220px
            max-width 220px
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            padding 10px
            box-sizing border-box
            height 90px
            color #75879c
            font-size 18px
            text-align center
            &:last-child
                width 100%

        th
            font-size 16px
            font-weight bold
            color #000
        .table-header
            background-color: #291996;
            display block
            box-sizing border-box
            padding 10px
            text-align center
            border-radius 10px 10px 0 0
            width 100%
            h2
                font-size 16px
                line-height 0
                color #fff
                padding 0
    .white
        background-color #fff
    .gray-1
        background-color  rgba(217,217,217, .2)
    .gray-2
        background-color #F1F3F9
    .table.small-table
        table
            table-layout: fixed ;
            width: 100% ;
            /*td, th*/
                /*width 50%*/
                /*min-width 50%*/
    @media (max-width: 1400px)
        .table
            td, th
                min-width 170px
                max-width 170px
                font-size 12px
                &:last-child
                    width 100%
                    min-widht 100%
                    max-width 100%
    @media (max-width: 768px)
        .table
            td, th
                min-width 120px
                max-width 120px
                font-size 11px
                &:last-child
                    width 100%
                    min-widht 100%
                    max-width 100%
</style>