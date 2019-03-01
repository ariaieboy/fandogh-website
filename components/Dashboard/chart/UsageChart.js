import {Doughnut, mixins} from 'vue-chartjs'
import Vue from "vue";

const {reactiveProp} = mixins

export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    props: {
        options: {
            type: Object
        }, data: {
            type: Object
        }, colors: {
            type: Object
        },
        styles: {
            type: Object,
            default:
                {
                    height: '10vh',
                    width: '10vw',
                    position:
                        'relative'
                }
        }
    },
    mounted() {
        const chartData = {
            labels: ['مصرف شده', 'آزاد'],
            datasets: [
                {
                    backgroundColor: this.colors,
                    data: this.data
                }
            ]
        }
        this.renderChart(chartData, {maintainAspectRatio: false, legend: {display: false}})
    }
    ,
    beforeCreate: function () {
        Vue.delete(this.$options.props, 'chartData');
    }
    ,
}
