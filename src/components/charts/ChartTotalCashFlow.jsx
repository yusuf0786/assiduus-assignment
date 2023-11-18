import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { Box, Stack, Typography } from "@mui/material";

export function ChartTotalCashFlow({
    data,
    keys,
    svgWidth = 350,
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
        
        const x = d3.scaleBand()
        .rangeRound([0, width])
        .domain(data.map(d => d.name))
        .padding(0.7);
        
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

        const color = d3.scaleOrdinal().domain(keys).range(["rgba(71, 183, 71, 1)", "rgba(2, 187, 125, 1)"])

        const stackedData = d3.stack().keys(keys)(data)
        
        graphArea
            .append("g")
            .selectAll("g")
            .data(stackedData)
            .join("g")
            .attr("fill", d => color(d.key))
            .selectAll("rect")
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(d => d)
            .join("rect")
            .attr("rect", d => `
                M${x(d.data.name)},${y(d.data.value) + ry}
                a${rx},${ry} 0 0 1 ${rx},${-ry}
                h${x.bandwidth() - 2 * rx}
                a${rx},${ry} 0 0 1 ${rx},${ry}
                v${height - y(d.data.value) - ry}
                h${-(x.bandwidth())}Z
            `)
                .attr("x", d => x(d.data.name))
                .attr("y", d => y(d[1]))
                .attr("height", d => y(d[0]) - y(d[1]))
                .attr("width",x.bandwidth())
    })
  
    return (
        <>
        <Stack className="card-header" direction="row" justifyContent="space-between" flexWrap="wrap" sx={{boxShadow:1, padding:"1rem"}}>
            <Typography variant="h6" component="h3" fontWeight={700}>Total cash flow</Typography>
            <Box className="card-interaction" display="flex">
                <Box display="flex" alignItems="center" marginRight="0.5rem">
                    <Box className="total-cash-interaction-color" sx={{backgroundColor: "rgba(2, 187, 125, 1)"}}></Box>
                    <Typography variant="body1">In </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Box className="total-cash-interaction-color" sx={{backgroundColor: "rgba(71, 183, 71, 1)"}}></Box>
                    <Typography variant="body1">Out </Typography>
                </Box>
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