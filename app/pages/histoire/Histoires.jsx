import { View, Text,ScrollView, Pressable } from 'react-native'
import React from 'react'
import HISTOIRES_GALLERY from "@/constants/histoires-gallery";
import GuidedHistoiresGallery from "@/components/GuidedHistoiresGallery";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";




const histoires = () => {
  return (
    <View className="flex-1">

     <LinearGradient        
        colors={["#46668a", "#709780", "#46668a"]}
        className="px-0.5"         
    >
        <ScrollView showsVerticalScrollIndicator={false}>
                    <Pressable
                        onPress={() => router.back()}
                        className="-mt-1 absolute top-12 left-5 z-10"
                    >
                        <AntDesign name="leftcircleo" size={40} color="black" />
                    </Pressable>

          <Text className="mt-24 text-zinc-800 text-2xl font-bold text-center ">
          Stories to soothe your night and calm your mind 
          </Text>

             <View>
                   {HISTOIRES_GALLERY.map((g) => (
                        <GuidedHistoiresGallery
                             key={g.title}
                             title={g.title}
                             previews={g.data}
                             
                             
                        />
                     ))}
             </View>
        </ScrollView>
        
     </LinearGradient>
    
   </View>
  )
}

export default histoires;