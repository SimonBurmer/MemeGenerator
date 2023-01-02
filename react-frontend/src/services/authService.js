import axios from "axios";
import { useHistory } from "react-router-dom";
import { LoginSuccess } from "../app/containers/LoginSuccess";
import {
  setAuthUser,
  setIsAuthenticated,
  selectIsAuthenticated,
} from "../app/appSlice";
import { useDispatch, useSelector } from "react-redux";

const API_URL = "http://localhost:5000/auth/";
//const history = useHistory();

class Auth {
  constructor() {
    this.Authenticated = false;
  }

  fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:5000/user/getUser", { withCredentials: true })
      .catch((err) => {
        console.log("Not properly authenticated");
      });

    if (response && response.data) {
      console.log("User: ", response.data);
      return response;
    }
  };

  google = () => {
    let timer = null;
    const newWindow = window.open(
      "http://localhost:5000/auth/google",
      "_blank",
      "width = 500, height = 600"
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated");
          this.fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  storeLoginData = (token) => {
    if (token) {
      localStorage.setItem("user", JSON.stringify(token));
    }
  };

  logout = () => {
    localStorage.removeItem("user");
  };

  isAuthenticated() {
    return this.Authenticated;
  }
}

export default new Auth();
