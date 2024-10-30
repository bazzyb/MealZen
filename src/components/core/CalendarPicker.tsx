import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { CalendarThemeProps } from "react-native-ui-datepicker/lib/typescript/src/types";

import { useAppTheme } from "@/styles/useAppTheme";
import { getNoonForDate } from "@/utils/dates";

type RangeChangeParams = {
  startDate: DateType;
  endDate?: DateType;
};

type Props = {
  value: Array<Date>;
  onChange: (dates: Array<Date | undefined>) => void;
};

export function CalendarPicker({ value, onChange }: Props) {
  // const [pickerType, setPickerType] = useState<"range" | "multiple">("range");
  // reset dates when switching type, so range would be min and max, and multiple would be all dates from min to max

  const { colors } = useAppTheme();

  function buildDateList(startDate: DateType, endDate: DateType) {
    const dateList = [];
    let currentDate = getNoonForDate(startDate);
    while (!currentDate.isAfter(getNoonForDate(endDate))) {
      dateList.push(currentDate.toDate());
      currentDate = currentDate.add(1, "day");
    }
    return dateList;
  }

  function handleRangeChange({ startDate, endDate }: RangeChangeParams) {
    if (!endDate) {
      onChange([getNoonForDate(startDate).toDate(), undefined]);
    } else {
      onChange(buildDateList(startDate, endDate));
    }
  }

  const calendarStyles: CalendarThemeProps = {
    calendarTextStyle: { color: colors.text },
    headerTextStyle: { color: colors.text },
    weekDaysTextStyle: { color: colors.text },
    monthContainerStyle: { backgroundColor: colors.background },
    yearContainerStyle: { backgroundColor: colors.background },
    selectedRangeBackgroundColor: colors.activeBackground,
    selectedItemColor: colors.primaryLight,
    selectedTextStyle: { color: colors.white },
    headerButtonColor: colors.text,
    todayContainerStyle: { borderColor: colors.gray[5] },
    todayTextStyle: { color: colors.text },
  };

  // if (pickerType === "multiple") {
  //   return (
  //     <DateTimePicker
  //       mode="multiple"
  //       dates={dates}
  //       onChange={params => setDates(params.dates.map(d => dayjs(d)))}
  //       {...calendarStyles}
  //     />
  //   );
  // }

  return (
    <DateTimePicker
      mode="range"
      startDate={value[0]}
      endDate={value[value.length - 1]}
      displayFullDays
      onChange={handleRangeChange}
      {...calendarStyles}
    />
  );
}
