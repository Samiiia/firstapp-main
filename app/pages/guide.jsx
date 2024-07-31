import React from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import backgroundImage from '../../assets/images/rrr.jpg';

const GuidedBreathingScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Guide de Respiration</Text>
        
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.text}>
          La respiration consciente est une pratique puissante qui peut améliorer votre bien-être physique et mental. En vous concentrant sur votre souffle, vous pouvez réduire le stress et favoriser une relaxation profonde.
        </Text>

        <Text style={styles.sectionTitle}>Exercice de Respiration</Text>
        <Text style={styles.text}>
          1. Asseyez-vous confortablement et fermez les yeux.
          {'\n'}2. Placez une main sur votre ventre et l'autre sur votre poitrine.
          {'\n'}3. Inspirez profondément par le nez, en laissant votre ventre se gonfler.
          {'\n'}4. Expirez lentement par la bouche, en sentant votre ventre se dégonfler.
          {'\n'}5. Répétez cet exercice pendant 5 à 10 minutes.
        </Text>

        <Text style={styles.sectionTitle}>Visualisation</Text>
        <Text style={styles.text}>
          Imaginez que vous êtes dans un endroit calme et paisible. Visualisez une lumière douce et chaude enveloppant votre corps, apportant une sensation de calme et de confort.
        </Text>

        <Text style={styles.sectionTitle}>Pratiques de Relaxation</Text>
        <Text style={styles.text}>
          - Pratiquez la respiration consciente tous les jours, même pendant quelques minutes.
          {'\n'}- Créez un espace de relaxation chez vous, avec des éléments qui vous apaisent, comme des bougies ou de la musique douce.
          {'\n'}- Prenez des pauses régulières pour respirer profondément pendant vos journées chargées.
        </Text>

        <Pressable
          style={styles.doneButton}
          onPress={() => router.push('../(tabs)/home')} 
        >
          <Text style={styles.doneButtonText}>Compris</Text>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 36,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 19,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  doneButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  doneButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default GuidedBreathingScreen;
