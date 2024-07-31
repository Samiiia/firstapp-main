import React from 'react';
import { View, Text, ScrollView, Pressable} from 'react-native';
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import GuidedAffirmationsGallery from "@/components/GuidedAffirmationsGallery";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";


const Affirmation = () => {
  return (
    <View className="flex-1">
                  <LinearGradient
               
                colors={["#7097bb", "#709780", "#7097bb"]}
                className="px-0.5"
               
            >
        <ScrollView showsVerticalScrollIndicator={false}>
                   <Pressable
                        onPress={() => router.back()}
                        className="-mt-1 absolute top-12 left-5 z-10"
                    >
                        <AntDesign name="leftcircleo" size={35} color="white" />
                    </Pressable>
          
                 
    
                   <Text className="mt-28 text-zinc-900 text-lg font-bold text-center">
                        Change your beliefs with affirmations
                    </Text>
                    <View>
                        {AFFIRMATION_GALLERY.map((g) => (
                            <GuidedAffirmationsGallery
                                key={g.title}
                                title={g.title}
                                previews={g.data}
                            />
                        ))}
                    </View>
                 
         </ScrollView>
         </LinearGradient>
    </View>

  );
};



export default Affirmation;
