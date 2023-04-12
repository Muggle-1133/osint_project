import React from "react";
import Signup from "../components/Signup";

const SignupPage = ({ setLoginStatus }) => {
  return (
    <>
      <Signup setLoginStatus={setLoginStatus} />
    </>
  );
};

export default SignupPage;
