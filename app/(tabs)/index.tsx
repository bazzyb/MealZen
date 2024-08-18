import { Table } from "../components/Table";

import { ViewColumn } from "@/app/components";

const data = Array.from({ length: 30 }, (_, index) => ({
  id: `${index}`,
  text: `${index}`,
  text2: `2 - ${index}`,
  text3: `3 - ${index}`,
}));

export default function MealPlan() {
  return (
    <ViewColumn>
      <Table
        data={data}
        columns={[
          { label: "Date", accessor: "text", width: 60 },
          { label: "Name", accessor: "text2", width: 100 },
          { label: "Notes", accessor: "text3" },
        ]}
      />
    </ViewColumn>
  );
}
