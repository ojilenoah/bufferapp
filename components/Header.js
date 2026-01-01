import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ name = "Alex Sterling" }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarWrap}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg1_isMrqZPkdx_bwvuf9Gpv1BT22dq27Yh6BZGx-VQPCTkDbzto4iCrJ0FiCrh1LSNlf5lH_8M24cmqdgK8LPQ101o3QVrZt5VshsEfp5Wk0qHgOYBA48-G4PLxXQENg85l5DJpkOAzfhIJRSmRIDZ19msYkpeirFXjeXsRCIpstBlj-bjHL2YvWP7LOXYn2YIISIJ1DjSSjP0L4c8WE5i79A8PFUn-fDyyXdOfs1qukuTE28Axo2dzkoMOhIi3F1X-3Ry1hqXGuy",
            }}
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={styles.greeting}>Good evening,</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bell} activeOpacity={0.7}>
        <MaterialIcons name="notifications" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
  },
  left: { flexDirection: "row", alignItems: "center" },
  avatarWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    marginRight: 8,
  },
  avatar: { width: "100%", height: "100%" },
  greeting: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginBottom: 2 },
  name: { color: "#fff", fontSize: 16, fontWeight: "700" },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
});
