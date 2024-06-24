import { View, Text, Image, Pressable, TextInput } from "react-native";
import React from "react";
import { Post } from "@/types/schema";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/utils/constants/Colors";
import { useAuth } from "@/contexts/AuthProvider";
import { Spinner } from "@ui-kitten/components";
import { Toast } from "react-native-toast-notifications";
import CommentsModal from "./CommentsModal";
import PostOptionPopup from "./PostOptionPopup";
import { router } from "expo-router";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface Props {
  post: Post;
  refetch?: () => void;
}

const PostCard = ({ post, refetch }: Props) => {
  const [comment, setComment] = React.useState("");
  const [commenting, setCommenting] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const { AuthApi } = useAuth();

  const handleComment = async () => {
    setCommenting(true);
    try {
      await AuthApi.post(`/comments`, { content: comment, postId: post.id });
      refetch?.();
      // Toast.show("Commented successfully", { type: "success" });
      setComment("");
    } catch (error) {
      console.log(error);
      Toast.show("Failed to comment", { type: "danger" });
    }
    setCommenting(false);
  };

  return (
    <View
      className="flex flex-col rounded-lg p-3 mt-3  bg-gray-400/10"
      style={{ elevation: 0 }}
    >
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={() => router.push(`/user/${post?.author?.id}`)}
          className="flex-row items-center"
        >
          <Image
            source={{
              uri:
                post?.author?.profilePic ??
                `https://ui-avatars.com/api/?name=${post?.author?.fullName}`,
            }}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
            resizeMode="cover"
          />
          <View className="flex-col ml-2">
            <ThemedText className="flex-row">
              {post?.author?.fullName.split(" ")[0]}
              <ThemedText className="text-gray-500">
                @{post?.author?.username}
              </ThemedText>
            </ThemedText>
            <ThemedText>
              {new Date(post?.createdAt).toLocaleDateString()}
            </ThemedText>
          </View>
        </Pressable>
        <PostOptionPopup
          // visible={showOptions}
          // setVisible={setShowOptions}
          post={post}
          refetch={refetch}
        />
      </View>
      <ThemedText className=" text-base">{post?.title}</ThemedText>
      {post.image && (
        <Image
          source={{ uri: post?.image }}
          className="w-full h-52 rounded-md mt-2"
          resizeMode="cover"
        />
      )}
      <ThemedText>{post?.content}</ThemedText>
      {/* Comments, likes */}
      <View className="flex-row justify-between mt-2">
        <Pressable
          onPress={() => setShowComments(!showComments)}
          className="flex-row items-center"
        >
          <AntDesign name="message1" size={24} color={Colors.primary} />
          <ThemedText className="ml-1">{post?.comments?.length}</ThemedText>
        </Pressable>
        <Pressable className="flex-row items-center">
          <AntDesign name="like2" size={24} color={Colors.primary} />
          <ThemedText className="ml-1">{post?.likes?.length ?? 0}</ThemedText>
        </Pressable>
      </View>
      {/* Comment section */}
      <View className="flex-row mt-2">
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Add Comment"
          onSubmitEditing={handleComment}
          className="flex-1 p-2  bg-gray-400/10 rounded-md"
        />
        <Pressable
          onPress={handleComment}
          disabled={commenting}
          className="bg-primary p-2 rounded-md ml-2"
        >
          {commenting ? (
            <Spinner />
          ) : (
            <AntDesign name="arrowright" size={24} color={"white"} />
          )}
        </Pressable>
      </View>
      <CommentsModal
        visible={showComments}
        setVisible={setShowComments}
        // postId={post.id}
        postId={post.id}
      />
    </View>
  );
};

export default PostCard;
