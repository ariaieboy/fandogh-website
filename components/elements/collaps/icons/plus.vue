<template>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" width="20px" >
  <defs>
    <style>
      .cls-1 {
        fill: none;
        stroke: #4f4f4f;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-miterlimit: 10;
      }
      .active {
        stroke: #296bdd;
      }
    </style>
  </defs>
  <g id="ic_sAdd" transform="translate(-1 -1)">
    <line id="Line_16" data-name="Line 16" class="cls-1" :class="{active:open}" y2="16" transform="translate(9.5 1.5)"/>
    <line id="Line_17" data-name="Line 17" class="cls-1"  :class="{active:open}" x2="16" transform="translate(1.5 9.5)"/>
  </g>
</svg>

</template>

<script>
  export default {
    props:{
      open:{
        type:Boolean,
        default:false
      }
    },
    name:'icon'
        
  }
</script>

<style scoped>

</style>