import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { useAppTheme } from "@/styles/useAppTheme";

type IconProps = {
  disabled?: boolean;
  size?: number;
};

export function SimpleMealIcon({ size, disabled }: IconProps) {
  const { colors } = useAppTheme();

  return (
    <MaterialCommunityIcons
      name="umbrella-beach"
      size={size || 16}
      color={disabled ? colors.gray[5] : colors.successLight}
    />
  );
}

export function OvernightIcon({ size, disabled }: IconProps) {
  const { colors } = useAppTheme();

  return (
    <MaterialIcons name="nightlight-round" size={size || 20} color={disabled ? colors.gray[5] : colors.secondaryDark} />
  );
}

export function LongCookIcon({ size, disabled }: IconProps) {
  const { colors } = useAppTheme();

  return (
    <MaterialCommunityIcons
      name="pot-steam"
      size={size || 20}
      color={disabled ? colors.gray[5] : colors.textSecondary}
    />
  );
}

export function LongPrepIcon({ size, disabled }: IconProps) {
  const { colors } = useAppTheme();

  return (
    <MaterialCommunityIcons
      name="clock-time-eight"
      size={size || 20}
      color={disabled ? colors.gray[5] : colors.primaryLight}
    />
  );
}
