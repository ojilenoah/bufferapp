import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./components/Header";
import Balance from "./components/Balance";
import AccountCard from "./components/AccountCard";
import ActionsGrid from "./components/ActionsGrid";
import Transactions from "./components/Transactions";
import BottomNav from "./components/BottomNav";
import SendScreen from "./screens/SendScreen";
import BankUser from "./screens/BankUserFixed";
import TxnSent from "./screens/TxnSent";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

const Stack = createNativeStackNavigator();

function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.bgDecorative} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <AccountCard />
        <Balance />
        <ActionsGrid navigation={navigation} />
        <View style={{ height: 8 }} />
        <Transactions />
        <View style={{ height: 120 }} />
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Send" component={SendScreen} />
        <Stack.Screen name="BankUser" component={BankUser} />
        <Stack.Screen name="TxnSent" component={TxnSent} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
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
