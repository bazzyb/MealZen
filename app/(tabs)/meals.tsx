import { StatusBar } from "react-native";

import { Text, ViewColumn } from "@/components";

export default function Index() {
  return (
    <ViewColumn justifyContent="center" alignItems="center">
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Meals</Text>
    </ViewColumn>
  );
}
