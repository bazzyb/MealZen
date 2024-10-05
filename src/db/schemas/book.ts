import { ColumnsType, column } from "@powersync/react-native";
import { z } from "zod";

export const BOOK_TABLE = "book";
export const bookSchema = {
  // id column (text) is automatically included
  user_id: column.text,
  name: column.text,
  author: column.text,
} satisfies ColumnsType;

// Overwrites the local-only owner_id value with the logged-in user's id.
export const bookTableLocalToSyncStatement = `
  INSERT INTO ${BOOK_TABLE} (id, user_id, name, author)
  SELECT id, ?, name, author
  FROM inactive_local_${BOOK_TABLE}
`;

export const BookZodSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string().min(1),
  author: z.string().nullable(),
});
export type BookRecord = z.infer<typeof BookZodSchema>;
