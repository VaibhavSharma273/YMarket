import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { RootTabScreenProps } from '../types';

import Post from '../screens/feed/Post';
import API from '../api/ymarket_api'

const PostList = ({ searched, searchPhrase, data, setData }:any, {navigation}: RootTabScreenProps<'PostStack'>) => {
    const renderItems = (item: { item: any;}) => {
        // setSearched(false)
        return <Post post={item.item} navigation = {navigation} is_edit = {false} />;
    };
  
    const getPosts = async () => {
      const path = 'api/post/?search='
      console.log(path + searchPhrase)
      const response = await API.get(path + searchPhrase)
                                .then((response) => {
                                  setData(response.data)
                                  console.log(response.data)
                                })
                                .catch((error) => {
                                  console.log(error.response)
                                });
    }

    useEffect(() => {
      console.log(searched)
      if(searched){
        getPosts()
        // setSearched(false)
      }
    }, [searched]);
    // if(searched) {
    //   console.log(searchPhrase)
    //   getPosts()
    //   // setSearched(false) -- figure out how to set back to false
    // }

    return (
      <SafeAreaView style={styles.list__container}>
        {/* <View
          onStartShouldSetResponder={setSearched(false)}
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
  
  export default PostList;
  
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

