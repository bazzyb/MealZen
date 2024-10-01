import { MealRecord } from "../schemas/meal";
import { useQuery } from "@powersync/react-native";

const MealQuery = `
  SELECT * FROM meal
`;

export function useGetMeals() {
  return useQuery<MealRecord>(MealQuery, []);
}
