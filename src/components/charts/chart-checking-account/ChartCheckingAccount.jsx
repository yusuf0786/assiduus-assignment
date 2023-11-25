import React, { useImperativeHandle } from "react";
import * as d3 from "d3";
import {useRef, useEffect, useState} from "react";

import { scaleLinear, scaleBand } from 'd3-scale';
import { XYAxis } from './xy-axis';
import { Line } from './Line';
import { extent } from 'd3-array';

import {MenuItem, Select, FormControl, Box, Typography, Stack} from '@mui/material';

const manageDropdownItems = ["Manage", "Manage Two", "Manage Three"];
const dateDropdownItems = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novembar", "Decembar"];

function ChartCheckingAccount({
  data,
  svgWidth = 0,
  svgHeight = 284,
  margins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}, ref) {

  const [accountManage, setAccountManage] = useState("Manage");
  const [accountDate, setAccountDate] = useState("January");

  const [chartData, setChartData] = useState(data)

  const width = svgWidth - 30;
  const height = svgHeight - margins.top - margins.bottom;

  const ticks = 5;

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

  const setRandomData = () => {
    setChartData(prevState => randomData(prevState))
  }

  const randomData = (prevState) => {
    return prevState.map(d => ({
      'x': d.x,
      'y': d.y,
      'yvalue': (Math.random() * (2.5 - 0.8 + 0.1) + 0.8).toFixed(1)
    }))
  }

  useImperativeHandle(ref, () => {
    return {
      updateFunctionRef: setRandomData
    }
  })

  return (
    <>
      <Stack className="card-header" direction="row" justifyContent="space-between" flexWrap="wrap" sx={{boxShadow:1, padding:"1rem"}}>
          <Typography marginRight={1} variant="h6" component="h3" fontWeight={700}>Checking account</Typography>
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
                  setRandomData()
              }}
              >{manageDropdownItems.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth>
                {/* <InputLabel id="account-date-select-label">January</InputLabel> */}
                <Select
                labelId="account-date-label"
                id="account-date-select"
                value={accountDate}
                // label="January"
                onChange={e => {
                    setAccountDate(e.target.value)
                    setRandomData()
                  }
                }
                >{dateDropdownItems.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                </Select>
            </FormControl>
          </Box>
      </Stack>
      <Box className="card-body cheking-account-card-body" sx={{padding:"1rem"}}>
        <svg
          className="lineChartSvg"
          width={svgWidth}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`} width={width}>
            <XYAxis {...{ xScale, yScale, height, ticks, width }} />
            <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
          </g>
        </svg>
      </Box>
    </>
  );
}

export default React.forwardRef(ChartCheckingAccount);