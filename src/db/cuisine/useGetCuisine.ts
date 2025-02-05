import { useEffect, useState } from "react";

import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

import { CUISINE_TABLE, CuisineRecord } from "./schema";

export function useGetCuisine(cuisineId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CuisineRecord | null>(null);

  useEffect(() => {
    supabase.client
      .from(CUISINE_TABLE)
      .select()
      .eq("id", cuisineId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          Logger.error(error);
          return;
        }

        setData(data);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading };
}
