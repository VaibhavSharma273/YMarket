import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { MaterialIcons } from '@expo/vector-icons'; 

import API from '../../api/ymarket_api';
import { Text, View } from '../../components/Themed';
import TextInput from '../../components/TextInput'
import UploadImage from '../../components/UploadImage'

import { titleValidator } from '../../helpers/titleValidator';
import { postValidator } from '../../helpers/postValidator';
import { priceValidator } from '../../helpers/priceValidator';

import { RootTabScreenProps } from '../../types';
import mock from "./data/mock";

import { getToken, setToken, deleteToken } from '../../storage/tokenStorage';
import { baseURL, hostURL } from '../../constants/url';

export default function EditPostScreen({ route, navigation }: { route: any; navigation: any }) {

  const { postId } = route.params;

  const [title, setTitle] = useState({ value: '', error: '' })
  const [caption, setCaption] = useState({ value: '', error: '' })
  const [price, setPrice] = useState({ value: '', error: '' })
  const [category, setCategory] = useState({ value: ''})
  const [postType, setPostType] = useState({ value: ''})
  
  const [images, setImages] = useState(['loading', 'loading', 'loading', 'loading', 'loading', 'loading'])
  const imageURLs = ['', '', '', '', '', '']
  const isModified = [false, false, false, false, false, false]
  const [postIDs, setPostIDs] = useState([-1, -1, -1, -1, -1, -1])
  const imageIDs = [-1, -1, -1, -1, -1, -1]
  const [mounted, setMounted] = useState(false)

  const postTypes = ["Buy", "Sell"]
  const categoryTypes = ["General", "Clothing", "Furniture"]

  const updateImages = (newImage: any, index: number) => {
    images[index] = newImage
    isModified[index] = true
  }

  const getPreviousInfo = async () => {
    const path = 'api/post/' + postId
    const response = await API.get(path)
                              .then((response) => {
                                setTitle({value: response.data.title, error: ''})
                                setCaption({value: response.data.content, error: ''})
                                setPrice({value: response.data.price, error: ''})
                                setCategory({value: response.data.category.charAt(0).toUpperCase() 
                                  + response.data.category.slice(1)})
                                if (response.data.is_buy === false) {
                                  setPostType({value: 'Sell'})
                                } else {
                                  setPostType({value: 'Buy'})
                                }
                                const postImages = response.data.postimages

                                for (var i = 0; i < postImages.length; i++) {
                                  if (i < 6) {
                                    imageURLs[i] = postImages[i].image_url
                                    imageIDs[i] = postImages[i].id
                                  }
                                }
                                setImages(imageURLs)
                                setPostIDs(imageIDs)

                              })
                              .catch((error) => {
                                console.log(error)
                              });
  }

  if (!mounted) {
    getPreviousInfo()
  }

  useEffect(() => {
    setMounted(true)
  }, []);

  const cancelPopup= async ()=>{
    Alert.alert(
      'Exit Edit a Post?',
      'Your changes will not be saved!',
      [
        {text: 'Yes', onPress: () => navigation.goBack()},
        {text: 'No'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  const onDeletePostPressed = async () => {
    const deletePost = async () => {
      const path = 'api/post/' + postId
      
      const response = await API.delete(path)
                                .then((response) => {
                                  console.log("post delete success!")
                                })
                                .catch((error) => {
                                  console.log(error)
                                });
    }

    Alert.alert(
      'Are you sure you want to delete this post?',
      'Deletions are not reversible!',
      [
        {text: 'Yes', onPress: () => 
        {deletePost(), navigation.goBack();}}, // delete post
        {text: 'No'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  const onEditPostPressed = async () => {
    const titleError = titleValidator(title.value)
    const captionError = postValidator(caption.value)
    const priceError = priceValidator(price.value)
    var postTypeError = ''
    var categoryError = 'Please choose a category'

    for (let i = 0; i < categoryTypes.length; i++) {
      if (category.value.includes(categoryTypes[i]))
      {
        categoryError = ''
      }
    }

    if (!(postType.value.includes("Buy") || postType.value.includes("Sell")))
    {
      postTypeError = 'Please choose a post type'
    }

    if (titleError || captionError || priceError || categoryError || postTypeError) {
        setTitle({...title, error: titleError})
        setCaption({...caption, error: captionError})
        setPrice({...price, error: priceError})
        setCategory({...category})
        setPostType({...postType})

        if (categoryError)
        {
          Alert.alert(categoryError)
        }

        if (postTypeError)
        {
          Alert.alert(postTypeError)
        }
        return
    }

    const title_val = title.value;
    const caption_val = caption.value;
    const price_val = price.value;
    const category_val = category.value.toLowerCase();;
    const post_type_val = postType.value;

    const editPost = async () => {
      const path = baseURL + 'api/post/' + postId
      
      var is_buy = 'false'

      if (post_type_val.includes("Buy")) {
        is_buy = 'true'
      }

      var form_data = new FormData() 
      form_data.append("title", title_val)
      form_data.append("content", caption_val)
      form_data.append("price", price_val)
      form_data.append("category", category_val)
      form_data.append("is_buy", is_buy)

      for (var i = 0; i < 6; i++) {
        if (isModified[i] && postIDs[i] != -1) 
        {
          const deletePath = 'api/post-images/' + postIDs[i]
          const deleteResponse = await API.delete(deletePath)
                                          .then((deleteResponse) => {
                                            console.log("delete image success!")
                                          })
                                          .catch((error) => {
                                            console.log(error)
                                          });
        }
      }

      for (var i = 0; i < 6; i++) {
        if (isModified[i] && images[i] !== '') {
          var img = { 
            uri: images[i],
            name: 'image.jpg',
            type: 'image/jpg'
          }

          form_data.append('files', JSON.parse(JSON.stringify(img)))
        }
      }

      const token = await getToken('access');
      const response = await fetch(path, {
        method: "PUT",
        headers: {
          'accept': 'application/json',
          "Content-Type": 'multipart/form-data; boundary=----WebKitFormBoundaryIn312MOjBWdkffIM',
          'Authorization': 'Bearer ' + token
        },
        body: form_data
      }).then((response) => {
        console.log("post edit success!")
      })
      .catch((error) => {
        console.log(error.response)
      });
    }

    const confirmPopup = async ()=>{
      editPost() 
      Alert.alert(
        'Post Edited!',
        '',
        [
          {text: 'Done', onPress: () => navigation.goBack()},
        ],
        { 
          cancelable: true 
        }
      );
    }
    
    confirmPopup()
}

  return (
    <ScrollView>
    <View style ={styles.container}>
      <View style ={{flexDirection: 'row',}}>
      <Text style = {styles.headerText}>
        {"Edit a Post"}
      </Text>
      <TouchableOpacity  onPress={() => cancelPopup()}>
      <MaterialIcons name="cancel" size={30} color="#0F4D92" style={{paddingLeft: '21%', alignSelf: 'flex-start'}} />
      </TouchableOpacity>
      </View>
      <View style={{paddingTop:'4%'}}></View>
      <Text style={styles.title}>Title</Text>
      <TextInput style={{height: 50}}
        returnKeyType="next"
        value={title.value}
        onChangeText={(text: any) => setTitle({ value: text, error: '' })}
        error={!!title.error}
        errorText={title.error}
        description
        />
      <Text style={styles.title}>Description</Text>
      <TextInput style={{height:150}}
        returnKeyType="next"
        multiline={true}
        value={caption.value}
        onChangeText={(text: any) => setCaption({ value: text, error: '' })}
        error={!!caption.error}
        errorText={caption.error}
        description
      />
      <Text style={styles.title}>Price</Text>
      <TextInput style={{height:50}}
        label = "$"
        returnKeyType="next"
        value={price.value}
        onChangeText={(text: any) => setPrice({ value: text, error: '' })}
        error={!!price.error}
        errorText={price.error}
        description
      />

  <Text style={styles.title}>Category</Text>
  <View style={{paddingTop:'2%'}}></View>
  <SelectDropdown
	  data={categoryTypes}
	  onSelect={(selectedItem) => setCategory({value: selectedItem})}
	  buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
  defaultButtonText={category.value}
  buttonStyle={styles.dropdown1BtnStyle}
  dropdownStyle={styles.dropdown1DropdownStyle}
  rowStyle={styles.dropdown1RowStyle}
  rowTextStyle={styles.dropdown1RowTxtStyle}
  buttonTextStyle={styles.dropdown1BtnTxtStyle}


/>
<View style={{paddingTop:'4%'}}></View>
  <Text style={styles.title}>Post Type</Text>
  <View style={{paddingTop:'2%'}}></View>
  <SelectDropdown
	  data={postTypes}
	  onSelect={(selectedItem) => setPostType({value: selectedItem})}
	  buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
  defaultButtonText={postType.value}

  buttonStyle={styles.dropdown1BtnStyle}
  dropdownStyle={styles.dropdown1DropdownStyle}
  rowStyle={styles.dropdown1RowStyle}
  rowTextStyle={styles.dropdown1RowTxtStyle}
  buttonTextStyle={styles.dropdown1BtnTxtStyle}


/>
<View style={styles.row}>
        <UploadImage updateImages={updateImages} defaultValue={images[0]} number={0}/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage updateImages={updateImages} defaultValue={images[1]} number={1}/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage updateImages={updateImages} defaultValue={images[2]} number={2}/>
        <View style={{paddingRight:'2.5%'}}></View>
        <View style={{height: '16%'}}></View>
        <UploadImage updateImages={updateImages} defaultValue={images[3]} number={3}/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage updateImages={updateImages} defaultValue={images[4]} number={4}/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage updateImages={updateImages} defaultValue={images[5]} number={5}/>
        <View style={{paddingRight:'100%'}}></View>
        <View style={{paddingBottom: '2%'}}></View>
        <TouchableOpacity style={styles.button} onPress={onEditPostPressed}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, fontFamily: 'Arial'}}>Confirm Changes</Text>
        </TouchableOpacity>
        <View style={{paddingRight:'100%'}}></View>
        <View style={{paddingBottom: '2%'}}></View>
        <TouchableOpacity style={styles.buttonDel} onPress={onDeletePostPressed}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, fontFamily: 'Arial'}}>Delete Post</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingTop:'12%'}}></View>
  </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    width: '115%',
    paddingLeft: '6%',
    paddingTop: '13%',
    paddingBottom: '8%',
  },
  images: {
    flex: 1,
    width: '100%',
  },
  title: {
    textAlign: 'left',
    paddingLeft: '1%',
    alignSelf: 'flex-start',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#0F4D92',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: "5%",
  },
  button: {
    backgroundColor: '#0f4d92', justifyContent: 'center', width: '80%', alignItems: 'center', paddingTop: '4%',
    paddingBottom: '4%', borderRadius: 5
  },
  headerText: {
    marginRight: '20%',
    fontWeight: "bold",
    color: "#0f4d92",
    fontSize: 30,
    textAlign: 'center'
  },
  subHeaderText: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    color: "#000",
    fontWeight: "300",
    fontSize: 15
  },
  dropdown1DropdownStyle: {backgroundColor: '#f6f6f6', borderColor: 'gray'},
  dropdown1RowStyle: {backgroundColor: '#f6f6f6', borderBottomColor: 'gray', borderRadius: 10},
  dropdown1RowTxtStyle: {color: 'black', textAlign: 'left', fontFamily: 'Arial', fontSize: 16},
  dropdown1BtnStyle: {
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    height: '5%',
  },
  dropdown1BtnTxtStyle: {color: 'black', textAlign: 'left', fontFamily: 'Arial', fontSize: 16},
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
  buttonDel: {
    backgroundColor: '#cc0000', justifyContent: 'center', width: '80%', alignItems: 'center', paddingTop: '4%',
    paddingBottom: '4%', borderRadius: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});
