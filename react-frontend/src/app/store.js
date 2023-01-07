import create from "zustand";

const $LOCAL_LOGGEDIN_KEY = "meme_app_logged_in";

const getInitialLoggedIn = () => {
  const loggedIn = localStorage.getItem($LOCAL_LOGGEDIN_KEY) || false;
  return loggedIn;
};

export const useLoggedInStore = create((set) => ({
  loggedIn: getInitialLoggedIn(),
  login: () =>
    set(() => {
      localStorage.setItem($LOCAL_LOGGEDIN_KEY, true);
      return {
        loggedIn: true,
      };
    }),
  logout: () =>
    set(() => {
      localStorage.removeItem($LOCAL_LOGGEDIN_KEY);
      return {
        loggedIn: false,
      };
    }),
}));
