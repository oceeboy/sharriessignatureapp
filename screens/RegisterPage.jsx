import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "../components";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../context/GlobalProvider";
import { createUser } from "../lib/appwrite";

const RegisterPage = () => {
  const { setUser, setIsLogged, loading, isLogged } = useGlobalContext();
  const navigation = useNavigation();
  const [formError, setFormError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!loading && isLogged) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Main" }],
        })
      );
    }
  }, [loading, isLogged, navigation]);

  const submit = async () => {
    if (form.name === "" || form.email === "" || form.password === "") {
      setFormError("Please fill all fields.");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.name);
      setUser(result);
      setIsLogged(true);
      setFormError("");
      navigation.navigate("Main");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const nextPage = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Create Account</Text>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderText}>
              Fill your information below or register with your social account
            </Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>Name</Text>
            <FormField
              title="Name"
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyles={styles.textInput}
              placeholder="John Doe"
              borderradius={styles.borderradius}
            />
          </View>
          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>Email</Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles={styles.textInput}
              keyboardType="email-address"
              placeholder="example@gmail.com"
              borderradius={styles.borderradius}
            />
          </View>
          <View style={styles.textFieldContainer}>
            <Text style={styles.label}>Password</Text>
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles={styles.textInput}
              placeholder="***************"
              secureTextEntry
              borderradius={styles.borderradius}
            />
          </View>
          {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              isLoading={isSubmitting}
            />
          </View>
        </View>
        <View style={styles.authOptionContainer}>
          <View style={styles.rowGap}>
            <View style={styles.line} />
            <Text style={styles.rowGapText}>Or sign up with</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.rowGap}>
            <Text style={styles.authText}>Already have an account?</Text>
            <TouchableOpacity style={styles.bttnLink} onPress={nextPage}>
              <Text style={styles.bttnLinkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    marginTop: 100,
    justifyContent: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40,
  },
  subHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Poppins-Medium",
    textTransform: "capitalize",
  },
  subHeaderText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  formContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 25,
  },
  textFieldContainer: {
    marginTop: 20,
  },
  textInput: {
    width: "100%",
    borderRadius: 50,
  },
  label: {
    textAlign: "left",
    fontSize: 15,
    fontFamily: "Poppins-Light",
  },
  buttonContainer: {
    marginTop: 30,
    width: "100%",
    height: 60,
  },
  authOptionContainer: {
    marginTop: 50,
    width: "100%",
    gap: 20,
  },
  line: {
    width: 77,
    height: 2,
    backgroundColor: "#E1E1E1",
  },
  rowGap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  rowGapText: {
    fontSize: 15,
    fontFamily: "Poppins-Light",
  },
  authImage: {
    width: 30,
    height: 30,
  },
  authImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E1E1E1",
  },
  authText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  bttnLink: {},
  bttnLinkText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#408C2B",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  borderradius: {
    borderRadius: 20,
  },
});
