import { Tabs } from "expo-router";
import React from "react";

import CustomStatusBar from "@/components/core/CustomStatusbar";
import TabBarIcon from "@/components/navigation/TabBarIcon";
import { useApp } from "@/contexts/AppProvider";
import { Colors } from "@/utils/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  const { colorScheme } = useApp();
  const isIos = Platform.OS === "ios";

  const _tabBarStyle = isIos ? styles.tabBarIos : styles.tabBarAndroid;
  return (
    <SafeAreaProvider style={{ backgroundColor: Colors[colorScheme].color }}>
      <CustomStatusBar />
      <Tabs
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBackground: () => (
            <View
              className=" bg-blue500 border-2 border-gray-200 flex-1"
              style={{ borderRadius: 50 }}
            />
          ),
          tabBarStyle: {
            borderColor: "#000",
            // borderWidth: 5,
            backgroundColor: Colors[colorScheme ?? "light"].tabBg,
            borderTopColor: "transparent",
            borderRadius: 50,
            marginHorizontal: "auto",
            // may to comment 2 lines below for full tbas
            left: "27%",
            width: 200,
            // transform: [{ translateX: -50 }],
            position: "absolute",
            elevation: 0,
            bottom: 10,
            ..._tabBarStyle,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon focused={focused}>
                <MaterialIcons name="home" size={35} color={color} />
              </TabBarIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="new-post"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon focused={focused}>
                <MaterialIcons name="add" size={35} color={color} />
              </TabBarIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="users"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon focused={focused}>
                <FontAwesome name="user" size={35} color={color} />
              </TabBarIcon>
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBarIos: {
    borderTopWidth: 0,
    shadowOpacity: 0,
    paddingTop: 20,
    height: 80,
  },
  tabBarAndroid: {
    height: 70,
    borderTopWidth: 0,
    shadowOpacity: 0,
  },
});
