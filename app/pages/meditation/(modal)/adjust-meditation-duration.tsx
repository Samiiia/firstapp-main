import { View, Text, Pressable, ImageBackground} from 'react-native';
import React, { useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { TimerContext } from "@/context/TimerContext";
import backgroundImg from '@/assets/images/time.jpg';

const AdjustMeditationDuration = () => {
    const { setDuration } = useContext(TimerContext);

    const handlePress = (duration: number) => {
        setDuration(duration);
        router.back();
    };

    return (
<ImageBackground source={backgroundImg} style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
            <Pressable
                onPress={() => router.back()}
                style={{ position: 'absolute', top: 30, left: 16, zIndex: 10 }}
            >
                <AntDesign name="leftcircleo" size={40} color="black" />
            </Pressable>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 24 }}>
                    Adjust your meditation duration
                </Text>
                
                <View style={{ width: '100%', paddingHorizontal: 16 }}>
                    <CustomButton
                        title="10 seconds"
                        onPress={() => handlePress(10)}
                        containerStyles="mt-4 bg-blue-100 text-white"
                    />
                    <CustomButton
                        title="5 minutes"
                        onPress={() => handlePress(5 * 60)}
                        containerStyles="mt-4 bg-blue-100 text-white"
                    />
                    <CustomButton
                        title="10 minutes"
                        onPress={() => handlePress(10 * 60)}
                        containerStyles="mt-4 bg-blue-100 text-white"
                    />
                    <CustomButton
                        title="15 minutes"
                        onPress={() => handlePress(15 * 60)}
                        containerStyles="mt-4 bg-blue-100 text-white"
                    />
                </View>
            </View>
        </View>
</ImageBackground>
    );
};

export default AdjustMeditationDuration;
