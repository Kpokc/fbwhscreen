import React, {useState} from 'react';
import NavBar from '../Navbar';
import Board from '../Board/board';
import LogIn from '../LogIn';
import Logout from '../Loout';
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

  function logOut() {
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
      <div className="c">
          <LogIn logIn={logIn}/>
      </div>
      
      // <button onClick={() => logIn()}>LogIn</button>
    );
  };

  if (user){
    return (
    
      <div className="container-fluid">
        <NavBar />
        <Board />
        <Logout logOut={logOut}/>
      </div>
    );
  };
};

export default App;
