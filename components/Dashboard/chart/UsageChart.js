import { Doughnut, mixins } from "vue-chartjs";
import Vue from "vue";

const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object
      // default: () => {
      //   return {
      //     tooltips: {
      //       titleFontFamily: "yekan"
      //     }
      //   };
      // }
    },
    data: {
      type: Array
    },
    colors: {
      type: Array
    },
    labels: {
      type: Array
    },
    styles: {
      type: Object,
      default: () => {
        return {
          height: "114px",
          width: "114px",
          position: "relative"
          // fontFamily: "yekan"
        };
      }
    }
  },
  mounted() {
    const chartData = {
      labels: this.labels,
      datasets: [
        {
          backgroundColor: this.colors,
          data: this.data
        }
      ]
    };
    this.renderChart(chartData, {
      maintainAspectRatio: false,
      legend: { display: false }
    });
  },
  beforeCreate: function() {
    Vue.delete(this.$options.props, "chartData");
  }
};
