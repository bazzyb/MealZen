import { MEAL_TABLE, MealRecord } from "../schemas/meal";
import { AbstractPowerSyncDatabase, useQuery } from "@powersync/react-native";

export function getMeals(db: AbstractPowerSyncDatabase) {
  return db.getAll<MealRecord>(`SELECT * FROM ${MEAL_TABLE} ORDER BY name ASC`, []);
}

export function useGetMeals(bookId?: string) {
  let query = `SELECT * FROM ${MEAL_TABLE}`;
  if (bookId) {
    query += ` WHERE book_id = ?`;
  }
  query += ` ORDER BY name ASC`;

  return useQuery<MealRecord>(query, [bookId]);
}
