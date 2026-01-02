import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
        <Text style={styles.label}>Total transactions</Text>

        <View style={styles.selectorWrap}>
          <TouchableOpacity
            onPress={() => setOpen((v) => !v)}
            style={styles.selector}
            activeOpacity={0.9}
          >
            <Text style={styles.selectorText}>{selected}</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={18}
              color="rgba(255,255,255,0.6)"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.amount}>${amount}</Text>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer} pointerEvents="box-none">
          <View style={styles.optionsCard}>
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
        </View>
      </Modal>
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
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    position: "absolute",
    top: 70,
    right: 20,
    alignItems: "flex-end",
  },
  optionsCard: {
    backgroundColor: "rgba(16,34,25,0.98)",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    minWidth: 160,
    paddingVertical: 6,
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
