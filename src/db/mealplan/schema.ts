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
