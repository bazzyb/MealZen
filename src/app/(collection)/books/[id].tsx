import { Stack } from "expo-router";

import { BookView } from "@/views/collection/book";

export default function Book() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Book Details",
        }}
      />
      <BookView />
    </>
  );
}
