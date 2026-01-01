import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function Action({ icon, label, primary }) {
  return (
    <TouchableOpacity style={styles.action} activeOpacity={0.7}>
      <View style={[styles.iconWrap, primary && styles.primaryBg]}>
        <MaterialIcons
          name={icon}
          size={22}
          color={primary ? "#072015" : "#fff"}
        />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function ActionsGrid() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Action icon="arrow-upward" label="Send" primary />
        <Action icon="arrow-downward" label="Request" />
        <Action icon="currency-exchange" label="Swap" />
        <Action icon="more-horiz" label="More" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 12 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  action: { alignItems: "center", width: "22%" },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  primaryBg: {
    backgroundColor: "#13ec80",
    shadowColor: "#13ec80",
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  actionLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontWeight: "600",
  },
});
