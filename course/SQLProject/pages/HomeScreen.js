import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import CustomText from './components/CustomText';
import CustomButton from './components/CustomButton';

var db = openDatabase({ name: 'UserDatabase.db' });


const HomeScreen = ({ navigation }) => {

   useEffect(() => {
      db.transaction(function (txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS table_user', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
                []
              );
            }
          }
        );
      });
    }, []);


   return(
      <SafeAreaView style={{ flex: 1 }}>
         <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
               <CustomText text="SQLite Example" />
               <CustomButton
                  title="Register"
                  customClick={() => navigation.navigate('Register')}
               />
               <CustomButton
                  title="Update"
                  customClick={() => navigation.navigate('Update')}
               />
               <CustomButton
                  title="View"
                  customClick={() => navigation.navigate('View')}
               />
               <CustomButton
                  title="View All"
                  customClick={() => navigation.navigate('ViewAll')}
               />
               <CustomButton
                  title="Delete"
                  customClick={() => navigation.navigate('Delete')}
               />
            </View>

         </View>
      </SafeAreaView>

      
   );
   

};

export default HomeScreen