import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../context/ProductContext";
import Orderitem from "../components/Orderitem";
import { icons } from "../constants";
import { OrderDetail } from "../components";
import { fetchOrderedItems } from "../lib/appwrite"; // Adjust the import path as needed
import { useGlobalContext } from "../context/GlobalProvider"; // Adjust the import path as needed

const OrderHistoryPage = () => {
  const { setSelectedOrder } = useContext(AppContext);
  const { user } = useGlobalContext(); // Get the user from the global context
  const [orderedItems, setOrderedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePresentModal = (product) => {
    setSelectedOrder(product);
    setModalVisible(true);
  };

  useEffect(() => {
    const email = user.email;

    if (user) {
      fetchOrderedItems(setOrderedItems, user, email); // Fetch ordered items based on the user
    }
  }, [user]);

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
        <FlatList
          data={orderedItems}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Orderitem item={item} onPress={() => handlePresentModal(item)} />
          )}
          contentContainerStyle={styles.scrollArea}
          showsVerticalScrollIndicator={false}
        />
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
