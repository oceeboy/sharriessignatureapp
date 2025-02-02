import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ProductCard from "./ProductCard";
import icons from "../constants/icons";
import { getImageUrl } from "../services/apiService";

const SliderItems = ({ data, onPress }) => {
  const flatListRef = useRef(null);

  const handleScroll = (direction) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: direction === "next" ? 200 : 0,
        animated: true,
      });
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Just for you</Text>
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            style={styles.arrowBox}
            onPress={() => handleScroll("prev")}
          >
            <Image
              source={icons.leftarrow}
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.arrowBox}
            onPress={() => handleScroll("next")}
          >
            <Image
              source={icons.rightarrow}
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item }) => (
          <ProductCard
            title={item.name}
            price={item.current_price[0].NGN[0]}
            image={getImageUrl(item.photos[0].url)}
            onPress={() => onPress(item)}
            productId={item.unique_id}
          />
        )}
        keyExtractor={(item) => item.unique_id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={<View style={{ width: 32 }} />}
        ListFooterComponent={<View style={{ width: 10 }} />}
      />
    </>
  );
};

export default SliderItems;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 48,
    marginBottom: 24,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Lora-SemiBold",
  },
  arrowContainer: {
    flexDirection: "row",
    gap: 10,
  },
  arrow: {
    width: 15,
    height: 15,
  },
  itemContainer: {
    width: 150,
    marginHorizontal: 5,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "green",
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    color: "green",
  },
  arrowBox: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
