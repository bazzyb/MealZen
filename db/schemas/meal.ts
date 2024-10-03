import { ColumnsType, column } from "@powersync/react-native";
import { z } from "zod";

export const MEAL_TABLE = "meal";
export const mealSchema = {
  // id column (text) is automatically included
  user_id: column.text,
  name: column.text,
  is_simple: column.integer,
  is_overnight: column.integer,
  is_long_prep: column.integer,
  is_long_cook: column.integer,
  recipe_url: column.text,
  book_id: column.text,
  page: column.integer,
} satisfies ColumnsType;

// Overwrites the local-only owner_id value with the logged-in user's id.
export const mealTableLocalToSyncStatement = `
  INSERT INTO ${MEAL_TABLE} (
    id, user_id, name, is_simple, is_overnight, is_long_prep, is_long_cook, recipe_url, book_id, page
  )
  SELECT id, ?, name, is_simple, is_overnight, is_long_prep, is_long_cook, recipe_url, book_id, page
  FROM inactive_local_${MEAL_TABLE}
`;

export const MealZodSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string().min(1),
  is_simple: z.number(),
  is_overnight: z.number(),
  is_long_prep: z.number(),
  is_long_cook: z.number(),
  recipe_url: z.string().url().nullable(),
  book_id: z.string().uuid().nullable(),
  page: z.number().nullable(),
});
export type MealRecord = z.infer<typeof MealZodSchema>;
