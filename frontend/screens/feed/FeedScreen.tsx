import { RootTabScreenProps } from '../../types';

   
import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

import mock from "./data/mock2";

import Post from './Post';

const Feed = ({ navigation }: RootTabScreenProps<'Feed'>) => {

  const [posts] = useState(mock);

  const renderItems = (item: { item: any; }) => {
    const post = item.item;
    return <Post post={post} />;
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={posts}
        renderItem={renderItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 4,
  }
});

export default Feed;