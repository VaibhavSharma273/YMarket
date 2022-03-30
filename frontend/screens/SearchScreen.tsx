import { useState, useEffect, useContext } from 'react'
import { StyleSheet, FlatList } from 'react-native';
// import Searchbar from '../components/SearchBar';
import { SearchBar } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import API from '../api/ymarket_api'
import AppContext from "./AppContext"

import Post from './feed/Post';

const Item = ({ name, price }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.title}>{price}</Text>
  </View>
);

const List = ({ searchPhrase, data }: any) => {
  const renderItems = ({ item }: any) => {
    if (searchPhrase === "") {
      // const post = item.item
      // return <Post post={post} />;
      return <Item name={item.name} price={item.price} />;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      // const post = item.item
      // return <Post post={post} />;
      return <Item name={item.name} price={item.price} />;
    }
  };
  return (
    <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
        />
    </View>
  )
}

export default function SearchScreen() {
  const myContext = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState();
  const onChangeSearch = (text: string): void => setSearchQuery(text);

  useEffect(() => {
    const getPosts = async () => {
      const path = 'api/post/' + myContext.user
      console.log(path)
      const apiResponse = await API.get(path)
      .then((response) => {
        setPosts(response.data)
        console.log(response.data)
      })
    };
    getPosts();
  }, []);

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
      <List
        searchPhrase={searchQuery}
        data={posts}
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
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  list: {
    marginTop: 10,
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 4,
  },
});
