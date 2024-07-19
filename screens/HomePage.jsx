import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getImageUrl, getProducts } from "../services/apiService";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/ProductContext";
import { collectionData, icons } from "../constants";
import {
  SliderItems,
  CartIcon,
  ProductCard,
  CollectionCard,
} from "../components";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { setSelectedProduct } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setIsLoading(false);
      setRefreshing(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  const navigation = useNavigation();

  const nextPage = (product) => {
    setSelectedProduct(product);

    navigation.navigate("ProductDetail");
  };

  const renderCategory = (categoryName) => {
    // Ensure products is an array
    if (!Array.isArray(products)) {
      return null;
    }

    const filteredProducts = products.filter((item) =>
      item.categories && Array.isArray(item.categories)
        ? item.categories.some(
            (category) =>
              category.name.toLowerCase() === categoryName.toLowerCase()
          )
        : false
    );

    return (
      <View style={styles.sectionContent}>
        <View style={styles.sectionContentContainer}>
          {isLoading ? (
            <ActivityIndicator color="#408C2B" size="large" />
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <View style={styles.productGrid}>
              {filteredProducts.map((item) => (
                <ProductCard
                  key={item.unique_id}
                  title={item.name}
                  price={item.current_price[0].NGN[0]}
                  image={getImageUrl(item.photos[0].url)}
                  onPress={() => nextPage(item)}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>Sharrie's Signature</Text>
        <CartIcon />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Welcome,{" "}
          <Text style={{ textTransform: "capitalize" }}>{user?.name}</Text>
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingHorizontal: 32 }}>
          <View style={styles.searchInputContainer}>
            <View style={styles.searchIconContainer}>
              <Image
                source={icons.searchicon}
                style={styles.searchIcon}
                resizeMode="contain"
              />
            </View>
            <TextInput
              style={styles.searchinput}
              placeholder="Search"
              placeholderTextColor="#B1B2B2"
              selectionColor="rgba(64, 140, 43, 1)"
            />
          </View>
        </View>

        <View style={styles.sliderContainer}>
          {isLoading ? (
            <ActivityIndicator color="#408C2B" size="large" />
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <SliderItems data={products} onPress={nextPage} />
          )}
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Deals</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>View All</Text>
            </TouchableOpacity>
          </View>
          {renderCategory("Deals")}
          <View style={styles.sectionHeader}>
            <Text style={styles.collectionHeaderText}>Our Collections</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.sectionContentContainer}>
              <View style={styles.productGrid}>
                {collectionData.map((item) => (
                  <CollectionCard
                    key={item.id}
                    title={item.name}
                    image={item.image}
                  />
                ))}
              </View>
            </View>
          </View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>You might like</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>View All</Text>
            </TouchableOpacity>
          </View>
          {renderCategory("mightlike")}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

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
    marginTop: 32,
  },
  logoText: {
    fontSize: 24,
    fontFamily: "Redressed-Regular",
    color: "rgba(64, 140, 43, 1)",
  },
  cartIconContainer: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  cartIcon: { width: 20, height: 20 },

  welcomeContainer: {
    width: "100%",
    marginHorizontal: 32,
    marginTop: 43,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#0A0B0A",
  },
  searchInputContainer: {
    width: "100%",
    height: 32,
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",

    borderRadius: 6,
    borderColor: "#D2D3D3",
    marginTop: 16,
  },
  searchIconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: { width: 20, height: 20 },
  searchinput: {
    width: 286,
    height: "100%",
    paddingRight: 10,
  },
  sliderContainer: {
    marginTop: 32,
  },
  sectionContainer: { paddingHorizontal: 20, marginVertical: 45 },
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
  sectionContent: {
    marginTop: 47,
  },
  sectionContentContainer: {
    paddingBottom: 50,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    gap: 5,
  },
  collectionHeaderText: {
    fontSize: 16,
    fontFamily: "Poppins-Light",
    letterSpacing: 5,
    lineHeight: 19,
  },
});
