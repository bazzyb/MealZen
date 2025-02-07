import { z } from "zod";

export const EXAMPLE_MEAL_TABLE = "examplemeal";

export const ExampleMealZodSchema = z.object({
  id: z.string().uuid(),
  cuisine_id: z.string().uuid(),
  name: z.string().min(1),
  cuisine: z.object({
    name: z.string().min(1),
  }),
});
export type ExampleMealRecord = z.infer<typeof ExampleMealZodSchema>;

export type ExampleMeal = Omit<ExampleMealRecord, "cuisine"> & {
  cuisine: string;
};
