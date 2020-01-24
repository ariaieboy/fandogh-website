import service from './service'
import store from '../store'
import {setToken} from "../utils/cookie";

const isClient = typeof window !== 'undefined'

export default function request(params, options) {
    if (!options) options = {}
    params = params || {}
    return {
        get: async (url, body) => {
            try {
                const {data} = await service(params, options).get(url, body)
                return data
            } catch (e) {
                if (e.response.status === 400){
                    if (e.response.data.message.indexOf('Namespace') !== -1){
                        window.location.replace('https://fandogh-staging123123.fandogh.cloud/dashboard/general')
                    }
                }else{
                    return Promise.reject(e.response)
                }
            }
        },
        post: async (url, body, config) => {
            try {
                const {data} = await service(params, options).post(url, body, config)
                return data
            } catch (e) {
                return Promise.reject(e.response.data.message ? e.response.data.message : e.response.data)
            }
        },
        put: async (url, body, config) => {
            try {
                const {data} = await service(params, options).put(url, body, config)
                return data
            } catch (e) {
                return Promise.reject(e.response.data.message ? e.response.data.message : e.response.data)
            }
        },
        patch: async (url, body) => {
            try {
                const {data} = await service(params, options).patch(url, body)
                return data
            } catch (e) {
                return Promise.reject(e.response)
            }
        },
        delete: async (url, body) => {
            try {
                const {data} = await service(params, options).delete(url, body)
                return data
            } catch (e) {
                return Promise.reject(e.response)
            }
        }
    }
}
