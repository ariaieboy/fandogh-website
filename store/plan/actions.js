import Request from "~/plugins/request";

export const requestActivePlan = async ({commit, state}, namespace) => {
    try {
        let res = await Request().get(`/api/users/namespaces/${namespace}`);
        commit("SET_DATA", {id: "activePlan", data: res});
        return res;
    } catch (e) {
        return Promise.reject(e);
    }
};


export const requestPlan = async ({commit, state}, plan_items) => {
    try {
        let res = await Request().post(`/api/plans`,
            plan_items);
        commit("SET_DATA", {id: "requestedPlan", data: res});
        return res;
    } catch (e) {
        return Promise.reject(e);
    }
};

export const reloadPlan = async ({commit, state}, invoiceId) => {
    try {
        return await Request().get(`/api/plans/${invoiceId}`);
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
};


export const verifyPayment = async ({commit, state}, {refId, attemptId}) => {
    try {
        let res = await Request().get(`/api/payments/verification/${attemptId}`,{
            params: {
                refid: refId
            }
        });
        commit("SET_DATA", {id: "paymentVerification", data: res});
        return res;
    } catch (e) {
        return Promise.reject(e);
    }
};
