import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Modal, Text, TextInput } from "@/components";
import { useAuth } from "@/providers/AuthProvider";

type Props = {
  isVisible: boolean;
  handleClose: () => void;
};

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type SignInFields = z.infer<typeof SignInSchema>;

export function SignInModal({ isVisible, handleClose }: Props) {
  const { signIn, toggleSync } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const { control, handleSubmit, formState, resetField } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(SignInSchema),
  });

  async function handleSignIn({ email, password }: SignInFields) {
    setIsSigningIn(true);
    setSignInError(null);
    try {
      await signIn(email, password);
      toggleSync();
      resetField("email");
      resetField("password");
      handleClose();
    } catch (error) {
      if (error instanceof Error) {
        setSignInError(error.message);
      } else {
        setSignInError("An unknown error occurred");
      }
    }
    setIsSigningIn(false);
  }

  return (
    <Modal handleClose={handleClose} isVisible={isVisible} title="">
      <Text>Sign In</Text>
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
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Password"
            onChangeText={field.onChange}
            value={field.value}
            autoComplete="current-password"
            secureTextEntry
            error={formState.errors.password?.message}
          />
        )}
      />
      {signInError && <Text color="red">{signInError}</Text>}
      <Button
        color="green"
        style={{ marginTop: 16, width: "auto" }}
        disabled={isSigningIn}
        onPress={handleSubmit(handleSignIn)}
      >
        Sign In
      </Button>
    </Modal>
  );
}
