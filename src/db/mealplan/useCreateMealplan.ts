import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";
import { Logger } from "@/utils/logger";

import { MealplanArray, createMealplan } from "./queries";

export function useCreateMealplan() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(meals: MealplanArray) {
    setIsMutating(true);
    try {
      const result = await createMealplan(meals, db, user?.id);
      return result;
    } catch (error) {
      Logger.error("useCreateMealplan", error);
    }
    setIsMutating(false);
  }

  return {
    mutate,
    isMutating,
  };
}
