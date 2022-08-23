/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/void-dom-elements-no-children */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (

    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <div className="logInPage">
        <img src="../SeshLogo.png" alt="logo" />
        <button type="button" className="btn btn-primary btn-lg copy-btn" onClick={signIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Signin;
