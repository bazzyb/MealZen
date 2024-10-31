import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";
import { Logger } from "@/utils/logger";

import { deleteMealplanEntries } from "./queries";

export function useDeleteMealplanEntry() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(mealplanEntryId: string) {
    setIsMutating(true);
    try {
      const result = await deleteMealplanEntries(db, user?.id, { id: mealplanEntryId });
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
