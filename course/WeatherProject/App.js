import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" ? (
        <Text style={styles.text}>
          Styling Specific Platforms using the Platform Module (For iOS).
        </Text>
      ) : (
        <Text style={styles.text}>
          Styling Specific Platforms using the Platform Module (For android)
        </Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
