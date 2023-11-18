import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";

export function ChartInvoiceOwed({
    data,
    svgWidth = 0,
    svgHeight = 331.5,
    margin = {
        top: 20, right: 20, bottom: 40, left: 45
    },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom,
}){

  const ref =  useRef(null)

  useEffect(() => {
    
  const svg = d3.select(ref.current).append('svg').attr('width', svgWidth).attr('height', svgHeight);
  
  const graphArea = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const x = d3.scaleBand().rangeRound([0, width]).domain(data.map(d => d.name)).padding(0.7);
  
  const y = d3.scaleLinear()
    .range([height, 0])
    .domain([
      d3.min(data, d => d.value) - 5,
      d3.max(data, d => d.value) + 5
    ]).nice();
  
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).ticks(5);
  
  graphArea.append('g').attr('class', 'axis').attr('transform', `translate(0, ${height})`).call(xAxis);
  
  // graphArea.append('g').attr('class', 'axis').call(yAxis);
  
  const rx = 8;
  const ry = 8;
  
  graphArea
     .selectAll("bar")
     .data(data)
     .enter().append("path")
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

    return (
      <>
      <Stack className="card-header" direction="row" justifyContent="space-between" flexWrap="wrap" sx={{boxShadow: 1, padding:"1rem"}}>
        <Typography variant="h6" component="h3" fontWeight={700}>Invoices owed to you</Typography>
        <Box className="card-interaction" display="flex">
          <Button variant="outlined" disableElevation>New Sales Invoice</Button>
        </Box>
      </Stack>
      <Box className="card-body" sx={{padding:"1rem"}}>
        <svg
          ref={ref}
          width="inherit"
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        ></svg>
      </Box>
      </>
    )

}