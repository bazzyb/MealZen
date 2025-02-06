import { CuisineRecord } from "@/db/cuisine/schema";

import { ExampleMealsTable } from "./components/ExampleMealsTable";

type Props = {
  cuisine: CuisineRecord;
};

export function CuisineView({ cuisine }: Props) {
  return <ExampleMealsTable cuisineId={cuisine.id} />;
}
