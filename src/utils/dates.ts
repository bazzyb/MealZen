import dayjs, { Dayjs } from "dayjs";
import { DateType } from "react-native-ui-datepicker";

export function getNoonForDate(date: DateType): Dayjs {
  return dayjs(date).startOf("day").add(12, "hour");
}

export function getNoonToday(): Dayjs {
  return dayjs().startOf("day").add(12, "hour");
}

export function buildDateList(startDate: DateType, endDate: DateType) {
  const dateList = [];
  let currentDate = getNoonForDate(startDate);
  while (!currentDate.isAfter(getNoonForDate(endDate))) {
    dateList.push(currentDate.toDate());
    currentDate = currentDate.add(1, "day");
  }
  return dateList;
}
