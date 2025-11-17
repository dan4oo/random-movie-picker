import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen
      name="index"
      options={{ title: "Random Movie Picker" }}
    />
    <Stack.Screen
      name="movieDetails"
      options={{ 
        title: "Movie Detail",
        headerBackButtonDisplayMode: "minimal",
        presentation: "modal",
      }}
    />
  </Stack>
  );
}
