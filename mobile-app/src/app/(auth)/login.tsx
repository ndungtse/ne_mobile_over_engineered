import CustomInput from "@/components/core/inputs/CustomInput";
import { useAuth } from "@/contexts/AuthProvider";
import useStorage from "@/hooks/useStorage";
import { Colors } from "@/utils/constants/Colors";
import { api, getResError } from "@/utils/fetch";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { Spinner } from "@ui-kitten/components";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

const LoginScreen = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const { storeData } = useStorage();
  const { setToken, setUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();
  const toast = useToast();

  const onLogin = async () => {
    setLoading(true);
    setError("");
    if (!data.email || !data.password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }
    try {
      const res = await api.post("/auth/login", data);
      console.log(res.data);
      const res_data = res.data.data;
      const token = res_data.token;
      // const token = 'res_data.token'
      storeData("token", token);
      setToken(token);
      setUser(res_data.user);
      setError("");
      toast.show("Login Successfully", { type: "success" });
      router.push("/(tabs)");
    } catch (error) {
      const err = getResError(error);
      setError(err);
      toast.show(err, {
        type: "danger",
      });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View className=" bg-white flex-1 pt-20">
      <Pressable
        onPress={() => router.push("/")}
        className="text-primary absolute z-10 rotate-180 top-12 left-3 text-xl text-center"
      >
        <AntDesign name="arrowright" size={24} color={Colors.primary} />
      </Pressable>
      <View className=" bg-white flex-1 rounded-t-[30px]">
        {/* <View className="flex mt-6 flex-row items-center justify-center">
          <Text className=" text-4xl font-bold">Mob</Text>
          <Text className=" text-4xl text-primary font-bold">Starter</Text>
        </View> */}
        <Image
          source={require("@/assets/images/gifs/login.gif")}
          resizeMode="contain"
          className="w-80 h-80 mx-auto"
        />
        <Text className="font-bold mt-6 text-center">Welcome ...</Text>
        <ScrollView className="flex-1 px-3">
          <Text className="font-bold mt-1 opacity-50 text-sm text-center">
            Sign in to continue
          </Text>
          {error ? (
            <Text className="text-red-500 text-sm text-center">{error}</Text>
          ) : null}
          <CustomInput
            // leftSection={<Feather name="mail" size={28} color="gray" />}
            placeholder="Your Email"
            className="mt-3"
            label="Email"
            onChangeText={(text) => setData({ ...data, email: text })}
          />
          <CustomInput
            onChangeText={(text) => setData({ ...data, password: text })}
            type="password"
            label="Password"
            secureTextEntry
            className="mt-3"
            placeholder="Your Password"
            onSubmitEditing={onLogin}
            // leftSection={<Feather name="lock" size={25} color="gray" />}
          />
          <Pressable
            onPress={onLogin}
            disabled={loading}
            className="bg-primary w-full flex-row  items-center justify-center mt-6 p-3 px-8 rounded-md"
          >
            <Text className="text-white text-lg font-bold">
              {loading ? (
                <Spinner style={{ borderColor: "#fff" }} />
              ) : (
                "Sign in"
              )}
            </Text>
          </Pressable>
          <View className="flex-row items-center mt-4">
            <View className="flex-1 border-b-2 border-gray-300"></View>
            <Text className="mx-2 text-gray-400">OR</Text>
            <View className="flex-1 border-b-2 border-gray-300"></View>
          </View>
          <Link
            href="/forgot-password"
            className="text-center mt-4 text-primary font-semibold"
          >
            Forgot Password?
          </Link>
          <Text className="text-center my-4 text-gray-400">
            Don't have an account?{" "}
            <Link href={"/register"} className="text-primary font-bold">
              Sign up
            </Link>
          </Text>
        </ScrollView>
      </View>
      {/* </View> */}
    </View>
  );
};

export default LoginScreen;
