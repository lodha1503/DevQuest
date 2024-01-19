import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import './Login.css';
import {auth} from "../firebase";






function Login() {
  const navigate = useNavigate(); //Allows us to programmatically change the url after registration
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const signIn = e =>{
    e.preventDefault();
    
    auth
      .signInWithEmailAndPassword(email,password)
      .then(auth=>{
        navigate('/');
      })
      .catch(error=>alert(error.message))
  }

  

  const Register = e =>{
    e.preventDefault();
    
    auth
    .createUserWithEmailAndPassword(email,password).then((auth)=>{
      // it successfully created a new user with email and password if every thing goes right.
      console.log(auth);
      if(auth){   //object has true in it if new user is created . Check the object in console section
        
        navigate('/');
      }
    })
    .catch(error => alert(error.message))
  }

  const openeye = () => {
    const x = document.getElementById("hands");
    const y = document.getElementById("animcon");
    y.style.backgroundImage = "url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey.gif)";
    x.style.marginTop = "110%";
  };

  const closeye = () => {
    const x = document.getElementById("hands");
    const y = document.getElementById("animcon");
    y.style.backgroundImage = "url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey_pwd.gif)";
    x.style.marginTop = "0%";
  };

  
  // return (

  //   <div className='login'>
  //     <Link to='/'>
  //       <img className='login_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt="" />
  //     </Link>

  //     <div className="login_container">
  //       <h1>Sign-In</h1>
  //       <form >
  //         <h5>E-mail</h5>
  //         <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

  //         <h5>Password</h5>
  //         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

  //         <button className='login_SignInButton' type='submit' onClick={signIn}>Sign In</button>
  //       </form>

  //       <p>
  //         By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale.Please see our Privacy Notice , our Cookies Notice and our Intereset-Based Ads Notice.
  //       </p>

  //       <button className='login_RegisterButton' type='submit' onClick={Register}>Register Now</button>
  //     </div>
  //   </div>
  // )
  return (
    <div className="App">
      <div className="maincontainer">
        <div className="monkeylogin">
          <div className="animcon" id="animcon">
            <img id="hands" src="https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/hands.png" />
          </div>
          <div className="formcon">
            <form>
              <input type="email" id="mail" name="" onClick={openeye} className="tb" placeholder="Email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)} />
              <br />
              <br />
              <input type="password" id="pwdbar" onClick={closeye} name="pwd" className="tb" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
              <br />
              <br />
              <input type="submit" name="" className="sbutton" value="L O G I N" onClick={signIn}/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
