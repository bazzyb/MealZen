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

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(SignInSchema),
  });

  function onClose() {
    handleClose();
    reset();
  }

  async function handleSignIn({ email, password }: SignInFields) {
    setIsSigningIn(true);
    setSignInError(null);
    try {
      await signIn(email, password);
      toggleSync();
      onClose();
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
    <Modal handleClose={onClose} isVisible={isVisible} title="">
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
        color="success"
        style={{ marginTop: 16, width: "auto" }}
        disabled={isSigningIn}
        onPress={handleSubmit(handleSignIn)}
        accessibilityLabel="Sign In Button"
      >
        Sign In
      </Button>
    </Modal>
  );
}
