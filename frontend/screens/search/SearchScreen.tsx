import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// import { SearchBar } from 'react-native-elements';

import API from '../../api/ymarket_api';
import { RootTabScreenProps } from '../../types';

import PostList from '../../components/PostList';
import SearchBar from '../../components/SearchBar';
import CategoryList from '../../components/CategoryList';

const SearchScreen = ({ navigation }: RootTabScreenProps<'SearchStack'>) => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState([]);

    const getPosts = async () => {
        const path = 'api/post/?search=';
        const response = await API.get(path + searchPhrase)
            .then((response) => {
                setData(response.data.reverse());
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    // get posts if the search query changes
    useEffect(() => {
        if (searchPhrase !== '') {
            getPosts();
        }
    }, [searchPhrase]);

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            />
            {searchPhrase === '' ? (
                <CategoryList navigation={navigation} />
            ) : (
                <PostList data={data} navigation={navigation} />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        width: '100%',
        marginTop: 20,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: '10%',
    },
});

export default SearchScreen;
