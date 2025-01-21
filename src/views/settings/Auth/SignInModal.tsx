import { zodResolver } from "@hookform/resolvers/zod";
import { usePowerSync } from "@powersync/react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Modal, Text, TextInput } from "@/components";
import { useAuth } from "@/providers/AuthProvider";
import { handleEnableSync } from "@/utils/sync";

type Props = {
  isVisible: boolean;
  handleClose: () => void;
  setIsChangingAuth: (isChanging: boolean) => void;
};

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type SignInFields = z.infer<typeof SignInSchema>;

export function SignInModal({ isVisible, handleClose, setIsChangingAuth }: Props) {
  const { signIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const powerSync = usePowerSync();

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
    setIsChangingAuth(true);
    setSignInError(null);

    try {
      // Sign in to supabase auth
      const { id } = await signIn(email, password);

      // Enable sync if user is premium
      await handleEnableSync(id, powerSync);

      // Close modal
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "confirm_email") {
          onClose();
          router.navigate({
            pathname: "/(auth)/confirm/[email]",
            params: { email },
          });
        } else {
          setSignInError(error.message);
        }
      } else {
        setSignInError("An unknown error occurred");
      }
    }
    setIsChangingAuth(false);
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
        loading={isSigningIn}
        onPress={handleSubmit(handleSignIn)}
        accessibilityLabel="Sign In Button"
      >
        Sign In
      </Button>
    </Modal>
  );
}
