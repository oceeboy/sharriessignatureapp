import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

const SkeletonLoader = ({ title }) => {
  return (
    <>
      {title === "map" && (
        <View style={styles.skeletonContainer}>
          {[...Array(6)].map((_, index) => (
            <View key={index} style={styles.skeletonCard}>
              <View style={styles.skeletonImage} />
              <View style={styles.skeletonText} />
            </View>
          ))}
        </View>
      )}

      {title === "slider" && (
        <FlatList
          data={Array(6)}
          renderItem={({ item }) => (
            <View key={item} style={styles.skeletonCard}>
              <View style={styles.skeletonImage} />
              <View style={styles.skeletonText} />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={<View style={{ width: 32 }} />}
          ListFooterComponent={<View style={{ width: 10 }} />}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  skeletonCard: {
    width: 160,
    height: 200,

    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  skeletonImage: {
    width: "100%",
    height: "80%",
    backgroundColor: "#c0c0c0",
    borderRadius: 10,
  },
  skeletonText: {
    width: "80%",
    height: 20,
    backgroundColor: "#d0d0d0",
    marginTop: 10,
    borderRadius: 5,
  },
});

export default SkeletonLoader;
