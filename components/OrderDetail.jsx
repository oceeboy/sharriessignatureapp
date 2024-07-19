import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { formatCurrency } from "../constants";
import { AppContext } from "../context/ProductContext";
import { getImageUrl } from "../services/apiService";

const { width } = Dimensions.get("window");
const OrderDetail = () => {
  const { selectedOrder } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View>
        {selectedOrder.photos.map((photos) => (
          <View style={styles.imageContainer} key={photos}>
            <Image
              source={{ uri: getImageUrl(photos.url) }}
              style={{ height: "100%", width: "100%" }}
              resizeMode="cover"
            />
          </View>
        ))}
      </View>
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productName}>{selectedOrder.name}</Text>
        <Text style={styles.status}>Completed</Text>
        <View style={styles.rowJus}>
          <Text style={styles.textstyles}>Quantity:</Text>
          <Text style={styles.textstyles}>{selectedOrder.quantity} pcs</Text>
        </View>
        <View style={styles.rowJus}>
          <Text style={styles.textstyles}>Price:</Text>
          <Text style={styles.textstyles}>
            {formatCurrency(selectedOrder.total)}
          </Text>
        </View>
        <View style={styles.rowJus}>
          <Text style={styles.textstyles}>Date:</Text>
          <Text style={styles.textstyles}>19 July, 2024</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
  },
  imageContainer: {
    height: 300,
    width: "100%",

    overflow: "hidden",
    justifyContent: "center",
    borderRadius: 20,
  },
  productDetailsContainer: {
    width: "100%",
    marginTop: 10,
  },
  rowJus: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  textstyles: {
    fontSize: 13,
    fontFamily: "Poppins-Light",
  },
  productName: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  status: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
});
