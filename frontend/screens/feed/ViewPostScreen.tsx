import { Image, Text, View, StyleSheet, Dimensions, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import mock from "./data/mock";
import React, { useState } from "react";
import { normalize, text_styles } from '../../components/TextNormalize';

const windowWidth = Dimensions.get('window').width;

export default function ViewPost({ route, navigation }: { route: any; navigation: any }) {

  // Identify post here:
  const { postId } = route.params;
  const post = mock.find((obj: { id: any; }) => {
    return obj.id === postId
  })

  // Setting up the modal (pop-up)
  const [modalVisible, setModalVisible] = useState(false);

  // Render image for the post:
  const renderPostContent = () => {
    return (
      <Image style={styles.postItemImage} source={{ uri: post.postimages[0].image_url }} />
    );
  }

  // Actual detailed view being returned
  return (
    <View style = {{flex : 1}}>
    <ScrollView style={styles.container}>
      {renderPostContent()}
      <View style={styles.postItemTitle}>
        <Text style={{ fontWeight: "600", flex: 1, fontSize: normalize(27) }}>{post.title}</Text>
        <Text style={{ textAlign: 'right', flex: 1, fontSize: normalize(27) }}> ${post.price} </Text>
      </View>
      <View style={styles.postItemTitle}>
        <Text style={[ text_styles.medium, { flex: 1 } ]}>{post.content}</Text>
      </View>
      <View style={{ flex: 1, paddingVertical: 20 }}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={[ text_styles.medium, { fontWeight: "600", color: "#fff" } ]}>Contact Seller</Text>
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
    marginBottom: normalize(15),
    textAlign: "center"
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  postItemTitle: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  postItemContent: {
    paddingHorizontal: 20,
  },
  postItemImage: {
    minHeight: windowWidth,
    maxHeight: windowWidth,
    aspectRatio: 1,
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
});

