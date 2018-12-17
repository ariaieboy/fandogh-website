import Cookies from 'universal-cookie'

const Cookie = new Cookies();
const userId = 'USER_ID'
const userToken = 'USER_TOKEN'

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
