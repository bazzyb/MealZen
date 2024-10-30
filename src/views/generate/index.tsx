import { zodResolver } from "@hookform/resolvers/zod";
import { usePowerSync } from "@powersync/react-native";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

import { Button, ViewColumn } from "@/components";
import { CalendarPicker } from "@/components/core/CalendarPicker";
import { useCreateMealplan } from "@/db/mealplan";
import { getNoonToday } from "@/utils/dates";

import { buildMealPlan } from "./utils/dates";

const GenerateSchema = z.object({
  generateDates: z.array(z.date()),
});
type GenerateFields = z.infer<typeof GenerateSchema>;

export default function GenerateView() {
  const { control, handleSubmit } = useForm<GenerateFields>({
    defaultValues: {
      generateDates: [getNoonToday().toDate(), getNoonToday().add(6, "days").toDate()],
    },
    resolver: zodResolver(GenerateSchema),
  });

  const powerSync = usePowerSync();
  const insets = useSafeAreaInsets();

  const { mutate, isMutating } = useCreateMealplan();

  async function onSubmit({ generateDates }: GenerateFields) {
    const randomMeals = await buildMealPlan(powerSync, generateDates);
    await mutate(randomMeals);
    router.navigate("/(tab-views)");
  }

  return (
    <ViewColumn height="100%" padding={16} paddingBottom={insets.bottom + 16} gap={8}>
      <Controller
        name="generateDates"
        control={control}
        render={({ field }) => <CalendarPicker value={field.value} onChange={field.onChange} />}
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
