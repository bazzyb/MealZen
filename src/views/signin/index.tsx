import { zodResolver } from "@hookform/resolvers/zod";
import { usePowerSync } from "@powersync/react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Text, TextInput, ViewColumn, ViewRow } from "@/components";
import { useAuth } from "@/providers/AuthProvider";
import { useAppTheme } from "@/styles/useAppTheme";
import { handleEnableSync } from "@/utils/sync";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type SignInFields = z.infer<typeof SignInSchema>;

export function SignInLayout() {
  const { signIn } = useAuth();
  const { colors } = useAppTheme();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const powerSync = usePowerSync();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(SignInSchema),
  });

  async function handleSignIn({ email, password }: SignInFields) {
    setIsSigningIn(true);
    setSignInError(null);

    try {
      // Sign in to supabase auth
      const { id } = await signIn(email, password);

      // Enable sync if user is premium
      await handleEnableSync(id, powerSync);

      router.navigate({
        pathname: "/",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "confirm_email") {
          router.navigate({
            pathname: "/(auth)/confirm/[email]",
            params: { email },
          });
        } else {
          setSignInError(error.message);
          setIsSigningIn(false);
        }
      } else {
        setSignInError("An unknown error occurred");
        setIsSigningIn(false);
      }
    }
  }

  return (
    <ViewColumn height="100%" justifyContent="center" alignItems="center" padding={32} gap={8}>
      <Text size={24}>Sign In</Text>
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
      <ViewRow alignItems="baseline" gap={16}>
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
        {/* <Link style={{ color: colors.link }} href="/signup">
          Forgot password?
        </Link> */}
      </ViewRow>
      <Link style={{ color: colors.link, marginTop: 16 }} href="/signup">
        Need an account? Sign up here
      </Link>
    </ViewColumn>
  );
}
