import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Image, ImageBackground } from "react-native";
import Forecast from "./Forecast";
import OpenWeatherMap from "./open_weather_map";

class Weather extends Component {

   constructor(props) {
      super(props);
      this.state = { zip: "", forecast: null };
    }

    _handleTextChange = event => {
      //this.setState({ zip: event.nativeEvent.text });
      //console.log("Weather Class - event.nativeEvent.text:" + event.nativeEvent.text);
      let zip = event.nativeEvent.text;
      console.log("Weather Class - event.nativeEvent.text:" + event.nativeEvent.text);
      OpenWeatherMap.fetchForecastFunction(zip).then(forecast => {
        this.setState({ forecast: forecast });
      });
      
    };

   render() {
      let content = null;
      if (this.state.forecast !== null) {
        content = (
          <Forecast
            main={this.state.forecast.main}
            description={this.state.forecast.description}
            temp={this.state.forecast.temp}
            city={this.state.forecast.city}
          />
        );
      }   
      return (
         <View style={styles.container}>
            <ImageBackground
               source={require("./images/flowers.png")}
               style={styles.backdrop}
            >
            <View style={styles.overlay}>
               <View style={styles.row}>
                  <Text style={styles.mainText}>
                     Current weather for
                  </Text>
                  <View style={styles.zipContainer}>
                     <TextInput
                        style={[styles.zipCode, styles.mainText]}
                        onSubmitEditing={this._handleTextChange}
                        underlineColorAndroid="transparent"
                     />
                  </View>
               </View>
               {content}
            </View>
            </ImageBackground>
         </View>
       );
   }
}

const baseFontSize = 16;

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#F5FCFF"
   },
   input: {
      fontSize: 20,
      borderWidth: 2,
      padding: 2,
      height: 40,
      width: 100,
      textAlign: "center"
    },
    backdrop: { flex: 1, flexDirection: "column", width: '100%', height: '100%'},
    overlay: {
      paddingTop: 5,
      backgroundColor: "#000000",
      opacity: 0.5,
      flexDirection: "column",
      alignItems: "center"
    },
    row: {
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "flex-start",
      padding: 30
    },
    zipContainer: {
      height: baseFontSize + 10,
      borderBottomColor: "#DDDDDD",
      borderBottomWidth: 1,
      marginLeft: 5,
      marginTop: 3
    },
    zipCode: { flex: 1, flexBasis: 1, width: 50, height: baseFontSize },
    mainText: { fontSize: baseFontSize, color: "#FFFFFF" },
 });


export default Weather;