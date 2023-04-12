import React from "react";
import UserProfile from "../components/UserProfile";

const UserPage = ({ setLoginStatus }) => {
  return (
    <>
      <UserProfile setLoginStatus={setLoginStatus} />
    </>
  );
};

export default UserPage;
