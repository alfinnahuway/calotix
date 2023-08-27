import moment from "moment";

export const dateFormater = (startDate, endDate) => {
  if (endDate) {
    return `${moment(startDate).format("DD")} - ${moment(endDate).format(
      "DD"
    )} ${moment(endDate).format("MMMM YYYY")}`;
  } else {
    return moment(startDate).format("DD MMMM YYYY");
  }
};
