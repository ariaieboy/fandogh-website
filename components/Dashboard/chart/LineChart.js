import {Line, mixins} from "vue-chartjs";
import Vue from "vue";

export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
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
    }
};
