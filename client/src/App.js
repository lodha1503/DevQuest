import React, { useEffect } from 'react'
import './App.css';
import Header from './Header/Header';
import { BrowserRouter as Router, Routes ,Route} from "react-router-dom";
import Home from './Home/Home'
import Checkout from './CheckOut/Checkout'
import Login from './Authentication/Login'
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Dummy from './Services/Search/Dummy';




function App() {
  //Listner keeps track of who is signed In
  const [{},dispatch]=useStateValue();



  useEffect(()=>{
    //Will only run once App component loads.
    auth.onAuthStateChanged(authUser=>{
      // console.log('The user is ',{authUser});

      if(authUser)
      {
        //User just logged in / The user was logged in
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      }
      else
      {
        //User is logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  },[])


  return (
    <Router>
      
      <div className="app">
        <Routes>
          <Route path='/api/products/title/:title' element={[<Dummy/>]}></Route>
          <Route path='/login' element={[<Login/>]}></Route>
          <Route path='/checkout' element={[<Header/>,<Checkout/>]} />
          <Route path='/' element={[<Header/>,<Home/>]} />
          
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
