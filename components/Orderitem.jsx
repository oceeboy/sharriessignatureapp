import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { getImageUrl } from "../services/apiService";

const { width } = Dimensions.get("window");

const Orderitem = ({ onPress, item }) => {
  const handleClick = (orderedItem) => {
    onPress(orderedItem);
  };

  return (
    <>
      {Array.isArray(item.orderedItems) && item.orderedItems.length > 0 ? (
        item.orderedItems.map((orderedItem, index) => (
          <TouchableOpacity
            key={index}
            style={styles.container}
            onLongPress={() => handleClick(orderedItem)}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: getImageUrl(orderedItem.image) }}
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
                  {orderedItem.name}
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
                  {item.orderDate}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No items found</Text>
        </View>
      )}
    </>
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
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
});
