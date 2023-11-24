import React, { useImperativeHandle } from "react";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";

import {ModalComponent} from "../modal/ModalComponent";

function ChartInvoiceOwed({
    data,
    svgWidth,
    svgHeight = 284,
    margin = {
        top: 20, right: 20, bottom: 40, left: 45
    },
    width = svgWidth,
    height = svgHeight - margin.top - margin.bottom,
}, ref){

  const svgElementRef =  useRef(null)

  const updateFunctionRef = useRef()

  const [chartData, setChartData] = useState(data)

  const svg = d3.select(".chart-invoice-owed-card-body svg").attr('width', svgWidth).attr('height', svgHeight);

  const isChartContainerDontExists = svg.selectAll(".chart-container").empty()
  !isChartContainerDontExists && (svg.select('.chart-container').remove())

  const graphArea = svg.append('g').attr('transform', `translate(${margin.left - margin.left}, ${30})`).attr('class', 'chart-container')

  const x = d3.scaleBand().rangeRound([0, width]).domain(chartData.map(d => d.name)).padding(0.8);

  const y = d3.scaleLinear()
    .range([height, 0])
    .domain([
      d3.min(chartData, d => d.value) - 5,
      d3.max(chartData, d => d.value) + 5
    ]).nice();

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).ticks(5);

  const rx = 8;
  const ry = 8;

  useEffect(() => {
    graphArea.append('g').attr('class', 'axis').attr('transform', `translate(0, ${height})`).call(xAxis).attr('class', 'x-axis-line');

    // graphArea.append('g').attr('class', 'axis').call(yAxis);

    graphArea
    .selectAll("bar")
    .data(chartData)
    .enter()
    .append("path").attr('class', 'path')
    .style("fill", "rgba(71, 183, 71, 1)")
    .attr("d", item => `
        M${x(item.name)},${y(item.value) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${x.bandwidth() - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - y(item.value) - ry}
        h${-(x.bandwidth())}Z
    `);
  })

  const updateChart = () => {

    setChartData(currentValue => {
      return currentValue.map((d) => ({
        name: d.name,
        value: Math.round(Math.random() * (50 - 10 + 1)) + 10,
      }))
    })

    const chartContainer = svg.selectAll(".chart-container")
    chartContainer.remove()

    var xAxizLine = graphArea.selectAll(".x-axis-line")
    xAxizLine.remove()

    var path = graphArea.selectAll(".path")
    path.remove()

  }

  useImperativeHandle(ref, () => {
    return {
      updateFunctionRef: updateChart,
    }
  }, [chartData])

    return (
      <>
        <Stack className="card-header" direction="row" justifyContent="space-between" flexWrap="wrap" sx={{boxShadow: 1, padding:"1rem"}}>
          <Typography variant="h6" component="h3" fontWeight={700}>Invoices owed to you</Typography>
          <Box className="card-interaction" display="flex">
            <ModalComponent
              modalBodyMaxHeight={225}
              btn={{variant:"outlined", disableElevation:true, value:"New Sales Invoice"}}
              head={{text:"Upload a File"}}
              btnUpload={{text:"Upload file"}}
              btnCancel={{text:"Cancel"}}
              btnSubmit={{text:"Submit"}}
              />
          </Box>
        </Stack>
        <Box className="card-body chart-invoice-owed-card-body" sx={{padding:"1rem"}}>
          <svg
            ref={svgElementRef}
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          ></svg>
        </Box>
      </>
    )

}

export default React.forwardRef(ChartInvoiceOwed)