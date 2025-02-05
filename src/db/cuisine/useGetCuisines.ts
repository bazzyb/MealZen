import { useEffect, useState } from "react";

import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

import { CUISINE_TABLE, CuisineRecord } from "./schema";

export function useGetCuisines() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CuisineRecord[]>([]);

  useEffect(() => {
    supabase.client
      .from(CUISINE_TABLE)
      .select()
      .order("name", { ascending: true })
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
