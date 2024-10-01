import { ColumnsType, column } from "@powersync/react-native";
import { z } from "zod";

export const BOOK_TABLE = "book";
export const bookSchema = {
  // id column (text) is automatically included
  user_id: column.text,
  name: column.text,
  author: column.text,
} satisfies ColumnsType;

export const BookZodSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string().min(1),
  author: z.string().nullable(),
});
export type BookRecord = z.infer<typeof BookZodSchema>;
