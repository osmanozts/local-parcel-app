import { useAuth } from "@/providers/auth-provider";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, ScrollView, Stack, Text, useTheme } from "tamagui";

export default function HomeScreen() {
  const theme = useTheme();
  const { signOut } = useAuth();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.backgroundColor?.val }}
    >
      <ScrollView width="100%" height="100%">
        <Stack>
          <Text color="$text">Welcome to [Company Name]</Text>
          <Text>
            We are dedicated to providing the best service to our customers.
            Stay updated with the latest news and announcements here.
          </Text>
          <Text>Latest Updates</Text>
          <Text>- Update 1: New feature launched.</Text>
          <Text>- Update 2: Maintenance scheduled.</Text>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}
