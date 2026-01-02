import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default function CountrySelect({ navigation }) {
  const [selected, setSelected] = useState(COUNTRIES[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkCountry = async () => {
      const stored = await AsyncStorage.getItem("userCountry");
      if (stored) {
        navigation.replace("Home");
      }
    };
    checkCountry();
  }, []);

  const selectCountry = async (country) => {
    setSelected(country);
    setOpen(false);
    await AsyncStorage.setItem("userCountry", JSON.stringify(country));
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to BufferPay</Text>
        <Text style={styles.subtitle}>Select your country to get started</Text>

        <View style={styles.selectorWrap}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.selector}
            activeOpacity={0.9}
          >
            <Text style={styles.selectorText}>{selected.label}</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={18}
              color="rgba(255,255,255,0.6)"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => selectCountry(selected)}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.optionsCard}>
            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => selectCountry(item)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#102219", justifyContent: "center" },
  content: { paddingHorizontal: 20, alignItems: "center" },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 40 },
  selectorWrap: { width: "100%", marginBottom: 40 },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 10,
  },
  selectorText: { color: "#fff", fontSize: 16 },
  continueBtn: {
    backgroundColor: "#13ec80",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  continueText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  optionsCard: {
    backgroundColor: "rgba(16,34,25,0.95)",
    borderRadius: 20,
    overflow: "hidden",
    width: "90%",
    maxHeight: 300,
    marginBottom: 20,
  },
  option: { padding: 15 },
  optionText: { color: "#fff", fontSize: 16 },
});
