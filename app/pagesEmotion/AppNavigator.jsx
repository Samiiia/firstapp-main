// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoodRating from './MoodRating';
import FeelingsAdd from './FeelingsAdd';
import MoodEntries from '../(tabs)/MoodEntries';
import AddNote from './AddNote'; // Your target page
import { RatingProvider } from '../context/RatingContext';
import { StatusBar } from 'expo-status-bar'; 
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <RatingProvider>
      <StatusBar backgroundColor='#CDCDE0' style='dark'/>
    <NavigationContainer independent={true}>
      <Stack.Navigator   initialRouteName="MoodRating">
        <Stack.Screen options={{ headerShown: false }} name="MoodRating" component={MoodRating} />
        <Stack.Screen options={{ headerShown: false }} name="FeelingsAdd" component={FeelingsAdd} />
        {/* <Stack.Screen options={{ headerShown: false }} name="MoodEntries" component={MoodEntries} /> */}
        <Stack.Screen options={{ headerShown: false }} name="AddNote" component={AddNote} />
        
      </Stack.Navigator>
      
    </NavigationContainer>
    
    </RatingProvider>
    
  );
};

export default AppNavigator;
