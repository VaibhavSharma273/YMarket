import { RootTabScreenProps } from '../../types';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { RefreshControl, Text, View, FlatList, StyleSheet } from 'react-native';

import mock from "./data/mock";
import Post from './Post';

import { normalize } from '../../components/TextNormalize';

import API from '../../api/ymarket_api';

const Feed = ({ navigation }: RootTabScreenProps<'PostStack'>) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getPosts = async () => {
    const path = 'api/post/'
    const response = await API.get(path)
                              .then((response) => {
                                setPosts(response.data)
                              })
                              .catch((error) => {
                                console.log(error)
                              });
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
      getPosts()
      setRefreshing(false) 
  }, [refreshing]);

  const renderItems = (item: { item: any;}) => {
    return <Post post={item.item} navigation = {navigation} is_edit = {false} />;
  };
  
  useEffect(() => {
    getPosts()
  }, []);

  const memoizedPosts = useMemo(() => renderItems, [posts]);

  if (!posts.length) {
    return null;
  }

  return (
    <View style = {styles.container}>
      <Text style = {styles.headerText}>
        {"Recent Listings"}
      </Text>
      <Text style = {styles.subHeaderText}>
        {"Find the latest listings from all over campus here!"}
      </Text>
      <View style={styles.list}>
        <FlatList
          data={posts.reverse()}
          renderItem={memoizedPosts}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

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
    fontSize: normalize(24)
  },
  subHeaderText: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    color: "#000",
    fontWeight: "300",
    fontSize: normalize(15)
  }
});

export default Feed;