import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Balance({
  amount = "14,230.50",
  trend = "+2.4% this week",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total Fiat Balance</Text>
      <Text style={styles.amount}>${amount}</Text>
      <View style={styles.trendWrap}>
        <Text style={styles.trend}>▲ {trend}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: { color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 6 },
  amount: { color: "#fff", fontSize: 38, fontWeight: "800" },
  trendWrap: {
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  trend: { color: "#13ec80", fontWeight: "700", fontSize: 12 },
});
