import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import React from "react";
import {
    FlatList,
    ImageBackground,
    Pressable,
    Text,
    View,
} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { MEDITATION_DATA } from "@/constants/meditationData";
import backgroundImg from '@/assets/images/med.jpg'; 

const Page = () => {
    return (
        <ImageBackground 
            source={backgroundImg} 
            className="flex-1 justify-center"
        >
            <Pressable 
                onPress={() => router.back()}
                className="absolute top-10 left-3 z-10 p-3"
            >
                <AntDesign name="leftcircleo" size={40} color="white" />
            </Pressable>

            <View className="mb-6 items-center">
                <Text className="text-gray-300 mb-20 font-bold text-2xl text-center"> </Text>
                <Text className="text-white text-2xl font-semibold text-center">
                    Start your meditation practice today
                </Text>
            </View>

            <FlatList
                className="flex-1 w-full"
                data={MEDITATION_DATA}
                contentContainerStyle={{ paddingBottom: 90 }}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() =>
                            router.push(`/pages/meditation/${item.id}`)
                        }
                        className="h-24 w-11/12 my-2.5 rounded-lg overflow-hidden self-center"
                    >
                        <ImageBackground
                            source={MEDITATION_IMAGES[item.id - 1]}
                            resizeMode="cover"
                            className="flex-1 justify-center"
                        >
                            <LinearGradient
                                colors={[
                                    "transparent",
                                    "rgba(0,0,0,1)",
                                ]}
                                className="items-center justify-center h-full w-full"
                            >
                                <Text className="text-gray-200 text-lg font-bold text-center">
                                    {item.title}
                                </Text>
                            </LinearGradient>
                        </ImageBackground>
                    </Pressable>
                )}
            />
            <StatusBar style="dark" />
        </ImageBackground>
    );
};

export default Page;

