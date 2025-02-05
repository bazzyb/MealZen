import { Heading, Text, ViewColumn } from "@/components";
import { BookRecord } from "@/db/book/schema";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  book: BookRecord;
};

export function BookDetails({ book }: Props) {
  const { colors } = useAppTheme();

  return (
    <ViewColumn flex={1}>
      <Heading size={18}>{book.name}</Heading>
      <Text style={{ color: colors.textSecondary }}>{book.author}</Text>
    </ViewColumn>
  );
}
