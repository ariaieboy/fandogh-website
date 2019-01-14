<template>
  <div :id="id" class="progress"></div>
</template>

<script>
import ProgressBar from 'progressbar.js'
export default {
  name: 'chart',
  props: {
    id: {
      type: String,
      default: 'progress'
    },
    stop: {
      type: Number,
      default: 0.1
    },
    startColor: {
      type: String,
      default: '#4fa8fd'
    },
    endColor: {
      type: String,
      default: '#00e3dc'
    },

  },
  mounted() {
    if (this.id) {
      this.start(this.id, this.stop, this.startColor, this.endColor)
    }
  },
  methods: {
    start(id, value, startColor, endColor) {
      var bar = new ProgressBar.Circle('#' + id, {
        color: '#aaa',
        strokeWidth: 17,
        trailWidth: 17,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        from: { color: startColor },
        to: { color: endColor },
        step: function (state, circle) {
          circle.path.setAttribute('stroke', state.color);
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value.toLocaleString("fa-EG") + '%');
          }

        }
      });
      //   bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar.text.style.fontWeight = 'bold';
      bar.text.style.fontSize = '20px';
      bar.text.style.color = '#4f4f4f';

      bar.animate(value);
    }
  }
}
</script>

<style lang="stylus">
.progress
  position relative
  margin 20px
  width 96px
  height 96px
</style>
