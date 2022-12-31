import Google from "../../img/google.png";
import Github from "../../img/github.png";
import auth from "../../services/authService";

const Login = () => {
  return (
    <div className="login">
      <h1 className="loginTitle">Login</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={auth.google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton github">
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
