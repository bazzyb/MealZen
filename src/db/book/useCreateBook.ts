import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";

import { createBook } from "./queries";

export function useCreateBook() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(name: string) {
    setIsMutating(true);
    const result = await createBook(name, db, user?.id);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
