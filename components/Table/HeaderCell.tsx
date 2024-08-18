import { PropsWithChildren } from "react";

import { Text } from "@/components";

type Props = {
  width?: number;
};

export function HeaderCell({ width, children }: PropsWithChildren<Props>) {
  return (
    <Text bold style={{ width, paddingLeft: 8 }}>
      {children}
    </Text>
  );
}
