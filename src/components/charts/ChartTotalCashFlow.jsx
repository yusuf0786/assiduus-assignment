import * as d3 from "d3";
import React, { useEffect, useRef, useState, useImperativeHandle } from "react";

import { Box, Stack, Typography } from "@mui/material";

function ChartTotalCashFlow({
    data,
    keys,
    svgWidth,
    svgHeight = 284 + 47,
    margin = {
        top: 20, right: 20, bottom: 40, left: 45
    },
    width = svgWidth,
    height = svgHeight - 20 - 20,
}, ref){

    const svgElementRef =  useRef(null)

    const [chartData, setChartData] = useState(data)

        const svg = d3.select(".total-cash-flow-card-body svg").append('svg').attr('width', svgWidth).attr('height', svgHeight);

        const graphArea = svg.append('g').attr('transform', `translate(0, 0)`);

        const x = d3.scaleBand()
        .rangeRound([0, width])
        .domain(chartData.map(d => d.name))
        .padding(0.8);
        
        const y = d3.scaleLinear()
        .range([height, 0])
        .domain([
            d3.min(chartData, d => d.value) - 5,
            d3.max(chartData, d => d.value) + 5
        ]).nice();
        
        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y).ticks(5);
        
        graphArea.append('g').attr('class', 'axis').attr('transform', `translate(0, ${height})`).call(xAxis);
        
        // graphArea.append('g').attr('class', 'axis').call(yAxis);
        
        const rx = 8;
        const ry = 8;

        const color = d3.scaleOrdinal().domain(keys).range(["rgba(71, 183, 71, 1)", "rgba(2, 187, 125, 1)"])

        const stackedData = d3.stack().keys(keys)(chartData)

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

        const updateChart = () => {

            setChartData( currentValue => {
                return currentValue.map( d => {
                    return {
                        name: d.name,
                        value: Math.round(Math.random() * (3 - 7.5 + 1)) + 7.5,
                        value2: Math.round(Math.random() * (3 - 7.5 + 1)) + 7.5,
                    }
                })
            })

            var path = graphArea.selectAll("rect").data(stackedData)
                path.exit().remove()
                path.enter()
                    .data(stackedData)
                    .join("rect")
                    .attr("fill", d => color(d.key))
                    .attr("rect", d => `
                            M${x(d.name)},${y(d.value) + ry}
                            a${rx},${ry} 0 0 1 ${rx},${-ry}
                            h${x.bandwidth() - 2 * rx}
                            a${rx},${ry} 0 0 1 ${rx},${ry}
                            v${height - y(d.value) - ry}
                            h${-(x.bandwidth())}Z
                        `)
                        .attr("x", d => x(d.name))
                        .attr("y", d => y(d[1]))
                        .attr("height", d => y(d[0]) - y(d[1]))
                        .attr("width",x.bandwidth())
        }

        useImperativeHandle(ref, () => {
            return {
                updateFunctionRef: updateChart,
            }
        }, [chartData])
  
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
        <Box className="card-body total-cash-flow-card-body" sx={{padding:"1rem"}}>
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


export default React.forwardRef(ChartTotalCashFlow);