import moment from "moment";

export const toMSS = (length) => moment(length * 1000).format("m:ss");
