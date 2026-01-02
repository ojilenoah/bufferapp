import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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

export default function SendScreen({ navigation, route }) {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [usd, setUsd] = useState("");
  const [account, setAccount] = useState("");
  const [openPicker, setOpenPicker] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayDone, setOverlayDone] = useState(false);
  const [banksVisible, setBanksVisible] = useState(false);
  const [banksLoading, setBanksLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const accountTimerRef = useRef(null);

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

  useEffect(() => {
    // when a valid 10-digit account is entered, show a small loading then reveal banks
    const valid = /^[0-9]{10}$/.test(account);
    if (valid) {
      setBanksLoading(true);
      setBanksVisible(false);
      setSelectedBank(null);
      if (accountTimerRef.current) clearTimeout(accountTimerRef.current);
      accountTimerRef.current = setTimeout(() => {
        setBanksLoading(false);
        setBanksVisible(true);
      }, 2000);
    } else {
      if (accountTimerRef.current) {
        clearTimeout(accountTimerRef.current);
        accountTimerRef.current = null;
      }
      setBanksLoading(false);
      setBanksVisible(false);
      setSelectedBank(null);
    }

    return () => {
      if (accountTimerRef.current) {
        clearTimeout(accountTimerRef.current);
        accountTimerRef.current = null;
      }
    };
  }, [account]);

  function handleSend() {
    if (!selectedBank) return;
    setOverlayVisible(true);
    setOverlayDone(false);
    const txnId =
      "TXN-" + Math.floor(Math.random() * 900000 + 100000).toString();
    const receiptParams = {
      recipient: resolveRecipientName(selectedBank.id, account),
      amountUsd: numericUsd,
      amountLocal: converted,
      currency: country?.currency,
      country,
      bank: selectedBank,
      account,
      txnId,
      time: new Date().toISOString(),
    };

    const t1 = setTimeout(() => setOverlayDone(true), 1400);
    const t2 = setTimeout(() => {
      navigation.navigate("TxnSent", receiptParams);
      setOverlayVisible(false);
      setOverlayDone(false);
      clearTimeout(t1);
      clearTimeout(t2);
    }, 2200);
  }

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Send Money</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="help-outline" size={20} color="#fff" />
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
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color="rgba(255,255,255,0.6)"
          />
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
              <MaterialIcons
                name="keyboard-arrow-down"
                size={18}
                color="rgba(255,255,255,0.6)"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rateRow}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <MaterialIcons
                name="swap-horiz"
                size={16}
                color="rgba(255,255,255,0.6)"
              />
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
            <MaterialIcons
              name="account-balance"
              size={20}
              color="rgba(255,255,255,0.6)"
            />
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
            <MaterialIcons
              name="photo-camera"
              size={18}
              color="rgba(255,255,255,0.8)"
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 12 }}>
          {banksLoading ? (
            <View style={styles.bankLoaderRow}>
              <ActivityIndicator size="small" color="#13ec80" />
              <Text style={{ color: "rgba(255,255,255,0.8)", marginLeft: 8 }}>
                Looking up banks...
              </Text>
            </View>
          ) : null}

          {banksVisible ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.bankSlider}
              contentContainerStyle={{ paddingHorizontal: 6 }}
            >
              {BANKS.map((b) => (
                <TouchableOpacity
                  key={b.id}
                  style={[
                    styles.bankPill,
                    selectedBank?.id === b.id && styles.bankPillActive,
                  ]}
                  onPress={() => setSelectedBank(b)}
                >
                  <View style={[styles.bankLogo, { backgroundColor: b.color }]}>
                    <MaterialIcons
                      name="account-balance"
                      size={18}
                      color="#fff"
                    />
                  </View>
                  <Text style={styles.bankPillText}>
                    {b.name.split(" ")[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : null}

          {selectedBank ? (
            <View style={styles.recipientCardInline}>
              <View style={styles.recipientLeft}>
                <View style={styles.recipientAvatar} />
                <View>
                  <Text style={styles.recipientName}>
                    {resolveRecipientName(selectedBank?.id, account)}
                  </Text>
                  <Text style={styles.recipientEmail}>
                    {selectedBank.name.replace(" ", "_").toLowerCase()}@mail.com
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
        <Text style={styles.note}>
          Please ensure the IBAN is correct to avoid delays.
        </Text>

        <View style={{ height: 12 }} />

        {/** Account must be exactly 10 digits to proceed; show banks inline */}
        {(() => {
          const validAccount = /^[0-9]{10}$/.test(account);
          if (!validAccount) {
            return (
              <TouchableOpacity
                style={[styles.continueBtn, styles.continueDisabled]}
                disabled
              >
                <Text style={styles.continueText}>Enter valid account</Text>
              </TouchableOpacity>
            );
          }

          if (banksLoading) {
            return (
              <TouchableOpacity
                style={[styles.continueBtn, styles.continueDisabled]}
                disabled
              >
                <Text style={styles.continueText}>Looking up banks...</Text>
              </TouchableOpacity>
            );
          }

          if (!selectedBank) {
            return (
              <TouchableOpacity
                style={[styles.continueBtn, styles.continueDisabled]}
                disabled
              >
                <Text style={styles.continueText}>Select bank</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity style={styles.continueBtn} onPress={handleSend}>
              <Text style={styles.continueText}>
                Send {country?.symbol}
                {Number(converted).toFixed(2)}
              </Text>
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
              <MaterialIcons
                name={overlayDone ? "check" : "autorenew"}
                size={48}
                color={overlayDone ? "#13ec80" : "rgba(255,255,255,0.85)"}
              />
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
  bankLoaderRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  bankSlider: { marginTop: 10 },
  bankPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  bankPillActive: { borderWidth: 1, borderColor: "#13ec80" },
  bankLogo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  bankPillText: { color: "#fff", fontWeight: "700" },
  recipientCardInline: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderLeftWidth: 4,
    borderLeftColor: "#13ec80",
    padding: 12,
    borderRadius: 12,
  },
  recipientLeft: { flexDirection: "row", alignItems: "center" },
  recipientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginRight: 12,
  },
  recipientName: { color: "#fff", fontWeight: "800" },
  recipientEmail: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
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
