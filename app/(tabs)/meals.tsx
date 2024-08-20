import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Pressable } from "react-native";

import { Table, Text, ViewColumn, ViewRow } from "@/components";
import { useAppTheme } from "@/styles/useAppTheme";

const dummyMeals = Array.from({ length: 30 }, (_, index) => ({
  id: `${index}`,
  name: `Name - ${index}`,
  recipe: `Recipe - ${index}`,
  easyMeal: index % 3 === 0,
}));

export default function Index() {
  const { colors } = useAppTheme();

  return (
    <ViewColumn>
      <Table
        columns={[
          {
            label: "Name",
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
            accessorFn: () => (
              <Pressable
                style={({ pressed }) => ({
                  backgroundColor: pressed ? colors.errorDark : colors.error,
                  borderRadius: 4,
                  width: "100%",
                  paddingVertical: 4,
                })}
              >
                <Entypo name="cross" size={24} color={colors.white} style={{ textAlign: "center" }} />
              </Pressable>
            ),
            width: 48,
          },
        ]}
        data={dummyMeals}
      />
    </ViewColumn>
  );
}
