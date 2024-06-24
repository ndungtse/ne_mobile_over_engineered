import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomStatusBar from "@/components/core/CustomStatusbar";
import PostCard from "@/components/shared/PostCard";
import { useAuth } from "@/contexts/AuthProvider";
import { useGet } from "@/hooks/useGet";
import useStorage from "@/hooks/useStorage";
import { Post } from "@/types/schema";
import { Colors } from "@/utils/constants/Colors";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

const Profile = () => {
  const { user, setToken, setUser } = useAuth();
  const { removeData } = useStorage();
  const {
    data: myPosts,
    loading,
    error,
    getData,
  } = useGet<Post[]>("/posts/my-posts", { initialData: [] });

  const logout = () => {
    removeData("token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      <CustomStatusBar />
      <ThemedView className="flex-1 p-2">
        <View className="flex flex-row justify-between items-center">
          {/* <Pressable
            onPress={() => router.back()}
            className="flex w-9 h-9 rounded-full justify-center items-center flex-col p-2 border border-primary"
            style={{ transform: [{ rotate: "180deg" }] }}
          >
            <ArrowIcon size={20} color={Colors.primary} />
          </Pressable> */}
          {/* <View className="flex-row w-full ml-4 items-start">
            <ThemedText className=" font-bold text-lg">Profile</ThemedText>
          </View> */}
        </View>
        <View className="flex-row">
          <Image
            source={{
              uri:
                user?.profilePic ??
                `https://ui-avatars.com/api/?name=${user?.fullName}`,
            }}
            width={50}
            height={50}
            className="w-14 h-14 rounded-full"
            resizeMode="cover"
          />
          <View className="flex-col ml-2">
            <ThemedText className="text-lg font-bold">
              Hello, {user?.fullName}
            </ThemedText>
            <ThemedText className="text-gray-400">
              @{user?.username} • {user?.email}
            </ThemedText>
          </View>
        </View>
        <Pressable
          onPress={() => router.push("/settings")}
          className=" mt-4 items-center bg-gray-400/10 justify-between flex-row px-3 py-2 rounded-md"
        >
          <View className="flex-row items-center flex-1">
            <AntDesign name="setting" size={24} color={Colors.primary} />
            <Text className="text-primary text-lg ml-3">Settings</Text>
          </View>
          <FontAwesome6 name="chevron-right" size={20} color={Colors.primary} />
        </Pressable>
        <Pressable
          onPress={logout}
          className=" mt-4 items-center flex-row px-3 py-1 rounded-md"
        >
          <AntDesign name="logout" size={24} color={Colors.primary} />
          <Text className="text-primary text-lg ml-3">Logout</Text>
        </Pressable>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getData} />
          }
        >
          <ThemedText className="text-lg font-bold mt-4">
            My Posts ({myPosts?.length})
          </ThemedText>
          {loading && (
            <ThemedView className="flex-col items-center justify-center">
              <ThemedText>Loading posts...</ThemedText>
            </ThemedView>
          )}
          {!loading && myPosts?.length === 0 && (
            <ThemedText className="text-center text-gray-500">
              You have no posts yet
            </ThemedText>
          )}
          {myPosts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ScrollView>
      </ThemedView>
    </>
  );
};

export default Profile;
