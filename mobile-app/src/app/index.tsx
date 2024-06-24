import ImageCarousel from "@/components/shared/ImageCarousel";
import { Colors } from "@/utils/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexPage = () => {
  const router = useRouter();

  const imageUrls = [
    require("@/assets/images/gifs/upgrade.gif"),
    require("@/assets/images/gifs/announce.gif"),
  ];

  return (
    <SafeAreaView className=" flex-1" edges={[]}>
      {/* <CustomStatusBar style="light" backgroundColor={Colors.primary} /> */}
      <View className="flex-1 items-center justify-center bg-white">
        <View className="px-5 flex-col">
          {/* <Image
            className=" bg-primary overflow-hidden"
            // width={100}
            source={require("@/assets/images/gifs/upgrade.gif")}
          /> */}
          {/* <View className="flex flex-row items-center justify-center">
            <Text className=" text-4xl font-bold">Mob</Text>
            <Text className=" text-4xl text-primary font-bold">Starter</Text>
          </View> */}
          <ImageCarousel
            images={imageUrls}
            renderItem={({ index }) => (
              <Image
                resizeMode="cover"
                className="object-cover w-full h-full"
                source={imageUrls[index]}
              />
            )}
          />
        </View>
        <Text className="text-primary text-xl">Welcome to PlaceholderHub</Text>
        <Text className="text-center text-gray-500 mt-2">
          The best platform to share your thoughts and ideas with
          json-placeholder community
        </Text>
        <Pressable
          onPress={() => router.push("/login")}
          className="bg-primary w-fit flex-row gap-x-2 items-center justify-center absolute bottom-11 text-primary p-3 px-8 pb-3.5 rounded-[120px] mt-3"
        >
          <Text className="text-white text-lg font-bold">Get Started</Text>
          <AntDesign name="arrowright" size={24} color={Colors["dark"].text} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default IndexPage;
