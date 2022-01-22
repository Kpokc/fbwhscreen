import React from "react";

import './logout.css'

function Logout({logOut}) {

      return (
        <div className="navigation">
            <a className="button" onClick={logOut}>
            <div><i className="fas fa-sign-out-alt fa-2x"></i></div>
            <div className="logout">LOGOUT</div>
            </a>
        </div>
      );

};

export default Logout;