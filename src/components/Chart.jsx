import React, { Suspense, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { db, auth } from '../firebase';
import { collection, onSnapshot, query, doc, setDoc} from 'firebase/firestore';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const Chart = () => {
  const [deals, setDeals] = useState([])

  const q = query(collection(db, "deals"))
useEffect(() => {
  onSnapshot(q, (querySnapshot) => {
    const dealsResults = [];
    querySnapshot.docs.forEach((doc) => 
    dealsResults.push({
      id: doc.id,
      reception: doc.data().reception,
      price: doc.data().price,
      date: doc.data().date,
      
    })
    )
    setDeals(dealsResults);
  })
}, [])
// console.log(deals)

// 現在の日付を取得
let currentDate = new Date();
let week = []

// 7日前の日付を計算
for (let i = 0; i <= 6; i++) {
  
  let pastDate = new Date(currentDate.getTime());
  pastDate.setDate(currentDate.getDate() - i);
  let day = pastDate.toLocaleString().slice(0, -8)
  let filtered = deals.filter(obj => obj.date.startsWith(day))
  // console.log(filtered)

  let sum = 0;

  for (let i = 0; i < filtered.length; i++) {
    sum += filtered[i].price;
  }
  // console.log(sum)
  week.push({date: day, total: sum})
  

}
console.log(week)

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
  return (
    <Div>
      <ResponsiveContainer width="75%" height="75%">
      <AreaChart
          width={500}
          height={400}
          data={week.reverse()}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis  />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        </ResponsiveContainer>
    </Div>
  )
}

const Div = styled.div`
    
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    
`

export default Chart