import { MEAL_TABLE, MealRecord } from "../schemas/meal";
import { AbstractPowerSyncDatabase, useQuery } from "@powersync/react-native";

export const MealQuery = `
  SELECT * FROM ${MEAL_TABLE}
  ORDER BY name ASC
`;

export function getMeals(db: AbstractPowerSyncDatabase) {
  return db.getAll<MealRecord>(MealQuery, []);
}

export function useGetMeals() {
  return useQuery<MealRecord>(MealQuery, []);
}
