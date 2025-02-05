import { useEffect, useState } from "react";

import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

import { EXAMPLE_MEAL_TABLE, ExampleMealRecord } from "./schema";

export function useGetExampleMeals(cuisineId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ExampleMealRecord[]>([]);

  useEffect(() => {
    supabase.client
      .from(EXAMPLE_MEAL_TABLE)
      .select()
      .eq("cuisine_id", cuisineId)
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
