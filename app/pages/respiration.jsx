import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';






const backgroundImage = require('../../assets/images/breath.jpg');

const HomeScreen = () => {
  const router = useRouter();

  return (


   


    <ImageBackground source={backgroundImage} style={styles.container}>
      <Text style={styles.title}>Que souhaitez-vous réduire ?</Text>
      
      <View style={styles.row}>
        <TouchableOpacity style={styles.option} onPress={() => router.push('../pages/breathing/Anxiété')}>
          <Text>Anxiété</Text>
         
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('../pages/breathing/Colère')}>
          <Text>Colère</Text>
         
        </TouchableOpacity>
      </View>
      
      <View style={styles.row}>
        <TouchableOpacity style={styles.option} onPress={() => router.push('../pages/breathing/Tristesse')}>
          <Text>Tristesse</Text>
         
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('../pages/breathing/Peur')}>
          <Text>Peur</Text>
         
        </TouchableOpacity>
      </View>
      
      <View style={styles.row}>
        <TouchableOpacity style={styles.option} onPress={() => router.push('../pages/breathing/Souci')}>
          <Text>Souci</Text>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('../pages/breathing/Agacement')}>
          <Text>Agacement</Text>
         
        </TouchableOpacity>
      </View>

      <Pressable
        onPress={() => router.push('../(tabs)/home')}
        style={styles.pressable}
      >
        <AntDesign name="leftcircleo" size={40} color="white" />
      </Pressable>

</ImageBackground>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 80,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)', 
    padding: 5,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    width: '100%', 
    marginBottom: 25, 
  },
  option: {
    backgroundColor: '#dddd',
    padding: 25,
    marginHorizontal: 5, 
    width: '40%', 
    alignItems: 'center',
    borderRadius: 30,
  },
  pressable: {
    position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 10,
  },
});

export default HomeScreen;
