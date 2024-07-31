import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Slot, SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { AuthContextProvider, useAuth } from '../app/context/contextAuth';
import TimerProvider from '@/context/TimerContext';

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // check if user is authenticated
    if (typeof isAuthenticated === 'undefined') return;
    const inApp = segments[0] === '(tabs)';
    if (isAuthenticated && !inApp) {
      // redirect user to home
      router.replace('home');
    } else if (isAuthenticated === false) {
      // redirect to signin
      router.replace('signin');
    }
  }, [isAuthenticated]);

  return <Slot />;
};

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <TimerProvider>
      <AuthContextProvider>
        <MainLayout>
          <Stack.Screen>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/signin" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
            <Stack.Screen name="pages" options={{ headerShown: false }} />
            
           
          </Stack.Screen>
        </MainLayout>
      </AuthContextProvider>
    </TimerProvider>
  );
};

export default RootLayout;
