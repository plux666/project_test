import moment from "moment/moment";
import { ROUND_STATUS } from "@/constants.ts";

export const calculateStatus = (startDate: string, endDate: string) => {
  if (moment(endDate).isBefore(moment())) {
    return ROUND_STATUS.FINISHED;
  }

  if (moment(startDate).isBefore(moment())) {
    return ROUND_STATUS.ACTIVE;
  }

  return ROUND_STATUS.COOLDOWN;
};
