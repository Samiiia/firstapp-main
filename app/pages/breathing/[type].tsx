import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Icon } from 'react-native-elements';
import { Audio } from "expo-av";
import { RESPIRATION_DATA, AUDIO_FILESSS } from "@/constants/respdata";
import backgroundImage from '../../../assets/images/rrr.jpg';

const BreathingScreen = () => {
  const { type } = useLocalSearchParams();
  const [showInitialText, setShowInitialText] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(120); // Durée du son en secondes (2 minutes)
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [showModal, setShowModal] = useState(false); // État pour afficher ou masquer la modalité
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null); // État pour l'emoji sélectionné

  const router = useRouter();

  useEffect(() => {
    let initialTimer;
    let textChangeTimer;

    if (isStarted) {
      initialTimer = setTimeout(() => {
        setShowInitialText(false);
        setCurrentText('inspirez');
      }, 3000);

      textChangeTimer = setTimeout(() => {
        textChangeTimer = setInterval(() => {
          setCurrentText(prevText => (prevText === 'inspirez' ? 'expirez' : 'inspirez'));
        }, 4000);
      }, 3000);

      const startAudio = async () => {
        const sound = audioSound ? audioSound : await initializeSound();
        const status = await sound?.getStatusAsync();
        if (status?.durationMillis) {
          const durationInSeconds = Math.floor(status.durationMillis / 1000);
          setAudioDuration(durationInSeconds);
          setSecondsRemaining(durationInSeconds);
        }
        await sound?.playAsync();
        setPlayingAudio(true);
      };

      startAudio();
    }

    return () => {
      clearTimeout(initialTimer);
      clearInterval(textChangeTimer);
      audioSound?.unloadAsync();
    };
  }, [isStarted]);

  useEffect(() => {
    let timerId;
    if (secondsRemaining === 0) {
      setIsStarted(false);
      setPlayingAudio(false);
      setShowModal(true); // Afficher la modalité lorsque le temps est écoulé
      return;
    }

    if (isStarted) {
      timerId = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isStarted]);

  useEffect(() => {
    const setupAudio = async () => {
      if (audioSound) {
        audioSound.setOnPlaybackStatusUpdate((playbackStatus) => {
          if (playbackStatus.isLoaded) {
            setCurrentPosition(playbackStatus.positionMillis / 1000);
            if (playbackStatus.didJustFinish) {
              setIsStarted(false);
              setPlayingAudio(false);
              setSecondsRemaining(0);
              setShowModal(true); // Afficher la modalité lorsque le son se termine
            }
          }
        });

        const status = await audioSound.getStatusAsync();
        if (status.isLoaded && status.durationMillis) {
          setAudioDuration(status.durationMillis / 1000);
        }
      }
    };

    setupAudio();

    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const initializeSound = async () => {
    const normalizedType = type?.toLowerCase(); // Normaliser le type
    const audioDataIndex = RESPIRATION_DATA.findIndex(data => data.type.toLowerCase() === normalizedType);

    if (audioDataIndex === -1) {
      console.error(`No data found for type ${type}`);
      return;
    }

    const audioData = RESPIRATION_DATA[audioDataIndex];
    if (!audioData) {
      console.error(`No data found for type ${type}`);
      return;
    }

    const audioFileKey = audioData.audio; // Utiliser la clé du fichier audio
    const audioSource = AUDIO_FILESSS[audioFileKey];
    
    if (!audioSource) {
      console.error(`Audio source not found for key ${audioFileKey}`);
      return;
    }

    try {
      const { sound } = await Audio.Sound.createAsync(
        audioSource,
        { shouldPlay: true }
      );
      setSound(sound);
      return sound;
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.exitButton} onPress={() => router.push('../../pages/respiration')}>
          <Icon name="close" color="#FFF" />
        </TouchableOpacity>

        <View style={styles.topContainer}>
          <Text style={styles.duration}>{formattedTimeMinutes}:{formattedTimeSeconds}</Text>
          <Text style={styles.title}>{type}</Text>
          <Text style={styles.titlee}>Détendez-vous et Respirez profondément</Text>
          
          {showInitialText && !isStarted ? (
            <Text style={styles.initialInstruction}> Restez serein et concentrez-vous sur votre souffle </Text>
          ) : (
            !showInitialText && (
              <Text style={styles.instruction}>{currentText}</Text>
            )
          )}
        </View>

        {!isStarted ? (
          <View style={styles.bottomContainer}>
            <Pressable style={styles.startButton} onPress={() => setIsStarted(true)}>
              <Text style={styles.startButtonText}>Commencer</Text>
            </Pressable>
          </View>
        ) : null}

        {/* Modalité pour afficher les emojis et le message */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Comment vous sentez-vous maintenant ?</Text>
              <View style={styles.emojisContainer}>
                <TouchableOpacity
                  style={[styles.emojiItem, selectedEmoji === 'Mauvais' && styles.selectedEmoji]}
                  onPress={() => setSelectedEmoji('Mauvais')}
                >
                  <Text style={styles.emoji}>😞</Text>
                  <Text style={styles.emojiText}>Mauvais</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.emojiItem, selectedEmoji === 'Bon' && styles.selectedEmoji]}
                  onPress={() => setSelectedEmoji('Bon')}
                >
                  <Text style={styles.emoji}>😊</Text>
                  <Text style={styles.emojiText}>Bon</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.emojiItem, selectedEmoji === 'Excellent' && styles.selectedEmoji]}
                  onPress={() => setSelectedEmoji('Excellent')}
                >
                  <Text style={styles.emoji}>😁</Text>
                  <Text style={styles.emojiText}>Excellent</Text>
                </TouchableOpacity>
              </View>
              <Pressable
                style={styles.doneButton}
                onPress={() => {
                  setShowModal(false);
                  router.push('../../pages/guide');
                }}
              >
                <Text style={styles.doneButtonText}>Fait</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
  },
  titlee: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 200,
  },
  duration: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  initialInstruction: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  instruction: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
  },
  exitButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: '#161622',
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  emojisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  emojiItem: {
    alignItems: 'center',
    padding: 10, // Ajouter du padding pour rendre toute la zone cliquable
  },
  emoji: {
    fontSize: 24,
  },
  emojiText: {
    marginTop: 5,
  },
  selectedEmoji: {
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  doneButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
  },
  doneButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default BreathingScreen;
