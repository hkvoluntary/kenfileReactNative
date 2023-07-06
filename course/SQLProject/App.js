import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import DeleteUser from './pages/DeleteUser';
import UpdateUser from './pages/UpdateUser';
import ViewAllUsers from './pages/ViewAllUsers';
import ViewUser from './pages/ViewUser';


const Stack = createNativeStackNavigator();

export default function App() {

  const textValue = Platform.select({
    ios: () => 'this is an iOS device',
    android: () => 'this is an Android device',
    default: () => 'this is not an iOS or Android device',
  });


  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home', 
            headerStyle: { backgroundColor: '#13411e'},
            headerTintColor: '#abc', 
            headerTitleStyle: { fontWeight: 'bold'},
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: 'Register User', 
            headerStyle: { backgroundColor: '#13411e'},
            headerTintColor: '#abc', 
            headerTitleStyle: { fontWeight: 'bold'},
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteUser}
          options={{
            title: 'Delete User', 
            headerStyle: { backgroundColor: '#13411e'},
            headerTintColor: '#abc', 
            headerTitleStyle: { fontWeight: 'bold'},
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateUser}
          options={{
            title: 'Update User', 
            headerStyle: { backgroundColor: '#13411e'},
            headerTintColor: '#abc', 
            headerTitleStyle: { fontWeight: 'bold'},
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUsers}
          options={{
            title: 'View All Users', 
            headerStyle: { backgroundColor: '#13411e'},
            headerTintColor: '#abc', 
            headerTitleStyle: { fontWeight: 'bold'},
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewUser}
          options={{
            title: 'View User', 
            headerStyle: { backgroundColor: '#13411e'},
            headerTintColor: '#abc', 
            headerTitleStyle: { fontWeight: 'bold'},
          }}
        />
        
      </Stack.Navigator>
    
    </NavigationContainer>


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
