import { ColumnsType, column } from "@powersync/react-native";
import { z } from "zod";

export const CUISINE_TABLE = "cuisine";
export const cuisineSchema = {
  // id column (text) is automatically included
  name: column.text,
} satisfies ColumnsType;

export const CuisineZodSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
});
export type CuisineRecord = z.infer<typeof CuisineZodSchema>;
