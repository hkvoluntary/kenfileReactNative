import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#f05555',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CustomText;