import { ColumnsType, column } from "@powersync/react-native";
import { z } from "zod";

export const EXAMPLE_MEAL_TABLE = "examplemeal";
export const exampleMealSchema = {
  // id column (text) is automatically included
  cuisine_id: column.text,
  name: column.text,
} satisfies ColumnsType;

export const ExampleMealZodSchema = z.object({
  id: z.string().uuid(),
  cuisine_id: z.string().uuid(),
  name: z.string().min(1),
});
export type ExampleMealRecord = z.infer<typeof ExampleMealZodSchema>;
