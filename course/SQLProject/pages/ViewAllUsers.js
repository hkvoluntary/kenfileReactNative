
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });


const ViewAllUser = () => {

   let [flatListItems, setFlatListItems] = useState([]);

   useEffect(() => {
     db.transaction((tx) => {
       tx.executeSql(
         'SELECT * FROM table_user',
         [],
         (tx, results) => {
           console.log("Count: "+ results.rows.length)
           var temp = [];
           for (let i = 0; i < results.rows.length; ++i)
             temp.push(results.rows.item(i));
           setFlatListItems(temp);
         }
       );
       
     });
   }, []);

   let flatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 1.5,
            width: '100%',
            backgroundColor: '#808080'
          }}
        />
      );
    };
    let flatListHeader = () => {
      return (
        <View elevation={1} 
          style={styles.flatListHeader}>
          <Text style={styles.flatListHeaderText}>All Users</Text>
        </View>
      );
    }
    let listItemView = (item) => {
      return (
        <View
          key={item.user_id}
          style={{ backgroundColor: 'white', padding: 20 }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.itemText}>ID:</Text>
            <Text>{item.user_id}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.itemText}>Name:</Text>
            <Text>{item.user_name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.itemText}>Contact:</Text>
            <Text>{item.user_contact}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.itemText}>Address:</Text>
            <Text>{item.user_address}</Text>
          </View>
        </View>
      );
    };

   return(
      <SafeAreaView style={{ flex: 1 }}>
         <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={flatListItems}
            ListHeaderComponent={flatListHeader}
            ItemSeparatorComponent={flatListItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
    </SafeAreaView>
   );
   
};

const styles = StyleSheet.create({
  itemText: {
    fontWeight: '700',
    marginRight: 5,
  },
  flatListHeader: {
    height: 75,
    width: "97%",
    margin: 5,
    backgroundColor: "#fff",
    border: 2.9,
    borderColor: "#f05555",
    alignSelf: "center",
    shadowColor: "#f05555",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 1,
    shadowRadius: 7.49,
  },
  flatListHeaderText: {
    textShadowColor: '#f05555', 
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 10, 
    fontSize: 20, 
    fontWeight: '500', 
    flex: 1, 
    alignSelf: "center", 
    paddingTop: 30, 
    color: '#f05555',
  },

});

export default ViewAllUser