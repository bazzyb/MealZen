import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Pressable, View } from "react-native";

import { Table, Text, ViewColumn, ViewRow } from "@/components";
import { useDeleteMeal } from "@/db/mutations/useDeleteMeal";
import { useGetMeals } from "@/db/queries/useGetMeals";
import { useAppTheme } from "@/styles/useAppTheme";

export function MealsTable() {
  const { colors } = useAppTheme();

  const { data: meals, isLoading } = useGetMeals();
  const { mutate: deleteMeal, isMutating: isDeletingMeal } = useDeleteMeal();

  if (isLoading) {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!meals.length) {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Text>No meals found</Text>
      </View>
    );
  }

  return (
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
                {item.recipe && (
                  <Text size={11} color={colors.textSecondary}>
                    {item.recipe}
                  </Text>
                )}
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
                paddingVertical: 2,
              })}
              onPress={async () => deleteMeal(item.id)}
              disabled={isDeletingMeal}
            >
              <Entypo name="cross" size={24} color={colors.white} style={{ textAlign: "center" }} />
            </Pressable>
          ),
          width: 28,
        },
      ]}
    />
  );
}
