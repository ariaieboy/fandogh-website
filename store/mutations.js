import Vue from 'vue'
import {setToken, removeToken, setValue} from "../utils/cookie";

/**
 *
 * @param state
 * @param modal
 * @constructor
 */
export const SET_MODAL = (state, modal) => {
  if(modal === undefined) return
  let modals = state.modals
  Object.keys(modals).forEach(key => {
    if(modal !== key) modals[key] = false
  })
  modals[modal] = !modals[modal]
}

export const SET_USER = (state, {token, namespaces, username, email }) => {
  state.user.token = token
  if(token) {
    setToken(token)
    if(namespaces) setValue({key: 'namespace', value: namespaces[0]})
    setValue({key: 'username', value: username})
    setValue({key: 'email', value: email})
  }
}
export const LOGOUT = (state) => {
  removeToken()
  state.user.token = null
}

export const SET_MESSAGE = (state, message) => {
  state.message = message
}

export const SET_IMAGES = (state, images) => {
  state.images = images
}

export const SET_IMAGE_VERSIONS = (state, versions) => {
  state.versions = versions
}

export const SET_IMAGE_VERSION_BUILDS = (state, builds) => {
  state.builds = builds
}
export const UPDATE_PROGRESS = (state, percent) => {
  if(state.progress >= 100) state.progress = 0
  state.progress = percent
}

export const SET_SERVICES = (state, services) => {
  state.services = services
}
export const SET_DOMAINS = (state, domains) => {
  state.domains = domains
}
export const SET_NUMBER_SIDEBAR = (state, number) => {
  state.sidebar = state.sidebar === number ? 0 : number
}

export const SET_JSON_MANIFEST = (state, json) => {
  console.log(json)
  state.manifest = json
}

export const SET_PLAN = (state, plan) => {
  state.plan = plan
}