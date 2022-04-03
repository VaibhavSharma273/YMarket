import React, { useState } from 'react'
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

export default function EditPostScreen({ route, navigation }: { route: any; navigation: any }) {

  const { postId } = route.params;
  const post = mock[0].posts.find((obj: { id: any; }) => {
    return obj.id === postId
  })

  const [title, setTitle] = useState({ value: post.title, error: '' })
  const [caption, setCaption] = useState({ value: post.content, error: '' })
  const [price, setPrice] = useState({ value: post.price, error: '' })
  const [category, setCategory] = useState({ value: post.category, error: '' })
  const postTypes = ["Buy", "Sell"]

  const [postType, setPostType] = useState({ value: '', error: '' })
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [image5, setImage5] = useState('')
  const [image6, setImage6] = useState('')

  var post_images_val = ['','','','','','']
  post_images_val[0]=image1
  post_images_val[1]=image2
  post_images_val[2]=image3
  post_images_val[3]=image4
  post_images_val[4]=image5
  post_images_val[5]=image6

  var final_images_val = post_images_val.filter(function(value, index, arr){ 
    return value;
});

  const confirmPopup = async ()=>{
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

  const onEditPostPressed = async () => {
    const titleError = titleValidator(title.value)
    const captionError = postValidator(caption.value)
    const priceError = priceValidator(price.value)
    const categoryError = postValidator(category.value)
    var postTypeError = ''

    if (!(postType.value.includes("Buy") || postType.value.includes("Sell")))
    {
      postTypeError = 'Please choose a post type'
    }

    if (titleError || captionError || priceError || categoryError || postTypeError) {
        setTitle({...title, error: titleError})
        setCaption({...caption, error: captionError})
        setPrice({...price, error: priceError})
        setCategory({...category, error: categoryError})
        setPostType({...postType, error: postTypeError})

        if (postTypeError)
        {
          Alert.alert(postTypeError)
        }
        return
    }

    const title_val = title.value;
    const caption_val = caption.value;
    const price_val = price.value;
    const category_val = category.value;

    const post_type_val = postType.value;

    confirmPopup()
    
    

    /*
    const response = await API.post('api/users/register/', {email: email_val, first_name: firstName_val, last_name: lastName_val, password1: password_val, password2: passwordConfirm_val})
    .then(function(response) {
      navigation.navigate('ConfirmationScreen')
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response)
        setPassword({...password, error: error.response.data[Object.keys(error.response.data)[0]]})
      }
      else {
        console.log(error.toJSON());
        console.log('Error', error.message);
      }
      
    })*/
}
const updateImage1 = (image: string ) =>
  {
    setImage1(image)
  }

  const updateImage2 = (image: string ) =>
  {
    setImage2(image)
  }

  const updateImage3 = (image: string ) =>
  {
    setImage3(image)
  }

  const updateImage4 = (image: string ) =>
  {
    setImage4(image)
  }

  const updateImage5 = (image: string ) =>
  {
    setImage5(image)
  }

  const updateImage6 = (image: string ) =>
  {
    setImage6(image)
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
      <TextInput style={{height:50}}
        returnKeyType="next"
        value={category.value}
        onChangeText={(text: any) => setCategory({ value: text, error: '' })}
        error={!!category.error}
        errorText={category.error}
        description
      />


  <Text style={styles.title}>Post Type</Text>
  <View style={{paddingTop:'2%'}}></View>
  <SelectDropdown
	  data={postTypes}
	  onSelect={(selectedItem) => setPostType({value: selectedItem, error: ''})}
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
  defaultButtonText={'Select Buy or Sell'}

  buttonStyle={styles.dropdown1BtnStyle}
  dropdownStyle={styles.dropdown1DropdownStyle}
  rowStyle={styles.dropdown1RowStyle}
  rowTextStyle={styles.dropdown1RowTxtStyle}
  buttonTextStyle={styles.dropdown1BtnTxtStyle}


/>
<View style={styles.row}>
        <UploadImage updateImage={updateImage1}/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage updateImage={updateImage2}/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage updateImage={updateImage3}/>
        <View style={{paddingRight:'2.5%'}}></View>
        <View style={{height: '16%'}}></View>
        <UploadImage updateImage={updateImage4}/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage updateImage={updateImage5}/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage updateImage={updateImage6}/>
        <View style={{paddingRight:'100%'}}></View>
        <View style={{paddingBottom: '2%'}}></View>
        <TouchableOpacity style={styles.button} onPress={onEditPostPressed}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, fontFamily: 'Arial'}}>Add Post</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingTop:'4%'}}></View>
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
    //backgroundColor: 'white',
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});
