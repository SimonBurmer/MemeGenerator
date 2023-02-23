import TopNavigationBar from "./components/TopNavigationBar";
import Home from "./components/home/Home";
import Editor from "./components/editor/Editor";
import Overview from "./components/overview/Overview";
import Login from "./components/login/Login";
import React from 'react';
import {useEffect, useState} from "react";

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
        window.addEventListener('offline', () => setIsOnline(false));
        window.addEventListener('online', () => setIsOnline(true));

        return () => {
            window.removeEventListener('offline', () => setIsOnline(false));
            window.removeEventListener('online', () => setIsOnline(true));
        }
    }, []);

    return (
        <div>
            {isOnline ? (
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
                            <Route path="/overview" element={<Overview />} />
                            <Route
                                path="/profile"
                                element={
                                    <Protected isSignedIn={isAuthenticated}>
                                        <Profile />
                                    </Protected>
                                }
                            />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                </Router>
            ) : (
                <>
                    <h2>Without internet connection neither contents can be viewed nor edited...</h2>
                    <h4>Please make sure to have a stable internet connection</h4>
                </>
            )}
        </div>
    );
}

export default App;
