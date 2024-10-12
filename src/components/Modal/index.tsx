import { ViewColumn } from "../Layout/ViewColumn";
import { ViewRow } from "../Layout/ViewRow";
import { CloseButton } from "../core/CloseButton";
import { Text } from "../core/Text";
import { PropsWithChildren } from "react";
import { Modal as ModalBase, View } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type BodyProps = {
  handleClose: () => void;
  title: string;
};

function ModalBody({ handleClose, title, children }: PropsWithChildren<BodyProps>) {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: colors.modalBlurBackground,
        position: "absolute",
        bottom: 0,
        top: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "90%",
          maxWidth: 600,
        }}
      >
        <ViewRow
          backgroundColor={colors.gray[5]}
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
          paddingVertical={8}
          paddingHorizontal={16}
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color={colors.white} bold>
            {title}
          </Text>
          <CloseButton width={32} onPress={handleClose} />
        </ViewRow>
        <ViewColumn
          padding={16}
          alignItems="flex-start"
          gap={8}
          backgroundColor={colors.background}
          borderBottomLeftRadius={8}
          borderBottomRightRadius={8}
        >
          {children}
        </ViewColumn>
      </View>
    </View>
  );
}

type Props = {
  isVisible: boolean;
  handleClose: () => void;
  title: string;
};

export function Modal(props: PropsWithChildren<Props>) {
  const { isVisible, title, handleClose, children } = props;

  return (
    <ModalBase
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onDismiss={handleClose}
      onRequestClose={handleClose}
    >
      <ModalBody handleClose={handleClose} title={title}>
        {children}
      </ModalBody>
    </ModalBase>
  );
}
