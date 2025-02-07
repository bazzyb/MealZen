import { ViewColumn } from "@/components";
import { AddRowForm } from "@/components/AddRowForm";
import { LinkButton } from "@/components/core/LinkButton";
import { useCreateMeal } from "@/db/meal";
import { Logger } from "@/utils/logger";

import { MealsTable } from "./components/MealsTable";

export default function MealsView() {
  const { mutate: createMeal, isMutating: isCreatingMeal } = useCreateMeal();

  async function handleCreateMeal(mealName: string, page: string) {
    try {
      await createMeal({ name: mealName, page: page ? parseInt(page) : undefined });
    } catch (err) {
      Logger.error("Failed to create meal", err);
    }
  }

  return (
    <ViewColumn padding={0} flex={1}>
      <MealsTable />

      <AddRowForm
        addButtonText="Add Meals"
        isAdding={isCreatingMeal}
        onAdd={handleCreateMeal}
        onError={err => Logger.error("Failed to create meal", err)}
        leftButton={
          <LinkButton href="/(collection)/examplemeals" style={{ marginRight: "auto" }}>
            Ideas
          </LinkButton>
        }
      />
    </ViewColumn>
  );
}
