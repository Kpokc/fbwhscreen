import NavBar from '../Navbar';
import Board from '../Board/board';
import './App.css';

import firebase from "firebase/compat/app"
import * as firebaseui from 'firebaseui'

;

function App() {

  //var ui = new firebaseui.auth.AuthUI(firebase.auth());
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
  
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        console.log(authResult)
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID

    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);
  return (
    
    <div className="container-fluid">
      <NavBar />
      <Board />
    </div>
  );
}

export default App;
