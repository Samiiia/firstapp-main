import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar'; 
import { SafeAreaView } from 'react-native-safe-area-context';

import {images} from '../constants';
import CustomButton from '@/components/CustomButton';
export default function App() {
  return (
    <SafeAreaView className="bg-primary  h-full">
       <ScrollView contentContainerStyle={{height:'100%'}}>
          <View className='w-full justify-center items-center  h-[85vh] px-5' >
            <Image
            source={images.logo}
            className='w-{130px] h-[40px]'
            resizeMode='contain'
            />

            <Image
             source={images.cards}
             className='max-w-[320px] w-full h-[180px] mt-5'
             resizeMode='contain'
            /> 
            <View className='relative mt-5'>
              <Text className='text-3xl text-white font-bold text-center '> Discover Endless Possibilities with {'  '}
                <Text className='text-secondary-200'>AORA</Text>
              </Text>
            
            {/* <Image
            source={images.path}
            className='w-[136px] h-[15px] absolute -bottom-2 -right-8 '
            resizeMode='contain'
            /> */}
            

            </View>

            <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
            </Text>

            <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/signin') }
            containerStyles="w-full mt-7"
              />

            
              
            

          </View>
       </ScrollView>

       <StatusBar backgroundColor='#161622' style='light'/>

    </SafeAreaView>
  );
}

