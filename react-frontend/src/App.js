import TopNavigationBar from "./components/TopNavigationBar";
import Home from "./components/home/Home";
import Editor from "./components/editor/Editor";
import Overview from "./components/overview/Overview";
import Login from "./components/login/Login";
import Offline from "./components/offline/Offline";
import React from "react";
import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Profile from "./components/profile/Profile";
import Protected from "./components/Protected";
import { useLoggedInStore } from "./app/store";

function App() {
  const [user, setUser] = useState(null);
  const isAuthenticated = useLoggedInStore((state) => state.loggedIn);

  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    window.addEventListener("offline", () => setIsOnline(false));
    window.addEventListener("online", () => setIsOnline(true));

    return () => {
      window.removeEventListener("offline", () => setIsOnline(false));
      window.removeEventListener("online", () => setIsOnline(true));
    };
  }, []);

  return (
    <div>
      <Router>
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
            <Route path="/offline" element={<Offline />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/overview" element={<Overview />} />
            <Route
              path="/profile"
              element={
                <Protected isSignedIn={isAuthenticated} isOnline={isOnline}>
                  <Profile />
                </Protected>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
