import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

import { PickerButton } from "./PickerButton";

type Props = {
  value: Date;
  handleChangeDate: (date: Date) => void;
};

export function AndroidDatePicker({ value, handleChangeDate }: Props) {
  const onChange = (_, selectedDate?: Date) => {
    if (selectedDate) {
      handleChangeDate(selectedDate);
    }
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

  return (
    <SafeAreaView>
      <PickerButton date={value} handleOpenPicker={showDatePicker} />
    </SafeAreaView>
  );
}
