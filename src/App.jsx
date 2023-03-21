import { Suspense, useEffect, useState } from 'react'
import './App.css'
import { db, auth } from "./firebase"
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from "./feature/userSlice";
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Deals from './components/Deals';
import Chart from './components/Chart';
import { collection, onSnapshot, query, doc, setDoc} from 'firebase/firestore';


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

// 取引取得
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


  return (
    <div className="App">
      {user ? (
        <div className="AppGlass">
          <Sidebar/>

          {/* <Dashboard/> */}
<Routes>

<Route path="/" element={<Dashboard deals={deals} />} />
<Route path="/deals" element={<Deals deals={deals} />}/>
<Route path="/chart" element={<Chart deals={deals} />}/>
</Routes>

<div className='mobileLogout'
onClick={() => auth.signOut()}>
<span>ログアウト</span>
</div>

      </div> 


      ) : (
<Login/>
      )}
    </div>
  )
}

export default App
