import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import CustomInput from "@/components/core/inputs/CustomInput";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/contexts/AuthProvider";
import { Toast } from "react-native-toast-notifications";
import { Spinner } from "@ui-kitten/components";
import { getResError } from "@/utils/fetch";

const NewPost = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    image: null as any, // image url optional
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { AuthApi } = useAuth();

  const onSubmit = async () => {
    setError("");
    if (!data.title || !data.content) {
      Toast.show("Please fill all fields", { type: "danger" });
      setError("Please fill all fields");
      return;
    }
    try {
      const res = await AuthApi.post("/posts", data);
      console.log(res.data);
      Toast.show("Post created successfully", { type: "success" });
      setData({ title: "", content: "", image: "" });
    } catch (error) {
      console.log(error);
      Toast.show(getResError(error), { type: "danger" });
    }
  };

  // creating social media form to
  return (
    <ThemedView className="flex-1 flex-col p-4">
      <View className="flex flex-row items-center ">
        <ThemedText className=" text-lg font-bold">Place</ThemedText>
        <Text className=" text-lg text-primary font-bold">Hub</Text>
      </View>
      <ThemedText className="text-xl font-bold text-center">
        Create a new post
      </ThemedText>
      {error && <Text className="text-red-500">{error}</Text>}
      <CustomInput
        label="Title"
        value={data.title}
        onChangeText={(title) => setData({ ...data, title })}
        placeholder="Title"
      />
      <CustomInput
        label="Content"
        value={data.content}
        onChangeText={(content) => setData({ ...data, content })}
        editable
        numberOfLines={6}
        maxLength={400}
        textAlignVertical="top"
        autoCapitalize="sentences"
        placeholder="Content"
        multiline
      />
      <CustomInput
        label="Image"
        value={data.image}
        onChangeText={(image) => setData({ ...data, image })}
        placeholder="Image url"
      />
      <Text className="text-sm text-gray-500">Optional</Text>

      <Pressable onPress={onSubmit} className="bg-primary p-3 rounded-md mt-2">
        <Text className="text-white text-center text-base font-semibold">
          {loading ? <Spinner /> : "Create Post"}
        </Text>
      </Pressable>
    </ThemedView>
  );
};

export default NewPost;
