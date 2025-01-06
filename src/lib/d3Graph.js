import * as d3 from "d3"

let graphRef = null
let graphConfig = {
  gridType: "coordinate",
  width: 500,
  height: 500,
  margin: { top: 40, right: 40, bottom: 40, left: 40 },
  title: "Title",
  vLines: 22,
  hLines: 22,
  titleFontSize: "16px",
  outerLineWeight: 3,
  outerLineColor: "var(--blue-600)",
  innerLineWeight: 1,
  innerLineColor: "var(--gray-200)",
  axisLineColor: "var(--pink-600)",
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
}
let xScale = null
let yScale = null
const points = []

/**
 * Initializes a D3.js graph. It takes two parameters: ref (a DOM reference) and config
 * (configuration settings). If the ref is not found, it logs an error and exits. Otherwise, it
 * updates the global graphRef and graphConfig variables with the provided values and then renders the graph.
 *
 * @param {HTMLElement} ref The DOM element that the graph should be rendered in.
 * @param {Object} config Configuration options for the graph.
 */
function initializeD3(ref, config) {
  if (!ref) {
    console.error("Container not found!")
    return
  }

  graphRef = ref
  // Update the global graphConfig object by merging the provided config object with it.
  // If the provided config object has any properties that are not already on the graphConfig
  // object, they will be added. If the provided config object has any properties that are already
  // on the graphConfig object, they will overwrite the existing values.
  graphConfig = Object.assign(graphConfig, config)

  createSvg()
  createTitle()
  createGrid()

  d3.select("svg").on("click", handleClick)
}

/**
 * This function creates an SVG element within the DOM element referenced by graphRef and sets its
 * width, height, view box, and border style using the D3.js library. The dimensions and styles are
 * determined by the graphConfig object.
 */
function createSvg() {
  d3.select(graphRef)
    .append("svg")
    .attr("width", graphConfig.width)
    .attr("height", graphConfig.height)
    .attr("view-box", "0 0 100 100")
    .style("border", "1px solid var(--gray-100)")
    .append("g")
    .attr("id", "graph")
    .attr("transform", `translate(${graphConfig.margin.left}, ${graphConfig.margin.top})`)
}

/**
 * This function creates a title text element in an SVG element using the D3.js library.
 * The title is centered horizontally at the top of the graph, with a font size, weight,
 * and color specified by the graphConfig object.
 */
function createTitle() {
  const x = graphConfig.width / 2
  const y = graphConfig.margin.top - 10

  d3.select("svg")
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("text-anchor", "middle")
    .attr("font-size", graphConfig.titleFontSize)
    .style("font-weight", "bold")
    .text(graphConfig.title)
}

function calculateDomain() {
  const startPoint = graphConfig.xAxis.startPoint

  if (graphConfig.gridType === "coordinate") {
    const domainStart = startPoint - 1 // add 1 for the left outer line
    const domainEnd = startPoint * -1 + 1 // invert the number and add 1 for the right outer line
    return [domainStart, domainEnd]
  }

  if (graphConfig.gridType === "oneQuadrant") {
    const domainStart = startPoint
    const domainEnd = graphConfig.vLines
    return [domainStart, domainEnd]
  }
}

function getZeroTickPosition() {
  if (graphConfig.gridType === "coordinate") {
    return graphConfig.xAxis.startPoint * -1 + 2 // invert the number and add 2 to get 0th position
  }

  if (graphConfig.gridType === "oneQuadrant") {
    return 1
  }
}

function createArrow() {
  const arrowSize = 4

  d3.select("g#graph")
    .append("defs")
    .append("marker")
    .attr("id", "arrow")
    .attr("viewBox", [0, 0, 24, 24])
    .attr("refX", 20)
    .attr("refY", 12)
    .attr("markerWidth", arrowSize)
    .attr("markerHeight", arrowSize)
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr(
      "d",
      "m4.497 20.835l16.51-7.363c1.324-.59 1.324-2.354 0-2.944L4.497 3.164c-1.495-.667-3.047.814-2.306 2.202l3.152 5.904c.245.459.245 1 0 1.458l-3.152 5.904c-.74 1.388.81 2.87 2.306 2.202",
    )
    .attr("fill", graphConfig.axisLineColor)
    .attr("stroke", graphConfig.axisLineColor)
}

