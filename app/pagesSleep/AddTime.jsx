import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddTime = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Time Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  text: {
    color: '#FFF',
    fontSize: 24
  }
});

export default AddTime;
