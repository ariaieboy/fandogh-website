import moment from "moment-jalaali";
moment.loadPersian();
export default ({ date, format = " jD jMMMM jYYYY " }) => {
  return moment(date).format(format);
};
