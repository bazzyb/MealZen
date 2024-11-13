import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";

import { Button, Modal, Text, TextInput, ViewRow } from "@/components";
import { useAuth } from "@/providers/AuthProvider";
import { parseError } from "@/utils/errors";

type Props = {
  isVisible: boolean;
  handleClose: () => void;
};

const UpdateEmailSchema = z.object({
  email: z.string().email(),
});
type UpdateEmailFields = z.infer<typeof UpdateEmailSchema>;

export function UpdateEmailModal({ isVisible, handleClose }: Props) {
  const { user, updateEmail } = useAuth();
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [updateEmailError, setUpdateEmailError] = useState<string | null>(null);

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: { email: user?.email ?? "" },
    resolver: zodResolver(UpdateEmailSchema),
  });

  function onClose() {
    handleClose();
    reset();
  }

  async function handleUpdateEmail({ email }: UpdateEmailFields) {
    setIsUpdatingEmail(true);
    setUpdateEmailError(null);

    try {
      await updateEmail(email);
      Toast.show({
        type: "info",
        text1: "Email verification sent",
        text2:
          "An email has been sent to your current email, and your new email. Click the link in both emails to verify your new email address.",
      });
      onClose();
    } catch (error) {
      setUpdateEmailError(parseError(error));
    }
    setIsUpdatingEmail(false);
  }

  return (
    <Modal handleClose={onClose} isVisible={isVisible} title="Change your email address">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            onChangeText={field.onChange}
            value={field.value}
            autoComplete="username"
            keyboardType="email-address"
            error={formState.errors.email?.message}
          />
        )}
      />
      {updateEmailError && <Text color="red">{updateEmailError}</Text>}
      <ViewRow justifyContent="flex-end" width="100%" gap={8}>
        <Button
          color="disabled"
          style={{ marginTop: 16, width: "auto" }}
          disabled={isUpdatingEmail}
          onPress={onClose}
          accessibilityLabel="Cancel Button"
        >
          Cancel
        </Button>
        <Button
          color="success"
          style={{ marginTop: 16, width: "auto" }}
          disabled={isUpdatingEmail}
          onPress={handleSubmit(handleUpdateEmail)}
          accessibilityLabel="Update Email Button"
        >
          Update
        </Button>
      </ViewRow>
    </Modal>
  );
}
