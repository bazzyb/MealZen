import { zodResolver } from "@hookform/resolvers/zod";
import { usePowerSync } from "@powersync/react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { ViewRow } from "@/components/Layout/ViewRow";
import { SectionOverlay } from "@/components/SectionOverlay";
import { Button } from "@/components/core/Button";
import { CalendarPicker } from "@/components/core/CalendarPicker";
import { Switch } from "@/components/core/Switch";
import { useCreateMealplan } from "@/db/mealplan";
import { getMealplanWithoutJoin } from "@/db/mealplan/queries";
import { MealplanRecord } from "@/db/mealplan/schema";
import { useClearMealplan } from "@/db/mealplan/useClearMealplan";
import { useAuth } from "@/providers/AuthProvider";
import { buildDateList, getNoonToday } from "@/utils/dates";

import { pickRandomMeals } from "./utils/dates";

const GenerateSchema = z.object({
  generateDates: z.array(z.date()),
  preserveExisting: z.boolean(),
});
type GenerateFields = z.infer<typeof GenerateSchema>;

export default function GenerateView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickerType, setPickerType] = useState<"range" | "multiple">("range");
  const { user } = useAuth();

  const { control, handleSubmit, setValue, getValues } = useForm<GenerateFields>({
    defaultValues: {
      generateDates: buildDateList(getNoonToday(), getNoonToday().add(6, "days")),
      preserveExisting: true,
    },
    resolver: zodResolver(GenerateSchema),
  });

  const powerSync = usePowerSync();
  const insets = useSafeAreaInsets();

  const { mutate: createMealplan } = useCreateMealplan();
  const { mutate: clearMealplan } = useClearMealplan();

  function handlePickerChange(type: "range" | "multiple") {
    if (type === "range") {
      const dates = getValues().generateDates;
      setValue("generateDates", buildDateList(dates[0], dates[dates.length - 1]));
    }
    setPickerType(type);
  }

  async function onSubmit({ generateDates, preserveExisting }: GenerateFields) {
    setIsSubmitting(true);
    let existingMealplanEntries: Array<MealplanRecord> = [];
    if (preserveExisting) {
      existingMealplanEntries = await getMealplanWithoutJoin(powerSync, user?.id);
    }

    const randomMeals = await pickRandomMeals(powerSync, generateDates, existingMealplanEntries, user?.id);
    if (randomMeals.length) {
      const existingMealplanIds = existingMealplanEntries.map(meal => meal.id || "").filter(Boolean);

      await clearMealplan(existingMealplanIds);
      await createMealplan(randomMeals);
    }

    setIsSubmitting(false);
    router.navigate("/(tab-views)");
  }

  return (
    <ViewColumn>
      <ViewColumn height="100%" padding={16} paddingBottom={insets.bottom + 16} gap={8}>
        <ViewRow gap={8} justifyContent="center">
          <Button
            color={pickerType === "range" ? "primary" : "disabled"}
            onPress={() => handlePickerChange("range")}
            disabled={isSubmitting}
          >
            Range
          </Button>
          <Button
            color={pickerType === "multiple" ? "primary" : "disabled"}
            onPress={() => handlePickerChange("multiple")}
            disabled={isSubmitting}
          >
            Multiple
          </Button>
        </ViewRow>
        <Controller
          name="generateDates"
          control={control}
          render={({ field }) => (
            <CalendarPicker pickerType={pickerType} value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          name="preserveExisting"
          control={control}
          render={({ field }) => (
            <Switch label="Preserve existing meals on mealplan" value={field.value} onValueChange={field.onChange} />
          )}
        />
      </ViewColumn>
      <SectionOverlay position="bottom" style={{ marginTop: "auto" }}>
        <ViewRow gap={8} justifyContent="flex-end">
          <Button color="error" disabled={isSubmitting} onPress={() => router.navigate("/(tab-views)")}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
            Generate meal plan
          </Button>
        </ViewRow>
      </SectionOverlay>
    </ViewColumn>
  );
}
