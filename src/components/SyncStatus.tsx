import Feather from "@expo/vector-icons/Feather";
import { useStatus } from "@powersync/react-native";
import { useEffect, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

import { useSubs } from "@/providers/SubsProvider";
import { useAppTheme } from "@/styles/useAppTheme";

import { ViewRow } from "./Layout/ViewRow";
import { Text } from "./core/Text";

export function SyncStatus() {
  const status = useStatus();
  const { isPremiumEnabled } = useSubs();
  const { colors } = useAppTheme();

  const sv = useSharedValue<number>(0);

  useEffect(() => {
    sv.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value}deg` }],
  }));

  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (status.dataFlowStatus.uploading || status.dataFlowStatus.downloading) {
      setIsSyncing(true);
    } else {
      setIsSyncing(false);
    }
  }, [status]);

  if (!isPremiumEnabled || !isSyncing) {
    return null;
  }

  return (
    <ViewRow gap={8} alignItems="center" marginRight={16}>
      <Animated.View style={animatedStyle}>
        <Feather name="refresh-cw" size={20} color={colors.headerText} />
      </Animated.View>
      <Text size={12} style={{ color: colors.headerText }}>
        Syncing...
      </Text>
    </ViewRow>
  );
}
