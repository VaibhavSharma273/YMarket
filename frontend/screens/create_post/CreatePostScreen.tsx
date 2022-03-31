import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'

import API from '../../api/ymarket_api';
import { Text, View } from '../../components/Themed';
import TextInput from '../../components/TextInput'
import UploadImage from '../../components/UploadImage'

import { postValidator } from '../../helpers/postValidator';
import { priceValidator } from '../../helpers/priceValidator';

import { RootTabScreenProps } from '../../types';

export default function CreatePostScreen({ navigation }: RootTabScreenProps<'Post'>) {
  const [title, setTitle] = useState({ value: '', error: '' })
  const [caption, setCaption] = useState({ value: '', error: '' })
  const [price, setPrice] = useState({ value: '', error: '' })
  const categories = ["Buy", "Sell"]

  const [categoryPicked, setCategory ] = useState({value: false});

  const onCreatePostPressed = async () => {
    const titleError = postValidator(title.value)
    const captionError = postValidator(caption.value)
    const priceError = priceValidator(price.value)

    if (titleError || captionError || priceError) {
        setTitle({...title, error: titleError})
        setCaption({...caption, error: captionError})
        setPrice({...price, error: priceError})
        return
    }

    if (!categoryPicked.value) {
      Alert.alert("Please choose a category");
      return
    }

    const title_val = title.value;
    const caption_val = caption.value;
    const price_val = price.value;

    Alert.alert("Post Created!");

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
  return (
    <View style ={styles.container}>
      <Text style = {styles.headerText}>
        {"Create a Post"}
      </Text>
      <View style={{paddingTop:'2%'}}></View>
      <Text style={styles.title}>Title</Text>
      <TextInput style={{height: 40}}
        returnKeyType="next"
        value={title.value}
        onChangeText={(text: any) => setTitle({ value: text, error: '' })}
        error={!!title.error}
        errorText={title.error}
        description
        />
      <Text style={styles.title}>Description</Text>
      <TextInput style={{height:85}}
        returnKeyType="next"
        multiline={true}
        value={caption.value}
        onChangeText={(text: any) => setCaption({ value: text, error: '' })}
        error={!!caption.error}
        errorText={caption.error}
        description
      />
      <Text style={styles.title}>Price</Text>
      <TextInput style={{height:40}}
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
	  data={categories}
	  onSelect={() => setCategory({value: true})}
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
        <UploadImage/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage/>
        <View style={{paddingRight:'2.5%'}}></View>
        <View style={{height: '16%'}}></View>
        <UploadImage/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage/>
        <View style={{paddingRight:'2.5%'}}></View>
        <UploadImage/>
        <View style={{height: '16%'}}></View>
        <View style={{paddingRight:'100%'}}></View>
        <TouchableOpacity style={styles.button} onPress={onCreatePostPressed}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, fontFamily: 'Arial'}}>Create Post</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingTop:'3%'}}></View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    //justifyContent: 'center',
    width: '115%',
    paddingLeft: '6%',
    paddingTop: '13%',
    backgroundColor: 'white',
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
    height: "100%",
    flexWrap: "wrap",
    paddingTop: "3%",
  },
  button: {
    backgroundColor: '#0f4d92', justifyContent: 'center', width: '80%', alignItems: 'center', paddingTop: '2%',
    paddingBottom: '2%', borderRadius: 5
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
});
