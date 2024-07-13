import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { formatCurrency } from "../constants";

const AddToCartBox = ({ onPress, selectedProduct, quantity, checkOut }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const handleAddToCart = () => {
    onPress(selectedProduct, quantity);
    setShowCheckout(true);
  };
  const stateChange = () => {
    checkOut();
    setShowCheckout(false);
  };

  return (
    <View
      style={showCheckout ? styles.cartContainerCheckOut : styles.cartContainer}
    >
      {!showCheckout ? (
        <View style={styles.rowGap}>
          <View style={styles.columnGap}>
            <Text style={styles.subText}>Sub</Text>
            <Text style={styles.price}>
              {formatCurrency(selectedProduct.current_price[0].NGN[0])}
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.checkoutInfo}>
          <TouchableOpacity
            onPress={() => setShowCheckout(false)}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.unitContainer}>
            <Text style={styles.unitSubText}>Unit price</Text>
            <Text style={styles.unitPrice}>
              {formatCurrency(selectedProduct.current_price[0].NGN[0])}
            </Text>
          </View>
          <TouchableOpacity onPress={stateChange} style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddToCartBox;

const styles = StyleSheet.create({
  cartContainer: {
    width: "100%",
    height: 84,
    backgroundColor: "#408C2B",
    paddingHorizontal: 48,
    paddingTop: 12,
  },
  cartContainerCheckOut: {
    width: "100%",
    height: 92,
    backgroundColor: "#E4F5E0",
    paddingHorizontal: 48,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#CAECC0",
  },
  rowGap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnGap: {
    flexDirection: "column",
    gap: 4,
  },
  subText: {
    fontSize: 12,
    color: "#FAFAFA",
    fontFamily: "Poppins-Regular",
  },
  price: {
    fontSize: 18,
    color: "#FAFAFA",
    fontFamily: "Lora-SemiBold",
  },
  button: {
    width: 152,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 3.82,
    borderColor: "#FAFAFA",
  },
  buttonText: {
    fontSize: 11.45,
    color: "#FAFAFA",
    fontFamily: "Poppins-Regular",
  },
  checkoutButton: {
    width: 115,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#408C2B",
  },
  checkoutButtonText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#FAFAFA",
  },
  unitContainer: {
    flexDirection: "column",
    gap: 1,
  },
  unitSubText: {
    fontSize: 16,
    color: "#797A7B",
    fontFamily: "Poppins-Regular",
  },
  unitPrice: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
  },
  cancelButton: {
    width: 63,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#363939",
  },
  cancelButtonText: {},
  checkoutInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
