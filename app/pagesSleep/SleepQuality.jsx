import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Platform } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

// Define a color for each sleep level
const levelColors = {
  1: '#FF6F6F', // Color for level 1
  2: '#FFB74D', // Color for level 2
  3: '#FFD54F', // Color for level 3
  4: '#81C784', // Color for level 4
  5: '#64B5F6'  // Color for level 5
};

const sleepLevels = [1, 2, 3, 4, 5];

const SleepQuality = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelPress = (level) => {
    setSelectedLevel((prevSelectedLevel) =>
      prevSelectedLevel === level ? null : level
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exitButton} onPress={() => router.push('../(tabs)/home')}>
        <Icon name="close" color="#FFF" />
      </TouchableOpacity>
      
      <Text style={styles.questionText}>As-tu bien dormi?</Text>
      <View style={styles.levelsContainer}>
        {sleepLevels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.levelWrapper,
              selectedLevel === level && styles.selectedLevelWrapper
            ]}
            onPress={() => handleLevelPress(level)}
          >
            <View style={styles.levelButton}>
              <View
                style={[
                  styles.levelIcon,
                  { backgroundColor: levelColors[level] } // Apply color to the level icon
                ]}
              />
            </View>
            <Text style={styles.levelNumber}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.labelsContainer}>
        <Text style={styles.labelText}>Pas du tout</Text>
        <Text style={styles.labelText}>Super</Text>
      </View>
      <Button
        icon={<Icon name="arrow-forward" color="#FFF" />}
        buttonStyle={styles.submitButton}
        onPress={() => {
          navigation.navigate('AddTime');
          console.log('Selected sleep quality level:', selectedLevel);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 20
  },
  exitButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: '#161622',
    borderRadius: 50,
  },
  questionText: {
    marginTop: 50,
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40
  },
  levelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  levelWrapper: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 70
  },
  selectedLevelWrapper: {
    backgroundColor: '#000',
  },
  levelButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  levelIcon: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  levelNumber: {
    color: '#FFF',
    fontSize: 16
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40
  },
  labelText: {
    color: '#FFF',
    fontSize: 16
  },
  submitButton: {
    backgroundColor: '#7B88F2',
    borderRadius: 25,
    paddingVertical: 10,
    alignSelf: 'center'
  }
});

export default SleepQuality;
