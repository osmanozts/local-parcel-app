import { AuthProvider } from "@/providers/auth-provider";
import tamaguiConfig from "@/theme/tamagui.config";
import { TamaguiProvider } from "@tamagui/core";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    Open: require("../assets/fonts/OpenSans-Regular.ttf"),
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthProvider>
    </TamaguiProvider>
  );
}
