import Request from "~/plugins/request";
export const SET_TICKETS = (state) => {
    Request().get("/api/ticketing/tickets").then((res)=>{
            state.tickets = res.results
    }).catch((err)=>{
        throw "can not get tickets"
    })
}