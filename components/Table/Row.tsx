import { PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";

import { ViewRow } from "@/components/Views/ViewRow";

type Props = {
  draggableProps?: {
    drag: () => void;
    isActive: boolean;
  };
};

function DraggableWrapper({ draggableProps, children }: PropsWithChildren<Props>) {
  if (draggableProps) {
    return (
      <TouchableOpacity
        style={{ height: 50, alignItems: "center" }}
        onLongPress={draggableProps.drag}
        delayLongPress={300}
        disabled={draggableProps.isActive}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <ViewRow />;
}

export function TableRow({ draggableProps, children }: PropsWithChildren<Props>) {
  return (
    <DraggableWrapper draggableProps={draggableProps}>
      <ViewRow width="100%" justifyContent="flex-start" alignItems="center" height={50}>
        {children}
      </ViewRow>
    </DraggableWrapper>
  );
}
