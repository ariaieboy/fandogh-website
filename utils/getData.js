import store from "../store";
export const getData = async () => {
  store().dispatch("getDomains");
};
