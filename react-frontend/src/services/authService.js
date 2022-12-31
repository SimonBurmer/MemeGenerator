import axios from "axios";

const API_URL = "http://localhost:5000/auth/";

class Auth {
  constructor() {
    this.Authenticated = false;
  }

  google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
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
