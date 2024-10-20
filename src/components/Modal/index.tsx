import { ViewColumn } from "../Layout/ViewColumn";
import { ViewRow } from "../Layout/ViewRow";
import { Text } from "../core/Text";
import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Modal as ModalBase,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type BodyProps = {
  handleClose: () => void;
  title: string;
};

function ModalBody({ handleClose, title, children }: PropsWithChildren<BodyProps>) {
  const { colors } = useAppTheme();

  return (
    <TouchableWithoutFeedback onPressOut={handleClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.modalBlurBackground,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior="position"
            style={{
              width: "90%",
              maxWidth: 600,
              maxHeight: Platform.OS === "ios" ? "50%" : "80%",
            }}
          >
            <ViewRow
              backgroundColor={colors.background}
              borderTopLeftRadius={8}
              borderTopRightRadius={8}
              paddingTop={8}
              paddingHorizontal={16}
              alignItems="center"
              justifyContent="space-between"
            >
              <Text color={colors.text} bold>
                {title}
              </Text>
            </ViewRow>
            <ViewColumn
              padding={16}
              backgroundColor={colors.background}
              borderBottomLeftRadius={8}
              borderBottomRightRadius={8}
            >
              <ScrollView
                contentContainerStyle={{
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                {children}
              </ScrollView>
            </ViewColumn>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
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
