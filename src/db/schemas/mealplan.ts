import { BOOK_TABLE } from "../book/schema";
import { MEAL_TABLE } from "../meal/schema";
import { ColumnsType, column } from "@powersync/react-native";
import { z } from "zod";

export const MEALPLAN_TABLE = "mealplan";
export const mealplanSchema = {
  // id column (text) is automatically included
  user_id: column.text,
  meal_id: column.text,
  name: column.text,
  date: column.text,
  notes: column.text,
} satisfies ColumnsType;

export const MealplanZodSchema = z
  .object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    meal_id: z.string().uuid().nullable(),
    name: z.string().nullable(),
    date: z.string(),
    notes: z.string().nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.meal_id && !data.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["meal_id"],
        message: "Must select a meal",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["name"],
        message: "Must enter a custom meal",
      });
    }
  });

// Overwrites the local-only owner_id value with the logged-in user's id.
export const mealplanTableLocalToSyncStatement = `
  INSERT INTO ${MEALPLAN_TABLE} (id, user_id, meal_id, name, date, notes)
  SELECT id, ?, meal_id, name, date, notes
  FROM inactive_local_${MEALPLAN_TABLE}
`;

export const MealplanQuery = `
  SELECT
    ${MEALPLAN_TABLE}.*,
    ${MEAL_TABLE}.name AS meal,
    ${MEAL_TABLE}.is_simple AS "isSimple",
    ${MEAL_TABLE}.is_overnight AS "isOvernight",
    ${MEAL_TABLE}.is_long_prep AS "isLongPrep",
    ${MEAL_TABLE}.is_long_cook AS "isLongCook",
    ${MEAL_TABLE}.recipe_url AS "recipeUrl",
    ${MEAL_TABLE}.page,
    ${BOOK_TABLE}.name AS book,
    ${BOOK_TABLE}.author AS author
  FROM ${MEALPLAN_TABLE}
  LEFT JOIN ${MEAL_TABLE} ON ${MEAL_TABLE}.id = ${MEALPLAN_TABLE}.meal_id
  LEFT JOIN ${BOOK_TABLE} ON ${BOOK_TABLE}.id = ${MEAL_TABLE}.book_id
  ORDER BY date ASC
`;

export type MealplanRecord = z.infer<typeof MealplanZodSchema>;
export type Mealplan = MealplanRecord & {
  meal: string;
  recipeUrl?: string;
  book?: string;
  author?: string;
  page?: number;
  isSimple: boolean;
  isOvernight: boolean;
  isLongPrep: boolean;
  isLongCook: boolean;
};
