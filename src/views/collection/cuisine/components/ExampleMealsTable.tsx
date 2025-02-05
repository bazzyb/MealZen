import { Table } from "@/components";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useGetExampleMeals } from "@/db/examplemeal";

type Props = {
  cuisineId: string;
};

export function ExampleMealsTable({ cuisineId }: Props) {
  const { data: exampleMeals, isLoading: isMealsLoading } = useGetExampleMeals(cuisineId);

  if (isMealsLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Table
      data={exampleMeals}
      columns={[
        {
          id: "name",
          accessor: "name",
        },
      ]}
    />
  );
}
