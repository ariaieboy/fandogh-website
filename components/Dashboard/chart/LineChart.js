import {Line, mixins} from "vue-chartjs";
import Vue from "vue";

const {reactiveProp} = mixins

export default {
    extends: Line,
    mixins: [reactiveProp],
    props: {
        chartData: {
            type: Object,
            default: null
        }, options: {
            type: Object,
            default: null
        }
    },
    mounted() {

        this.renderChart(this.chartData, this.options)
        // document.getElementById('chartjsLegend').innerHTML = this.generateLegend();
        //
        // console.log('document')
        // console.log(this.generateLegend())
    }
};
