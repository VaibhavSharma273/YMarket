import { Image, Text, View, StyleSheet, Dimensions, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import mock from "./data/mock";
import React, { useState, useEffect } from "react";
import { normalize, text_styles } from '../../components/TextNormalize';

import API from '../../api/ymarket_api';

const windowWidth = Dimensions.get('window').width;

import moment from "moment";
import ProfilePhoto from '../../components/ProfilePhoto';

export default function ViewPost({ route, navigation }: { route: any; navigation: any }) {
  // Identify post here:
  const { postId } = route.params;

  var schema = {
    'title': String(),
    'content': String(),
    'date_posted': String(),
    'author': {
                'id': String(), 
                'first_name': String(), 
                'last_name': String(), 
                'email': String()
              },
    'price': Number(),
    'category': String(),
    'is_buy': Boolean(),
    'postimages': [
      {
        'id': String(),
        'image_url': 'https://imgur.com/KPRDlAP'
      }
    ]
  }

  const [mounted, setMounted] = useState(false)
  const [post, setPost] = useState(schema);

  const getDetailedPost = async () => {
    const path = 'api/post/' + postId
    const response = await API.get(path)
                              .then((response) => {
                                setPost(response.data)
                              })
                              .catch((error) => {
                                console.log(error)
                              });
  }

  if (!mounted) {
    getDetailedPost()
  }

  useEffect(() => {
    setMounted(true)
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const date_posted = moment(post.date_posted).utc()
  // Render image for the post:
  const renderPostContent = () => {
    if (('postimages' in post) && post.postimages.length) {
      return (
        <Image style={styles.postItemImage} source={{ uri: post.postimages[0].image_url }} />
      );
    }
  }

  // Actual detailed view being returned
  return (
    <View style = {{flex : 1}}>
    <ScrollView style={styles.container}>
      {renderPostContent()}
      <View style={styles.postItemTitle}>
        <Text style={[ text_styles.xlarge, { fontWeight: "600", flex: 1 }] }>{post.title}</Text>
        {post.price == null ? null : <Text style={[ text_styles.xlarge, { textAlign: 'right', flex: 1 }] }> ${post.price} </Text>}
      </View>
      <View style={{flexDirection: "row", marginTop: 5, paddingHorizontal: 20}}>
        <View style = {[styles.categoryContainer, {paddingHorizontal: 0, marginHorizontal: 0, backgroundColor: '#fff'}]}>
          <Text style={[styles.postDate, {fontWeight:"700"}]}>Category: </Text>
        </View>
        <View style = {styles.categoryContainer}>
          <Text style={styles.postCategoryText}>{post.is_buy == false ? "sell" : "buy"}</Text>
        </View>
        <View style = {styles.categoryContainer}>
          <Text style={styles.postCategoryText}>{post.category}</Text>
        </View>
      </View>
      <View style={styles.postItemContent}>
        <Text style={[ text_styles.medium ]}>{post.content}</Text>
      </View>
      <View style={{flexDirection: "row", marginTop: 5}}>
        <Text style={[styles.postDate, {fontWeight:"700"}]}>Posted On: </Text>
        <Text style={styles.postDate}>{date_posted.format("M")}/{date_posted.format('D')}/{date_posted.format('YYYY')}</Text>
      </View>
      <View style={{ flex: 1, paddingVertical: 20, justifyContent: "space-between" }}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfile', { id: post.author.id})}>
            <Text style={[ text_styles.medium, { fontWeight: "600", color: "#fff" } ]}>View seller profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={[ text_styles.medium, { fontWeight: "600", color: "#fff" } ]}> {post.is_buy == false ? "Contact Seller" : "Contact Buyer"} </Text>
          </TouchableOpacity>
      </View>
    </ScrollView>

    <Modal  
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontWeight: "600", fontSize: 20, alignSelf: 'center', paddingBottom: 10}} >Contact Information</Text>
            <Text style = {{fontSize: 17 , paddingBottom: 20}}>Click the icon to copy the information to clipboard!</Text>
            <Text style = {{fontSize: 17, fontWeight: 'bold'}}>Email</Text>
            <View style = {{flexDirection: 'row', paddingBottom : 20, alignItems: 'center',}}>
              <Text style = {{fontSize: 17, flex: 1}} >{post.author.email}</Text>
              <TouchableOpacity style = {{alignSelf: 'flex-end', flex: 1,}}>
              <Ionicons name="clipboard" size={17} color="black"/>
              </TouchableOpacity>
            </View>
            <Pressable
              style={[styles.button, styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  categoryContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 2,
    flexDirection: 'column',
    alignItems:"center",
    borderRadius: 10,
    backgroundColor: '#0f4d92'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    margin: 2,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  postItemTitle: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  postDate: {
    flexDirection: 'row',
    fontSize: normalize(17),
    textAlign: "left",
  },
  postItemContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  postItemImage: {
    minHeight: windowWidth,
    maxHeight: windowWidth,
    aspectRatio: 1,
  },
  postCategoryText: {
    fontSize: normalize(17),
    color: '#fff'
  },
});

