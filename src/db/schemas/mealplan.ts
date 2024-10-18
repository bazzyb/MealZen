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

export const MealplanZodSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  meal_id: z.string().uuid().nullable(),
  date: z.string(),
  notes: z.string().nullable(),
});
export type MealplanRecord = z.infer<typeof MealplanZodSchema>;
