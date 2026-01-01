import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const COUNTRIES = [
  {
    key: "EU",
    label: "European Union",
    currency: "EUR",
    rate: 0.92,
    symbol: "€",
    flag: "https://flagcdn.com/w40/eu.png",
  },
  {
    key: "NG",
    label: "Nigeria",
    currency: "NGN",
    rate: 770,
    symbol: "₦",
    flag: "https://flagcdn.com/w40/ng.png",
  },
  {
    key: "US",
    label: "United States",
    currency: "USD",
    rate: 1,
    symbol: "$",
    flag: "https://flagcdn.com/w40/us.png",
  },
];

export default function SendScreen({ navigation, route }) {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [usd, setUsd] = useState("");
  const [account, setAccount] = useState("");
  const [openPicker, setOpenPicker] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayDone, setOverlayDone] = useState(false);

  const numericUsd = useMemo(() => parseFloat(usd) || 0, [usd]);
  const converted = useMemo(
    () => numericUsd * (country.rate || 0),
    [numericUsd, country]
  );

  useEffect(() => {
    const sending = route?.params?.sending;
    const receiptParams = route?.params?.receiptParams;
    if (sending && receiptParams) {
      // start overlay on this screen
      setOverlayVisible(true);
      setOverlayDone(false);
      // show sending for a bit then show check
      const t1 = setTimeout(() => setOverlayDone(true), 1400);
      // then navigate to receipt
      const t2 = setTimeout(() => {
        // clear params to avoid re-trigger
        try {
          navigation.setParams({ sending: false, receiptParams: null });
        } catch (e) {}
        navigation.navigate("TxnSent", receiptParams);
        setOverlayVisible(false);
        setOverlayDone(false);
      }, 2200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [route?.params?.sending]);

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <Text style={styles.iconText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Send Money</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={styles.iconText}>?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Destination</Text>

        <TouchableOpacity
          style={styles.destinationCard}
          activeOpacity={0.9}
          onPress={() => setOpenPicker((v) => !v)}
        >
          <View style={styles.destLeft}>
            <View style={styles.flagWrap}>
              <Image source={{ uri: country.flag }} style={styles.flag} />
            </View>
            <View>
              <Text style={styles.destTitle}>{country.label}</Text>
              <Text style={styles.destSub}>{country.currency}</Text>
            </View>
          </View>
          <Text style={styles.expand}>▾</Text>
        </TouchableOpacity>

        {openPicker && (
          <View style={styles.pickerList}>
            {COUNTRIES.map((c) => (
              <TouchableOpacity
                key={c.key}
                style={styles.pickerItem}
                onPress={() => {
                  setCountry(c);
                  setOpenPicker(false);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Image source={{ uri: c.flag }} style={styles.flagSmall} />
                  <View>
                    <Text style={styles.pickerLabel}>{c.label}</Text>
                    <Text style={styles.pickerSub}>{c.currency}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={[styles.label, { marginTop: 18 }]}>Amount</Text>
        <View style={styles.amountCard}>
          <View style={styles.amountTop}>
            <View>
              <Text style={styles.smallMuted}>You send</Text>
              <View style={styles.amountRow}>
                <Text style={styles.currencySign}>$</Text>
                <TextInput
                  keyboardType="numeric"
                  placeholder="0.00"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={usd}
                  onChangeText={setUsd}
                  style={styles.amountInput}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.currencyBtn}>
              <Image
                source={{ uri: "https://flagcdn.com/w20/us.png" }}
                style={styles.flagTiny}
              />
              <Text style={styles.currencyBtnText}>USD</Text>
              <Text style={styles.currencyBtnArrow}>▾</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rateRow}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text style={styles.rateIcon}>⇄</Text>
              <Text style={styles.rateText}>
                1 USD ≈ {country.rate} {country.currency}
              </Text>
            </View>
            <Text style={styles.recipientGets}>
              {country.symbol}
              {Number(converted).toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={[styles.label, { marginTop: 18 }]}>Recipient Account</Text>
        <View style={styles.accountCard}>
          <View style={styles.accountLeft}>
            <Text style={styles.accountIcon}>🏦</Text>
          </View>
          <TextInput
            placeholder="10-digit account number"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={account}
            onChangeText={(t) => setAccount(t.replace(/[^0-9]/g, ""))}
            maxLength={10}
            keyboardType="number-pad"
            style={styles.accountInput}
          />
          <TouchableOpacity style={styles.qrBtn}>
            <Text style={styles.qrText}>📷</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.note}>
          Please ensure the IBAN is correct to avoid delays.
        </Text>

        <View style={{ height: 24 }} />

        {/** Account must be exactly 10 digits to proceed */}
        {(() => {
          const validAccount = /^[0-9]{10}$/.test(account);
          return (
            <TouchableOpacity
              style={[
                styles.continueBtn,
                !validAccount && styles.continueDisabled,
              ]}
              onPress={() =>
                navigation.navigate("BankUser", {
                  country,
                  usd: numericUsd,
                  converted,
                  account,
                })
              }
              disabled={!validAccount}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          );
        })()}
      </ScrollView>

      {overlayVisible ? (
        <View style={styles.overlay} pointerEvents="none">
          <View style={styles.overlayCenter}>
            <View
              style={[
                styles.overlayCircle,
                overlayDone && styles.overlayCircleDone,
              ]}
            >
              <Text
                style={[
                  styles.overlaySymbol,
                  overlayDone && styles.overlaySymbolDone,
                ]}
              >
                {overlayDone ? "✓" : "⟳"}
              </Text>
            </View>
            <Text style={styles.overlayLabel}>
              {overlayDone ? "Sent" : "Sending..."}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#102219" },
  header: {
    height: 70,
    paddingTop: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBtn: { width: 48, alignItems: "center" },
  iconText: { color: "#fff", fontSize: 16 },
  title: { color: "#fff", fontSize: 18, fontWeight: "700" },
  container: { padding: 16, paddingBottom: 80 },
  label: { color: "#13ec80", fontSize: 12, marginBottom: 8, fontWeight: "700" },
  destinationCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  destLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  flagWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  flag: { width: 40, height: 40 },
  destTitle: { color: "#fff", fontWeight: "700" },
  destSub: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  expand: { color: "rgba(255,255,255,0.6)", fontSize: 18 },
  pickerList: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  pickerItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.03)",
  },
  flagSmall: { width: 28, height: 20 },
  pickerLabel: { color: "#fff", fontWeight: "700" },
  pickerSub: { color: "rgba(255,255,255,0.6)", fontSize: 12 },

  amountCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    padding: 16,
    marginTop: 6,
  },
  amountTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallMuted: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginTop: 6,
  },
  currencySign: { color: "#13ec80", fontSize: 22, fontWeight: "700" },
  amountInput: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    minWidth: 120,
  },
  currencyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },
  flagTiny: { width: 18, height: 12, marginRight: 8 },
  currencyBtnText: { color: "#fff", fontWeight: "700", marginRight: 6 },
  currencyBtnArrow: { color: "rgba(255,255,255,0.6)" },
  rateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  rateIcon: { color: "rgba(255,255,255,0.6)" },
  rateText: { color: "rgba(255,255,255,0.7)" },
  recipientGets: { color: "#13ec80", fontWeight: "800" },

  accountCard: {
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 14,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  accountLeft: { paddingLeft: 8, paddingRight: 8 },
  accountIcon: { color: "rgba(255,255,255,0.6)" },
  accountInput: { color: "#fff", flex: 1, paddingHorizontal: 8 },
  qrBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  qrText: { color: "rgba(255,255,255,0.8)" },
  note: { color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 8 },

  continueBtn: {
    backgroundColor: "#13ec80",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },
  continueDisabled: { opacity: 0.5 },
  continueText: { color: "#072015", fontWeight: "800" },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayCenter: { alignItems: "center" },
  overlayCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  overlayCircleDone: {
    backgroundColor: "rgba(19,236,128,0.12)",
    borderColor: "rgba(19,236,128,0.4)",
  },
  overlaySymbol: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 48,
    fontWeight: "800",
  },
  overlaySymbolDone: { color: "#13ec80" },
  overlayLabel: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 14,
    fontWeight: "700",
  },
});
