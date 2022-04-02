import { useState, useEffect, useContext } from 'react'
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Text, View } from '../components/Themed';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (text) => setSearchQuery(text);

  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={onChangeSearch}
        placeholder="Search YMarket"
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
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
