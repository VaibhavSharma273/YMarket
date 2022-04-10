import React, { useState, useEffect, Component, } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; 
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';

export default function UploadImage({updateImages, defaultValue, number}: any) {
    const [image, setImage] = useState(defaultValue);
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!_image.cancelled) {
            setImage(_image.uri);
            updateImages(_image.uri, number)
        }
    };

    const removeImage = async () => {
        setImage('')
        updateImages('', number)
    };

    return (

        <View style={imageUploaderStyles.container}>
            {image ? <TouchableOpacity onPress={removeImage} style={{backgroundColor: '#0f4d92'}}>
                <MaterialIcons name="cancel" size={15} color="white" style={{paddingLeft: '1%', alignSelf: 'flex-end',}} />
            </TouchableOpacity> : null}
            {
                image  ? <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                : null
            }
        <View style={imageUploaderStyles.uploadBtnContainer}>
            <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                <Text style={{fontSize: 13, color: '#f6f6f6', paddingTop: 3 }}>{image ? 'Edit' : 'Upload'} Image</Text>
                <AntDesign name="camera" size={15} color="#f6f6f6" />
            </TouchableOpacity>
        </View>
        </View>

    );
}

const imageUploaderStyles=StyleSheet.create({
   container:{
       elevation:2,
       height: 140,
       width: '25%',
       backgroundColor:'#f6f6f6',
       position:'relative',
       borderRadius: 5,
       borderColor: 'gray',
       borderWidth: 1,
       overflow:'hidden',
       marginBottom: 10
   },
   uploadBtnContainer:{
       opacity:1,
       position:'absolute',
       right:0,
       bottom:0,
       backgroundColor:'#0f4d92',
       width:'100%',
       height:'28%',
   },
   uploadBtn:{
       display:'flex',
       alignItems:"center",
       justifyContent:'center'
   },
   row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
})
