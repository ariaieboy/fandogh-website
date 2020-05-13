import Request from "~/plugins/request";


export const postTicket = async ({commit, state}, payload) => {
    try {
        return await Request().post("/api/ticketing/tickets", payload)
    } catch (e) {
        return Promise.reject(e);
    }
};

