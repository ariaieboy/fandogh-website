import { readCookieReq, readCookie } from "../utils/cookies.js";
export default async function({ app, redirect, req, route }) {
  let valid = false;
  var token;
  if (route.path.includes("dashboard") || !route.path.startsWith("dashboard")) {
    if (req && req.headers && req.headers.cookie) {
      token =  readCookieReq(req.headers.cookie, "USER_TOKEN");
      if (token && token != "undefined") valid = true;
      if (!valid) {
        redirect("/user/login");
      }
    } else {
      if (process.browser) {
        token =  readCookie("USER_TOKEN");
        valid = token ? true : false;
        if (!valid) {
          redirect("/user/login");
        }
      }
    }
  }
}
