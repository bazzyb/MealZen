import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";

import { deleteBook } from "./queries";

export function useDeleteBook() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(mealId: string) {
    setIsMutating(true);
    const result = await deleteBook(mealId, db, user?.id);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
