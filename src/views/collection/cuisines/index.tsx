import { ViewColumn } from "@/components";

import { CuisinesTable } from "./components/CuisinesTable";

export default function CuisinesView() {
  return (
    <ViewColumn padding={0} flex={1}>
      <CuisinesTable />
    </ViewColumn>
  );
}
