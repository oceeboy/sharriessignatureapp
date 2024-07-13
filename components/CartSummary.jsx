import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatCurrency } from "../constants";

const CartSummary = ({ totalPrice, onCheckout, onCancel }) => {
  const deliveryFee = 2.0;
  const totalAmount = totalPrice + deliveryFee;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart summary</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Sub-total</Text>
          <Text style={styles.value}>
            {formatCurrency(totalPrice.toFixed(2))}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Delivery</Text>
          <Text style={styles.value}>
            {formatCurrency(deliveryFee.toFixed(2))}
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.row}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(totalAmount.toFixed(2))}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#408C2B",
    paddingVertical: 40,
    paddingHorizontal: 13,
  },
  summaryContainer: {
    paddingHorizontal: 70,
  },
  title: {
    fontSize: 18,
    fontFamily: "Lora-SemiBold",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#5A5A5A",
  },
  value: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#363939",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#363939",
    borderRadius: 4,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  totalAmountContainer: {
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#5A5A5A",
  },
  totalValue: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  checkoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#408C2B",
    borderRadius: 4,
  },
  checkoutButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
});

export default CartSummary;
