import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";

const vehicles = [
  { id: "1", name: "Truck 1", status: "Available" },
  { id: "2", name: "Van 2", status: "In Maintenance" },
  { id: "3", name: "Car 3", status: "Assigned" },
];

export default function VehiclesTabScreen() {
  return (
    <SafeAreaView>
      <Text style={styles.heading}>Assigned Vehicles</Text>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#eef6f9",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    marginTop: 4,
  },
});
