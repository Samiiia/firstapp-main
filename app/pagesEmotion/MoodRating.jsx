import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/contextAuth';
import { useNavigation } from '@react-navigation/native';
import { useRating } from '../context/RatingContext';

const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  return `Today, ${day} ${month}`;
};

const MoodRating = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { setRatingData, ratingData } = useRating();
  const [selectedRating, setSelectedRating] = useState(null);

  const ratings = [
    { value: 1, color: '#FF6B6B', emoji: '😡' },
    { value: 3, color: '#FF9F43', emoji: '☹️' },
    { value: 5, color: '#FFC312', emoji: '😐' },
    { value: 7, color: '#A3CB38', emoji: '🙂' },
    { value: 9, color: '#12CBC4', emoji: '😄' },
    { value: 2, color: '#FF6B6B', emoji: '😡' },
    { value: 4, color: '#FF9F43', emoji: '☹️' },
    { value: 6, color: '#FFC312', emoji: '😐' },
    { value: 8, color: '#A3CB38', emoji: '🙂' },
    { value: 10, color: '#12CBC4', emoji: '😄' },
  ];


  const handlePress = (rating) => {
    setSelectedRating(rating);
    const currentDate = new Date();
    const dateOnly = currentDate.toISOString().split('T')[0];

    // Stocker les données de notation dans le contexte
    const newRatingData = {
      ratingId: rating.ratingId, // Assurez-vous d'avoir un ratingId
      userId: user.userId,
      value: rating.value,
      color: rating.color,
      emoji: rating.emoji,
      date: dateOnly,
      createdAt: currentDate,
    };

    setRatingData(newRatingData);
    console.log('Rating data:', newRatingData);

    navigation.navigate('FeelingsAdd');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{getCurrentDate()}</Text>
      <Text>Welcome {user?.username}</Text>
      <Text style={styles.title}>How would you rate your mood?</Text>
      <View style={styles.ratingContainer}>
        {ratings.map((rating) => (
          <TouchableOpacity
            key={rating.value}
            style={[
              styles.ratingButton,
              { backgroundColor: rating.color },
              selectedRating?.value === rating.value && styles.selectedButton,
            ]}
            onPress={() => handlePress(rating)}
          >
            <Text style={styles.emoji}>{rating.emoji}</Text>
            <Text style={styles.ratingValue}>{rating.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#CDCDE0',
  },
  dateText: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ratingButton: {
    width: 60,
    height: 80,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: '#000',
  },
  emoji: {
    fontSize: 24,
  },
  ratingValue: {
    fontSize: 18,
    marginTop: 5,
    color: '#fff',
  },
});

export default MoodRating;
