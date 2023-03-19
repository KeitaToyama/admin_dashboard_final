import React, { useState } from 'react'
import { DensityMedium } from '@mui/icons-material';
import styled from "styled-components"
import HomeIcon from '@mui/icons-material/Home';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { auth } from '../firebase';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Sidebar = () => {

  const userName = useSelector((state) => state.uid.displayName)
  
  const userPhoto = useSelector((state) => state.uid.photo)
  
    const [expanded, setExpaned] = useState(false)

  return (
    <>
    <Div>

<div className="logo">
<LocalFireDepartmentIcon />
<span>ダッシュボード(仮)</span>
</div>

<div className="menu">


  <Link to="/"
  className='menuItem active'
  >
<HomeIcon />
<span>ホーム</span>
</Link>


<Link to="/deals"
className='menuItem active'
>
<PointOfSaleIcon />
<span>取引</span>
  </Link>


<Link to="/chart"
className='menuItem active'
>
<ShowChartIcon />
<span>統計</span>
</Link>


<div className='menuItem' >
  <img 
  src={userPhoto}
  style={{
borderRadius:"60px",width:"100px"
}}
  />
<span>{userName}</span>

<div 
onClick={() => auth.signOut()}>
<ExitToAppIcon style={{ transform: "scale(-1, 1)"}}
/>
<span>ログアウト</span>
</div>

  </div>

</div>


</Div>

    </>
  )
}

const Div = styled.section`

  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 2rem;
  transition: all 300ms ease;
  padding-left: 1rem;

  .logo{
    display: flex;
  height: 5rem;
font-weight: bold;
  font-size: 15px;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 4%;
  }
  .logo > svg{
    font-size: 3rem;
  }
  .menu{
    margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  }
  .menuItem {
    width: 80%;
    display: flex;
  align-items: center;
  gap: 1rem;
  height: 2.5rem;
  margin-left: 2rem;
  position: relative;
  transition: all 300ms ease;
  border-radius: 0.7rem;
  font-size: 14px;
  }
  .menuItem:hover {
  cursor: pointer;
  transition: all 300ms ease;
  margin-left: 2rem;
  
}
.menu .menuItem:last-child {
  position: relative;
  top: 40px;
  right: 40px;
  display: flex;
  flex-direction: column;
}
.active {
  background: var(--activeItem);
  margin-left: 0;
}
.active::before {
  content: "";
  width: 8px;
  height: 100%;
  background: var(--blue);
  margin-right: calc(1rem - 8px);
}
  `

export default Sidebar