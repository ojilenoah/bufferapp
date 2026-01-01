import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

export default function TxnSent({ route, navigation }) {
  const {
    recipient,
    amountUsd,
    amountLocal,
    currency,
    bank,
    account,
    txnId,
    time,
  } = route.params || {};

  const formattedAmount = Number(amountUsd || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <View style={styles.safe}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          style={styles.closeBtn}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TRANSACTION RECEIPT</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.body}>
        <View style={styles.successWrap}>
          <View style={styles.bgGlow} />
          <View style={styles.successIcon}>
            <Text style={styles.check}>✓</Text>
          </View>
          <Text style={styles.head}>Transfer Successful</Text>
          <Text style={styles.time}>
            {formatDate(time || new Date().toISOString())}
          </Text>
        </View>

        <View style={styles.amountWrap}>
          <Text style={styles.amountText}>${formattedAmount}</Text>
          <View style={styles.pill}>
            <Text style={styles.pillText}>Sent to {recipient}</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>TRANSACTION DETAILS</Text>

          <View style={styles.row}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View style={styles.avatarPlaceholder} />
              <View>
                <Text style={styles.smallLabel}>Recipient</Text>
                <Text style={styles.value}>{recipient}</Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View style={styles.iconCircle}>
                <Text style={{ color: "rgba(255,255,255,0.8)" }}>🏦</Text>
              </View>
              <View>
                <Text style={styles.smallLabel}>From</Text>
                <Text style={styles.value}>
                  {bank?.name || "Checking (...8842)"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.rowNoBorder}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View style={styles.iconCircle}>
                <Text style={{ color: "rgba(255,255,255,0.8)" }}>🔒</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.smallLabel}>Reference ID</Text>
                <Text style={[styles.value, styles.mono]}>{txnId}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.copyBtn}>
              <Text style={{ color: "rgba(255,255,255,0.6)" }}>📋</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.downloadBtn}>
            <Text style={styles.downloadText}>⬇ Download Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.primaryBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#102219" },
  headerBar: {
    height: 64,
    paddingTop: 18,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeBtn: { width: 36, alignItems: "center" },
  closeText: { color: "rgba(255,255,255,0.9)", fontSize: 20 },
  headerTitle: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  body: { padding: 16, paddingTop: 8 },
  successWrap: { alignItems: "center", marginTop: 6 },
  bgGlow: {
    position: "absolute",
    top: 36,
    width: 300,
    height: 200,
    borderRadius: 150,
    backgroundColor: "rgba(19,236,128,0.06)",
    opacity: 0.9,
  },
  successIcon: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
  },
  check: { color: "#13ec80", fontSize: 48, fontWeight: "800" },
  head: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 12 },
  time: { color: "rgba(255,255,255,0.6)", marginTop: 6 },
  amountWrap: { alignItems: "center", marginTop: 20 },
  amountText: { color: "#fff", fontSize: 44, fontWeight: "800" },
  pill: {
    marginTop: 10,
    backgroundColor: "rgba(19,236,128,0.06)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(19,236,128,0.12)",
  },
  pillText: { color: "#13ec80", fontWeight: "700" },
  detailsCard: {
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    padding: 14,
  },
  detailsTitle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "rgba(255,255,255,0.03)",
    borderBottomWidth: 1,
  },
  rowNoBorder: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  smallLabel: { color: "#13ec80", fontSize: 12, fontWeight: "700" },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    justifyContent: "center",
  },
  label: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  value: { color: "#fff", fontWeight: "700" },
  mono: { fontFamily: "monospace" },
  copyBtn: { padding: 6 },
  footerActions: { marginTop: 18, paddingBottom: 24 },
  downloadBtn: {
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  downloadText: { color: "rgba(255,255,255,0.9)", fontWeight: "700" },
  primaryBtn: {
    backgroundColor: "#13ec80",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "#072015", fontWeight: "800" },
});
