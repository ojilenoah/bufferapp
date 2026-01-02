import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const COMMON_ICON = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const data = [
  {
    id: "1",
    title: "Chinedu Okeke",
    subtitle: "Today, 9:41 AM",
    amount: "-$5.50",
    icon: COMMON_ICON,
    type: "debit",
  },
  {
    id: "2",
    title: "Aisha Bello",
    subtitle: "Yesterday, 2:10 PM",
    amount: "+$1,200.00",
    icon: COMMON_ICON,
    type: "credit",
  },
  {
    id: "3",
    title: "Emeka Nwankwo",
    subtitle: "Aug 28, 11:02 AM",
    amount: "-$50.00",
    icon: COMMON_ICON,
    type: "debit",
  },
  {
    id: "4",
    title: "Ngozi Amadi",
    subtitle: "Aug 22",
    amount: "-$24.50",
    icon: COMMON_ICON,
    type: "debit",
  },
];

function Row({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Image source={{ uri: item.icon }} style={styles.icon} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text
          style={[
            styles.amount,
            item.type === "credit" ? styles.credit : styles.debit,
          ]}
        >
          {item.amount}
        </Text>
        <Text style={styles.type}>
          {item.type === "credit" ? "COMPLETED" : item.type.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

export default function Transactions() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Recent Activity</Text>
        <Text style={styles.filter}>Filter</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <Row item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 8, flex: 1 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  header: { color: "#fff", fontSize: 18, fontWeight: "700" },
  filter: { color: "#13ec80", fontWeight: "700" },
  card: {
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 12,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: { flexDirection: "row", alignItems: "center", gap: 10 },
  icon: { width: 44, height: 44, borderRadius: 10, marginRight: 10 },
  title: { color: "#fff", fontSize: 14, fontWeight: "700" },
  subtitle: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  right: { alignItems: "flex-end" },
  amount: { fontSize: 14, fontWeight: "800" },
  credit: { color: "#13ec80" },
  debit: { color: "#fff" },
  type: { fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 4 },
});
