import TopNavigationBar from "./components/TopNavigationBar";
import Home from "./components/home/Home";
import Editor from "./components/editor/Editor";
import Overview from "./components/overview/Overview";
import Profil from "./components/profil/Profil";
import Login from "./components/login/Login";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import auth from "./services/authService";
import { LoginSuccess } from "./app/containers/LoginSuccess";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "react-bootstrap";
import Profile from "./components/profile/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const getCookie = () => {
      const cookieJwt = Cookies.get("jwt");
      if (cookieJwt) {
        console.log(jwt_decode(cookieJwt).name);
        setUser(jwt_decode(cookieJwt).name);
        auth.storeLoginData(jwt_decode(cookieJwt));
      }
    };
    getCookie();
  }, []);

  return (
    <div className="App">
      <TopNavigationBar userName={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/profile" element={<Profile />} />
        <Route exact path="/login/success" element={<LoginSuccess />} />
        <Route exact path="/login/error">
          Error loging in. Please try again later!
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
