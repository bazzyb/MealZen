import { BOOK_TABLE, BookRecord } from "../schemas/book";
import { useQuery } from "@powersync/react-native";

const BookQuery = `
  SELECT * FROM ${BOOK_TABLE}
  ORDER BY name ASC
`;

export function useGetBooks() {
  return useQuery<BookRecord>(BookQuery, []);
}
