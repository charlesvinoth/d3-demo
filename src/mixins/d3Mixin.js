import * as d3 from "d3"

const d3Mixin = {
  data() {
    return {
      graphRef: null,
      width: null,
      height: null,
      margin: {
        top: null,
        right: null,
        bottom: null,
        left: null,
      },
      title: null,
    }
  },

  methods: {
    initializeD3(graphRef, graphConfig) {
      if (!graphRef) {
        console.error("Container not found!")
        return
      }

      this.graphRef = graphRef
      this.setGraphConfig(graphConfig)
      this.createSvg()
      this.createGraph()
      this.createTitle()
    },

    setGraphConfig(graphConfig) {
      this.width = graphConfig?.width || 500
      this.height = graphConfig?.height || 500
      this.margin = {
        top: graphConfig?.margin.top || 40,
        right: graphConfig?.margin.right || 40,
        bottom: graphConfig?.margin.bottom || 40,
        left: graphConfig?.margin.left || 40,
      }
      this.title = graphConfig?.title || "Graph"
    },

    createSvg() {
      d3.select(this.graphRef)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("transform", "translate(0, 0)")
        .style("border", "1px solid var(--gray-200)")
    },

    createGraph() {
      const width = this.width - this.margin.left - this.margin.right
      const height = this.height - this.margin.top - this.margin.bottom

      d3.select(`svg`)
        .append("g")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
        .style("border", "2px solid var(--blue-600)")
    },

    createTitle() {
      d3.select(this.graphRef)
        .select("svg")
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .text(this.title)
    },
  },
}

export default d3Mixin
