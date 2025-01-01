import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Welcome to [Company Name]</Text>
        <Text style={styles.paragraph}>
          We are dedicated to providing the best service to our customers. Stay
          updated with the latest news and announcements here.
        </Text>
        <Text style={styles.subheading}>Latest Updates</Text>
        <Text style={styles.listItem}>- Update 1: New feature launched.</Text>
        <Text style={styles.listItem}>- Update 2: Maintenance scheduled.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f0f8ff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
  },
});
