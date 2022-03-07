import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { TouchableOpacity } from 'react-native'
// import { RootStackParamList, RootTabScreenProps } from '../types';
// import { StackScreenProps } from '@react-navigation/stack';

import Logo from "../../components/Logo"

export default function StartScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
        <Logo/>
      <View style={styles.separator} />
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.title}>Login</Text>
        </TouchableOpacity>
        <View style={styles.separator}/>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.title}>Register</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Arial',
  },
  separator: {
    marginVertical: 5,
    height: 3,
    width: '50%',
  },
  header: {
    fontSize: 21,
    color: '#0f4d92',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0f4d92",
    padding: 10,
    width: 170,
  }
});
