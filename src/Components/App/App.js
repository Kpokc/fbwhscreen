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

  async function logIn(username, password){
    
    const result = signInWithEmailAndPassword(auth, username, password)
                  .then((userCredential) => {
                      // Signed in 
                      const user = userCredential.user;
                      // ...
                      window.sessionStorage.setItem("logged_user", user.email)
                      setUser(sessionStorage.getItem("logged_user"));
                      //console.log(user.email)
                      return true;
                  })
                  .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      return false;
                  });

    return await result;
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

      <div className="container-fluid">
          <LogIn logIn={logIn}/>
      </div>
      
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
