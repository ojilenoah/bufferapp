import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RANGES = ["Today", "This week", "This month", "This year"];

export default function Balance({
  amount = "14,230.50",
  trend = "+2.4% this week",
}) {
  const [selected, setSelected] = useState("This week");
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.label}>Total transactions this week</Text>
        <View style={{ width: 12 }} />
        <View style={styles.selectorWrap}>
          <TouchableOpacity
            onPress={() => setOpen((v) => !v)}
            style={styles.selector}
          >
            <Text style={styles.selectorText}>{selected}</Text>
            <Text style={styles.selectorArrow}>▾</Text>
          </TouchableOpacity>
          {open && (
            <View style={styles.options}>
              {RANGES.map((r) => (
                <TouchableOpacity
                  key={r}
                  onPress={() => {
                    setSelected(r);
                    setOpen(false);
                  }}
                  style={styles.option}
                >
                  <Text style={styles.optionText}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

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
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  label: { color: "rgba(255,255,255,0.6)", fontSize: 13 },
  selectorWrap: { position: "relative" },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 10,
  },
  selectorText: { color: "#fff", fontSize: 12, marginRight: 6 },
  selectorArrow: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  options: {
    position: "absolute",
    right: 0,
    top: 44,
    backgroundColor: "rgba(16,34,25,0.95)",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  option: { paddingHorizontal: 12, paddingVertical: 8 },
  optionText: { color: "#fff" },
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
