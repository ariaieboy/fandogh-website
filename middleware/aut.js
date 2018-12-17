import { readCookieReq, readCookie } from "../utils/cookies.js";
export default async function({ store, redirect, req, app, route }) {
  if (!route.path.includes("dashboard")) return;
  var token;
  let valid = false;
  if (req && req.headers && req.headers.cookie) {
    token = readCookieReq(req.headers.cookie, "USER_TOKEN");
    if (token && token != "undefined") valid = true;
    if (!valid) {
      redirect("/user/login");
    }
  } else {
    if (process.browser) {
      token = readCookie("USER_TOKEN");
      valid = token ? true : false;
      if (!valid) {
        redirect("/user/login");
      }
    }
  }
}
