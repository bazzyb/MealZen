import { useLocalSearchParams } from "expo-router";

import { Button, Text, ViewColumn } from "@/components";
import { useAuth } from "@/providers/AuthProvider";

export function ConfirmLayout() {
  const { resendEmailConfirmation } = useAuth();
  const { email } = useLocalSearchParams<{ email: string }>();

  return (
    <ViewColumn height="100%" justifyContent="center" alignItems="center">
      <Text size={24}>Verify your email</Text>

      <Text>
        We've sent an email to <Text bold>{email}</Text>. Please click the link in the email to verify your email
        address.
      </Text>

      <Text>If you don't see the email, check your spam folder or click the button below to resend the email.</Text>

      <Button onPress={() => resendEmailConfirmation(email)}>Resend Email</Button>
    </ViewColumn>
  );
}
