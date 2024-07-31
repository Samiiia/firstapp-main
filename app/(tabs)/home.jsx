import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconss from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/contextAuth'; 

const Home = () => {
  const router = useRouter();
  const { signout, user } = useAuth(); 
  const currentDate = moment().format('MMMM Do YYYY');

  const handleLogout = async () => {
    await signout();
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/backhome.jpg')} 
      className="flex-1"
    > 
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 bg-[#222234cc] p-9">
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-white text-base">{currentDate}</Text>
              <Text className="text-white text-base">Welcome, {user?.username} 😊</Text>
            </View>
            <TouchableOpacity onPress={handleLogout} className="flex-row items-center">
              <Icons name="logout" size={25} color="#FFFFFF" />
              <Text className="text-white text-base ml-2">Signout</Text>
            </TouchableOpacity>
          </View>

          <LinearGradient
            className="rounded-xl p-6 my-6 w-[120%] -mx-8 flex-row items-center justify-center"
            colors={['#222f34', '#141b29', '#200d0d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity className="w-full flex-row items-center" onPress={() => router.push('/pages/affirmations')}>
              <Icon name="book" size={25} color="#7B88F2" />
              <Text className="text-lg text-[#4c9fdf] ml-8">Affirmations/ Inspirations</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            className="rounded-xl p-6 my-6 w-[120%] -mx-8 flex-row items-center justify-center"
            colors={['#222f34', '#141b29', '#210d0d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity className="w-full flex-row items-center" onPress={() => router.push('/pages/meditation')}>
              <Icons name="meditation" size={25} color="#7B88F2" />
              <Text className="text-lg text-[#4c9fdf] ml-8">Meditation </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            className="rounded-xl p-6 my-5 w-[120%] -mx-8 flex-row items-center justify-center"
            colors={['#222f34', '#141b29', '#210d0d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity className="w-full flex-row items-center" onPress={() => router.push('/pages/histoire')}>
              <Iconss name="open-book" size={25} color="#7B88F2" />
              <Text className="text-lg text-[#4c9fdf] ml-8">Histoires de sommeil</Text>
            </TouchableOpacity>
          </LinearGradient>

          <View className="mt-8">
            <Text className="text-lg text-white mb-3 text-center">How are you today?</Text>
            <TouchableOpacity
              className="rounded-3xl p-4 mb-0 flex-row items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              onPress={() => router.push('../pagesEmotion/MoodRating')}
            >
              <Text className="text-lg text-[#7B88F2]">Rate your mood</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-2 flex-row justify-between">
            <TouchableOpacity
              className="rounded-3xl p-4 m-2 flex-1 flex-row items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              onPress={() => router.push('../pagesSleep/SleepQuality')}
            >
              <Text className="text-lg text-[#7B88F2]">Sleep</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-2 flex-row justify-between">
            <TouchableOpacity
              className="rounded-3xl p-4 m-2 flex-1 flex-row items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              onPress={() => router.push('../pages/respiration')}
            >
              <Text className="text-lg text-[#7B88F2]">Breathing</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;
