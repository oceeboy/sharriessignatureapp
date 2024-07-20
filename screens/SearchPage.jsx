import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getImageUrl, getProducts } from "../services/apiService";

import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/ProductContext";
import { useNavigation } from "@react-navigation/native";
import { SkeletonLoader } from "../components";
import { icons } from "../constants";

const { width } = Dimensions.get("window");
const SearchPage = () => {
  const { setSelectedProduct } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProducts();
        setProducts(productData);
        setResults(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (!query) {
      setResults(products);
    } else {
      const filteredResults = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  const navigation = useNavigation();

  const nextPage = (product) => {
    setSelectedProduct(product);

    navigation.navigate("ProductDetail");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Search</Text>
        <View style={{ paddingHorizontal: 32 }}>
          <View style={styles.searchInputContainer}>
            <TouchableOpacity
              style={styles.searchIconContainer}
              onPress={handleSearch}
            >
              <Image
                source={icons.searchicon}
                style={styles.searchIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TextInput
              style={styles.searchinput}
              placeholder="Search for products...."
              placeholderTextColor="#B1B2B2"
              selectionColor="rgba(64, 140, 43, 1)"
              value={query}
              onChangeText={setQuery}
            />
          </View>
        </View>
      </View>
      {loading && <SkeletonLoader title={"map"} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && results.length === 0 && query && (
        <Text style={styles.noResultsText}>No products found</Text>
      )}
      {!loading && !error && results.length === 0 && !query && (
        <Text style={styles.noResultsText}>
          Start typing to search for products
        </Text>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 5,
          }}
        >
          {results.map((item) => (
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 48,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
  },

  itemContainer: {
    marginBottom: 16,
  },
  itemName: {
    fontSize: 18,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: "green",
  },
  errorText: {
    color: "red",
  },
  noResultsText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  searchInputContainer: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",

    borderRadius: 10,
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
});

export default SearchPage;
