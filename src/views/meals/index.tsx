import { ViewColumn } from "@/components";

import { AddMealForm } from "./components/AddMealForm";
import { MealsTable } from "./components/MealsTable";

export default function MealsView() {
  return (
    <ViewColumn padding={0} flex={1}>
      <AddMealForm />
      <MealsTable />
    </ViewColumn>
  );
}
