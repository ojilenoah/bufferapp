import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ActionsGrid({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.rectBtn, styles.primary]}
          onPress={() => navigation && navigation.navigate("Send")}
          activeOpacity={0.8}
        >
          <Text style={styles.rectLabel}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rectBtn}
          onPress={() => navigation && navigation.navigate("Request")}
          activeOpacity={0.8}
        >
          <Text style={styles.rectLabel}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  rectBtn: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    justifyContent: "center",
  },
  primary: { backgroundColor: "#13ec80" },
  rectLabel: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
