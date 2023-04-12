import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import SignupPage from "./pages/signup";
import SigninPage from "./pages/signin";
import UserPage from "./pages/userpage";
import DashboardPage from "./pages/dashboard";
import "./App.css";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  let routes;
  Axios.defaults.withCredentials = true;
  const getUser = sessionStorage.getItem("user_id");

  useEffect(() => {
    if (getUser) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [loginStatus, getUser]);

  if (loginStatus) {
    routes = [
      <React.Fragment key="uniqueId1">
        <Route path="/" exact>
          <Home loginStat={loginStatus} setLoginStatus={setLoginStatus}></Home>
        </Route>
        {/*<Route path="/signin" exact>
          <SigninPage
            loginStat={loginStatus}
            setLoginStatus={setLoginStatus}
          ></SigninPage>
        </Route>/*}
        {/*<Route path="/signup" exact>
              <SignupPage></SignupPage>
        </Route>*/}
        <Route path="/mypage" exact>
          <UserPage setLoginStatus={setLoginStatus}></UserPage>
        </Route>
        <Route path="/dashboard" exact>
          <DashboardPage setLoginStatus={setLoginStatus}></DashboardPage>
        </Route>
      </React.Fragment>,
    ];
  } else if (loginStatus === false) {
    routes = [
      <React.Fragment key="uniqueId2">
        <Route path="/" exact>
          <Home loginStat={loginStatus} setLoginStatus={setLoginStatus}></Home>
        </Route>
        <Route path="/signin" exact>
          <SigninPage setLoginStatus={setLoginStatus}></SigninPage>
        </Route>
        <Route path="/signup" exact>
          <SignupPage setLoginStatus={setLoginStatus}></SignupPage>
        </Route>
      </React.Fragment>,
    ];
  }
  return (
    <div className="App">
      <Router>
        <Switch>{routes}</Switch>
      </Router>
    </div>
  );
}

export default App;
