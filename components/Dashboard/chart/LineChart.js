import {Line, mixins} from "vue-chartjs";
import Vue from "vue";

const {reactiveProp} = mixins;

export default {
    extends: Line,
    mixins: [reactiveProp],
    props: ['chartdata', 'options'],
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }
};
