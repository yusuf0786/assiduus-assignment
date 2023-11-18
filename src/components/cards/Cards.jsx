import React, {useEffect, useState, useRef} from "react";
import {CardContent, Card} from '@mui/material';

import {Grid} from '@mui/material';

// chart components import
import {ChartCheckingAccount} from "../charts/chart-checking-account/ChartCheckingAccount"
import {ChartInvoiceOwed} from "../charts/ChartInvoiceOwed"
import {ChartTotalCashFlow} from "../charts/ChartTotalCashFlow"
import { AccountWatchlistTable } from "../table/AccountWatchlistTable";

const lineChartData = [
    { 'x': 75.6, 'y': 9, yvalue: 200 },
    { 'x': 151.2, 'y': 10, yvalue: 130 },
    { 'x': 226.8, 'y': 11, yvalue: 180 },
    { 'x': 302.4, 'y': 12, yvalue: 240 },
    { 'x': 378, 'y': 13, yvalue: 280 },
    { 'x': 453.6, 'y': 14, yvalue: 250 },
    { 'x': 529.2, 'y': 15, yvalue: 200 },
    { 'x': 604.8, 'y': 16, yvalue: 250 },
    { 'x': 680.4, 'y': 17, yvalue: 230 },
    { 'x': 756, 'y': 18, yvalue: 200 },
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
    { name: "Older", value: 5, value2: 5},
    { name: "Jan 1", value: 6, value2: 2 },
    { name: "Jan 2", value: 7, value2: 3 },
    { name: "Jan 3", value: 6.5, value2: 1},
    { name: "Jan 4", value: 6, value2: 3},
    { name: "Future", value: 6, value2: 6}
]

const totalCashFlowDataKeys = [
    "value",
    "value2",
]

export function Cards() {

    const cardContentElement = useRef()

    const [chartWidth, setChartWidth] = useState(0);

    const [chartCheckingAccountData, setChartCheckingAccountData] = useState(lineChartData);
    const [chartInvoiceOwedData, setChartInvoiceOwedData] = useState(invoiceOwedData);
    const [chartTotalCashFlowData, setChartTotalCashFlowData] = useState(totalCashFlowData);

    const cardComponents = [
        {component: <ChartCheckingAccount data={chartCheckingAccountData} svgWidth={chartWidth} />},
        {component: <ChartInvoiceOwed data={chartInvoiceOwedData} svgWidth={chartWidth}/>},
        {component: <ChartTotalCashFlow data={chartTotalCashFlowData} keys={totalCashFlowDataKeys} svgWidth={chartWidth}/>},
        {component: <AccountWatchlistTable />},
    ]

    useEffect(() => {
        setChartWidth(cardContentElement.current.offsetWidth)
    })

    return (
        <Grid container spacing={5}>
        {cardComponents.map( (item, index) => {
        return (
            <Grid key={index} item xs={12} lg={6}>
                <Card sx={{background: "#fff", boxShadow:0, borderRadius: "12px"}}>
                    <CardContent ref={cardContentElement} sx={{padding:0}}>
                        {item.component}
                    </CardContent>
                </Card>
            </Grid>
        )
        })}
        </Grid>
    )
}