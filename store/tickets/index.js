import * as actions from "./actions";
import * as mutations from "./mutations";
import * as getters from "./getters";

export default {
    state: () => ({
        tickets: []
    }),
    namespaced: true,
    actions,
    mutations,
    getters
};
