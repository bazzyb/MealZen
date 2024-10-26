import { Mealplan, MealplanQuery } from "../schemas/mealplan";
import { useQuery } from "@powersync/react-native";

export function useGetMealplan() {
  return useQuery<Mealplan>(MealplanQuery, []);
}
