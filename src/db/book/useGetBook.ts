import { useQuery } from "@powersync/react-native";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";

import { getBookStatement } from "./queries";
import { BookRecord } from "./schema";

export function useGetBook(bookId: string) {
  const { user } = useAuth();
  return useQuery<BookRecord>(getBookStatement, [bookId, user?.id || LOCAL_USER_ID]);
}
