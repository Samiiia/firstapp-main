import { View, Text, Pressable, ImageBackground } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomButton from "@/components/CustomButton";
import { TimerContext } from '@/context/TimerContext'; 

import { Audio } from "expo-av";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/meditationData";
import { router, useLocalSearchParams } from "expo-router";
import MEDITATION_IMAGES from "@/constants/meditation-images";


const Meditate = () => {
  
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);

  const [isMeditating, setMeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>(); 
  const [isPlayingAudio, setPlayingAudio] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (secondsRemaining === 0) {
      if (isPlayingAudio) audioSound?.pauseAsync();
      setMeditating(false);
      setPlayingAudio(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(secondsRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setDuration(10);
    setMeditating(!isMeditating);
    await toggleSound();
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();
    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound?.playAsync();
      setPlayingAudio(true);
    } else {
      await sound?.pauseAsync();
      setPlayingAudio(false);
    }
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(
      AUDIO_FILES[audioFileName],
      { shouldPlay: true }
    );
    
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish && isMeditating) {
        sound.replayAsync();
      }
    });

    setSound(sound);
    return sound;
  };

  const handleAdjustDuration = () => {
    if (isMeditating) {
      toggleMeditationSessionStatus();
      if (audioSound) {
        audioSound.stopAsync();  
      }
    }
    router.push("/pages/meditation/(modal)/adjust-meditation-duration");
  };

  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground source={MEDITATION_IMAGES[Number(id) - 1]} resizeMode='cover' className='flex-1'>
        <Pressable 
          onPress={() => router.back()}
          className="absolute top-14 left-5 z-10"
        >
          <AntDesign name="leftcircleo" size={40} color="white" />
        </Pressable>

        <View className="flex-1 justify-center">
          <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
            <Text className="text-4xl text-blue-800 font-bold">
              {formattedTimeMinutes}:{formattedTimeSeconds}
            </Text>
           
           
          </View>
        </View>

        <View className="mb-5">
          <CustomButton
            title="Adjust duration"
            onPress={handleAdjustDuration}
            containerStyles="bg-blue-100 text-white"
          />
          <CustomButton
            title={isMeditating ? "Stop" : "Start Meditation"}
            onPress={toggleMeditationSessionStatus}
            containerStyles="mt-4 bg-blue-100 text-white"
          />
        </View>
      </ImageBackground>
    </View>
  ); 
};

export default Meditate;
