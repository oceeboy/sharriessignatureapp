import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../context/ProductContext";
import Orderitem from "../components/Orderitem"; // Import the Orderitem component
import { icons } from "../constants";
import { OrderDetail } from "../components";

const OrderHistoryPage = () => {
  const { orderedItems, setSelectedOrder, fetchOrderedItems } =
    useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePresentModal = (product) => {
    setSelectedOrder(product);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchOrderedItems();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ paddingVertical: 30 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontFamily: "Poppins-Bold",
          }}
        >
          My Order History
        </Text>
      </View>

      {orderedItems.length === 0 ? (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No items found</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollArea}
          showsVerticalScrollIndicator={false}
        >
          {orderedItems.map((item) => (
            <Orderitem
              key={item.$id}
              item={item}
              onPress={() => handlePresentModal(item)}
            />
          ))}
        </ScrollView>
      )}

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        presentationStyle="pageSheet"
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Image
              source={icons.backicon}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.modalHeaderText}>Order Details</Text>
        </View>
        <View style={styles.centeredView}>
          <OrderDetail />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OrderHistoryPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
  },
  modalHeaderText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  modalHeader: {
    paddingVertical: 20,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
  },
  backIconContainer: {
    width: 24,
    height: 24,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 13,
    height: 13,
  },
  scrollArea: {
    paddingBottom: 40,
    marginBottom: 150,
    alignItems: "center",
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
});
