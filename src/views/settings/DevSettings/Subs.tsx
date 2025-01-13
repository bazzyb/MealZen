import { Category } from "../components/Category";
import { ScrollView } from "react-native";

import { Text, ViewColumn } from "@/components";
import { useSubs } from "@/providers/SubsProvider";
import { useAppTheme } from "@/styles/useAppTheme";

export function SubInfo() {
  const { isPremiumEnabled, customerInfo, offerings } = useSubs();
  const { colors } = useAppTheme();

  return (
    <ScrollView>
      <ViewColumn>
        <Text style={{ color: colors.text }}>{`Is premium enabled: ${isPremiumEnabled}`}</Text>
        <Text style={{ color: colors.text }}>{JSON.stringify(customerInfo, null, 2)}</Text>
        <Category />
        <Text style={{ color: colors.text }}>{JSON.stringify(offerings?.current?.monthly, null, 2)}</Text>
      </ViewColumn>
    </ScrollView>
  );
}
