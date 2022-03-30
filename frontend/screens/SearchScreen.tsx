import { useState } from 'react'
import { StyleSheet } from 'react-native';
// import Searchbar from '../components/SearchBar';
import { SearchBar } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (text: string): void => setSearchQuery(text);

  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={onChangeSearch}
        placeholder="Search"
        value={searchQuery}
        lightTheme={true}
        round={true}
        containerStyle={{backgroundColor: 'white'}}
        inputContainerStyle={{backgroundColor: '#D3D3D3'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    marginTop: 50,
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
