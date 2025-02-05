import { useLocalSearchParams } from "expo-router";

import { Heading, ViewColumn } from "@/components";
import { useGetCuisine } from "@/db/cuisine";

import { ExampleMealsTable } from "./components/ExampleMealsTable";

export function CuisineView() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: cuisine, isLoading: isCuisineLoading } = useGetCuisine(id);

  return (
    <ViewColumn padding={0} flex={1}>
      <Heading size={18} style={{ padding: 16 }}>
        {cuisine?.name}
      </Heading>
      <ExampleMealsTable cuisineId={id} />
    </ViewColumn>
  );
}
