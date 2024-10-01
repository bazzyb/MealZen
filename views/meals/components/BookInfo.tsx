import { useMemo } from "react";

import { Text } from "@/components";
import { BookRecord } from "@/db/schemas/book";
import { useAppTheme } from "@/styles/useAppTheme";

function getBookOnMeal(bookId: string, books: BookRecord[]) {
  return books.find(b => b.id === bookId);
}

type Props = {
  bookId: string;
  page: number | null;
  books: BookRecord[];
};

export function BookInfo({ bookId, page, books }: Props) {
  const { colors } = useAppTheme();

  const book = useMemo(() => getBookOnMeal(bookId, books), [bookId, books]);

  return (
    <>
      <Text color={colors.textSecondary} size={11}>
        {book?.name}
        {page && ` | p${page}`}
      </Text>
    </>
  );
}
