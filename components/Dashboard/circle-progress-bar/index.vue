<template>
  <div class="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart orange">
        <defs>
    <linearGradient id="lgrad" x1="0%" y1="100%" x2="100%" y2="0%" > 
<stop offset="0%" style="stop-color:rgb(254,166,172);stop-opacity:1" />
<stop offset="100%" style="stop-color:rgb(248,96,142);stop-opacity:1" />
</linearGradient> 

  </defs>

      <path class="circle-bg" fill="none"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle" stroke="url(#lgrad)"
        :stroke-dasharray="percent+', 100'"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">{{percent}}%</text>
    </svg>
  </div>
  
</template>

<script>
  export default {
    props : {
      percent : {
        type : String , 
        default : 60
      }
    }
  }
</script>

<style lang="stylus" scoped>
.single-chart {
  width: 100%;
}

.circular-chart {
  display: block;
  margin: 10px auto;
  max-width:100%;
  max-height: 250px;
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 4;
}

.circle {
  fill: none;
  stroke-linecap: square;
  stroke-width: 3.8;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

.circular-chart.orange .circle {
}


.percentage {
  fill: #666;
  font-family: sans-serif;
  font-size: 0.5em;
  text-anchor: middle;
}
</style>