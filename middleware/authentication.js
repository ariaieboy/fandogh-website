import { getUuserToken , readCookieServer } from "../utils/cookie";

export default async function({ req, isServer, redirect, route }) {
  let path = route.path;
  console.log(path);
  console.log(!path.includes("dashboard") || !path.startsWith("/dashboard/"));
  if (path.includes("dashboard") || path.startsWith("/dashboard/")) {
    console.log("isServer  " + isServer);
    if (req && req.headers && req.headers.cookie) {
      if (!req.cookies["USER_TOKEN"]) {
        redirect("/user/login");
      }
    } else {
      console.log(!getUuserToken())
      if (process.browser) {
      if (!getUuserToken()) {
        redirect("/user/login");
      }
    }else{
      if(!readCookieServer(req)){
        redirect("/user/login");
      }
    }
    }
  }
}
