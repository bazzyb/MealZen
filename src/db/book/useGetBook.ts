import { useQuery } from "@powersync/react-native";

import { getBookStatement } from "./queries";
import { BookRecord } from "./schema";

export function useGetBook(bookId: string) {
  return useQuery<BookRecord>(getBookStatement, [bookId]);
}
