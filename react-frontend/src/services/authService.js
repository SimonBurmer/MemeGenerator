import axios from "axios";

const API_URL = "http://localhost:5000/auth/";
//const history = useHistory();

class Auth {
  constructor() {
    this.Authenticated = false;
    this.authUser = null;
  }

  fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:5000/user/getUser", { withCredentials: true })
      .catch((err) => {
        console.log("Not properly authenticated");
      });

    if (response && response.data) {
      console.log("User: ", response.data);
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(response.data));
      window.dispatchEvent(new Event("storage"));
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
  getAuthUser() {
    return this.authUser;
  }
}

export default new Auth();
