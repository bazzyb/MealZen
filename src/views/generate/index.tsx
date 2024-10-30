import { zodResolver } from "@hookform/resolvers/zod";
import { usePowerSync } from "@powersync/react-native";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

import { Button, DatePicker, ViewColumn } from "@/components";
import { useCreateMealplan } from "@/db/mealplan";
import { getNoonToday } from "@/utils/dates";

import { buildMealPlan } from "./utils/dates";

const GenerateSchema = z.object({
  generateFrom: z.date(),
  generateTo: z.date(),
});
type GenerateFields = z.infer<typeof GenerateSchema>;

export default function GenerateView() {
  const { control, handleSubmit, formState } = useForm<GenerateFields>({
    defaultValues: {
      generateFrom: getNoonToday().toDate(),
      generateTo: getNoonToday().add(1, "week").toDate(),
    },
    resolver: zodResolver(GenerateSchema),
  });

  const powerSync = usePowerSync();
  const insets = useSafeAreaInsets();

  const { mutate, isMutating } = useCreateMealplan();

  async function onSubmit(data: GenerateFields) {
    const randomMeals = await buildMealPlan(powerSync, data);
    await mutate(randomMeals);
    router.navigate("/(tab-views)");
  }

  return (
    <ViewColumn height="100%" padding={16} paddingBottom={insets.bottom + 16} gap={8}>
      <Controller
        name="generateFrom"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Start date"
            value={field.value}
            handleChangeDate={field.onChange}
            error={formState.errors.generateFrom?.message}
          />
        )}
      />
      <Controller
        name="generateTo"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="End date"
            value={field.value}
            handleChangeDate={field.onChange}
            error={formState.errors.generateTo?.message}
          />
        )}
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
