<template>
  <div ref="graph">
    <!-- <svg width="500" height="500" view-box="0 0 100 100">
      <rect
        x="40"
        y="40"
        width="420"
        height="420"
        fill="none"
        stroke="blue"
        stroke-width="2"
      ></rect>
      <text x="250" y="26" text-anchor="middle" font-size="16" fill="black">Two Points</text>
      <text x="250" y="484" text-anchor="middle" font-size="16" fill="black">X</text>
      <text x="20" y="256" text-anchor="middle" font-size="16" fill="black">Y</text>
      <line
        v-for="i in 20"
        :key="i"
        :x1="40 + i * 21"
        :y1="42"
        :x2="40 + i * 21"
        :y2="458"
        stroke="lightgray"
        stroke-width="1"
      ></line>
      <line
        v-for="i in 20"
        :key="i"
        :x1="42"
        :y1="40 + i * 21"
        :x2="458"
        :y2="40 + i * 21"
        stroke="lightgray"
        stroke-width="1"
      ></line>
      <line x1="42" y1="250" x2="458" y2="250" stroke="blue" stroke-width="2"></line>
      <line x1="250" y1="42" x2="250" y2="458" stroke="blue" stroke-width="2"></line>
    </svg> -->
  </div>
</template>

<script>
import { initializeD3 } from "@/lib/d3Graph"

export default {
  name: "TwoPointsPage",

  data() {
    return {
      graphConfig: {
        gridType: "coordinate",
        width: 500,
        height: 500,
        title: "Two Points",
        vLines: 22,
        hLines: 22,
        outerLineWeight: 3,
        outerLineColor: "var(--blue-700)",
        innerLineWeight: 1,
        innerLineColor: "var(--gray-200)",
        xAxis: {
          startPoint: -10,
          increment: 1,
          title: "x",
        },
        yAxis: {
          startPoint: -10,
          increment: 1,
          title: "y",
        },
        pointRules: {
          minimumPoints: 1,
          maximumPoints: 2,
        },
      },
    }
  },

  mounted() {
    initializeD3(this.$refs.graph, this.graphConfig)
  },
}
</script>

<style scoped>
svg {
}
</style>
