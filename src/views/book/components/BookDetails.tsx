import { Text, ViewColumn } from "@/components";
import { BookRecord } from "@/db/book/schema";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  book: BookRecord;
};

export function BookDetails({ book }: Props) {
  const { colors, headerFontFamily } = useAppTheme();

  return (
    <ViewColumn flex={1}>
      <Text style={{ fontFamily: headerFontFamily, fontSize: 18 }}>{book.name}</Text>
      <Text style={{ color: colors.textSecondary }}>{book.author}</Text>
    </ViewColumn>
  );
}
