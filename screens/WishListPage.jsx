import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { ProductCard } from "../components";
import { AppContext } from "../context/ProductContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const WishListPage = () => {
  const { wishlist, removeFromWishlist } = useContext(AppContext);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const navigation = useNavigation();
  const goHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Your Wishlist</Text>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 5 }}
          showsVerticalScrollIndicator={false}
        >
          {wishlist.length === 0 && (
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontFamily: "Poppins-SemiBold" }}>
                  Nothing here
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  width: 200,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: "#408C2B",
                }}
                onPress={goHome}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins-SemiBold",
                    color: "#fff",
                  }}
                >
                  Discover Products
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.productGrid}>
            {wishlist.map((item) => (
              <ProductCard
                key={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                productId={item.id}
                onPress={() => handleRemoveFromWishlist(item.id)}
                name={"wishlist"}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 16,
    marginTop: 20,
  },
  list: {
    flexGrow: 1,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: "#E74C3C",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 5,
  },
});

export default WishListPage;
