import { BOOK_TABLE, BookRecord } from "../schemas/book";
import { useQuery } from "@powersync/react-native";

const BookQuery = `
  SELECT * FROM ${BOOK_TABLE}
  WHERE name LIKE '%' || ? || '%'
  ORDER BY name ASC
`;

export function useGetBooks(find?: string) {
  return useQuery<BookRecord>(BookQuery, [find || ""]);
}
