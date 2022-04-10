import React from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";

import Post from '../screens/feed/Post';

const PostList = ({ data, navigation }: any) => {
    const renderItems = (item: { item: any;}) => {
        return <Post post={item.item} navigation = {navigation} is_edit = {false} />;
    };

    return (
      <SafeAreaView style={styles.list__container}>
        <FlatList
          data={data}
          renderItem={renderItems}
        />
      </SafeAreaView>
    );
  };
  
  export default PostList;
  
  const styles = StyleSheet.create({
    list__container: {
      margin: 10,
      height: "90%",
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

