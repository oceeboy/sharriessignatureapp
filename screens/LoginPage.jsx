import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigation = useNavigation();
  const { login, user, error } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate("Main");
    }
  }, [user]);

  const submit = async () => {
    setSubmitting(true);
    try {
      await login(form.email, form.password);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };
  const nextPage = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Sign In</Text>
          <Text style={styles.subHeaderText}>
            Hi! Welcome back, you've been missed
          </Text>
        </View>
        <View style={styles.formContainer}>
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
              borderradius={styles.borderradius}
              secureTextEntry
            />
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Sign In"
              handlePress={submit}
              isLoading={isSubmitting}
            />
          </View>
        </View>
        <View style={styles.authOptionContainer}>
          <View style={styles.rowGap}>
            <View style={styles.line} />
            <Text style={styles.rowGapText}>Or sign in with</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.rowGap}>
            <Text style={styles.authText}>Don't have an account?</Text>
            <TouchableOpacity style={styles.bttnLink} onPress={nextPage}>
              <Text style={styles.bttnLinkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Poppins-Medium",
    textTransform: "capitalize",
  },
  subHeaderText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    textTransform: "capitalize",
  },
  formContainer: { alignItems: "center", marginTop: 50, paddingHorizontal: 25 },
  textFieldContainer: {
    marginTop: 20,
  },
  textInput: {
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
  },
  label: {
    textAlign: "left",
    fontSize: 15,
    fontFamily: "Poppins-Light",
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
  },
  forgotPassword: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    color: "#408C2B",
  },
  buttonContainer: {
    marginTop: 30,
    width: "100%",
    height: 60,
  },
  authOptionContainer: {
    marginTop: 50,
    width: "100%",
    gap: 40,
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
  borderradius: {
    borderRadius: 50,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
