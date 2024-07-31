import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SleepQuality from './SleepQuality';
import AddTime from './AddTime';
import Home from '../(tabs)/home'; // Adjust the import path accordingly

const Stack = createStackNavigator();

const AppNavSleep = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        /> */}
        <Stack.Screen 
          name="SleepQuality" 
          component={SleepQuality} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddTime" 
          component={AddTime} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavSleep;
