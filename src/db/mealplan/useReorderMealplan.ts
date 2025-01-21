import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";
import { Logger } from "@/utils/logger";

import { reorderMealplan } from "./queries";
import { Mealplan } from "./schema";

export function useReorderMealplan() {
  const [isMutating, setIsMutating] = useState(false);

  const db = usePowerSync();
  const { user } = useAuth();

  async function mutate(meals: Array<Mealplan>) {
    setIsMutating(true);
    try {
      const result = await reorderMealplan(meals, db, user?.id);
      return result;
    } catch (error) {
      Logger.error("useReorderMealplan", error);
    }
    setIsMutating(false);
  }

  return {
    mutate,
    isMutating,
  };
}
