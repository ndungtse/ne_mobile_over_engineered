import { useApp } from "@/contexts/AppProvider";
import { Colors } from "@/utils/constants/Colors";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const UserLayout = () => {
  const { colorScheme } = useApp();
  const isIos = Platform.OS == "ios";
  const blurStyles = isIos ? {} : { headerStyle: { backgroundColor: "#fff" } };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: "Users",
          // headerBlurEffect: "regular",
          // headerTintColor: Colors[colorScheme].text,
          // headerStyle: { backgroundColor: Colors[colorScheme].color },
          // headerBackground: () => <BlurView className="" />,
          // headerTransparent: isIos,
          // headerSearchBarOptions: {
          //   placeholder: "Search Users",
          //   hideWhenScrolling: false,
          //   tintColor: Colors[colorScheme].text,
          //   headerIconColor: Colors[colorScheme].text,
          //   textColor: Colors[colorScheme].text,
          //   // onChangeText:
          // },
        }}
      />
    </Stack>
  );
};

export default UserLayout;
