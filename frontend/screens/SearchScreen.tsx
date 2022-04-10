import { useState, useEffect, useContext, useCallback } from 'react'
import { SafeAreaView, StyleSheet, FlatList, RefreshControl } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import { Text, View } from '../components/Themed';

import API from '../api/ymarket_api';
import Post from './feed/Post';
import { RootTabScreenProps } from '../types';

import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";

const SearchScreen = ({navigation}: RootTabScreenProps<'SearchStack'>) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  // use to show categories vs list of posts
  const [searched, setSearched] = useState(false);
  const [data, setData] = useState([]);

  const getPosts = async () => {
    const path = 'api/post/?search='
    const response = await API.get(path + searchPhrase)
                              .then((response) => {
                                setData(response.data.reverse())
                              })
                              .catch((error) => {
                                console.log(error.response)
                              });
  }

  // get posts if the search query changes
  useEffect(() => {
    getPosts();
  }, [searchPhrase]);

  return (
    <SafeAreaView style={styles.root}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <PostList
        data={data}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});

export default SearchScreen;