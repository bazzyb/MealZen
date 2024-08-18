import { PropsWithChildren } from "react";

import { Text } from "@/components/Text";

type Props = {
  width?: number;
};

export function RowCell({ width, children }: PropsWithChildren<Props>) {
  return <Text style={{ width, paddingLeft: 8 }}>{children}</Text>;
}