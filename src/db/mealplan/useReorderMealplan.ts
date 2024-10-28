import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { Logger } from "@/utils/logger";

import { reorderMealplan } from "./queries";
import { Mealplan } from "./schema";

export function useReorderMealplan() {
  const [isMutating, setIsMutating] = useState(false);

  const db = usePowerSync();

  async function mutate(meals: Array<Mealplan>) {
    setIsMutating(true);
    try {
      const result = await reorderMealplan(meals, db);
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
