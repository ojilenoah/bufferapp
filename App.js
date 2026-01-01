import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, ScrollView, Text } from "react-native";
import Header from "./components/Header";
import Balance from "./components/Balance";
import ActionsGrid from "./components/ActionsGrid";
import Transactions from "./components/Transactions";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.bgDecorative} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <Balance />
        <ActionsGrid />
        <View style={{ height: 8 }} />
        <Transactions />
        <View style={{ height: 120 }} />
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#102219" },
  container: { paddingBottom: 40 },
  bgDecorative: {
    position: "absolute",
    top: -120,
    left: -80,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(19,236,128,0.06)",
  },
});
