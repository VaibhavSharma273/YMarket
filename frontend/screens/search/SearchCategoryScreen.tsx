import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { normalize, text_styles } from '../../components/TextNormalize';
import API from '../../api/ymarket_api'
import { RootTabScreenProps } from "../../types";
import PostList from "../../components/PostList";

export default function SearchCategory({ route, navigation }: { route: any, navigation: RootTabScreenProps<'SearchStack'>}) {
    const { category } = route.params
    const [data, setData] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const path = 'api/post/?search='
            const response = await API.get(path + category)
                                      .then((response) => {
                                        setData(response.data.reverse())
                                      })
                                      .catch((error) => {
                                        console.log(error.response)
                                      });
        }
        getPosts();
    }, []);

    const Capitalize = (str: String) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={ styles.headerText }>{Capitalize(category)}</Text>
            <PostList
                data={data}
                navigation={navigation}
            />
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        marginTop: 0,
        marginLeft: 20,
        fontWeight: "bold",
        color: "#0f4d92",
        fontSize: normalize(24)
    },
})