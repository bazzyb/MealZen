import { useQuery } from "@powersync/react-native";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";

import { getManyBooksStatement } from "./queries";
import { BookRecord } from "./schema";

export function useGetBooks(find?: string) {
  const { user } = useAuth();
  return useQuery<BookRecord>(getManyBooksStatement, [find || "", user?.id || LOCAL_USER_ID]);
}
