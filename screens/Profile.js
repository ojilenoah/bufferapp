import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            style={styles.avatar}
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          />
          <Text style={styles.name}>Alex Johnson</Text>
          <Text style={styles.email}>alex.johnson@mail.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Text style={styles.sectionText}>Checking •••• 8842</Text>
          <Text style={styles.sectionText}>Balance: $3,420.00</Text>
        </View>

        <TouchableOpacity
          style={styles.signout}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.signoutText}>Sign out</Text>
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
  card: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
  },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 12 },
  name: { color: "#fff", fontSize: 18, fontWeight: "800" },
  email: { color: "rgba(255,255,255,0.6)", marginTop: 4 },
  section: {
    marginTop: 18,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 10,
  },
  sectionTitle: { color: "#13ec80", fontWeight: "700", marginBottom: 6 },
  sectionText: { color: "#fff", marginBottom: 4 },
  signout: {
    marginTop: 20,
    backgroundColor: "#13ec80",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  signoutText: { color: "#072015", fontWeight: "800" },
});
