import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";

import { Button, Text, TextInput, ViewColumn } from "@/components";
import { useAuth } from "@/providers/AuthProvider";
import { useAppTheme } from "@/styles/useAppTheme";

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});
type ForgotPasswordFields = z.infer<typeof ForgotPasswordSchema>;

export function ForgotPasswordLayout() {
  const { resetPassword } = useAuth();
  const { colors } = useAppTheme();

  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { control, handleSubmit, formState } = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(ForgotPasswordSchema),
  });

  async function handleForgotPassword({ email }: ForgotPasswordFields) {
    setIsResettingPassword(true);
    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "An error occurred while sending the password reset email",
      });
    }
    setIsResettingPassword(false);
  }

  return (
    <ViewColumn height="100%" justifyContent="center" alignItems="center" padding={32} gap={8}>
      <Text size={24}>Reset Password</Text>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Email"
            onChangeText={field.onChange}
            value={field.value}
            autoComplete="username"
            keyboardType="email-address"
            error={formState.errors.email?.message}
          />
        )}
      />
      <Button
        color="success"
        style={{ marginTop: 16, width: "auto" }}
        disabled={isResettingPassword}
        loading={isResettingPassword}
        onPress={handleSubmit(handleForgotPassword)}
        accessibilityLabel="Sign In Button"
      >
        Send Password Reset Request
      </Button>
      {emailSent && (
        <ViewColumn marginTop={8}>
          <Text color={colors.successDark} bold>
            If an account with that email exists, a password reset email has been sent.
          </Text>
          <Text color={colors.successDark} bold>
            Please check your email for instructions on how to reset your password.
          </Text>
        </ViewColumn>
      )}
    </ViewColumn>
  );
}
