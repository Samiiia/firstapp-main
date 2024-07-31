import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    ScrollView,
} from "react-native";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";



const AffirmationPractice = () => {

    const { itemId } = useLocalSearchParams();
    const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
    const [sentences, setSentences] = useState<string[]>([]);

    useEffect(() => {
        for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
            const affirmationData = AFFIRMATION_GALLERY[idx].data;

            const affirmationToStart = affirmationData.find(
                (a) => a.id === Number(itemId)
            );

            if (affirmationToStart) {
                setAffirmation(affirmationToStart);

                    const affirmationsArray = affirmationToStart.text.split(".");
    
                   
                    if (affirmationsArray[affirmationsArray.length - 1] === "") {
                        affirmationsArray.pop();
                    }
    
                    setSentences(affirmationsArray);
                return;

            }
        }
    }, []);        
            
  return (

    <View className="flex-1">

       <ImageBackground
                source={affirmation?.image}
                resizeMode="cover"
                className="flex-1"
            >
     
            
                     <Pressable
                        onPress={() => router.back()}
                        className="-mt-1 absolute top-10 left-5 z-10"
                    >
                        <AntDesign name="leftcircleo" size={40} color="white" />
                    </Pressable>

                <LinearGradient 
                             colors={[
                            "transparent",
                            "rgba(1,1,1,0.8)",
                             ]}
                              className='flex-1 justify-center items-center'
                          >
                
                    <ScrollView
                        className="mt-28"
                        showsVerticalScrollIndicator={false}
                    >
                        <View className="h-full border-white justify-center">
                            <View className="h-4/5 justify-center">
                                {sentences.map((sentence, idx) => (
                                    <Text
                                        className="text-white text-2xl mb-12 font-bold text-center"
                                        key={idx}
                                    >
                                        {sentence}.
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            

        </ImageBackground>
      
    </View>

  );
};

export default AffirmationPractice;