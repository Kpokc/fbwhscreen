import React, {useState} from 'react';
import NavBar from '../Navbar';
import Board from '../Board/board';
import LogIn from '../LogIn';
import { getAuth, signInWithEmailAndPassword, signOut  } from "firebase/auth";

import './App.css';


function App() {

  const [user, setUser] = useState(sessionStorage.getItem("logged_user"));

  const auth = getAuth();

  function logIn(){
    signInWithEmailAndPassword(auth, "test1@test.com", 123456)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        window.sessionStorage.setItem("logged_user", user.email)
        setUser(sessionStorage.getItem("logged_user"));
        //console.log(user.email)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  }

  function logOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      window.sessionStorage.removeItem("logged_user");
      setUser(sessionStorage.getItem("logged_user"));
    }).catch((error) => {
      // An error happened.
    });
  };

  if(!user){
    return (
      <button onClick={() => logIn()}>LogIn</button>
    );
  };

  if (user){
    return (
    
      <div className="container-fluid">
        {/* <button >Log out</button> */}
        <NavBar />
        <Board />
        <div className="navigation">
          <a className="button" onClick={() => logOut()}>
          <div><i className="fas fa-sign-out-alt fa-2x"></i></div>
          <div className="logout">LOGOUT</div>
          </a>
        </div>

      </div>
    );
  };
};

export default App;
