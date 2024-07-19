import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const Orderitem = ({ title, price, image, onPress }) => {
  const onclick = () => {
    onPress();
  };
  return (
    <TouchableOpacity style={styles.container} onLongPress={onclick}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.columnGap}>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-SemiBold",
              color: "#000000",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              letterSpacing: 0.5,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: "Poppins-Regular",
              textTransform: "uppercase",
              color: "#000000",
              letterSpacing: 0.5,
            }}
          >
            completed
          </Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 10, fontFamily: "Poppins-Regular" }}>
            date
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Orderitem;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    margin: 5,
    padding: 15,
    flexDirection: "row",
    borderWidth: 0.2,
    gap: 10,
    borderRadius: 5,
    borderColor: "#408C2B",
    alignItems: "center",
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  columnGap: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    width: "110%",
    height: "110%",
  },
});
