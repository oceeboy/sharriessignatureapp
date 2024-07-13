import React, { useContext } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { AppContext } from "../context/ProductContext";
import { getImageUrl } from "../services/apiService";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "./ProductCard";

const RecentlyViewedItem = () => {
  const { recentlyViewedItems = [] } = useContext(AppContext);
  const navigation = useNavigation();

  const handleProductSelect = () => {
    navigation.navigate("Main");
  };

  if (recentlyViewedItems.length === 0) {
    return <Text style={styles.noItemsText}>No recently viewed items</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.productGrid}>
          {recentlyViewedItems.map((item) => (
            <ProductCard
              key={item.unique_id}
              image={getImageUrl(item.photos[0].url)}
              price={item.current_price[0].NGN[0]}
              title={item.name}
              onPress={handleProductSelect}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  scrollView: {},
  itemContainer: {
    marginRight: 15,
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  noItemsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    gap: 5,
  },
});

export default RecentlyViewedItem;
