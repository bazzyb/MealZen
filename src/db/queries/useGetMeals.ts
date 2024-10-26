import { MEAL_TABLE, Meal, MealRecord } from "../schemas/meal";
import { AbstractPowerSyncDatabase, useQuery } from "@powersync/react-native";

import { MealTableFilters, buildMealQuery } from "./meals";

export function getMealsWithoutJoin(db: AbstractPowerSyncDatabase) {
  return db.getAll<MealRecord>(`SELECT * FROM ${MEAL_TABLE} ORDER BY name ASC`, []);
}

export function useGetMeals(filters?: MealTableFilters) {
  return useQuery<Meal>(buildMealQuery(filters || {}), [filters?.find?.toLowerCase()]);
}
