import { useAuth } from "@/contexts/AuthProvider";
import { Post } from "@/types/schema";
import { AntDesign } from "@expo/vector-icons";
import { Avatar, Layout, Popover, Spinner } from "@ui-kitten/components";
import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface Props {
  //   visible: boolean;
  //   setVisible: (visible: boolean) => void;
  post: Post;
  refetch?: () => void;
}

const PostOptionPopup = ({ post, refetch }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const { AuthApi } = useAuth();

  const onDelete = async () => {
    setDeleting(true);
    try {
      await AuthApi.delete(`/posts/${post.id}`);
      refetch?.();
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
  };

  const renderAnchor = () => (
    <Pressable className="" onPress={() => setVisible(!visible)}>
      <AntDesign name="ellipsis1" size={24} color={Colors.primary} />
    </Pressable>
  );
  return (
    <Popover
      visible={visible}
      anchor={renderAnchor}
      onBackdropPress={() => setVisible(false)}
    >
      <Layout style={styles.content}>
        {/* <Text>Welcome to UI Kitten 😻</Text> */}
        {post.isMine && (
          <Pressable
            onPress={onDelete}
            className="flex-row items-center w-full p-2"
          >
            {deleting ? (
              <Spinner style={{ borderColor: "red" }} />
            ) : (
              <AntDesign name="delete" size={20} color="red" />
            )}
            <Text className="ml-2 text-red-500">Delete</Text>
          </Pressable>
        )}
      </Layout>
    </Popover>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
});

export default PostOptionPopup;
