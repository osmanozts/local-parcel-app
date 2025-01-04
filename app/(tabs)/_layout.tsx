import { Tabs } from "expo-router";
import { PersonStanding, Warehouse, CarFront } from "@tamagui/lucide-icons";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.accentColor?.val,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Firma",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Warehouse color={focused ? "$accent" : "$disabled"} />
          ),
        }}
      />
      <Tabs.Screen
        name="vehicles"
        options={{
          title: "Fahrzeuge",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CarFront color={focused ? "$accent" : "$disabled"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <PersonStanding color={focused ? "$accent" : "$disabled"} />
          ),
        }}
      />
    </Tabs>
  );
}
