import { View, Text, Pressable, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio } from "expo-av";
import { STORIES_DATA, AUDIO_FILESSS } from "@/constants/storiesdata";
import { useLocalSearchParams } from "expo-router";
import backgroundImg from '@/assets/images/aaa.jpg';

const Son = () => {
  const router = useRouter();
  const { iD } = useLocalSearchParams();

  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isMeditating, setMeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0); // Durée de l'audio en secondes

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Met à jour le minuteur si la méditation est active et la durée de l'audio est définie
    if (isMeditating && audioDuration > 0) {
      if (secondsRemaining > 0) {
        timerId = setTimeout(() => {
          setSecondsRemaining(prev => prev - 1);
        }, 1000);
      } else {
        setMeditating(false); // Arrêter la méditation lorsque le minuteur atteint zéro
        setPlayingAudio(false);
        audioSound?.pauseAsync();
      }
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating, audioDuration, audioSound]);

  useEffect(() => {
    const setupAudio = async () => {
      if (audioSound) {
        audioSound.setOnPlaybackStatusUpdate(async (playbackStatus) => {
          if (playbackStatus.didJustFinish) {
            setMeditating(false);
            setPlayingAudio(false);
            setSecondsRemaining(0);  // Arrêter le minuteur lorsque l'audio se termine
          }
        });

        // Obtenez la durée de l'audio
        const status = await audioSound.getStatusAsync();
        if (status.isLoaded && status.durationMillis) {
          const durationInSeconds = Math.floor(status.durationMillis / 1000); // Convertir en secondes et arrondir
          setAudioDuration(durationInSeconds);
        }
      }
    };

    setupAudio();

    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleMeditationSessionStatus = async () => {
    if (!isMeditating) {
      const sound = audioSound ? audioSound : await initializeSound();
      const status = await sound?.getStatusAsync();
      if (status?.durationMillis) {
        const durationInSeconds = Math.floor(status.durationMillis / 1000); // Convertir en secondes
        setAudioDuration(durationInSeconds);
        setSecondsRemaining(durationInSeconds); // Ajuster le minuteur
      }
    }
    setMeditating(prev => !prev);
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
    const audioFileName = STORIES_DATA[Number(iD) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(
      AUDIO_FILESSS[audioFileName],
      { shouldPlay: true }
    );

    setSound(sound);
    return sound;
  };

  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <Pressable
        onPress={() => router.push('/(tabs)/create')}
        style={{ position: 'absolute', top:60, left: 16, zIndex: 10 }}
      >
        <AntDesign name="leftcircleo" size={40} color="white" />
      </Pressable>

      <ImageBackground
        source={backgroundImg}
        className="flex-1 justify-center"
      >
        <View className="flex-1 justify-center">
          <View className="mx-auto rounded-xl w-80 h-14 justify-center items-center">
            <Text className="text-3xl text-white font-bold">
              {formattedTimeMinutes}:{formattedTimeSeconds}
            </Text>
            <Text className="text-1xl text-white font-medium">
              Mindful Stories, enjoy
            </Text>
            <Text className="text-1xl text-white font-medium">
              by: Yahn-Lou Renard
            </Text>
          </View>
        </View>

        <View className="flex-row justify-center">
          <Pressable
            onPress={toggleMeditationSessionStatus}
            style={{ margin: 16 }}
          >
            {isPlayingAudio ? (
              <MaterialIcons name="pause-circle-outline" size={60} color="white" />
            ) : (
              <MaterialIcons name="play-circle-outline" size={60} color="white" />
            )}
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Son;
