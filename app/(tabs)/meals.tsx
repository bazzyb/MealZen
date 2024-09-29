import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Button, Pressable } from "react-native";

import { Table, Text, ViewColumn, ViewRow } from "@/components";
import { useCreateMeal } from "@/db/mutations/useCreateMeal";
import { useDeleteMeal } from "@/db/mutations/useDeleteMeal";
import { useGetMeals } from "@/db/queries/useGetMeals";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";

export default function Index() {
  const { colors } = useAppTheme();

  const { mutate: createMeal, isMutating: isCreatingMeal } = useCreateMeal();
  const { mutate: deleteMeal, isMutating: isDeletingMeal } = useDeleteMeal();

  const { data: meals, isLoading } = useGetMeals();

  return (
    <ViewColumn>
      <Button
        title="Create Meal"
        onPress={async () => {
          try {
            const newMeal = await createMeal("New Meal 3");

            Logger.log("newMeal", newMeal);
          } catch (err) {
            Logger.error("Failed to create meal", err);
          }
        }}
        disabled={isCreatingMeal}
      />
      {isLoading || !meals.length ? (
        <Text>Loading...</Text>
      ) : (
        <Table
          hideHeader
          data={meals}
          columns={[
            {
              id: "name",
              accessorFn: item => (
                <ViewRow alignItems="center">
                  <ViewColumn paddingRight={8}>
                    <Text>{item.name}</Text>
                    <Text size={11} color={colors.textSecondary}>
                      {item.recipe}
                    </Text>
                  </ViewColumn>
                  {item.easyMeal && <FontAwesome5 name="umbrella-beach" size={12} color={colors.success} />}
                </ViewRow>
              ),
            },
            {
              id: "delete-row",
              accessorFn: item => (
                <Pressable
                  style={({ pressed }) => ({
                    backgroundColor: pressed ? colors.errorDark : colors.error,
                    borderRadius: 4,
                    width: "100%",
                    paddingVertical: 4,
                  })}
                  onPress={async () => deleteMeal(item.id)}
                  disabled={isDeletingMeal}
                >
                  <Entypo name="cross" size={24} color={colors.white} style={{ textAlign: "center" }} />
                </Pressable>
              ),
              width: 48,
            },
          ]}
        />
      )}
    </ViewColumn>
  );
}
