import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';

import React, { useEffect, useState, useContext } from 'react';
import { RefreshControl, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import mock from "./data/mock";
import PostsView from './PostsView';
import { FontAwesome } from '@expo/vector-icons'; 
import AppContext from "./../AppContext"
import API from '../../api/ymarket_api';

import Post from '../feed/Post';


export default function AccessPostScreen({ navigation }: any) {
  const [mounted, setMounted] = useState(false)

  const [postlist, setPostList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const myContext = useContext(AppContext);

  const getUserPosts = async () => {
    const path = 'api/users/profile/' + myContext.user
    const response = await API.get(path)
                              .then((response) => {
                                setPostList(response.data.posts)
                              })
                              .catch((error) => {
                                console.log(error)
                              });
  }

  if(!mounted) {
    getUserPosts();
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
      getUserPosts()
      setRefreshing(false) 
  }, [refreshing]);

  // const renderItems = (item: { item: any; }) => {
  //   const post = item.item;
  //   return <PostsView post={post} navigation = {navigation}/>;
  // };

  const renderItems = (item: { item: any;}) => {
    return <Post post={item.item} navigation = {navigation} is_edit = {true} />;
  };

  return (
    <View style = {styles.container}>
      <Text style = {styles.headerText}>
        {"Your Posts"}
      </Text>
      <Text style = {styles.subHeaderText}>
        {"Create a new post or edit existing posts!"}
      </Text>
      <View style={styles.list}>
        <FlatList
          data={postlist.reverse()}
          renderItem={renderItems}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <TouchableOpacity  style={styles.button}
        onPress={() => navigation.push('CreatePostScreen')}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: "#0f4d92", alignItems: 'center' }}>
          <Text style={styles.buttonText}>Create Post</Text>
          <View style={{ padding: 5, backgroundColor: "#0f4d92" }}></View>
          <FontAwesome name="plus-square-o" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    marginTop: 10,
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 4,
  },
  headerText: {
    marginTop: 60,
    marginLeft: 20,
    fontWeight: "bold",
    color: "#0f4d92",
    fontSize: 24
  },
  subHeaderText: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    color: "#000",
    fontWeight: "300",
    fontSize: 15
  },
  buttonText: {
    color: "white",
    fontSize: 25,

  },
  button: {
    alignItems: "center",
    backgroundColor: "#0f4d92",
    padding: '5%',
    borderRadius: 5
  }
});
