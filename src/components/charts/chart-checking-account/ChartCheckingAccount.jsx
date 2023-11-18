import * as d3 from "d3";
import {useRef, useEffect, useId, useState} from "react";
import { render } from "react-dom";

import { scaleLinear, scaleBand } from 'd3-scale';
import { XYAxis } from './xy-axis';
import { Line } from './Line';
import { line } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';

import {MenuItem, Select, FormControl, CardContent, CardActions, Card, InputLabel} from '@mui/material';

import {Box, Button, Typography, Stack, Grid} from '@mui/material';

export function ChartCheckingAccount({
  data,
  svgWidth = 0,
  svgHeight = 326.5,
  margins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}) {

  const [accountManage, setAccountManage] = useState("Manage");
  const [accountDate, setAccountDate] = useState("January");

  const [chartData, setChartData] = useState(data)

  const width = svgWidth - margins.left - margins.right;
  const height = svgHeight - margins.top - margins.bottom;

  const ticks = 5;
  const t = transition().duration(1000);

  const xScale = scaleBand()
  .domain(chartData.map(d => d.y))
  .rangeRound([0, width]).padding(0.1);

  const yScale = scaleLinear()
  .domain(extent(chartData, d => d.yvalue))
  .range([height, 0])
  .nice();

  const lineGenerator = d3.line()
  .x(d => xScale(d.y))
  .y(d => yScale(d.yvalue))
  .curve(d3.curveBasis);
  

  const randomData = (e) => {
    // e.preventDefault();
    return chartData.map(d => ({
      x: d.x,
      y: d.y,
      yvalue: Math.floor((Math.random() * 400) + 100),
    }))
  }

  return (
    <>
      <Stack className="card-header" direction="row" justifyContent="space-between" flexWrap="wrap" sx={{boxShadow:1, padding:"1rem"}}>
          <Typography variant="h6" component="h3" fontWeight={700}>Checking account</Typography>
          <Box className="card-interaction" display="flex">
            <FormControl fullWidth sx={{marginRight: "1rem"}}>
              {/* <InputLabel id="demo-simple-select-label">Manage</InputLabel> */}
              <Select
              labelId="account-manage-label"
              id="account-manage-select"
              value={accountManage}
              // label="Manage"
              onChange={e => {
                  setAccountManage(e.target.value)
                  setChartData(
                      e.target.value === "Manage" ? 
                        randomData()
                      : e.target.value === "Value two" ? 
                        randomData()
                      : randomData()
                  )
              }}
              >
                  <MenuItem value={"Manage"}>Manage</MenuItem>
                  <MenuItem value={"Value two"}>Value two</MenuItem>
                  <MenuItem value={"Value three"}>Value three</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
                {/* <InputLabel id="account-date-select-label">January</InputLabel> */}
                <Select
                labelId="account-date-label"
                id="account-date-select"
                value={accountDate}
                // label="January"
                onChange={
                  e => {
                    setAccountDate(e.target.value)
                    setChartData(
                      e.target.value === "January" ? 
                        randomData()
                      : e.target.value === "February" ? 
                        randomData()
                      : randomData()
                    )}
                }
                >
                    <MenuItem value={"January"}>January</MenuItem>
                    <MenuItem value={"February"}>February</MenuItem>
                    <MenuItem value={"March"}>March</MenuItem>
                </Select>
            </FormControl>
          </Box>
      </Stack>
      <Box className="card-body" sx={{padding:"1rem"}}>
        <svg
          className="lineChartSvg"
          width="inherit"
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
          </g>
        </svg>
      </Box>
    </>
  );
}