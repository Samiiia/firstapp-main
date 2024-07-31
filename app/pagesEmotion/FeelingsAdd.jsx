import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuth } from '../context/contextAuth';
import { useRating } from '../context/RatingContext';
import { useNavigation } from '@react-navigation/native';

const feelings = [
  'Happy', 'Grateful', 'Confident', 'Optimistic', 'Excited', 'Loved', 'Hopeful',
  'Super', 'Great', 'Good', 'Meh', 'Bad', 'Sick', 'Awful', 'Bored', 'Frustrated',
  'Anxious', 'Stressed', 'Confused', 'Exhausted', 'Upset', 'Overwhelmed',
  'Scared', 'Angry', 'Lonely', 'Guilty', 'Adventurous', 'Afraid', 'Annoyed',
  'Content', 'Delighted', 'Fantastic', 'Irritated', 'Joyful', 'Nervous', 'Sad',
  'Tired'
];

const AddFeelings = () => {
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const { user } = useAuth();
  const { ratingData, setRatingData } = useRating();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Initial Rating Data:', ratingData);
  }, []);

  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `Today, ${day} ${month}`;
  };

  const toggleFeeling = (feeling) => {
    setSelectedFeelings((prev) =>
      prev.includes(feeling) ? prev.filter(f => f !== feeling) : [...prev, feeling]
    );
  };

  const AddFeelings = async () => {
    if (!user) return;

    // Ajouter les sentiments sélectionnés aux données de notation
    const updatedRatingData = {
      ...ratingData,
      feelings: selectedFeelings,
    };

    setRatingData(updatedRatingData);
    console.log('Updated Rating Data:', updatedRatingData);

    navigation.navigate('AddNote'); // Navigation vers la prochaine page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{getCurrentDate()}</Text>
      <Text style={styles.questionText}>How are you feeling? {user?.username}</Text>
      <ScrollView contentContainerStyle={styles.feelingsContainer}>
        {feelings.map((feeling, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.feelingButton,
              selectedFeelings.includes(feeling) && styles.selectedFeelingButton
            ]}
            onPress={() => toggleFeeling(feeling)}
          >
            <Text
              style={[
                styles.feelingButtonText,
                selectedFeelings.includes(feeling) && styles.selectedFeelingButtonText
              ]}
            >
              {feeling}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Button
        title="✓"
        buttonStyle={styles.submitButton}
        onPress={() => {
          AddFeelings();
          console.log('Feelings submitted:', selectedFeelings);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#CDCDE0'
  },
  dateText: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  questionText: {
    fontSize: 18,
    marginBottom: 16
  },
  feelingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  feelingButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  selectedFeelingButton: {
    backgroundColor: '#161622',
  },
  feelingButtonText: {
    color: '#000',
  },
  selectedFeelingButtonText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#161622',
    borderRadius: 30,
    padding: 15,
    marginTop: 20,
  },
});

export default AddFeelings;
