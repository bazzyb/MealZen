import { Stack } from "expo-router";

import BooksView from "@/views/collection/books";

export default function Books() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Books",
        }}
      />
      <BooksView />
    </>
  );
}
