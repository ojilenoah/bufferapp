import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function BottomNav() {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.btn}>
          <MaterialIcons name="home" size={26} color="#13ec80" />
          <Text style={styles.labelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <MaterialIcons
            name="credit-card"
            size={26}
            color="rgba(255,255,255,0.5)"
          />
          <Text style={styles.label}>Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerBtn}>
          <MaterialIcons
            name="sync-alt"
            size={22}
            color="rgba(255,255,255,0.85)"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <MaterialIcons
            name="pie-chart"
            size={26}
            color="rgba(255,255,255,0.5)"
          />
          <Text style={styles.label}>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <MaterialIcons
            name="settings"
            size={26}
            color="rgba(255,255,255,0.5)"
          />
          <Text style={styles.label}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: "center",
  },
  nav: {
    width: "92%",
    borderRadius: 20,
    backgroundColor: "rgba(16,34,25,0.9)",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: { alignItems: "center" },
  label: { color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 2 },
  labelActive: {
    color: "#13ec80",
    fontSize: 10,
    marginTop: 2,
    fontWeight: "700",
  },
  centerBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    justifyContent: "center",
  },
});
