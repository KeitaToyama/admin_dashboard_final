import { Suspense, useEffect, useState } from 'react'
import './App.css'
import { auth } from "./firebase"
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from "./feature/userSlice";
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Deals from './components/Deals';
import Chart from './components/Chart';

function App() {
  const [count, setCount] = useState(0)
const user = useSelector((state) => state.uid);
const dispatch = useDispatch();


useEffect(() => {
  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      dispatch(
        login({
          uid: authUser.uid,
          displayName: authUser.displayName,

          photo: authUser.photoURL
        })
      );
      
    } else {
      dispatch(logout());
    }
  });
}, [dispatch]);




  return (
    <div className="App">
      {user ? (
        <div className="AppGlass">
          <Sidebar/>

          {/* <Dashboard/> */}
<Routes>

<Route path="/" element={<Dashboard />} />
<Route path="/deals" element={<Deals />}/>
<Route path="/chart" element={<Chart />}/>
</Routes>

      </div> 


      ) : (
<Login/>
      )}
    </div>
  )
}

export default App
