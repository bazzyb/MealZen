import dayjs, { Dayjs } from "dayjs";
import { DateType } from "react-native-ui-datepicker";

export function getNoonForDate(date: DateType): Dayjs {
  return dayjs(date).startOf("day").add(12, "hour");
}

export function getNoonToday(): Dayjs {
  return dayjs().startOf("day").add(12, "hour");
}
