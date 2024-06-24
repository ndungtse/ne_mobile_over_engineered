import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomStatusBar from "@/components/core/CustomStatusbar";
import { ArrowIcon } from "@/components/icons";
import PostCard from "@/components/shared/PostCard";
import { useGet } from "@/hooks/useGet";
import { User } from "@/types/schema";
import { Colors } from "@/utils/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";

const UserProfile = () => {
  const { id } = useLocalSearchParams();
  const {
    data: user,
    loading,
    getData,
  } = useGet<User>(`/user/${id}/posts`, {});

  return (
    <>
      <CustomStatusBar />
      <ThemedView className="flex-1 p-2">
        <View className="flex flex-row justify-between items-center">
          <Pressable
            onPress={() => router.back()}
            className="flex w-9 h-9 rounded-full justify-center items-center flex-col p-2 border border-primary"
            style={{ transform: [{ rotate: "180deg" }] }}
          >
            <ArrowIcon size={20} color={Colors.primary} />
          </Pressable>
          <View className="flex-row w-full ml-4 items-start">
            <ThemedText className=" font-bold text-lg">Profile</ThemedText>
          </View>
        </View>
        <View className="flex-row mt-4">
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
              {user?.fullName}
            </ThemedText>
            <ThemedText className="text-gray-400">
              @{user?.username} • {user?.email}
            </ThemedText>
          </View>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getData} />
          }
        >
          <ThemedText className="text-lg font-bold mt-4">
            Posts ({user?.posts?.length})
          </ThemedText>
          {loading && (
            <ThemedView className="flex-col items-center justify-center">
              <ThemedText>Loading posts...</ThemedText>
            </ThemedView>
          )}
          {!loading && user?.posts?.length === 0 && (
            <ThemedText className="text-center text-gray-500">
              You have no posts yet
            </ThemedText>
          )}
          {user?.posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ScrollView>
      </ThemedView>
    </>
  );
};

export default UserProfile;
