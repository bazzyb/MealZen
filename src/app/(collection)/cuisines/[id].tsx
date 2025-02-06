import { Stack, useLocalSearchParams } from "expo-router";

import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useGetCuisine } from "@/db/cuisine";
import { CuisineView } from "@/views/collection/cuisine";

export default function Cuisine() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: cuisine, isLoading } = useGetCuisine(id);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `${cuisine?.name} Cuisine`,
        }}
      />
      <CuisineView cuisine={cuisine!} />
    </>
  );
}
