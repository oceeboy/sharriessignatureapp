import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../constants/icons";
import { AppContext } from "../context/ProductContext";
import { getImageUrl } from "../services/apiService";
import AddToCartBox from "../components/AddToCartBox";
import CartIcon from "../components/CartIcon";
import { useNavigation } from "@react-navigation/native";

const ProductDetailPage = () => {
  const {
    selectedProduct,
    addToCart,
    recentlyViewedItems,
    setRecentlyViewedItems,
  } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedProduct) {
      setRecentlyViewedItems((prevItems) => {
        const itemExists = prevItems.find(
          (item) => item.id === selectedProduct.id
        );
        if (!itemExists) {
          return [selectedProduct, ...prevItems].slice(0, 5);
        }
        return prevItems;
      });
    }
  }, [selectedProduct, setRecentlyViewedItems]);

  const goBack = () => {
    navigation.goBack();
  };

  const checkOut = () => {
    navigation.navigate("CheckOut");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backIconContainer} onPress={goBack}>
          <Image
            source={icons.backicon}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <CartIcon />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.productContainer}>
          <View style={styles.imageGrid}>
            <View style={styles.imageContainerOne}>
              {/* <Image
                source={{
                  uri: getImageUrl(selectedProduct.photos[0].url),
                }}
                style={styles.image}
                resizeMode="cover"
              /> */}

              {selectedProduct.photos.map((photos) => (
                <View key={photos}>
                  <Image
                    source={{ uri: getImageUrl(photos.url) }}
                    style={{ height: "100%", width: "100%" }}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </View>
          <View style={styles.productInfoContainer}>
            <View style={styles.rowGap}>
              <Text style={styles.productId}>{selectedProduct.unique_id}</Text>
              <Text
                style={
                  selectedProduct.is_available
                    ? styles.availableStock
                    : styles.UnavailableStock
                }
              >
                {selectedProduct.is_available ? "In Stock" : "Out of stock"}
              </Text>
            </View>
            <Text style={styles.productName}>{selectedProduct.name}</Text>
            <Text style={styles.productDescription}>
              {selectedProduct.description}
            </Text>
            <Text style={styles.productLabel}>
              Made with pure natural ingredients
            </Text>
            <View style={{ gap: 24, marginTop: 40 }}>
              <View style={styles.dropDownContainer}>
                <View style={styles.dropDownHeader}>
                  <Text style={styles.dropDownHeaderText}>How to use </Text>
                  <TouchableOpacity
                    style={styles.arrowContainer}
                    onPress={() => setIsOpen(!isOpen)}
                  >
                    <Image
                      source={icons.arrowdown}
                      style={styles.arrowdown}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                {!isOpen || (
                  <View style={styles.dropDownContent}>
                    <Text style={styles.dropDownText}>
                      Apply a generous amount to damp skin, massage in circular
                      motions, and rinse thoroughly. Use 2-3 times a week for
                      best results.
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.dropDownContainer}>
                <View style={styles.dropDownHeader}>
                  <Text style={styles.dropDownHeaderText}>
                    Delivery and drop-off
                  </Text>
                  <TouchableOpacity
                    style={styles.arrowContainer}
                    onPress={() => setIsOpen(!isOpen)}
                  >
                    <Image
                      source={icons.arrowdown}
                      style={styles.arrowdown}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                {!isOpen || (
                  <View style={styles.dropDownContent}>
                    <Text style={styles.dropDownText}>
                      Home deliveries and drop-offs takes 2-5 working days. All
                      deliveries within Lagos range between 1,500 -3,000.
                      Outside Lagos deliveries cost more.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={{ marginTop: 32, paddingHorizontal: 32 }}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                style={[
                  styles.quantityButton,
                  { borderRightWidth: 1, borderRightColor: "#EAEAEA" },
                ]}
              >
                <Image
                  source={icons.minus}
                  resizeMode="contain"
                  style={styles.quantityButtonIcon}
                />
              </TouchableOpacity>
              <View style={styles.quantityButton}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev + 1)}
                style={[
                  styles.quantityButton,
                  { borderLeftWidth: 1, borderLeftColor: "#EAEAEA" },
                ]}
              >
                <Image
                  source={icons.plus}
                  resizeMode="contain"
                  style={styles.quantityButtonIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addtocartContainer}>
        <AddToCartBox
          onPress={addToCart}
          selectedProduct={selectedProduct}
          quantity={quantity}
          checkOut={checkOut}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {},
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    alignItems: "center",
    top: 32,
    zIndex: 1,
  },
  backIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 13,
    height: 13,
  },
  imageGrid: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 8,
  },
  imageContainerOne: { width: "100%", height: 435 },

  productContainer: {
    paddingBottom: 63,
  },
  productInfoContainer: {
    marginTop: 63,
    paddingHorizontal: 32,
  },
  rowGap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productId: {
    fontSize: 16,
    fontFamily: "Poppins-Light",
    color: "#6E6E6E",
  },
  availableStock: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#408C2B",
  },
  UnavailableStock: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "red",
  },
  productName: {
    marginTop: 32,
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: "#0A0B0A",
  },
  productDescription: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#5A5A5A",
  },
  productLabel: {
    color: "#4EAB35",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    marginTop: 24,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dropDownHeaderText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  arrowdown: {
    width: 12,
    height: 12,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropDownContainer: { paddingBottom: 5, borderBottomWidth: 1 },
  dropDownContent: {
    width: "100%",
  },
  dropDownText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#5A5A5A",
  },
  addtocartContainer: {
    width: "100%",
  },
  quantityButton: {
    height: 36,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    width: 132,
    borderRadius: 6,
    height: 36,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  quantityButtonIcon: {
    width: 15,
    height: 15,
  },
  quantityText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});
