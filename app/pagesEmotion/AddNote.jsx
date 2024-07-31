import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useRating } from '../context/RatingContext';
import { useAuth } from '../context/contextAuth';
import { db } from '../../FirebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';





const { height } = Dimensions.get('window');

const AddNote = () => {
  const { ratingData, setRatingData } = useRating();
  const { user } = useAuth();
  const router = useRouter();
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('Initial Rating Data:', ratingData);
  }, []);


  const handleAddNote = () => {
    const updatedRatingData = {
      ...ratingData,
      note: text,
    };

    setRatingData(updatedRatingData);
    console.log('Updated Rating Data with Note:', updatedRatingData);

    
    // Créer la note dans Firestore
    createRating(updatedRatingData);
  };

  const createRating = async (rating) => {
    if (!user || !rating) return;

    try {
      const currentDate = new Date();
      const dateOnly = currentDate.toISOString().split('T')[0];
      const ratingRef = doc(collection(db, "rating"));

      await setDoc(ratingRef, {
        ratingId: ratingRef.id,
        userId: rating.userId,
        value: rating.value,
        color: rating.color,
        emoji: rating.emoji,
        date: rating.date,
        createdAt: rating.createdAt,
        note: rating.note, 
        feelings:rating.feelings,// Ajouter la note aux données stockées
      });

      console.log('Rating created successfully with ID:', ratingRef.id);
      // Navigation ou toute autre action après la création de la note
      router.push('../(tabs)/home');
    } catch (error) {
      console.error('Error creating rating: ', error);
    }
  };


    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.exitButton} onPress={()=> router.push('../(tabs)/home')}>
            <Text style={styles.exitButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Ajouter une note...</Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Tapez ici..."
            placeholderTextColor="#777777"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddNote}>

          {/* <TouchableOpacity style={styles.button} onPress={() => {setText(text);
          console.log(`Selected rating: ${text}`);
          }}> */}
            
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>✓</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#161622', // Pour correspondre au thème sombre
        padding: 20,
        justifyContent: 'center',
      },
      exitButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        padding: 10,
        backgroundColor: '#161622',
        borderRadius: 50,
      },
      exitButtonText: {
        color: '#FFF',
        fontSize: 18,
      },
      title: {
        color: '#ffffff',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
      },
      textInput: {
        height: height * 0.4, // Pour occuper environ 60% de la hauteur de l'écran
        borderColor: '#444444',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: '#161622',
        backgroundColor: '#CDCDE0', // Pour correspondre au thème sombre
        textAlignVertical: 'top', // Pour que le texte commence en haut
      },
      button: {
        marginTop: 20,
        alignItems: 'center',
      },
      buttonInner: {
        width: 50,
        height: 50,
        backgroundColor: '#CDCDE0',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: '#161622',
        fontSize: 24,
      },
    });
    

export default AddNote