import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Settings({ navigation }) {
  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Help & Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#102219" },
  header: {
    height: 72,
    paddingTop: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "700" },
  container: { padding: 16 },
  row: {
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  rowText: { color: "#fff" },
});
