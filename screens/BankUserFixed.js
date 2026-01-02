import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const BANKS = [
  { id: "CHASE", name: "Chase Bank", hint: "Checking", color: "#003399" },
  { id: "BOFA", name: "Bank of America", hint: "Savings", color: "#c8102e" },
  { id: "WF", name: "Wells Fargo", hint: "Checking", color: "#e61b0f" },
];

function resolveRecipientName(bankId, account) {
  if (!account) return "Recipient";
  const last = account.slice(-1);
  const map = {
    0: "Alice M.",
    1: "Bob K.",
    2: "Chuks O.",
    3: "Diana R.",
    4: "Ethan L.",
    5: "Fatima N.",
    6: "George P.",
    7: "Hannah T.",
    8: "Ibrahim S.",
    9: "Jane Q.",
  };
  return map[last] || "Recipient";
}

export default function BankUser({ route, navigation }) {
  const { country, usd, converted, account } = route.params || {};
  const [selected, setSelected] = useState(null);
  const [sending, setSending] = useState(false);

  const recipientName = useMemo(() => {
    if (!selected) return null;
    return resolveRecipientName(selected.id, account);
  }, [selected, account]);

  function onSend() {
    if (!selected) return;
    setSending(true);
    const txnId =
      "TXN-" + Math.floor(Math.random() * 900000 + 100000).toString();
    const receiptParams = {
      recipient: recipientName,
      amountUsd: usd,
      amountLocal: converted,
      currency: country?.currency,
      country,
      bank: selected,
      account,
      txnId,
      time: new Date().toISOString(),
    };

    setTimeout(() => {
      navigation.navigate("Send", { sending: true, receiptParams });
    }, 600);
  }

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <MaterialIcons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Institution</Text>
        <View style={{ width: 48 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.summaryWrap}>
          <View style={styles.summaryBadge}>
            <MaterialIcons name="account-balance" size={20} color="#13ec80" />
          </View>
          <Text style={styles.summaryText}>
            Sending to account ending in •••• {account?.slice(-4) ?? "----"}
          </Text>
        </View>

        <Text style={styles.sectionHeader}>Suggested Banks</Text>
        <FlatList
          data={BANKS}
          keyExtractor={(i) => i.id}
          style={{ marginTop: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.bankCard,
                selected?.id === item.id && styles.bankCardActive,
              ]}
              onPress={() => setSelected(item)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={[styles.bankLogo, { backgroundColor: item.color }]}
                >
                  <Text style={styles.bankLogoText}>
                    {item.name.split(" ")[0]}
                  </Text>
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.bankName}>{item.name}</Text>
                  <Text style={styles.bankHint}>
                    {item.hint} •••• {account?.slice(-4) ?? "----"}
                  </Text>
                </View>
              </View>
              {selected?.id === item.id ? (
                <View style={styles.bankCheck}>
                  <MaterialIcons name="check" size={18} color="#072015" />
                </View>
              ) : null}
            </TouchableOpacity>
          )}
        />

        {selected && (
          <View style={styles.recipientCard}>
            <View style={styles.recipientLeft}>
              <View style={styles.recipientAvatar} />
              <View>
                <Text style={styles.recipientName}>{recipientName}</Text>
                <Text style={styles.recipientEmail}>
                  {selected.name.replace(" ", "_").toLowerCase()}@mail.com
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={[
              styles.sendBtn,
              (!selected || sending) && styles.sendBtnDisabled,
            ]}
            onPress={onSend}
            disabled={!selected || sending}
          >
            <Text style={styles.sendBtnText}>
              {sending
                ? "Sending..."
                : `Send ${country?.symbol ?? "$"}${Number(
                    converted || 0
                  ).toFixed(2)}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#102219" },
  header: {
    height: 80,
    paddingTop: 28,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBtn: { width: 48, alignItems: "center" },
  backText: { color: "#fff" },
  title: { color: "#fff", fontSize: 18, fontWeight: "700" },
  container: { padding: 16, paddingBottom: 80 },
  summaryWrap: { alignItems: "center", marginBottom: 12 },
  summaryBadge: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  summaryIcon: { color: "#13ec80" },
  summaryText: { color: "rgba(255,255,255,0.7)", marginTop: 8 },
  sectionHeader: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "700",
    marginTop: 8,
  },
  bankCard: {
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bankCardActive: {
    borderWidth: 1,
    borderColor: "#13ec80",
    backgroundColor: "rgba(19,236,128,0.05)",
  },
  bankLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  bankLogoText: { color: "#fff", fontWeight: "700" },
  bankName: { color: "#fff", fontWeight: "700" },
  bankHint: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  bankCheck: {
    width: 34,
    height: 34,
    borderRadius: 18,
    backgroundColor: "#13ec80",
    alignItems: "center",
    justifyContent: "center",
  },
  recipientCard: {
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderLeftWidth: 4,
    borderLeftColor: "#13ec80",
    padding: 12,
    borderRadius: 12,
  },
  recipientLeft: { flexDirection: "row", alignItems: "center" },
  recipientAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  recipientName: { color: "#fff", fontWeight: "800" },
  recipientEmail: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  sendBtn: {
    marginTop: 12,
    backgroundColor: "#13ec80",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  sendBtnDisabled: { opacity: 0.6 },
  sendBtnText: { color: "#072015", fontWeight: "800" },
});
