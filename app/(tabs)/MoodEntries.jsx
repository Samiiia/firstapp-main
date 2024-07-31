import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import moment from 'moment-timezone';
import { icons } from '../../constants';
import { Button } from 'react-native-elements';
const MoodEntries = () => {
  const route = useRoute();
  const { entries } = route.params;

  // Sort entries by createdAt timestamp
  const sortedEntries = entries.sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate());

  const renderItem = ({ item }) => {
    // Convert Firestore timestamp to JavaScript Date
    const createdAtDate = item.createdAt.toDate();

    // Convert UTC time to local time with correct timezone
    const localTime = moment(createdAtDate).utcOffset('+01:00').format('HH:mm');

    return (
      <View style={styles.card}>
        <Text style={styles.date}>{item.date} à {localTime}</Text>
        <View style={styles.moodContainer}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={styles.mood}>{item.value}</Text>
        </View>
        {item.feelings && item.feelings.length > 0 && (
          <Text style={styles.feelings}>
            Feelings: {item.feelings.join(', ')}
          </Text>
        )}
        {item.note && <Text style={styles.note}>Note: {item.note}</Text>}
        
        
      </View>
      
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bilans d'humeur</Text>
      <FlatList
        data={sortedEntries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 16,
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#7B88F2',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  date: {
    color: '#161622',
    fontSize: 14,
    marginBottom: 8,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
  },
  mood: {
    fontSize: 18,
    color: '#FFF',
  },
  note: {
    color: '#FFF',
    marginTop: 8,
  },
  feelings: {
    color: '#FFF',
    marginTop: 8,
    fontSize: 16,
  },
});

export default MoodEntries;
