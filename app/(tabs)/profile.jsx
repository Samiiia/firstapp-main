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
import SOUNDS_IMAGES from "@/constants/sounds-images";
import { SOUNDS_DATA } from "@/constants/soundsdata";
import backgroundImg from '@/assets/images/son.jpg'; 

const son = () => {
    return (
        <ImageBackground 
            source={backgroundImg} 
            className="flex-1 justify-center"
        >
            <Pressable 
                onPress={() => router.back()}
                className="absolute top-12 left-1.5 z-10 p-2"
            >
                <AntDesign name="leftcircleo" size={40} color="white" />
            </Pressable>

            <View className="mb-8 items-center">
                <Text className="text-gray-300 mb-20 font-bold text-2xl text-center"> </Text>
                <Text className="text-white mb-8 text-xl font-semibold text-center">
                For better focus, deep relaxation, and restorative sleep
                </Text>
            </View>

            <FlatList
                className="flex-1 w-full"
                data={SOUNDS_DATA}
                contentContainerStyle={{ paddingBottom: 95 }}
                keyExtractor={(item) => item.ID.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => 
                          router.push(`/pages/sson/${item.ID}`)
                        }
                        className="h-20 w-11/12 my-4 rounded-xl overflow-hidden self-center"
                    >
                        <ImageBackground
                            source={SOUNDS_IMAGES[item.ID - 1]}
                            resizeMode="cover"
                            className="flex-1 justify-center "
                        >
                            <LinearGradient
                                colors={[
                                    "transparent",
                                    "rgba(0,0,0,1)",
                                    
                                ]}
                                className= "justify-center  h-full w-full"
                            >
                                <Text className="text-gray-300 text-lg font-bold pl-9">
                                    {item.titlee}
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

export default son;
