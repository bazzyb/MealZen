import { BOOK_TABLE, BookRecord } from "../schemas/book";
import { useQuery } from "@powersync/react-native";

const BookQuery = `
  SELECT * FROM ${BOOK_TABLE}
  WHERE id = ?
`;

export function useGetBook(bookId: string) {
  return useQuery<BookRecord>(BookQuery, [bookId]);
}