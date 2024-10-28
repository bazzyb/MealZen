import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";
import { Logger } from "@/utils/logger";

import { updateMeal } from "./queries";
import { MealRecord } from "./schema";

export function useUpdateMeal() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(meal: Omit<MealRecord, "user_id">) {
    setIsMutating(true);
    try {
      const result = await updateMeal(meal, db, user?.id);
      setIsMutating(false);
      return result;
    } catch (err) {
      setIsMutating(false);
      Logger.error(err);
    }
  }

  return {
    mutate,
    isMutating,
  };
}
