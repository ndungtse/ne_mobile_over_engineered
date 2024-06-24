import React from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
// import Modal from "react-native-modal";
import { Comment } from "@/types/schema";
import Modal from "react-native-modal";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useGet } from "@/hooks/useGet";

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  postId: string;
}

const CommentsModal = ({ visible, setVisible, postId }: Props) => {
  const {
    data: comments,
    loading,
    getData,
  } = useGet<Comment[]>(`/comments/${postId}`);
  return (
    <>
      {/* <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
      >
      <Card disabled={true}>
        <Text>Welcome to UI Kitten 😻</Text>
        <Button onPress={() => setVisible(false)}>DISMISS</Button>
      </Card>
    </Modal> */}
      <Modal
        onSwipeComplete={() => setVisible(false)}
        swipeDirection="down"
        isVisible={visible}
        style={{}}
        onBackdropPress={() => setVisible(false)}
        onModalShow={getData}
      >
        <View
          style={{ flex: 1, borderTopRightRadius: 30 }}
          className="w-full flex-col mt-52"
        >
          <ThemedView className="flex-col flex-1 rounded-t-3xl p-3 w-full">
            {/* display comments */}
            <ThemedText className="text-lg font-bold">
              Comments ({comments?.length})
            </ThemedText>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getData} />
              }
            >
              {loading && (
                <ThemedView className="flex-col items-center justify-center">
                  <ThemedText>Loading comments...</ThemedText>
                </ThemedView>
              )}
              {comments?.map((comment) => (
                <ThemedView
                  key={comment.id}
                  className="flex-row p-3 border-b border-gray-200"
                >
                  <Image
                    source={{
                      uri:
                        comment?.author?.profilePic ??
                        `https://ui-avatars.com/api/?name=${comment?.author?.fullName}`,
                    }}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                    resizeMode="cover"
                  />
                  <View className="flex-col ml-2">
                    <ThemedText className="font-bold">
                      {comment.author?.fullName}
                    </ThemedText>
                    <ThemedText>{comment.content}</ThemedText>
                  </View>
                </ThemedView>
              ))}
            </ScrollView>
          </ThemedView>
        </View>
      </Modal>
    </>
  );
};

export default CommentsModal;
