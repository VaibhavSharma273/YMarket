import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PostsView = (props: { post: any, navigation: any; }) => {
  const { post, navigation } = props;

  const renderPostContent = () => {
    if (('postimages' in post) && post.postimages.length) {
      return (
        <Image style={styles.ImageIconStyle} source={{ uri: post.postimages[0].image_url }} resizeMode="cover" />
      );
    }
  }

  return (
    <View style={[styles.MainContainer, styles.listItemShadow]}>
    <TouchableOpacity style={styles.FacebookStyle} onPress={() => navigation.push('EditPostScreen', {
        postId: post.id})}>
      {renderPostContent()}
      <View style={styles.SeparatorLine} />
      <View style={{paddingRight: 10}} />
      <Text style={[styles.TextStyle, {fontWeight: 'bold'}]}>{post.title}</Text>
      <View style={{paddingRight: 5}} />
      {post.price == null ? null :<Text style={styles.TextStyle}> {'$'+post.price}</Text>}
      {/* {post.price == null ? null : <Text style={[ text_styles.xlarge, { textAlign: 'right', flex: 1 }] }> ${post.price} </Text>} */}
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  TextStyle :{
    fontSize: 20,
    color: "#fff",
    marginBottom : 4,
    fontFamily: 'Arial'
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }, 
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 60,
    width: 97,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    resizeMode : 'stretch',
    marginLeft: 5
  
 },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 77, 146, 0.8)',
    height: 70,
    width: '100%',
    borderRadius: 5 ,
    //margin: 5,
  },
  SeparatorLine :{
    backgroundColor : '#fff',
    width: 2,
    height: 70,
    margin: 2
    },
    listItemShadow: {
      borderRadius: 16,
      backgroundColor: 'transparent',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
     },
});

export default PostsView;