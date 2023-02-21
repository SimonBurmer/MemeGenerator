import TopNavigationBar from "./components/TopNavigationBar";
import Home from "./components/home/Home";
import Editor from "./components/editor/Editor";
import Overview from "./components/overview/Overview";
import Login from "./components/login/Login";
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

function App() {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(false);

  return (
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
          <Route path="/editor" element={<Editor />} />
          <Route path="/overview" element={<Overview isUserProfile={false}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
