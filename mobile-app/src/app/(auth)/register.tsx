import CustomInput from "@/components/core/inputs/CustomInput";
import { Colors } from "@/utils/constants/Colors";
import { api, getResError } from "@/utils/fetch";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Spinner } from "@ui-kitten/components";
import { Link, router } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Toast } from "react-native-toast-notifications";

const RegisterScreen = () => {
  const [data, setData] = React.useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const onRegister = async () => {
    setLoading(true);
    if (!data.fullName || !data.username || !data.email || !data.password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }
    try {
      const res = await api.post("/auth/register", data);
      console.log(res.data);
      setError("");
      Toast.show("Registered Successfully", { type: "success" });
      router.push("/login");
    } catch (error) {
      console.log(error);
      Toast.show(getResError(error), { type: "danger" });
    }
    setLoading(false);
  };

  const onChange = (name: keyof typeof data, value: string) => {
    setData({ ...data, [name]: value });
  };

  return (
    <View className=" bg-white flex-1 pt-20">
      <Pressable
        onPress={() => router.back()}
        className="text-primary absolute z-10 rotate-180 top-12 left-3 text-xl text-center"
      >
        <AntDesign name="arrowright" size={24} color={Colors.primary} />
      </Pressable>
      <View className=" bg-white rounded-t-[30px] flex-1">
        <ScrollView className="flex-1 px-3">
          <Image
            source={require("@/assets/images/gifs/signup.gif")}
            resizeMode="contain"
            className="w-80 h-80 mx-auto"
          />
          <Text className="font-bold mt-8 text-center">Welcome ...</Text>
          <Text className="font-bold mt-1 opacity-50 text-sm text-center">
            Please fill in the information
          </Text>
          {error ? (
            <Text className="text-red-500 text-sm text-center">{error}</Text>
          ) : null}
          <CustomInput
            className="mt-4"
            label="Full Name"
            onChangeText={(text) => onChange("fullName", text)}
            placeholder="Your Full Names"
          />
          <CustomInput
            className="mt-2"
            label="Username"
            onChangeText={(text) => onChange("username", text)}
            placeholder="Your Username"
          />
          <CustomInput
            label="Email"
            onChangeText={(text) => onChange("email", text)}
            placeholder="Your Email"
            className="mt-2"
            keyboardType="email-address"
          />
          <CustomInput
            onChangeText={(text) => onChange("password", text)}
            type="password"
            className="mt-2"
            placeholder="Your Password"
            secureTextEntry
            label="Password"
          />
          <Pressable
            onPress={onRegister}
            disabled={loading}
            className="bg-primary w-full flex-row  items-center justify-center mt-6 p-3 px-8 rounded-md"
          >
            <Text className="text-white text-lg font-bold">
              {loading ? (
                <Spinner style={{ borderColor: "#fff" }} />
              ) : (
                "Register"
              )}
            </Text>
          </Pressable>
          <Text className="text-center mt-8 text-gray-400">
            Already have an account?{" "}
            <Link href={"/login"} className="text-primary font-bold">
              Sign in
            </Link>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default RegisterScreen;
