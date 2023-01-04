import TopNavigationBar from "./components/TopNavigationBar";
import Home from "./components/home/Home";
import Editor from "./components/editor/Editor";
import Overview from "./components/overview/Overview";
import Login from "./components/login/Login";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Button } from "react-bootstrap";
import Profile from "./components/profile/Profile";

function App() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const getUser = () => {
      axios.get('http://localhost:5000/auth/login/success', { withCredentials: true }).then((response) => {
        console.log(response.user)
        setUser(response.user)
      })
    };
    getUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <TopNavigationBar userName={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/editor" element={<Editor/>} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
