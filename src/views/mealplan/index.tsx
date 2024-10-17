import dayjs from "dayjs";
import { useState } from "react";

import { Button, Table, Text, ViewColumn } from "@/components";
import { useGetMealplan } from "@/db/queries/useGetMealplan";
import { useAppTheme } from "@/styles/useAppTheme";
import { GenerateMealplanModal } from "@/views/mealplan/components/GenerateMealplanModal";

export default function MealPlanView() {
  const [generateModalOpen, setGenerateModalOpen] = useState(false);

  const { colors } = useAppTheme();
  const { data: mealplan } = useGetMealplan();

  return (
    <>
      <ViewColumn>
        <Button style={{ width: "auto", margin: 16 }} onPress={() => setGenerateModalOpen(true)}>
          Generate New Meal Plan
        </Button>
        <Table
          isSortable
          data={mealplan}
          columns={[
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
              width: 60,
            },
            {
              label: "Name",
              accessorFn: row => (
                <ViewColumn>
                  <Text size={14} color={colors.text}>
                    {row.meal}
                  </Text>
                  <Text size={12} color={colors.textSecondary}>
                    {row.book}
                  </Text>
                </ViewColumn>
              ),
              width: 100,
            },
            { label: "Notes", accessor: "notes" },
          ]}
        />
      </ViewColumn>
      <GenerateMealplanModal isVisible={generateModalOpen} handleClose={() => setGenerateModalOpen(false)} />
    </>
  );
}
