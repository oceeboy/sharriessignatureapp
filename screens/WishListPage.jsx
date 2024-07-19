import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SkeletonLoader } from "../components";

const WishListPage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View>
          <SkeletonLoader title={"slider"} />

          <SkeletonLoader title={"map"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishListPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollArea: {
    paddingBottom: 100,
    marginBottom: 100,
  },
});
