import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";

import { deleteBooks } from "./queries";

export function useDeleteBooks() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(bookIds: Array<string>) {
    setIsMutating(true);
    const result = await deleteBooks(bookIds, db, user?.id);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
