// import React, { Component } from "react";

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


// export default class LogIn extends Component {
    
//     render(){

//         const auth = getAuth();
//         signInWithEmailAndPassword(auth, "test@test.com", "123456")
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             // ...
//             console.log(user.displayName)
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//         });


//         if (userName === ""){
//             return (
//                 <>
//                     noooooooo
//                     <h1>Welcome to My Awesome App</h1>
//                     <div id="firebaseui-auth-container"></div>
//                     <div id="loader">Loading...</div>
//                 </>
//             )
//         }

//         if (userName !== "") {
//             return <>Hellllloooo</>
//         }
        
//     }
// }