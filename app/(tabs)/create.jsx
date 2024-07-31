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
import STORIES_IMAGES from "@/constants/stories-images";
import { STORIES_DATA } from "@/constants/storiesdata";
import backgroundImg from '@/assets/images/sss.jpg'; 




const stories = () => {
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

            <View className="mb-10 items-center">
                <Text className="text-gray-300 mb-10 mt-20 font-bold text-2xl text-center">Audio stories </Text>
                    <Text className="text-white mb-10 text-1xl font-bold text-center">Listen and Unwind</Text>
             </View>

            <FlatList
                className="flex-1 w-full"
                data={STORIES_DATA}
                contentContainerStyle={{ paddingBottom: 90 }}
                keyExtractor={(item) => item.iD.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() =>
                            router.push(`pages/stories/${item.iD}`)
                        }
                        className="h-24 w-11/12 my-2.5 rounded-lg overflow-hidden self-center"
                    >
                        <ImageBackground
                            source={STORIES_IMAGES[item.iD - 1]}
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
                                    {item.titleee}                    
                                </Text>
                                <Text className="text-gray-200 font-light text-center">
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

export default stories;
