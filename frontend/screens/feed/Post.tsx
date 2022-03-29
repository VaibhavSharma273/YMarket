import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Post = (props: { post: any; }) => {
  const { post } = props;

  const renderPostContent = () => {
    return (
      <View style={styles.listItemBody}>
        <Image style={styles.listItemImage} source={{ uri: post.content }} />
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.listItem}>
      {renderPostContent()}
      <View style={styles.listItemFooter}>
        <Text style={{ color: 'black' }}>
          <Text style={{ fontWeight: "600" }}>{post.title}</Text>
          <Text> {post.price}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {},
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
    aspectRatio: 1,
    flex: 1,
  },
  listItemFooter: {
    padding: 8,
    paddingLeft: 16,
    flexDirection: 'row'
  },
  listItemFooterImage: {
    width: 28,
    height: 28
  },
  gap: {
    marginRight: 12
  },
  gap2: {
    marginRight: 8
  }
});

export default Post;