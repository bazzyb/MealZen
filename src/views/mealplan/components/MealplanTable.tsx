import { reorderMealPlan } from "../utils/dates";
import dayjs from "dayjs";

import { SimpleMealIcon } from "@/components/Icons";
import { ViewColumn } from "@/components/Layout/ViewColumn";
import { ViewRow } from "@/components/Layout/ViewRow";
import { Table } from "@/components/Table";
import { Text } from "@/components/core/Text";
import { useReorderMealplan } from "@/db/mealplan";
import { Mealplan } from "@/db/mealplan/schema";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  setSelectedMealplanEntry: (entry: Mealplan | null) => void;
  mealplan: Array<Mealplan>;
};

export function MealplanTable({ mealplan, setSelectedMealplanEntry }: Props) {
  const { colors } = useAppTheme();

  const { mutate } = useReorderMealplan();

  async function handleMealReorder(reorderedItems: Array<Mealplan>, setItem: (items: Array<Mealplan>) => void) {
    const adjustedMealplan = reorderMealPlan(reorderedItems);
    setItem(adjustedMealplan);
    await mutate(adjustedMealplan);
  }

  return (
    <Table
      isSortable
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
                {!!row.isSimple && <SimpleMealIcon />}
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
