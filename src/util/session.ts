import axiosInstance from "./axios";
import Cookies from "js-cookie";

export function signOut() {
  delete axiosInstance.defaults.headers.common.Authorization;
  Cookies.remove("username");
  Cookies.remove("password");
  alert("Logout Successfull");
  window.location.replace("/signin");
}
export default function setSession(username?: string, password?: string) {
  if (!username) username = Cookies.get("username") as string;
  if (!password) password = Cookies.get("password") as string;
  if (username && password) {
    console.log("CREDENTAIL OK");
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${username} ${password}`;
    Cookies.set("username", username, { expires: 15 /* 15 day */ });
    Cookies.set("password", password, { expires: 15 /* 15 day */ });
  } else {
    Cookies.remove("username");
    Cookies.remove("password");
    delete axiosInstance.defaults.headers.common.Authorization;
    alert("Session Expired, Please login again");
  }
}
