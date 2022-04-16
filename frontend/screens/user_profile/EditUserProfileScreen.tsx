import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import TextInput from '../../components/TextInput';
import { Text, View } from '../../components/Themed';
import UploadImage from '../../components/UploadImage';
import API from '../../api/ymarket_api';
import { nameValidator } from '../../helpers/nameValidator';
import { emailValidator } from '../../helpers/emailValidator';
import AppContext from '../AppContext';
import { getToken } from '../../storage/tokenStorage';
import { hostURL } from '../../constants/url';

export default function EditUserProfileScreen({ route, navigation }: { route: any, navigation: any}): JSX.Element {
    const { initialValues, updateCallback } = route.params;
    const [firstName, setFirstName] = useState({ value: initialValues.firstName, error: '' });
    const [lastName, setLastName] = useState({ value: initialValues.lastName, error: '' });
    const [image, setImage] = useState(initialValues.avatar);
    const [bio, setBio] = useState(initialValues.bio);
    const myContext = useContext(AppContext);
    
    const updateImage = (newImage: any, add: boolean) => {
      console.log(newImage);
        if (add) {
            setImage(newImage);
        } else {
            setImage("");
        }
    }

    const onEditConfirmPressed = async () => {
        const firstNameError = nameValidator(firstName.value, 'First name');
        const lastNameError = nameValidator(lastName.value, 'Last name');

        if (firstNameError || lastNameError)
        {
          Alert.alert("Please fix any errors");
          setFirstName({ ...firstName, error: firstNameError });
          setLastName({ ...lastName, error: lastNameError });
          return;
        }

        const formData = new FormData();
        formData.append('first_name', firstName.value);
        formData.append('last_name', lastName.value);
        formData.append('biography', bio);
        console.log(image, typeof(image));
        if (image === "") {
          console.log("A");
            formData.append('avatar_url', image);
        } else if (image) {
          formData.append('files', JSON.parse(JSON.stringify({
                uri: image,
                name: 'image1.jpg',
                type: 'image/jpg'
            })));
            console.log("B");
        }

        const response = await fetch(`${hostURL}api/users/profile/${myContext.user}/`, 
        { 
          method: "PUT", 
          headers: { 
            "Content-Type": 'multipart/form-data', 
            "Authorization": `Bearer ${await getToken('access')}` 
          }, 
          body: formData 
        })
        .then(response => response.json())
        .then(result => {
          const avatar = result.avatar_url;
          updateCallback(firstName.value, lastName.value, avatar, bio);
          navigation.navigate('UserProfile');
        })
        .catch(error => console.log("error: ", error));
    }

    return (
    <ScrollView>
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.headerText}>
                    {"Edit profile"}
                </Text>
            </View>
            <View style={{paddingTop:'4%'}} />
            <Text style={styles.title}>First Name</Text>
            <TextInput style={{height: 50}}
            returnKeyType="next"
            value={firstName.value}
            onChangeText={(text: string) => setFirstName({ ...firstName, value: text })}
            error={!!firstName.error}
            errorText={firstName.error}
            />
            <Text style={styles.title}>Last Name</Text>
            <TextInput style={{height: 50}}
            returnKeyType="next"
            value={lastName.value}
            onChangeText={(text: string) => setLastName({ ...lastName, value: text })}
            error={!!lastName.error}
            errorText={lastName.error}
            />
            <Text style={styles.title}>Biography</Text>
            <TextInput style={{height:150}}
                returnKeyType="next"
                multiline={true}
                value={bio}
                onChangeText={(text: string) => setBio(text)}
            />
            <Text style={styles.title}>Avatar</Text>
            <UploadImage updateImages={updateImage} defaultValue={image}/>

            <TouchableOpacity style={styles.button} onPress={onEditConfirmPressed}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15, fontFamily: 'Arial'}}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>);
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
