import { MEAL_TABLE, Meal, MealRecord } from "../schemas/meal";
import { AbstractPowerSyncDatabase, useQuery } from "@powersync/react-native";

import { buildMealQuery } from "./meals";

export function getMealsWithoutJoin(db: AbstractPowerSyncDatabase) {
  return db.getAll<MealRecord>(`SELECT * FROM ${MEAL_TABLE} ORDER BY name ASC`, []);
}

export function useGetMeals(bookId?: string) {
  return useQuery<Meal>(buildMealQuery({ bookId }));
}
