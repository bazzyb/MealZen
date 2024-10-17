import dayjs, { Dayjs } from "dayjs";

export function getNoonToday(): Dayjs {
  return dayjs().startOf("day").add(12, "hour");
}
