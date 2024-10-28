import { buildMealPlan } from "../utils/dates";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePowerSync } from "@powersync/react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, DatePicker, Modal, ViewRow } from "@/components";
import { useCreateMealplan } from "@/db/mealplan";
import { getNoonToday } from "@/utils/dates";

const GenerateSchema = z.object({
  generateFrom: z.date(),
  generateTo: z.date(),
});
type GenerateFields = z.infer<typeof GenerateSchema>;

type ModalBodyProps = {
  handleClose: () => void;
};

function ModalBody({ handleClose }: ModalBodyProps) {
  const { control, handleSubmit, formState } = useForm<GenerateFields>({
    defaultValues: {
      generateFrom: getNoonToday().toDate(),
      generateTo: getNoonToday().add(1, "week").toDate(),
    },
    resolver: zodResolver(GenerateSchema),
  });

  const powerSync = usePowerSync();

  const { mutate, isMutating } = useCreateMealplan();

  async function onSubmit(data: GenerateFields) {
    const randomMeals = await buildMealPlan(powerSync, data);
    await mutate(randomMeals);
    handleClose();
  }

  return (
    <>
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
      <ViewRow marginTop={8} justifyContent="space-between" width="100%">
        <Button disabled={isMutating} onPress={handleSubmit(onSubmit)}>
          Generate
        </Button>
        <Button color="disabled" disabled={isMutating} onPress={handleClose}>
          Cancel
        </Button>
      </ViewRow>
    </>
  );
}

type Props = {
  isVisible: boolean;
  handleClose: () => void;
};

export function GenerateMealplanModal({ isVisible, handleClose }: Props) {
  return (
    <Modal isVisible={isVisible} handleClose={handleClose} title="Generate Mealplan">
      <ModalBody handleClose={handleClose} />
    </Modal>
  );
}
