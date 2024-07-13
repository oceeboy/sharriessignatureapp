import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../constants";
import CartIcon from "../components/CartIcon";
import { AppContext } from "../context/ProductContext";
import CartCard from "../components/CartCard";
import EmptyCart from "../components/EmptyCart";
import CartSummary from "../components/CartSummary";
import RecentlyViewedItem from "../components/RecentlyViewedItem";

const CheckOutPage = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const { cart, removeFromCart, clearCart, getTotalPrice } =
    useContext(AppContext);
  const totalPrice = useMemo(() => getTotalPrice(), [cart]);

  const handleCheckout = () => {
    clearCart();
    navigation.navigate("Main");
  };
  const viewAll = () => {
    navigation.navigate("Main");
  };

  const handleCancel = () => {
    clearCart();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={
          cart.length === 0
            ? styles.headerContainer
            : styles.headerContainerActive
        }
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
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
          <Text
            style={
              cart.length === 0
                ? { display: "none" }
                : {
                    fontSize: 16,
                    fontFamily: "Poppins-SemiBold",
                  }
            }
          >
            Cart
          </Text>
        </View>

        <CartIcon />
      </View>

      <View style={{ marginTop: 10, width: "100%" }}>
        {cart.map((item) => (
          <CartCard
            key={item.unique_id}
            item={item}
            onRemove={removeFromCart}
          />
        ))}
      </View>
      {cart.length === 0 && (
        <View style={styles.emptyCartContainer}>
          <EmptyCart />
        </View>
      )}
      {cart.length > 0 && (
        <CartSummary
          totalPrice={totalPrice}
          onCheckout={handleCheckout}
          onCancel={handleCancel}
        />
      )}
      <View>
        <View style={styles.bottomContainer}>
          <View style={styles.sectionHeader}>
            <Text
              style={
                cart.length === 0
                  ? styles.sectionHeaderTextEmpty
                  : styles.sectionHeaderText
              }
            >
              {cart.length === 0 ? "Recently viewed" : "You might like"}
            </Text>
            <TouchableOpacity style={styles.viewAllButton} onPress={viewAll}>
              <Text
                style={
                  cart.length === 0
                    ? styles.viewAllButtonTextEmpty
                    : styles.viewAllButtonText
                }
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <RecentlyViewedItem />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckOutPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 32,
  },
  header: {},
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
  },

  backIconContainer: {
    width: 24,
    height: 24,

    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 13,
    height: 13,
  },
  headerContainerActive: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    marginTop: 32,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  emptyCartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCBCB",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontFamily: "Lora-SemiBold",
    fontSize: 18,
    color: "#363939",
  },
  viewAllButton: {},
  viewAllButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#797A7B",
  },
  bottomContainer: {
    paddingTop: 48,
    paddingBottom: 11,
  },
  sectionHeaderTextEmpty: {
    fontFamily: "Poppins-Light",
    fontSize: 18,
    color: "#363939",
  },
  viewAllButtonTextEmpty: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#408C2B",
  },
});
