import { useQuery } from "@powersync/react-native";

import { MealplanQuery } from "./queries";
import { Mealplan } from "./schema";

export function useGetMealplan() {
  return useQuery<Mealplan>(MealplanQuery, []);
}
