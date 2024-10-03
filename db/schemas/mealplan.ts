import { ColumnsType, column } from "@powersync/react-native";
import { z } from "zod";

export const MEALPLAN_TABLE = "mealplan";
export const mealplanSchema = {
  // id column (text) is automatically included
  user_id: column.text,
  meal_id: column.text,
  date: column.text,
  notes: column.text,
} satisfies ColumnsType;

// Overwrites the local-only owner_id value with the logged-in user's id.
export const mealplanTableLocalToSyncStatement = `
  INSERT INTO ${MEALPLAN_TABLE} (id, user_id, meal_id, date, notes)
  SELECT id, ?, meal_id, date, notes
  FROM inactive_local_${MEALPLAN_TABLE}
`;

export const MealplanZodSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  meal_id: z.string().uuid().nullable(),
  date: z.string().datetime(),
  notes: z.string().nullable(),
});
export type MealplanRecord = z.infer<typeof MealplanZodSchema>;
