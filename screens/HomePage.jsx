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
  Modal,
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
  SkeletonLoader,
} from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { Snackbar, Provider as PaperProvider } from "react-native-paper";

const HomePage = () => {
  const { setSelectedProduct, addToCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartName, setCartName] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const openModal = (name) => {
    setModalVisible(true);
    setCartName(name);
  };

  const { user } = useGlobalContext();

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
      setSnackbarVisible(true);
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  const navigation = useNavigation();

  const nextPage = (product) => {
    setSelectedProduct(product);
    // navigation.navigate("ProductDetail");
  };

  const orderPage = () => {
    navigation.navigate("historypage");
  };

  const renderCategory = (categoryName) => {
    if (!Array.isArray(products)) {
      return <SkeletonLoader />;
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
            <SkeletonLoader title={"map"} />
          ) : error ? (
            error && (
              <View style={styles.errorContainer}>
                <View style={styles.nonetworkContainer}>
                  <Image
                    source={icons.nonetwork}
                    style={styles.nonetwork}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )
          ) : (
            <View style={styles.productGrid}>
              {filteredProducts.map((item) => (
                <ProductCard
                  key={item.unique_id}
                  title={item.name}
                  price={item.current_price[0].NGN[0]}
                  image={getImageUrl(item.photos[0].url)}
                  onPress={() => nextPage(item)}
                  productId={item.unique_id}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>Sharrie's Signature</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              style={{
                width: 28,
                height: 28,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={orderPage}
            >
              <Image
                source={icons.ordericon}
                style={{ width: 20, height: 20 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <CartIcon />
          </View>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome,
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
            <TouchableOpacity
              style={styles.searchInputContainer}
              onPress={() => navigation.navigate("Search")}
            >
              <View
                style={styles.searchIconContainer}
                onMagicTap={() => navigation.navigate("Search")}
              >
                <Image
                  source={icons.searchicon}
                  style={styles.searchIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.TextInput}>Search</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sliderContainer}>
            {isLoading ? (
              <SkeletonLoader title={"slider"} />
            ) : error ? (
              <View style={styles.errorContainer}>
                <View style={styles.nonetworkContainer}>
                  <Image
                    source={icons.wishuncheck}
                    style={styles.nonetwork}
                    resizeMode="contain"
                  />
                </View>
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
                      onPress={openModal}
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
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          presentationStyle="pageSheet"
        >
          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <TouchableOpacity
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 20,
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Image
                  source={icons.backicon}
                  style={{ width: 13, height: 13 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={{ fontFamily: "Poppins-Medium", fontSize: 16 }}>
                {cartName}
              </Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
              {renderCategory(cartName)}
            </ScrollView>
          </View>
        </Modal>
        <Snackbar
          style={{ bottom: 100 }}
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          {error}
        </Snackbar>
      </SafeAreaView>
    </PaperProvider>
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
    height: 40,
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
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 5,
  },
  collectionHeaderText: {
    fontSize: 16,
    fontFamily: "Poppins-Light",
    letterSpacing: 5,
    lineHeight: 19,
  },
  errorContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
    paddingVertical: 20,
  },
  errorText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "red",
  },
  nonetworkContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  nonetwork: {
    width: "100%",
    height: "100%",
  },
});
