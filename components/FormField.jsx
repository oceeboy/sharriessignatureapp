import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  borderradius,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View style={otherStyles}>
      <View style={[styles.textInputContainer, borderradius]}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          selectionColor="#408C2B"
        />

        {title == "Password" && value.length > 0 && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={icons.eye}
              style={styles.image}
              resizeMode="contain"
              tintColor={"#408C2B"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  textInputContainer: {
    width: "100%",
    height: 50,
    borderWidth: 0.5,

    borderColor: "#797979",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    fontFamily: "Poppins-Regular",
  },
});
