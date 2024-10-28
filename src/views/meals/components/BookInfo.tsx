import { useMemo } from "react";

import { Text } from "@/components";
import { BookRecord } from "@/db/book/schema";
import { useAppTheme } from "@/styles/useAppTheme";
import { findBookInArray } from "@/utils/find";

type Props = {
  bookId: string;
  page: number | null;
  books: BookRecord[];
};

export function BookInfo({ bookId, page, books }: Props) {
  const { colors } = useAppTheme();

  const book = useMemo(() => findBookInArray(bookId, books), [bookId, books]);

  return (
    <>
      <Text color={colors.textSecondary} size={11}>
        {book?.name}
        {page && ` | p${page}`}
      </Text>
    </>
  );
}
