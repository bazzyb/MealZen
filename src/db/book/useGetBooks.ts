import { useQuery } from "@powersync/react-native";

import { getManyBooksStatement } from "./queries";
import { BookRecord } from "./schema";

export function useGetBooks(find?: string) {
  return useQuery<BookRecord>(getManyBooksStatement, [find || ""]);
}
