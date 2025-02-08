import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { Button } from "@/components/core/Button";
import { Text } from "@/components/core/Text";
import { TextInput } from "@/components/core/TextInput";
import { useAuth } from "@/providers/AuthProvider";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";

const SignupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });
export type SignupFields = z.infer<typeof SignupSchema>;

export function SignupLayout() {
  const { signUp } = useAuth();
  const { colors } = useAppTheme();

  const [isSigningUp, setIsSigningUp] = useState(false);

  const { control, handleSubmit, formState } = useForm<SignupFields>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignupSchema),
    reValidateMode: "onSubmit",
  });

  async function onSubmit(data: SignupFields) {
    setIsSigningUp(true);
    try {
      const res = await signUp(data.email, data.password);
      if (!res.session) {
        router.navigate({
          pathname: "/(auth)/confirm/[email]",
          params: { email: data.email },
        });
        setIsSigningUp(false);
      } else {
        router.navigate("/");
        setIsSigningUp(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        Toast.show({
          type: "error",
          text1: "An error occurred while signing up",
          text2: err.message,
        });
        Logger.error(err.message);
      }
      setIsSigningUp(false);
    }
  }

  return (
    <ViewColumn height="100%" justifyContent="center" alignItems="center" padding={32} gap={8}>
      <Text size={24}>Create an account</Text>

      <Text>
        If you would like to sync your data across multiple devices, you will need to create an account and subscribe.
      </Text>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label="Email"
            placeholder="Enter an email address"
            onChangeText={field.onChange}
            value={field.value}
            error={formState.errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label="Password"
            placeholder="Enter a password"
            onChangeText={field.onChange}
            value={field.value}
            error={formState.errors.password?.message}
            autoComplete="current-password"
            secureTextEntry
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label="Confirm Password"
            placeholder="Confirm your password"
            onChangeText={field.onChange}
            value={field.value}
            error={formState.errors.confirmPassword?.message}
            autoComplete="current-password"
            secureTextEntry
          />
        )}
      />

      <Button
        accessibilityLabel="Create account"
        loading={isSigningUp}
        disabled={isSigningUp}
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 16 }}
      >
        Create account
      </Button>
      <Link style={{ color: colors.link, marginTop: 12 }} href="/signin">
        Already have an account? Sign in here
      </Link>
    </ViewColumn>
  );
}
