import { RootTabScreenProps } from '../../types';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RefreshControl, Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { normalize } from '../../components/TextNormalize';
import LoadingIndicator from '../../components/LoadingIndicator';

import Post from './Post';
import API from '../../api/ymarket_api';

const Feed = ({ navigation }: RootTabScreenProps<'PostStack'>) => {
  const [posts, setPosts] = useState<Array<any>>();
  const [refreshing, setRefreshing] = useState(false);
  const [postType, setPostType] = useState(false);

  const getPosts = async () => {
    const path = 'api/post/'
    const response = await API.get(path)
                              .then((response) => {
                                setPosts(response.data.reverse())
                              })
                              .catch((error) => {
                                console.log(error)
                              });
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
      getPosts()
      setRefreshing(false) 
  }, [refreshing]);

  const renderItems = (item: { item: any;}) => {
    // console.log(navigation)
    return <Post post={item.item} navigation = {navigation} is_edit = {false} />;
  };
  
  useEffect(() => {
    getPosts()
  }, []);

  const memoizedPosts = useMemo(() => renderItems, [posts]);

  // return a loading indicator if posts have not been fetched yet
  if (!posts) {
    return <LoadingIndicator></LoadingIndicator>
  }
  
  return (
    <View style = {styles.container}>
      <Text style = {styles.headerText}>
        {"Recent Listings"}
      </Text>
      <Text style = {styles.subHeaderText}>
        {"Find the latest listings from all over campus here!"}
      </Text>
      <View style = {styles.tabBar}>
        <TouchableOpacity style={styles.tab} onPress = {() => setPostType(true)}>
          <Text style={styles.tabText}>Buy Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress = {() => setPostType(false)}>
          <Text style={styles.tabText}>Sell Posts</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          data={posts.filter(post => post.is_buy === postType)}
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
  },
  tabBar: {
    display: "flex",
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  tabText: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor:'#d9d9d9',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }
});

export default Feed;