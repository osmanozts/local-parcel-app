import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useAuth } from "@/providers/auth-provider";

export default function ProfileTabScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView>
      {user ? (
        <>
          <Text style={styles.heading}>Profile Information</Text>
          <Text style={styles.info}>Name: {user.name}</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.info}>Role: {user.role}</Text>
        </>
      ) : (
        <Text style={styles.error}>User not logged in.</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    fontSize: 16,
    color: "red",
  },
});
