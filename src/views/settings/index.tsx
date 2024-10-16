import { useState } from "react";
import { FlatList, Pressable } from "react-native";

import { Text, ViewColumn } from "@/components";
import { useAuth } from "@/providers/AuthProvider";
import { useAppTheme } from "@/styles/useAppTheme";

import { SignInModal } from "./SignInModal";

export default function SettingsView() {
  const { signOut, user, toggleSync } = useAuth();
  const { colors } = useAppTheme();

  const [signInModalOpen, setSignInModalOpen] = useState(false);

  return (
    <>
      <FlatList
        data={[
          {
            id: "account",
            option: user ? "Sign Out" : "Sign In",
            onPress: async () => {
              if (user) {
                toggleSync();
                await signOut();
              } else {
                setSignInModalOpen(true);
              }
            },
          },
        ]}
        keyExtractor={() => "key"}
        renderItem={({ item }) => (
          <Pressable
            onPress={item.onPress}
            style={({ pressed }) => ({
              backgroundColor: pressed ? colors.rowActiveBackground : colors.background,
            })}
          >
            <ViewColumn padding={16} borderBottomColor={colors.text} borderBottomWidth={1}>
              <Text>{item.option}</Text>
              {user && (
                <Text size={12} color={colors.textSecondary}>
                  {user.email}
                </Text>
              )}
            </ViewColumn>
          </Pressable>
        )}
      />
      <SignInModal isVisible={signInModalOpen} handleClose={() => setSignInModalOpen(false)} />
    </>
  );
}
