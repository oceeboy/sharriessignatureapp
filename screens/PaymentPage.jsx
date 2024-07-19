import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { BankCard, CustomButton, FormField } from "../components";
const PaymentPage = () => {
  const [form, setForm] = useState({
    cardnumber: "",
    cardname: "",
    cardexpire: "",
    cardcvv: "",
  });
  const format = (text) => text.replace(/(.{4})/g, "$1 ");
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const submit = () => {
    navigation.navigate("Ordersucces");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              height: 24,
            }}
          >
            <TouchableOpacity style={styles.backIconContainer} onPress={goBack}>
              <Image
                source={icons.backicon}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Payment Page</Text>
          </View>
        </View>

        <View style={styles.subContainer}>
          <BankCard
            cardnumber={
              form.cardnumber === ""
                ? "●●●● ●●●● ●●●● ●●●●"
                : format(form.cardnumber)
            }
            cardname={form.cardname === "" ? "Osieta Gift" : form.cardname}
            cardexpire={form.cardexpire === "" ? "02/30" : form.cardexpire}
          />
        </View>

        <View style={styles.cardFormContainer}>
          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>Card Holder Name</Text>
            <FormField
              title="CardName"
              value={form.cardname}
              handleChangeText={(e) => setForm({ ...form, cardname: e })}
              otherStyles={styles.cardname}
              placeholder="Osieta Gift"
              borderradius={styles.borderradius}
            />
          </View>
          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>Card Number</Text>
            <FormField
              title="CardNumber"
              value={form.cardnumber}
              handleChangeText={(e) => setForm({ ...form, cardnumber: e })}
              otherStyles={styles.cardnumber}
              placeholder="●●●● ●●●● ●●●● ●●●●"
              borderradius={styles.borderradius}
            />
          </View>
          <View style={styles.rowGap}>
            <View style={styles.textFieldContainer}>
              <Text style={styles.label}>Expiry date</Text>
              <FormField
                title="CardNumber"
                value={form.cardexpire}
                handleChangeText={(e) => setForm({ ...form, cardexpire: e })}
                otherStyles={styles.cardexpire}
                placeholder="02/30"
                borderradius={styles.borderradius}
              />
            </View>
            <View style={styles.textFieldContainer}>
              <Text style={styles.label}>CVV</Text>
              <FormField
                title="CardNumber"
                value={form.cardcvv}
                handleChangeText={(e) => setForm({ ...form, cardcvv: e })}
                otherStyles={styles.cardcvv}
                placeholder="000"
                borderradius={styles.borderradius}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.CustomButtonContainer}>
          <CustomButton title={"Confirm Payment"} handlePress={submit} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentPage;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
  },
  container: {
    paddingHorizontal: 32,
  },
  backIconContainer: {
    width: 24,
    height: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 13,
    height: 13,
  },
  headerText: { fontSize: 16, fontFamily: "Poppins-SemiBold" },

  subContainer: { alignItems: "center", marginTop: 34 },

  cardFormContainer: {
    alignItems: "center",
    marginTop: 10,
  },

  textFieldContainer: {
    marginTop: 20,
    gap: 10,
  },
  cardnumber: {
    width: "100%",

    alignItems: "center",
  },
  cardname: {
    width: "100%",

    alignItems: "center",
  },
  borderradius: {
    borderRadius: 10,
  },
  rowGap: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cardexpire: {
    width: 150,
  },
  cardcvv: { width: 100 },
  CustomButtonContainer: {
    width: "100%",
    height: 50,
    marginTop: 20,
  },
  buttonContainer: {
    position: "static",
    marginTop: 50,
    paddingHorizontal: 32,
    height: 150,
    borderTopWidth: 0.5,
    borderStartWidth: 0.5,
    borderEndWidth: 0.5,
    borderStartStartRadius: 50,
    borderStartEndRadius: 50,
    borderColor: "#408C2B",
  },
});
