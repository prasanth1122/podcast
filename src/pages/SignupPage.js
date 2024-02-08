import React, { useState } from "react";
import Header from "../components/Common/Header";

import SignupForm from "../components/SignUpComponents/SignupForm";
import LoginForm from "../components/SignUpComponents/LoginForm";
export default function SignUpPage() {
  const [flag, setFlag] = useState(false);
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>Sign Up</h1> : <h1>Login</h1>}
        {!flag ? <SignupForm /> : <LoginForm />}
        {!flag ? (
          <p
            onClick={() => {
              setFlag(!flag);
            }}
          >
            Already have an Account? Click Here to Login.
          </p>
        ) : (
          <p
            onClick={() => {
              setFlag(!flag);
            }}
          >
            Dont't have an Account? Click here to SignUp.
          </p>
        )}
      </div>
    </div>
  );
}
