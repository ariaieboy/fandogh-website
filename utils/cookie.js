import Cookies from 'universal-cookie'

const Cookie = new Cookies();
const userId = 'USER_ID'
const userToken = 'USER_TOKEN'
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
  var c = ca[i];
  while (c.charAt(0)==' ') c = c.substring(1,c.length);
  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function readCookieReq(req,name) {
  var nameEQ = name + "=";
 var ca = req.split(';');
 for(var i=0;i < ca.length;i++) {
   var c = ca[i];
   while (c.charAt(0)==' ') c = c.substring(1,c.length);
   if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
 }
 return null;
}

export const getUuserToken = () => {
if (readCookie('USER_TOKEN')){
  return readCookie('USER_TOKEN')
}else{
  return null
}
}
export const readCookieServer = (req) =>{
  return readCookieReq(req,'USER_TOKEN')
}
export const getToken = () => {
  return Cookie.get(userToken, {path:'/'})
}

export const removeToken = () => {
  return Cookie.remove(userToken, {path:'/'})
}

export const setToken = (value) => {
  return Cookie.set(userToken, value, {path:'/'})
}

export const getValue = (key) => {
  return Cookie.get(key, {path:'/'})
}

export const removeValue = (key) => {
  return Cookie.remove(key, {path:'/'})
}

export const setValue = ({key, value}) => {
  return Cookie.set(key, value, {path:'/'})
}
