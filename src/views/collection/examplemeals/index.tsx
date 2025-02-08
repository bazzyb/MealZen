import { ViewColumn } from "@/components/Layout/ViewColumn";

import { ExampleMealsTable } from "./components/ExampleMealsTable";

export default function ExampleMealsView() {
  return (
    <ViewColumn padding={0} flex={1}>
      <ExampleMealsTable />
    </ViewColumn>
  );
}
