import Request from "~/plugins/request";
import {jsonDeleter, jsonManipulator} from "../utils/yaml";

const monitoringAPI = process.env.MONITORING_API

export const nuxtServerInit = async ({state, dispatch}, {req}) => {
    dispatch("checkAuthentication", req.cookies["USER_TOKEN"]);
};
/**
 *
 * @param commit
 * @param state
 * @param username
 * @param password
 * @returns {Promise<*>}
 */
export const login = async ({commit, state}, {username, password}) => {
    try {
        let user = await Request().post("/api/tokens", {username, password});
        commit("SET_USER", user);
        return user;
    } catch (e) {
        return Promise.reject(e);
    }
};
export const register = async ({commit, state}, data) => {
    try {
        let user = await Request().post("/api/accounts", data);
        commit("SET_USER", user);
        return user;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const showModal = ({commit, state}, modal) => {
    commit("SET_MODAL", modal);
};

export const setMessage = ({commit, state}, message) => {
    commit("SET_MESSAGE", message);
};

export const checkAuthentication = ({commit, state}, token) => {
    commit("SET_USER", {token: token});
};

export const logout = async ({app, commit, state}) => {
    try {
        commit("LOGOUT");
    } catch (e) {
        return Promise.reject(e);
    }
};

export const activation = async ({commit, state}, {code, id}) => {
    try {
        return await Request().patch("/api/users/activation-codes/" + code, {
            id,
            code
        });
    } catch (e) {
        return Promise.reject(e);
    }
};


export const chargeWallet = async ({commit, state}, credit) => {
    try {
        return await Request().post('/api/wallets', {
            credit: credit
        })
    } catch (e) {
        return Promise.reject(e)

    }
};


export const walletRemaining = async ({commit, state}) => {
    try {
        return await Request().get('/api/wallets')
    } catch (e) {
        return Promise.reject(e)
    }
};

export const getInvitationDetail = async ({commit, state}, token) => {

    try {

        return await Request().get(`/api/users/invitations/${token}`)
    } catch (e) {
        return Promise.reject(e)
    }
};

export const confirmTeamInvitation = async ({commit, state}, token) => {

    try {
        return await Request().post(`/api/users/invitation-answers/${token}`)
    } catch (e) {
        return Promise.reject(e)
    }
};

export const requestUserInvitation = async ({commit, state}, email) => {

    try {
        return await Request().post('/api/users/invitations', {
            email: email
        })
    } catch (e) {
        return Promise.reject(e)
    }
};

export const requestPendingInvitations = async ({commit, state}) => {
    try {
        return await Request().get('/api/users/invitations')
    } catch (e) {
        return Promise.reject(e)
    }
};

export const revokePendingInvitation = async ({commit, state}, token) => {

    try {
        return await Request().delete(`/api/users/invitations/${token}`)
    } catch (e) {
        return Promise.reject(e)
    }

};

export const requestNamespaceMembers = async ({commit, state}) => {

    try {
        return await Request().get('/api/users/namespaces/members')
    } catch (e) {
        return Promise.reject(e)
    }
};

export const removeMemberFromNamespace = async ({commit, state}, member_id) => {
    try {
        return await Request().delete(`/api/users/namespaces/members/${member_id}`)
    } catch (e) {
        return Promise.reject(e)
    }
};

export const changeMemberRole = async ({commit, state}, {member_id, new_role}) => {
    try {
        return await Request().patch(`/api/users/namespaces/members/${member_id}`, {
            role: new_role
        })
    } catch (e) {
        return Promise.reject(e)
    }
};

export const recoveryAccount = async ({commit, state}, {identifier}) => {
    try {
        return await Request().post("/api/users/recovery-tokens", {identifier});
    } catch (e) {
        return Promise.reject(e);
    }
};

export const resetPassword = async (
    {commit, state},
    {id, new_password, code}
) => {
    try {
        let data = await Request().patch("/api/users/recovery-tokens/" + code, {
            new_password: new_password,
            id: id
        });
        return data;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getImages = async ({commit, state}) => {
    try {
        let images = await Request().get("/api/images");
        commit("SET_IMAGES", images);
        return images;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const createImage = async ({commit, state}, {name}) => {
    try {
        return await Request().post("/api/images", {name});
    } catch (e) {
        return Promise.reject(e);
    }
};

export const deleteImage = async ({commit, state}, name) => {
    try {
        return await Request().delete(`/api/images/${name}`);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getImageVersions = async ({commit, state}, name) => {
    try {
        let versions = await Request().get(`/api/images/${name}/versions`);
        commit("SET_IMAGE_VERSIONS", versions);
        return versions;
    } catch (e) {
        return Promise.reject(e);
    }
};

const progressEventListener = commit => {
    return progressEvent => {
        let percentCompleted = Math.floor(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        commit("UPDATE_PROGRESS", percentCompleted);
    };
};

export const createImageVersion = async (
    {commit, state},
    {name, formData}
) => {
    try {
        return await Request().post(`/api/images/${name}/versions`, formData, {
            onUploadProgress: progressEventListener(commit),
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    } catch (e) {
        return Promise.reject(e);
    }
};

export const subscribeNewsletter = async ({commit, state}, email) => {
    try {
        return await Request().post('/api/users/newsletter', {email})
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getImageVersionBuilds = async (
    {commit, state},
    {name, version}
) => {
    try {
        let builds = await Request().get(
            `/api/images/${name}/versions/${version}/builds`
        );
        commit("SET_IMAGE_VERSION_BUILDS", builds);
        return builds;
    } catch (e) {
        return Promise.reject(e);
    }
};
export const getServices = async ({commit, state}) => {
    try {
        let services = await Request().get(`/api/services`);
        commit("SET_SERVICES", services);
        return services;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getServiceLog = async ({commit, state}, {name, with_timestamp, max_logs, last_logged_time, previous}) => {
    try {
        let logs = await Request().get(`/api/services/${name}/logs`,{
            params: {
                with_timestamp: with_timestamp,
                max_logs: max_logs,
                last_logged_time: last_logged_time,
                previous: previous
            }
        });
        commit("SET_DATA", {data: logs, id: "serviceLog"});
        return logs;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getServicesName = async ({commit, state}, {name}) => {
    try {
        let services = await Request().get(`/api/services/${name}`);
        commit("SET_DATA", {id: "service", data: services});
        return services;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const deleteService = async ({commit, state}, name) => {
    try {
        return await Request().delete(`/api/services/${name}`);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const requestServiceHistory = async ({commit, state}, service_name) => {

    try {
        return await Request().get(`/api/services/${service_name}/history`);
    } catch (e) {
        return Promise.reject(e)

    }

};


export const requestServiceRollback = async ({commit, state}, {service_name, history_id}) => {

    try {

        return await Request().post(`/api/services/rollbacks`, {
            service_name: service_name,
            history_id: history_id
        })

    } catch (e) {
        return Promise.reject(e)
    }
};


export const performServiceAction = async ({commit, state}, {service_name, service_action}) => {

    try {

        return await Request().post(`/api/services/${service_name}/actions`, {
            action: service_action
        })

    } catch (e) {
        return Promise.reject(e)
    }
};


export const deleteServiceHistory = async ({commit, state}, {service_name, history_id}) => {

    try {

        return await Request().delete(`/api/services/${service_name}/history/${history_id}`)

    } catch (e) {
        return Promise.reject(e)
    }

};

export const createServiceManifest = async ({commit, state}) => {
    try {
        return await Request().post("/api/services/manifests", state.manifest);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const dumpServiceManifest = async ({commit, state}, service_name) => {
    try {
        const manifest = await Request().get('api/services/manifests', {
            params: {
                service_name: service_name
            }
        })
        delete manifest.data['requested_at']
        commit("SET_JSON_MANIFEST", manifest.data);
        return manifest.data
    } catch (e) {
        return Promise.reject(e)
    }
};

export const getTransactions = async ({commit, state}, payment_type) => {

    try {
        return await Request().get('api/billing', {
            params: {
                payment_type: payment_type
            }
        })
    } catch (e) {
        return Promise.reject(e)
    }

};

export const getDomains = async ({commit, state}, query) => {
    try {
        let domains = await Request(query).get(`/api/domains`);
        commit("SET_DOMAINS", domains);
        return domains;
    } catch (e) {
        return Promise.reject(e);
    }
};
export const getDomain = async ({commit, state}, {name}) => {
    try {
        let domain = await Request().get(`/api/domains/${name}`);
        commit("SET_DATA", {data: domain, id: "domain"});
        return domain;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const createDomain = async ({commit, state}, form) => {
    try {
        return await Request().post(`/api/domains`, form);
    } catch (e) {
        return Promise.reject(e);
    }
};
export const verificationDomain = async ({commit, state}, {name}) => {
    try {
        return await Request().post(`/api/domains/${name}/verifications`);
    } catch (e) {
        return Promise.reject(e);
    }
};
export const certificateDomain = async ({commit, state}, {name}) => {
    try {
        return await Request().post(`/api/domains/${name}/certificate`);
    } catch (e) {
        return Promise.reject(e);
    }
};
export const removeCertificateDomain = async ({commit, state}, {name}) => {
    try {
        return await Request().delete(`/api/domains/${name}/certificate`);
    } catch (e) {
        return Promise.reject(e);
    }
};
export const removeDomain = async ({commit, state}, name) => {
    try {
        return await Request().delete(`/api/domains/${name}`);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const manifestGenerator = ({commit, state}, {value, path}) => {
    let json = jsonManipulator(state.manifest, {path, value});
    commit("SET_JSON_MANIFEST", json);
    return json;
};


export const manifestDeleter = ({commit, state}, path) => {
    let json = jsonDeleter(state.manifest, path);
    commit("SET_JSON_MANIFEST", json);
    return json;
};


export const setPlan = async ({commit, state}, {plan, configs}) => {
    try {
        const planData = {plan, configs};
        commit("SET_PLAN", planData);
        return true;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getNameSpace = async ({commit, state}, namespace) => {
    try {
        let res = await Request().get(`/api/users/namespaces/${namespace}`);
        commit("SET_DATA", {id: "activePlan", data: res});
        return res;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const createNewNamespace = async ({commit, state}, namespace) => {
    try {
        return await Request().post(`api/users/namespaces`, {namespace: namespace});
    } catch (e) {
        return Promise.reject(e);
    }
};

export const requestUserNamespaces = async ({commit, state}) => {
    try {
        let res = await Request().get(`/api/users/namespaces`);
        commit("SET_DATA", {id: "namespaces", data: res});
        return res;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getMetric = async ({commit, state}, {metric, service, hours}) => {
    try {
        const res = await Request(null, {baseUrl: monitoringAPI}).get(`/?metric=${metric}`, {
            params: {
                service: service,
                hours: hours
            }
        });
        commit("SET_DATA", {id: metric, data: res})
    } catch (e) {
        return Promise.reject(e)
    }
};

export const TOGGLE_NAV = ({commit, state}, {data, id}) => {
    // localStorage.setItem("nav", data);
    if (data === state.isNativeMenus) {
        commit("SET_DATA", {data: null, id});
        return;
    }
    commit("SET_DATA", {data: data, id: id});
};

export const SET_SIZE = ({commit, state}, {width, height}) => {
    commit("SET_DATA", {data: height, id: "windowHeight"});
    commit("SET_DATA", {data: width, id: "windowWidth"});
};

export const createSecret = async (
    {commit, state},
    {name, type, fields}
) => {
    try {
        let secret = await Request().post(`/api/secrets`, {name, type, fields});
        return secret;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getSecret = async ({commit, state}) => {
    try {
        let secret = await Request().get(`/api/secrets`);
        commit("SET_DATA", {id: "secrets", data: secret});
        return secret;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getSecretDetails = async ({commit, state}, secret_name) => {
    try {
        let secret = await Request().get(`/api/secrets/${secret_name}`);
        return secret;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getVolumes = async ({commit, state}) => {
    try {
        let volumes = await Request().get(`/api/volumes`);
        commit("SET_DATA", {id: "volumes", data: volumes});
        commit('SET_VOLUMES', volumes)
        return volumes;
    } catch (e) {
        return Promise.reject(e);
    }
};


export const createNewVolume = async ({commit, state}, {volume_name, volume_capacity}) => {
    try {
        return await Request().post('api/volumes', {
            name: volume_name,
            capacity: volume_capacity
        })
    } catch (e) {
        return Promise.reject(e)
    }
};

export const deleteSelectedVolume = async ({commit, state}, volume_name) => {

    try {

        return await Request().delete(`api/volumes/${volume_name}`)

    } catch (e) {
        return Promise.reject(e)
    }
};

export const resizeSelectedVolume = async ({commit, state}, {volume_name, volume_size}) => {

    try {

        return await Request().patch(`api/volumes/${volume_name}`, {
            capacity: volume_size
        })

    } catch (e) {
        return Promise.reject(e)
    }
};

export const getVolumeDetails = async ({commit, state}, volume_name) => {

    try {

        return await Request().get(`api/volumes/${volume_name}`)

    } catch (e) {
        return Promise.reject(e)
    }
};

export const deleteSecret = async ({commit, state}, name) => {
    try {
        return await Request().delete(`/api/secrets/${name}`);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const putSecret = async ({commit, state}, {name, type, fields}) => {
    try {
        return await Request().put(`/api/secrets/${name}`, {name, type, fields});
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getAccount = async ({commit, state}, {username}) => {
    try {
        let accounts = await Request().get(`/api/accounts/${username}`);
        commit("SET_DATA", {id: "account", data: accounts});
        return accounts;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const updateAccount = async (
    {commit, state},
    {
        national_id,
        newsletter_subscriber,
        first_name,
        last_name,
        username,
        new_password,
        current_password
    }
) => {
    try {
        return await Request().patch(`/api/accounts/${username}`, {
            national_id,
            newsletter_subscriber,
            first_name,
            last_name,
            new_password,
            current_password
        });
    } catch (e) {
        return Promise.reject(e);
    }
};
