import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { db, auth } from '../firebase';
// import { collection, onSnapshot, query, doc, setDoc} from 'firebase/firestore';

const Dashboard = (props) => {



let deals = props.deals

let today = new Date();

let yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

let todayStr = today.toLocaleString().slice(0, -8)
let yesterdayStr = yesterday.toLocaleString().slice(0, -8)

let todayDeals = deals.filter(obj => obj.date.startsWith(todayStr))
let yesterDeals = deals.filter(obj => obj.date.startsWith(yesterdayStr))

let todayEarnings = 0;
  for (let i = 0; i < todayDeals.length; i++) {
    todayEarnings += todayDeals[i].price;
  }
  let yesterdayEarnings = 0;
  for (let i = 0; i < yesterDeals.length; i++) {
    yesterdayEarnings += yesterDeals[i].price;
  }


let difference = todayEarnings - yesterdayEarnings;
let percentChange = (difference / yesterdayEarnings) * 100;
let percentStr = (percentChange > 0 ? "+" : "") + percentChange.toFixed(2) + "%";




  return (
    <Div>
      <div className='card'>
        <div className='today'>

        <h3>本日の売り上げ:</h3>
        <h1>¥{todayEarnings}</h1>
        <span>前日比:{percentStr}</span>
        </div>
        </div>

        <div className='card'>
        <div className='notes'>

        <span>お詫び : 取引画面のテーブルはMaterial UIのチェックボックスが上手く機能しなかったため自力でチェック状態の管理を実装しています。</span>
        <span>"全選択"のみ使用不可ですが、ソートや追加、削除は正常に動作しますのでお試しください。
          </span>
        </div>
        </div>
        

    </Div>
  )
}

const Div = styled.div`
padding: 30px;
display: flex;

flex-direction: column;
align-items: center;

gap: 10px;

.card {
  background-color: azure;
  border-radius: 30px;
  width: 70%;
display: flex;

  flex-direction: column;
align-items: center;
.today {
  padding: 20px;
}

.notes {
  padding: 20px;
}

}

`

export default Dashboard