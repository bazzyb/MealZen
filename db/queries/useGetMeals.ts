import { useQuery } from "@powersync/react-native";

export function useGetMeals() {
  return useQuery("SELECT * FROM meal", []);
}
