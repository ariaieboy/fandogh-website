import axios from "axios";
import {getToken, getValue} from "../utils/cookie";
import store from "../store";

const isClient = typeof window !== "undefined";
const _baseURL = process.env.API;

function request(params, {baseUrl}) {
    baseUrl = baseUrl || _baseURL
    const service = axios.create({
        baseURL: baseUrl,
        timeout: 60 * 4 * 1000
    });
    service.interceptors.request.use(
        config => {
            let token = store().state.user.token || getToken();
            if (!token && isClient) {
                token = window.__NUXT__.state.user.token;
            }

            if (token && token !== "null") {
                config.headers["Authorization"] = "JWT " + token;
            }

            const namespace = getValue("namespace")
            if (namespace && namespace !== "null") {
                config.headers["ACTIVE-NAMESPACE"] = namespace;
            }

            if (params) config.params = {...config.params, ...params};
            return config;
        },
        error => {
            // Promise.reject(error)
        }
    );
    return service;
}

export default request;
