import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getImageUrl, getProducts } from "../services/apiService";

import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/ProductContext";
import { useNavigation } from "@react-navigation/native";

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 48,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Search for products..."
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      {loading && <Text>Loading...</Text>}
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
        contentContainerStyle={{ paddingVertical: 40, paddingHorizontal: 32 }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 10,
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
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
});

export default SearchPage;
