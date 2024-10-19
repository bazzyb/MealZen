import { reorderMealPlan } from "../utils/dates";
import { FontAwesome5 } from "@expo/vector-icons";
import dayjs from "dayjs";

import { Table, Text, ViewColumn, ViewRow } from "@/components";
import { useReorderMealplan } from "@/db/mutations/useReorderMealplan";
import { Mealplan, useGetMealplan } from "@/db/queries/useGetMealplan";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  setSelectedMealplanEntry: (entry: Mealplan | null) => void;
};

export function MealplanTable({ setSelectedMealplanEntry }: Props) {
  const { colors } = useAppTheme();

  const { data: mealplan } = useGetMealplan();
  const { mutate } = useReorderMealplan();

  async function handleMealReorder(reorderedItems: Array<Mealplan>, setItem: (items: Array<Mealplan>) => void) {
    const adjustedMealplan = reorderMealPlan(reorderedItems);
    setItem(adjustedMealplan);
    await mutate(adjustedMealplan);
  }

  return (
    <Table
      isSortable
      hideHeader
      onOrderChange={handleMealReorder}
      data={mealplan}
      onRowPress={setSelectedMealplanEntry}
      columns={[
        {
          id: "sort-handle",
          width: 20,
          accessorFn: () => (
            <ViewColumn>
              <Text size={14} color={colors.textSecondary}>
                ☰
              </Text>
            </ViewColumn>
          ),
        },
        {
          label: "Date",
          accessorFn: date => (
            <ViewColumn>
              <Text size={14} color={colors.text}>
                {dayjs(date.date).format("ddd")}
              </Text>
              <Text size={12} color={colors.textSecondary}>
                {dayjs(date.date).format("DD MMM")}
              </Text>
            </ViewColumn>
          ),
          width: 50,
        },
        {
          label: "Name",
          accessorFn: row => (
            <ViewColumn>
              <ViewRow gap={4} alignItems="center">
                <Text size={14} color={colors.text}>
                  {row.meal || row.name}
                </Text>
                {!!row.isSimple && <FontAwesome5 name="umbrella-beach" size={12} color={colors.success} />}
              </ViewRow>

              {row.book && (
                <Text size={12} color={colors.textSecondary}>
                  {row.book} {row.page && `| p${row.page}`}
                </Text>
              )}
            </ViewColumn>
          ),
          width: 120,
        },
        { label: "Notes", accessorFn: row => <Text size={12}>{row.notes}</Text> },
      ]}
    />
  );
}
