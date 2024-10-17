import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Modal } from "@/components/Modal";

import { PickerButton } from "./PickerButton";

type Props = {
  value: Date;
  handleChangeDate: (date: Date) => void;
};

export function IOSDatePicker({ value, handleChangeDate }: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (_, selectedDate?: Date) => {
    if (selectedDate) {
      handleChangeDate(selectedDate);
    }
  };

  return (
    <>
      <Modal handleClose={() => setShowDatePicker(false)} isVisible={showDatePicker} title="Select a date">
        <SafeAreaView>
          <DateTimePicker testID="dateTimePicker" value={value} mode="date" display="inline" onChange={onChange} />
        </SafeAreaView>
      </Modal>
      <PickerButton date={value} handleOpenPicker={() => setShowDatePicker(true)} />
    </>
  );
}
