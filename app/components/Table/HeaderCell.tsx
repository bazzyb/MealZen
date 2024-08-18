import { PropsWithChildren } from "react";

import { Text } from "@/app/components";

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
