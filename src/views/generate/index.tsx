import { zodResolver } from "@hookform/resolvers/zod";
import { usePowerSync } from "@powersync/react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

import { Button, ViewColumn, ViewRow } from "@/components";
import { CalendarPicker } from "@/components/core/CalendarPicker";
import { useCreateMealplan } from "@/db/mealplan";
import { buildDateList, getNoonToday } from "@/utils/dates";

import { buildMealPlan } from "./utils/dates";

const GenerateSchema = z.object({
  generateDates: z.array(z.date()),
});
type GenerateFields = z.infer<typeof GenerateSchema>;

export default function GenerateView() {
  const [pickerType, setPickerType] = useState<"range" | "multiple">("range");

  const { control, handleSubmit, setValue, getValues } = useForm<GenerateFields>({
    defaultValues: {
      generateDates: buildDateList(getNoonToday(), getNoonToday().add(6, "days")),
    },
    resolver: zodResolver(GenerateSchema),
  });

  const powerSync = usePowerSync();
  const insets = useSafeAreaInsets();

  const { mutate, isMutating } = useCreateMealplan();

  function handlePickerChange(type: "range" | "multiple") {
    if (type === "range") {
      const dates = getValues().generateDates;
      setValue("generateDates", buildDateList(dates[0], dates[dates.length - 1]));
    }
    setPickerType(type);
  }

  async function onSubmit({ generateDates }: GenerateFields) {
    const randomMeals = await buildMealPlan(powerSync, generateDates);
    await mutate(randomMeals);
    router.navigate("/(tab-views)");
  }

  return (
    <ViewColumn height="100%" padding={16} paddingBottom={insets.bottom + 16} gap={8}>
      <ViewRow gap={8} justifyContent="center">
        <Button
          color={pickerType === "range" ? "primary" : "disabled"}
          onPress={() => handlePickerChange("range")}
          disabled={isMutating}
        >
          Range
        </Button>
        <Button
          color={pickerType === "multiple" ? "primary" : "disabled"}
          onPress={() => handlePickerChange("multiple")}
          disabled={isMutating}
        >
          Multiple
        </Button>
      </ViewRow>
      <Controller
        name="generateDates"
        control={control}
        render={({ field }) => <CalendarPicker pickerType={pickerType} value={field.value} onChange={field.onChange} />}
      />
      <ViewColumn gap={8} marginTop="auto">
        <Button color="disabled" disabled={isMutating} onPress={() => router.navigate("/(tab-views)")}>
          Cancel
        </Button>
        <Button color="success" disabled={isMutating} onPress={handleSubmit(onSubmit)}>
          Generate
        </Button>
      </ViewColumn>
    </ViewColumn>
  );
}
