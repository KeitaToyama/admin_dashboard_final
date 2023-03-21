import React, { Suspense, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { db, } from '../firebase';
import {  doc, setDoc, deleteDoc} from 'firebase/firestore';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Button from '@mui/joy/Button';
import { DataGrid } from '@mui/x-data-grid';


const Deals = (props) => {
  
  const [SelectionModel, setSelectionModel] = useState([])
  const [isselected, setIsselected] = useState(false)

const [priceinput, setPriceinput] = useState(0);



let deals = props.deals

  const userName = useSelector((state) => state.uid.displayName)

  const columns = [
    { field: 'reception', headerName: '担当', width: 200 },
  { field: 'price', headerName: 'charge', width: 100 },
  { field: 'date', headerName: '日時', width: 130 },
  ]
  
  const rows = deals

  

  return (
    <>
    <Div>




<div className='form' >
  <div className="add">
    <TextField id="filled-basic" label="￥charge" variant="filled" onChange={(e) => setPriceinput(parseInt(e.target.value))} type="number" />

    <Button 
onClick={async () => {
  const date = new Date();
  await setDoc(doc(db,"deals",date.toJSON()),{

  reception: userName,
  price: priceinput,
  date: date.toLocaleString().slice(0, -3)

  

})
  window.location.reload();}}

>
追加
</Button>
</div>
{isselected ? (

  <Button className='delete'
  onClick={() => {
    SelectionModel.map(async (each) => {
      await deleteDoc(doc(db,"deals",each));
      window.location.reload()
    })

  }}
  >削除</Button>
) : (
  <Button disabled >削除</Button>
)}
</div>

<div style={{ height: 500, width: "70%", margin: "20px"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        
        checkboxSelection


        onCellClick={(event) => {
          if (SelectionModel.includes(event.id)) {
            SelectionModel.splice(SelectionModel.indexOf(event.id), 1);
            

          } else {
            SelectionModel.push(event.id)
            
          }
          // console.log(SelectionModel)
          if (SelectionModel.length > 0) {
            setIsselected(true) 
          } else {
            setIsselected(false)
          }
          
          // console.log(isselected)
        }}
        
        rowsPerPageOptions={[5]}
        
      />
    </div>

    </Div>

    </>

  )
}

const Div = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
      align-items: center;
      padding-top: 70px;
  .form {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  align-items: center;

  .add{
    display: flex;
  align-items: center;

    Button{
      margin-left: 20px;
    }
  }
  .delete{
  }
  }

    
    
`

export default Deals