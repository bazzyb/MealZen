import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { StyleSheet } from "react-native";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { ViewRow } from "@/components/Layout/ViewRow";
import { Text } from "@/components/core/Text";
import { LIFETIME_SUBSCRIPTION_SKU } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";
import { useSubs } from "@/providers/SubsProvider";
import { useAppTheme } from "@/styles/useAppTheme";

export function UserInfo() {
  const { colors } = useAppTheme();
  const { user } = useAuth();
  const { isPremiumEnabled, customerInfo } = useSubs();

  const isLifetime = customerInfo?.activeSubscriptions.includes(LIFETIME_SUBSCRIPTION_SKU);
  const expiryDate = dayjs(customerInfo?.latestExpirationDate).format("DD MMMM YYYY");

  return (
    <ViewColumn
      paddingHorizontal={16}
      paddingVertical={8}
      borderBottomColor={colors.gray[5]}
      borderBottomWidth={StyleSheet.hairlineWidth}
    >
      <Text size={14}>{user?.email}</Text>
      {!isPremiumEnabled && (
        <Text size={12} color={colors.textSecondary} bold>
          Free User
        </Text>
      )}
      {isPremiumEnabled && (
        <ViewRow alignItems="center" gap={4}>
          <MaterialCommunityIcons name="crown" size={18} color={colors.secondary} />
          <Text size={12} color={colors.textSecondary} bold>
            Premium User
          </Text>
        </ViewRow>
      )}
      {isPremiumEnabled && !isLifetime && (
        <Text size={12} color={colors.textSecondary}>
          Expires: {expiryDate}
        </Text>
      )}
      {user?.new_email && (
        <Text
          size={12}
          color={colors.green[1]}
          bold
          style={{ backgroundColor: colors.green[7], padding: 8, marginVertical: 4 }}
        >
          Your request to change your email to {user.new_email} is pending verification. You should have received an
          email to your old and new email addresses. Click the link in each email to verify your new email address.
        </Text>
      )}
    </ViewColumn>
  );
}
