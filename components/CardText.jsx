import React from "react";
import { Text, StyleSheet } from "react-native";

const CardText = ({ children, style, fonttype, ...props }) => {
  return (
    <Text
      style={[
        styles.text,
        { fontFamily: fonttype || "Poppins-SemiBold" },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default CardText;
