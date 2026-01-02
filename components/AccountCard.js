import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

export default function AccountCard({
  account = "0123456789",
  balance = "14,230.50",
  currency = "$",
}) {
  const [copied, setCopied] = useState(false);

  async function copyAccount() {
    try {
      await Clipboard.setStringAsync(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {
      // ignore
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.topLabel}>Account</Text>
          <Text style={styles.account}>{account}</Text>
        </View>

        <TouchableOpacity style={styles.copyBtn} onPress={copyAccount}>
          <MaterialIcons name="content-copy" size={18} color="#fff" />
          {copied ? <Text style={styles.copiedText}>Copied</Text> : null}
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.bottomLabel}>Wallet balance</Text>
          <Text style={styles.balance}>
            {currency}
            {balance}
          </Text>
        </View>
        <View style={styles.walletIconWrap}>
          <MaterialIcons
            name="account-balance-wallet"
            size={22}
            color="#072015"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 14,
    padding: 14,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  account: { color: "#fff", fontWeight: "700", marginTop: 6 },
  copyBtn: { flexDirection: "row", alignItems: "center", gap: 8 },
  copiedText: { color: "#ffd24d", marginLeft: 8, fontWeight: "700" },
  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  balance: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: 6 },
  walletIconWrap: {
    backgroundColor: "#13ec80",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
