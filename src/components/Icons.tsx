import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { useAppTheme } from "@/styles/useAppTheme";

type IconProps = {
  disabled?: boolean;
  size?: number;
};

export function SimpleMealIcon({ disabled }: IconProps) {
  const { colors } = useAppTheme();

  return <FontAwesome5 name="umbrella-beach" size={16} color={disabled ? colors.gray[5] : colors.successLight} />;
}

export function OvernightIcon({ disabled }: IconProps) {
  const { colors } = useAppTheme();

  return <MaterialIcons name="nightlight-round" size={20} color={disabled ? colors.gray[5] : colors.secondaryDark} />;
}

export function LongCookIcon({ disabled }: IconProps) {
  const { colors } = useAppTheme();

  return <MaterialCommunityIcons name="pot-steam" size={20} color={disabled ? colors.gray[5] : colors.textSecondary} />;
}

export function LongPrepIcon({ disabled }: IconProps) {
  const { colors } = useAppTheme();

  return (
    <MaterialCommunityIcons name="clock-time-eight" size={20} color={disabled ? colors.gray[5] : colors.primaryLight} />
  );
}
