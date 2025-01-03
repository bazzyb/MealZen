import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";

import { CreateMealValues, createMeal } from "./queries";

export function useCreateMeal() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(values: CreateMealValues) {
    setIsMutating(true);
    const result = await createMeal(values, db, user?.id);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
