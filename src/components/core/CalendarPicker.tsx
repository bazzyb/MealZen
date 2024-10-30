import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { CalendarThemeProps } from "react-native-ui-datepicker/lib/typescript/src/types";

import { useAppTheme } from "@/styles/useAppTheme";
import { buildDateList, getNoonForDate } from "@/utils/dates";

type RangeChangeParams = {
  startDate: DateType;
  endDate?: DateType;
};

export type MultiChangeParams = {
  dates: DateType[];
};

type Props = {
  pickerType?: "range" | "multiple";
  value: Array<Date>;
  onChange: (dates: Array<Date | undefined>) => void;
};

export function CalendarPicker({ value, onChange, pickerType = "range" }: Props) {
  const { colors } = useAppTheme();

  function isRangeChange(params: RangeChangeParams | MultiChangeParams): params is RangeChangeParams {
    return (params as RangeChangeParams).startDate !== undefined;
  }

  function handleChange(params: RangeChangeParams | MultiChangeParams) {
    if (isRangeChange(params)) {
      if (!params.endDate) {
        onChange([getNoonForDate(params.startDate).toDate(), undefined]);
      } else {
        onChange(buildDateList(params.startDate, params.endDate));
      }
    } else {
      onChange(params.dates.map(date => getNoonForDate(date).toDate()));
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

  return (
    <DateTimePicker
      mode={pickerType}
      dates={value}
      startDate={value[0]}
      endDate={value[value.length - 1]}
      displayFullDays
      onChange={handleChange}
      {...calendarStyles}
    />
  );
}
