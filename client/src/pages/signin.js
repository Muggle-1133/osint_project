import React from "react";
import SignIn from "../components/Signin";

const SigninPage = ({ loginStat, setLoginStatus }) => {
  return (
    <>
      <SignIn loginStat={loginStat} setLoginStatus={setLoginStatus} />
    </>
  );
};

export default SigninPage;
