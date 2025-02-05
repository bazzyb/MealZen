import { router } from "expo-router";

import { Table, Text, ViewColumn, ViewRow } from "@/components";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useGetCuisines } from "@/db/cuisine";

export function CuisinesTable() {
  const { data: cuisines, isLoading } = useGetCuisines();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Table
      data={cuisines}
      onRowPress={row => {
        router.navigate({
          pathname: "/(collection)/cuisines/[id]",
          params: { id: row.id },
        });
      }}
      columns={[
        {
          id: "name",
          accessorFn: cuisine => (
            <ViewRow alignItems="center" gap={8}>
              <ViewColumn paddingRight={8}>
                <Text>{cuisine.name}</Text>
              </ViewColumn>
            </ViewRow>
          ),
        },
      ]}
    />
  );
}
