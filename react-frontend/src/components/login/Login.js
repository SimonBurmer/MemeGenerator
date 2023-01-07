import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useLoggedInStore } from "../../app/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const loginState = useLoggedInStore((state) => state.loggedIn);

  const [isAuth, setIsAuth] = useState(false);
  const login = useLoggedInStore((state) => state.login);
  const logout = useLoggedInStore((state) => state.logout);
  const navigate = useNavigate();

  const handleFailure = (result) => {
    console.log(result);
  };

  const handleLogin = async (googleData) => {
    console.log(googleData);
    const res = await fetch("http://localhost:5000/auth/google/login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.credential,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    login();
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Login</h1>
        <div>
          {loginState ? (
            navigate("/")
          ) : (
            <GoogleOAuthProvider
              clientId={`290560052281-1ctuj9f3asih10rucrk0b8n2n7otfjgo.apps.googleusercontent.com`}
            >
              <GoogleLogin
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
          )}
        </div>
      </header>
    </div>
  );
};

export default Login;
