import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabIcon from "./components/TabIcon";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./screens/HomePage";
import WishListPage from "./screens/WishListPage";
import ProfilePage from "./screens/ProfilePage";
import SearchPage from "./screens/SearchPage";
import ProductDetailPage from "./screens/ProductDetailPage";
import CheckOutPage from "./screens/CheckOutPage";
import { FontProvider } from "./context/FontProvider";
import { AppProvider } from "./context/ProductContext";
import { LoginPage, RegisterPage, WelcomePage } from "./screens";
import PaymentPage from "./screens/PaymentPage";
import OrderSucess from "./screens/OrderSucess";
import OrderHistoryPage from "./screens/OrderHistoryPage";

import { Notifications } from "./components";
import GlobalProvider from "./context/GlobalProvider";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckOut"
        component={CheckOutPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Paymentpage"
        component={PaymentPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Ordersucces"
        component={OrderSucess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="historypage"
        component={OrderHistoryPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  const screenOptions = {
    tabBarShowLabel: false,
    tabBarActiveTintColor: "#363939",
    tabBarInactiveTintColor: "#CDCDCD",

    tabBarStyle: {
      backgroundColor: "#fff",
      height: 81,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      zindex: 1,
      paddingHorizontal: 40,
      paddingBottom: 32,
      paddingTop: 12,
    },
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Home" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishListPage}
        options={{
          title: "Wishlist",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Wishlist" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Profile" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Search" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GlobalProvider>
      <FontProvider>
        <AppProvider>
          <NavigationContainer>
            <MainNavigator />
            <Notifications />
          </NavigationContainer>
        </AppProvider>
      </FontProvider>
    </GlobalProvider>
  );
}
