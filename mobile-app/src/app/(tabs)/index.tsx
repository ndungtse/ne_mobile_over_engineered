import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import PostCard from "@/components/shared/PostCard";
import { useGet } from "@/hooks/useGet";
import { Post } from "@/types/schema";
import { Colors } from "@/utils/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
// import

export default function HomeScreen() {
  const {
    data: posts,
    getData,
    loading,
  } = useGet<Post[]>("/posts", { initialData: [] });
  return (
    <ThemedView className="flex-1 flex-col">
      <View className="flex-row justify-between items-center p-3">
        <View className="flex flex-row items-center justify-center">
          <ThemedText className=" text-lg font-bold">Place</ThemedText>
          <Text className=" text-lg text-primary font-bold">Hub</Text>
        </View>
        {/* <Image
          source={require("@/assets/images/icon.png")}
          width={30}
          height={30}
          className="w-10 h-10"
          resizeMode="contain"
        /> */}
        <Pressable
          className=" bg-gray-300/30 p-2 rounded-full"
          onPress={() => router.push("/notifications")}
        >
          <AntDesign name="bells" size={24} color={Colors.primary} />
        </Pressable>
      </View>
      <ScrollView
        className="flex-1 p-3"
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            tintColor={Colors.primary}
            colors={[Colors.primary]}
            refreshing={loading}
            onRefresh={getData}
          />
        }
      >
        {loading && (
          <View className="flex-col items-center justify-center">
            <Text>Loading posts...</Text>
          </View>
        )}
        {posts?.map((post) => (
          <PostCard refetch={getData} key={post.id} post={post} />
        ))}
      </ScrollView>
    </ThemedView>
  );
}