function createGrid() {
  const width = graphConfig.width - graphConfig.margin.left - graphConfig.margin.right
  const height = graphConfig.height - graphConfig.margin.top - graphConfig.margin.bottom

  // create scales

  const [domainStart, domainEnd] = calculateDomain()

  xScale = d3.scaleLinear().domain([domainStart, domainEnd]).range([0, width])
  const xAxis = d3.axisBottom(xScale).ticks(graphConfig.vLines).tickSize(0).tickPadding(4)

  d3.select("g#graph")
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height / 2})`)
    .call(xAxis)

  yScale = d3.scaleLinear().domain([domainEnd, domainStart]).range([0, height])
  const yAxis = d3.axisLeft(yScale).ticks(graphConfig.vLines).tickSize(0).tickPadding(4)

  d3.select("g#graph")
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${width / 2}, 0)`)
    .call(yAxis)

  // create grid lines

  d3.selectAll(".x-axis .tick line")
    .attr("y2", height)
    .attr("transform", `translate(0, -${width / 2})`)
    .attr("stroke", graphConfig.innerLineColor)
    .attr("stroke-width", graphConfig.innerLineWeight)

  d3.selectAll(".y-axis .tick line")
    .attr("x2", height)
    .attr("transform", `translate(-${width / 2}, 0)`)
    .attr("stroke", graphConfig.innerLineColor)
    .attr("stroke-width", graphConfig.innerLineWeight)

  // remove boundary tick labels

  d3.select(".x-axis .tick:first-of-type text").remove()
  d3.select(".x-axis .tick:last-of-type text").remove()

  d3.select(".y-axis .tick:first-of-type text").remove()
  d3.select(".y-axis .tick:last-of-type text").remove()

  // remove 0th tick label

  const zeroTickPosition = getZeroTickPosition()
  d3.select(`.x-axis .tick:nth-of-type(${zeroTickPosition}) text`).remove()
  d3.select(`.y-axis .tick:nth-of-type(${zeroTickPosition}) text`).remove()

  // change axis line

  d3.select(".x-axis .domain").attr("stroke", "transparent")
  d3.select(".y-axis .domain").attr("stroke", "transparent")

  // create outer lines

  d3.select("g#graph")
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("stroke", graphConfig.outerLineColor)
    .attr("stroke-width", graphConfig.outerLineWeight)

  // create arrow

  createArrow()

  // create axis lines

  d3.select("g#graph")
    .append("line")
    .attr("x1", width / 2)
    .attr("y1", 0)
    .attr("x2", width / 2)
    .attr("y2", height)
    .attr("stroke", "var(--pink-600)")
    .attr("stroke-width", graphConfig.outerLineWeight)
    .attr("marker-start", "url(#arrow)")
    .attr("marker-end", "url(#arrow)")

  d3.select("g#graph")
    .append("line")
    .attr("x1", 0)
    .attr("y1", height / 2)
    .attr("x2", width)
    .attr("y2", height / 2)
    .attr("stroke", "var(--pink-600)")
    .attr("stroke-width", graphConfig.outerLineWeight)
    .attr("marker-start", "url(#arrow)")
    .attr("marker-end", "url(#arrow)")
}

function isWithinBoundry(x, y) {
  const isXWithinBoundry =
    x >= graphConfig.margin.left && x < graphConfig.width - graphConfig.margin.right
  const isYWithinBoundry =
    y >= graphConfig.margin.top && y < graphConfig.width - graphConfig.margin.right

  return isXWithinBoundry && isYWithinBoundry
}

function getPointPosition(x, y) {
  const domainX = xScale.invert(x - graphConfig.margin.left)
  const domainY = yScale.invert(y - graphConfig.margin.top)

  const scaleX = xScale(Math.round(domainX))
  const scaleY = yScale(Math.round(domainY))

  const cx = scaleX + graphConfig.margin.left
  const cy = scaleY + graphConfig.margin.top

  return [cx, cy]
}

function handleClick(event) {
  if (points.length >= graphConfig.pointRules.maximumPoints) return

  const [x, y] = d3.pointer(event)
  if (!isWithinBoundry(x, y)) return

  const [cx, cy] = getPointPosition(x, y)

  points.push({ x: cx, y: cy })
  createPoints()
  connectPoints()
}

function handleDrag(event) {
  const { x, y } = event
  if (!isWithinBoundry(x, y)) return

  const [cx, cy] = getPointPosition(x, y)

  event.subject.x = cx
  event.subject.y = cy
  createPoints()
  connectPoints()
}

function createPoints() {
  const drag = d3.drag().on("drag", handleDrag)

  d3.select("svg")
    .selectAll("circle")
    .data(points)
    .join("circle")
    .attr("id", "point")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 8)
    .attr("fill", "var(--green-600)")
    .attr("stroke", "var(--green-600)")
    .attr("stroke-width", 16)
    .attr("stroke-opacity", 0.2)
    .on("click", (e) => e.stopPropagation())
    .call(drag)
}

function connectPoints() {
  d3.selectAll("path#connection").remove()

  const lineGenerator = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y)

  const pathData = lineGenerator(points)

  d3.select("svg")
    .append("path")
    .attr("id", "connection")
    .attr("d", pathData)
    .attr("fill", "none")
    .attr("stroke", "var(--green-600)")
    .attr("stroke-width", 3)
}

export { initializeD3 }
