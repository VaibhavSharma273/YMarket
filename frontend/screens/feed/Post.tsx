import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dimensions, Platform, PixelRatio } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const Post = (props: { post: any, navigation: any; }) => {
  const { post, navigation } = props;

  const renderPostContent = () => {
    return (
      <View style={styles.listItemBody}>
        <Image style={styles.listItemImage} source={{ uri: post.content[0] }} />
      </View>
    );
  }

  return (
    <View style={styles.listItemShadow}>
      <TouchableOpacity style={styles.listItem} onPress={() => navigation.push('ViewPost', {
        postId: post.id
      })}>
        {renderPostContent()}
        <View style={styles.listItemFooter}>
              <Text style={{ fontWeight: "600", flex: 1, fontSize: normalize(17)}}>{post.title}</Text>
              <Text style = {{ textAlign: 'right', flex: 1, fontSize: normalize(17)}}> {post.price} </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const text_styles = {
  mini: {
    fontSize: normalize(12),
  },
  small: {
    fontSize: normalize(15),
  },
  medium: {
    fontSize: normalize(17),
  },
  large: {
    fontSize: normalize(20),
  },
  xlarge: {
    fontSize: normalize(24),
  },
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 16,
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  listItemShadow: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
   },
  listItemHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8
  },
  listItemDot: {
    backgroundColor: '#000',
    borderRadius: 4 / 2,
    height: 4,
    marginRight: 12,
    marginTop: 2,
    width: 4,
  },
  listItemBody: {
    flex: 1,
    minHeight: 320
  },
  listItemImage: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    aspectRatio: 1,
    flex: 1,
  },
  listItemFooter: {
    flexDirection: "row",
    padding: 8,
    paddingLeft: 16,
  },
});

export default Post;