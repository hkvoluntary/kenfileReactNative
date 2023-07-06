import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import CustomTextInput from './components/CustomTextInput';
import CustomButton from './components/CustomButton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const ViewUser = ({ navigation }) => {
   let [inputUserId, setInputUserId] = useState('');
   let [userData, setUserData] = useState({});
 
   let searchUser = () => {
     console.log(inputUserId);
     setUserData({});
     db.transaction((tx) => {
       tx.executeSql(
         'SELECT * FROM table_user where user_id = ?',
         [inputUserId],
         (tx, results) => {
           var len = results.rows.length;
           console.log('len', len);
           if (len > 0) {
             setUserData(results.rows.item(0));
           } else {
             alert('No user found');
           }
         }
       );
     });
   };

   return(
    <SafeAreaView style={{ flex: 1 }}>
         <View style={{ flex: 1, backgroundColor: 'white' }}>
         <CustomTextInput
            placeholder="Enter User ID"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={{ padding: 10 }}
          />
          <CustomButton title="Search User" customClick={searchUser} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.itemText}>ID:</Text>
              <Text>{userData.user_id}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.itemText}>Name:</Text>
              <Text>{userData.user_name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.itemText}>Contact:</Text>
              <Text>{userData.user_contact}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.itemText}>Address:</Text>
              <Text>{userData.user_address}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
   );
   
};

const styles = StyleSheet.create({
  itemText: {
    fontWeight: '700',
    marginRight: 5
  },
});

export default ViewUser