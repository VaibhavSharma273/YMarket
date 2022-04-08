import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

import Post from '../screens/feed/Post';

const List = ({ searchPhrase, setClicked, data, navigation }: any) => {
    const renderItems = (item: { item: any;}) => {
        return <Post post={item.item} navigation = {navigation} is_edit = {false} />;
    };
  
    return (
      <SafeAreaView style={styles.list__container}>
        {/* <View
          onStartShouldSetResponder={() => {
            setClicked(false);
          }}
        > */}
          <FlatList
            data={data}
            renderItem={renderItems}
            keyExtractor={(item) => item.id}
          />
        {/* </View> */}
      </SafeAreaView>
    );
  };
  
  export default List;
  
  const styles = StyleSheet.create({
    list__container: {
      margin: 10,
      height: "85%",
      width: "100%",
    },
    item: {
      margin: 30,
      borderBottomWidth: 2,
      borderBottomColor: "lightgrey"
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      fontStyle: "italic",
    },
  });

