import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

import { EXAMPLE_MEAL_TABLE, ExampleMeal, ExampleMealRecord } from "./schema";

function formatResponse(data: ExampleMealRecord[]): ExampleMeal[] {
  return data.map(item => ({
    ...item,
    cuisine: item.cuisine.name,
  }));
}

export function useGetExampleMeals() {
  return useQuery<ExampleMeal[]>({
    queryKey: ["EXAMPLE_MEALS"],
    initialData: [],

    queryFn: async () => {
      const { data, error } = await supabase.client
        .from(EXAMPLE_MEAL_TABLE)
        .select(`*, cuisine ( name )`)
        .order("name", { ascending: true });

      if (error) {
        Logger.error(error);
        return [];
      }

      return formatResponse(data);
    },
  });
}
