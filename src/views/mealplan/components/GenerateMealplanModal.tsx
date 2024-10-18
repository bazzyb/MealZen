import { buildMealPlan } from "../utils/dates";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePowerSync } from "@powersync/react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, DatePicker, Modal } from "@/components";
import { useCreateMealplan } from "@/db/mutations/useCreateMealplan";
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
  const { control, handleSubmit, formState } = useForm({
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
      <Button disabled={isMutating} style={{ marginTop: 8 }} onPress={handleSubmit(onSubmit)}>
        Generate
      </Button>
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
