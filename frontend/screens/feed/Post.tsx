import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { text_styles } from '../../components/TextNormalize';


const Post = (props: { post: any, navigation: any; }) => {
  const { post, navigation } = props;

  // Render image here using the image URLs:
  const renderPostContent = () => {
    return (
      <View style={styles.listItemBody}>
        <Image style={styles.listItemImage} source={{ uri: post.postimages[0].image_url }} />
      </View>
    );
  }

  // Actual post rendering including the image and test for the feed
  return (
    <View style={styles.listItemShadow}>
      <TouchableOpacity style={styles.listItem} onPress={() => navigation.push('ViewPost', 
        {
          postId: post.id
        })}>
        {renderPostContent()}
        <View style={styles.listItemFooter}>
              <Text numberOfLines={1} style={[ text_styles.medium, { fontWeight: "600", flex: 1 } ]}>{post.title}</Text>
              <Text numberOfLines={1} style = {[ text_styles.medium, { textAlign: 'right', flex: 1 } ]}> ${post.price} </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// ! Issue: Hard coded margins and padding, can cause conflict with different screen sizes
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