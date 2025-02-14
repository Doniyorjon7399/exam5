import moment from "moment";
export default {
  ifequal: function (a, b, options) {
    return a == b ? options.fn(this) : options.inverse(this);
  },
  formatDate(data) {
    return moment(data).format("DD MM, YYYY");
  },
};
