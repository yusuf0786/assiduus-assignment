import React, {useEffect, useState, useRef, useImperativeHandle} from "react";
import {CardContent, Card} from '@mui/material';

import {Grid} from '@mui/material';

// chart components import
import ChartCheckingAccount from "../../components/charts/chart-checking-account/ChartCheckingAccount"
import ChartInvoiceOwed from "../../components/charts/ChartInvoiceOwed"
import ChartTotalCashFlow from "../../components/charts/ChartTotalCashFlow"
import { AccountWatchlistTable } from "../../components/table/AccountWatchlistTable";

const lineChartData = [
    {'x': 75.6, 'y': 9, 'yvalue': 1.8},
    {'x': 151.2, 'y': 10, 'yvalue': 1.85},
    {'x': 226.8, 'y': 11, 'yvalue': 1.9},
    {'x': 302.4, 'y': 12, 'yvalue': 1.8},
    {'x': 378, 'y': 13, 'yvalue': 1.75},
    {'x': 453.6, 'y': 14, 'yvalue': 1.8},
    {'x': 529.2, 'y': 15, 'yvalue': 1.85},
    {'x': 604.8, 'y': 16, 'yvalue': 1.8},
    {'x': 680.4, 'y': 17, 'yvalue': 1.75},
    {'x': 756, 'y': 18, 'yvalue': 1.8}
]

const invoiceOwedData = [
    { name: "Older", value: 20},
    { name: "Jan 1", value: 30 },
    { name: "Jan 2", value: 50 },
    { name: "Jan 3", value: 40},
    { name: "Jan 4", value: 45},
    { name: "Future", value: 30}
]

const totalCashFlowData = [
    { name: "Older", "value": 5, "value2": 5},
    { name: "Jan 1", "value": 6, "value2": 2 },
    { name: "Jan 2", "value": 7, "value2": 3 },
    { name: "Jan 3", "value": 6.5, "value2": 1},
    { name: "Jan 4", "value": 6, "value2": 3},
    { name: "Future", "value": 6, "value2": 6}
]

const totalCashFlowDataKeys = [
    "value",
    "value2",
]

function Dashboard(props, ref) {

    const chaartDataUpdateFunction = useRef()

    const cardContentElement = useRef()
    const chartCheckingAccountRef = useRef()
    const chartInvoiceOwedRef = useRef()
    const chartTotalCashFlowRef = useRef()

    const [chartWidth, setChartWidth] = useState(0);


    const cardComponents = [
        {component: <ChartCheckingAccount ref={chartCheckingAccountRef} data={lineChartData} svgWidth={chartWidth} />},
        {component: <ChartInvoiceOwed ref={chartInvoiceOwedRef} data={invoiceOwedData} svgWidth={chartWidth} />},
        {component: <ChartTotalCashFlow ref={chartTotalCashFlowRef} data={totalCashFlowData} keys={totalCashFlowDataKeys} svgWidth={chartWidth}/>},
        {component: <AccountWatchlistTable />},
    ]

    const componentUpdateFunc = () => {
        chartInvoiceOwedRef.current.updateFunctionRef()
        chartTotalCashFlowRef.current.updateFunctionRef()
        chartCheckingAccountRef.current.updateFunctionRef()
    }

    useEffect(() => {
        setChartWidth(cardContentElement.current.offsetWidth)
    })

    useImperativeHandle(ref, () => {
      return {
        chartDataupdateFunction: componentUpdateFunc
      }
    }, [])

    return (
        <> 
          <Grid container spacing={{ xs:2, md:5 }}>
          {cardComponents.map( (item, index) => {
          return (
              <Grid key={index} item xs={12} lg={6} className="card-container">
                  <Card sx={{background: "#fff", boxShadow:0, borderRadius: "12px"}}>
                      <CardContent ref={cardContentElement} sx={{padding:"0 !important"}}>
                          {item.component}
                      </CardContent>
                  </Card>
              </Grid>
          )
          })}
          </Grid>
        </>
    )
}

export default React.forwardRef(Dashboard)