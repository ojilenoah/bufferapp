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

const transactionData = [
  {
    id: "1",
    title: "Chinedu Okeke",
    subtitle: "Today, 9:41 AM",
    amount: "-$5.50",
    icon: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    type: "reversed",
  },
  {
    id: "2",
    title: "Aisha Bello",
    subtitle: "Yesterday, 2:10 PM",
    amount: "+$1,200.00",
    icon: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    type: "sent",
  },
  {
    id: "3",
    title: "Emeka Nwankwo",
    subtitle: "Aug 28, 11:02 AM",
    amount: "-$50.00",
    icon: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    type: "reversed",
  },
  {
    id: "4",
    title: "Ngozi Amadi",
    subtitle: "Aug 22",
    amount: "-$24.50",
    icon: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    type: "reversed",
  },
  {
    id: "5",
    title: "Tunde Adebayo",
    subtitle: "Today, 3:15 PM",
    amount: "-$10.00",
    icon: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    type: "sent",
  },
  {
    id: "6",
    title: "Fatima Hassan",
    subtitle: "Yesterday, 8:45 AM",
    amount: "+$500.00",
    icon: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    type: "sent",
  },
  {
    id: "7",
    title: "Ibrahim Musa",
    subtitle: "Aug 30, 4:20 PM",
    amount: "-$75.25",
    icon: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    type: "reversed",
  },
  {
    id: "8",
    title: "Zara Khan",
    subtitle: "Aug 25",
    amount: "-$15.00",
    icon: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    type: "sent",
  },
];

const totalTransactions = transactionData
  .reduce((sum, item) => {
    const amt = parseFloat(item.amount.replace(/[$,]/g, ""));
    return sum + amt;
  }, 0)
  .toFixed(2);

const trend = "+2.4% this week";

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
        <AccountCard trend={trend} />
        <Balance amount={totalTransactions} />
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
