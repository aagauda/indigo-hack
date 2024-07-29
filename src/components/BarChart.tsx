"use client"
import React from 'react';
// in this import statement BarChart is being imported as another name as BarGraph which makes our naming clash easy
import { ResponsiveContainer, BarChart as BarGraph, XAxis, YAxis, Bar,Line,LineChart } from 'recharts';


// a sample data for the graph PROPERTY 
const dataProperty = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 }
];

// a sample data for the graph PROPERTY 
const dataSalesSubscription = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 }
];


type ChartOf='PROPERTY' | 'SALES'

type Props = {
  chartName: ChartOf
}

function BarChart(props: Props) {
  return (
    <ResponsiveContainer width={'100%'} height={350}>

      {
        props.chartName === 'PROPERTY'
          ?
          <BarGraph data={dataProperty}>
            <XAxis
              dataKey={'name'}
              tickLine={false}
              axisLine={false}
              stroke='#888888'
              fontSize={12}
            />
            <YAxis
              tickLine={false} // this will show a little dash '-' for the level showing
              axisLine={false}
              stroke='#888888'
              fontSize={12}
              tickFormatter={(value) => `@${value}`}  // this is to add the symbol with the y axis values i will show the @ with every value on y axis
            />
            <Bar
              dataKey={'total'}
              radius={[4, 4, 0, 0]}
              fill='red' // using this we can change the color of the bar chart
            />
          </BarGraph >
          :
          <LineChart data={dataSalesSubscription}>
            <XAxis
              dataKey={'name'}
              tickLine={false}
              axisLine={false}
              stroke='#888888'
              fontSize={12}
            />
            <YAxis
              tickLine={false} // this will show a little dash '-' for the level showing
              axisLine={false}
              stroke='#888888'
              fontSize={12}
              tickFormatter={(value) => `INR-${value}`}  // this is to add the symbol with the y axis values i will show the @ with every value on y axis
            />
            <Line
              dataKey={'total'}
              fill='green' // this is to color the dots of the line charts
              stroke="#8884d8" // this is to change the color of the line of the linechart
            />
          </LineChart >
      }




    </ResponsiveContainer>
  )
}

export default BarChart