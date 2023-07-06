import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from "react-native-maps";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export default function App() {

  const textValue = Platform.select({
    ios: () => 'this is an iOS device',
    android: () => 'this is an Android device',
    default: () => 'this is not an iOS or Android device',
  });

  //create a Hook to store our region data.
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const SFRegion = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const markers = new Array();

  const handleLocationPermission = async () => { 
    let permissionCheck = '';
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    }

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    }
  };

  useEffect(() => {
    handleLocationPermission()
  }, []);


  const onMapPress = (e) => {
    console.log("coordinates:" + JSON.stringify(e.nativeEvent.coordinate));
    markers.push(e.nativeEvent.coordinate);

    
  }
  handleMarker = (e) => {
    // stop onPress event from propagating to mapView
     e.stopPropagation();
     // determine which marker pressed
     let id = e.nativeEvent.id
 }

  return (
    <View style={styles.container}>
      <Text>{textValue()} Open up App.js to start working on your app!</Text>
        <MapView
          style={styles.map}
          //specify our coordinates.
          initialRegion={{
            latitude: 40.741895, //New York Location
            longitude: -73.989308,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          //onRegionChangeComplete runs when the user stops dragging MapView
          onRegionChangeComplete={(region) => setRegion(region)}
          showsUserLocation={true}
          showsMyLocationButton={true}  
          maxZoomLevel={25.0} 
          zoomControlEnabled={true}
          onPress={(e) => onMapPress(e)}
        >

          {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
          <Marker coordinate={SFRegion} 
            onPress={handleMarker}
          />
          

      </MapView>
        <Text style={styles.text}>Current latitude: {region.latitude}</Text>
        <Text style={styles.text}>Current longitude: {region.longitude}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: 'red',
    fontSize: 16,
    
  }, 
});
