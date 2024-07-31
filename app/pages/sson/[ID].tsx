import { View, Text, Pressable, ImageBackground, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio } from "expo-av";
import { SOUNDS_DATA, AUDIO_FILESS } from "@/constants/soundsdata";
import { useLocalSearchParams } from "expo-router";
import backgroundImg from '@/assets/images/sons.jpg';

const Son = () => {
  const router = useRouter();
  const { ID } = useLocalSearchParams();

  const [secondsRemaining, setSecondsRemaining] = useState(660);
  const [isMeditating, setMeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0); // Durée totale de l'audio en secondes
  const [currentPosition, setCurrentPosition] = useState(0); // Position actuelle du son en secondes

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (secondsRemaining === 0) {
      setMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    const setupAudio = async () => {
      if (audioSound) {
        audioSound.setOnPlaybackStatusUpdate((playbackStatus) => {
          if (playbackStatus.isLoaded) {
            // Mettre à jour la position actuelle du son
            setCurrentPosition(playbackStatus.positionMillis / 1000); // Convertir en secondes

            // Arrêter le minuteur lorsque l'audio se termine
            if (playbackStatus.didJustFinish) {
              setMeditating(false);
              setPlayingAudio(false);
              setSecondsRemaining(0);
            }
          }
        });

        // Obtenez la durée totale de l'audio
        const status = await audioSound.getStatusAsync();
        if (status.isLoaded && status.durationMillis) {
          setAudioDuration(status.durationMillis / 1000); // Convertir en secondes
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
    const audioFileName = SOUNDS_DATA[Number(ID) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(
      AUDIO_FILESS[audioFileName],
      { shouldPlay: true }
    );

    setSound(sound);
    return sound;
  };

  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  const progress = audioDuration ? (currentPosition / audioDuration) * 100 : 0;

  return (
    <View className="flex-1">
      <Pressable
        onPress={() => router.push('/(tabs)/profile')}
        style={{ position: 'absolute', top: 60, left: 16, zIndex: 10 }}
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
            <Text className="text-2xl text-white font-medium">
              Sons relaxant
            </Text>
          </View>

          {/* Barre de progression */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        </View>

        <Pressable
          onPress={toggleMeditationSessionStatus}
          style={{
            alignSelf: 'center',
            marginTop: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 15,
            borderRadius: 50
          }}
        >
          {isPlayingAudio ? (
            <AntDesign name="pausecircleo" size={40} color="white" />
          ) : (
            <AntDesign name="playcircleo" size={40} color="white" />
          )}
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    width: '80%',
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2334b4e0',
    borderRadius: 5,
  },
});

export default Son;
