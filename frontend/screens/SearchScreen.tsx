import { useState, useEffect, useContext, useCallback } from 'react'
import { SafeAreaView, StyleSheet, FlatList, RefreshControl } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import { Text, View } from '../components/Themed';

import API from '../api/ymarket_api';
import Post from './feed/Post';
import { RootTabScreenProps } from '../types';

import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";

const SearchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const path = 'api/post/search='
      console.log(path + {searchPhrase})
      const response = await API.get(path + {searchPhrase})
                                .then((response) => {
                                  setData(response.data)
                                  console.log(response.data)
                                })
                                .catch((error) => {
                                  console.log(error)
                                });
    }
    getPosts();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {/* {!clicked && <Text style={styles.title}>Search YMarket</Text>} */}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <PostList
        searchPhrase={searchPhrase}
        data={data}
        setClicked={setClicked}
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


// const List = ({searchQuery}: any, { navigation }: RootTabScreenProps<'PostStack'>) => {
//   const [posts, setPosts] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   const getPosts = async () => {
//     const path = 'api/post/search='
//     const response = await API.get(path + {searchQuery})
//                               .then((response) => {
//                                 setPosts(response.data)
//                                 // console.log(response.data)
//                               })
//                               .catch((error) => {
//                                 console.log(error)
//                               });
//   }

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//       getPosts()
//       setRefreshing(false) 
//   }, [refreshing]);

//   const renderItems = (item: { item: any;}) => {
//     return <Post post={item.item} navigation = {navigation} is_edit = {false} />;
//   };

//   return (
//     <View style={styles.list}>
//         <FlatList
//           data={posts.reverse()}
//           renderItem={renderItems}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         />
//     </View>
//   )
// }

// export default function SearchScreen() {
//   const [searchQuery, setSearchQuery] = useState('');

//   const onChangeSearch = (text: any) => setSearchQuery(text);

//   return (
//     <View style={styles.container}>
//       <SearchBar
//         placeholder="Search YMarket"
//         value={searchQuery}
//         onChangeText={(text) => onChangeSearch(text)}
//         lightTheme={true}
//         round={true}
//         containerStyle={{backgroundColor: 'white'}}
//         inputContainerStyle={{backgroundColor: '#D3D3D3'}}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     // alignItems: 'center',
//     marginTop: 50,
//     // justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 5,
//     fontStyle: "italic",
//   },
//   list: {
//     marginTop: 10,
//     backgroundColor: '#fff',
//     flex: 1,
//     paddingTop: 4,
//   },
// });
