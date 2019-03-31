import Request from "~/plugins/request";

export const getPlans = async ({commit, state}, namespace) => {
    try {
        let res = await Request().get(`/api/users/namespaces/${namespace}`);
        commit("SET_DATA", {id: "activePlan", data: res});
        return res;
    } catch (e) {
        return Promise.reject(e);
    }
};


export const requestPlan = async ({commit, state}, {memory, dedicatedVolume}) => {
    try {
        let res = await Request().post(`/api/plans`,
            {
                memory,
                dedicated_volume: dedicatedVolume
            });
        commit("SET_DATA", {id: "requestedPlan", data: res});
        return res;
    } catch (e) {
        return Promise.reject(e);
    }
};


export const requestPayment = async ({commit, state}, invoiceId) => {
    try {
        let res = await Request().post(`/api/payments`,
            {
                gateway: 'payping',
                invoice: invoiceId
            });
        commit("SET_DATA", {id: "requestedPayment", data: res});
        return res;
    } catch (e) {
        return Promise.reject(e);
    }
}
