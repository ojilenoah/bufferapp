import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Home")}
        >
          <MaterialIcons name="home" size={26} color="#13ec80" />
          <Text style={styles.labelActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Send")}
        >
          <MaterialIcons name="send" size={24} color="rgba(255,255,255,0.9)" />
          <Text style={styles.label}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centerBtn}
          onPress={() => navigation.navigate("Send")}
        >
          <MaterialIcons name="sync-alt" size={22} color="#072015" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Settings")}
        >
          <MaterialIcons
            name="settings"
            size={26}
            color="rgba(255,255,255,0.9)"
          />
          <Text style={styles.label}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/40" }}
            style={styles.profileImage}
          />
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
  label: { color: "rgba(255,255,255,0.9)", fontSize: 10, marginTop: 2 },
  labelActive: {
    color: "#13ec80",
    fontSize: 10,
    marginTop: 2,
    fontWeight: "700",
  },
  centerBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#13ec80",
    alignItems: "center",
    justifyContent: "center",
  },
  profileBtn: { width: 40, height: 40, borderRadius: 20, overflow: "hidden" },
  profileImage: { width: 40, height: 40 },
});
