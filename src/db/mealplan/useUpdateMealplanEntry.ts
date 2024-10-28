import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";
import { Logger } from "@/utils/logger";

import { updateMealplanEntry } from "./queries";
import { MealplanRecord } from "./schema";

export function useUpdateMealplanEntry() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(mealplanEntry: Omit<MealplanRecord, "user_id">) {
    setIsMutating(true);
    try {
      const result = await updateMealplanEntry(mealplanEntry, db, user?.id);
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
