import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Histoireslayout = () => {
  return (
    <Stack>
         <Stack.Screen name ="Histoires" options={{ headerShown: false}}/>
         <Stack.Screen name ="[HistoryId]" options={{ headerShown: false}}/>
    </Stack>
  )
}

export default Histoireslayout 