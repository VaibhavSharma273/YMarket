import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';

import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import { RefreshControl, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { normalize } from '../../components/TextNormalize';
import LoadingIndicator from '../../components/LoadingIndicator';
import { FontAwesome } from '@expo/vector-icons';
import AppContext from './../AppContext';

import Post from '../feed/Post';
import API from '../../api/ymarket_api';

export default function AccessPostScreen({ navigation }: any) {
    const [postOffset, setPostOffset] = useState<number>(0);
    const [userPosts, setUserPosts] = useState<Array<any>>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const myContext = useContext(AppContext);

    const getUserPosts = async () => {
        const path = `api/post/${myContext.user}/?limit=10&offset=${postOffset}&ordering=-date_posted`;
        const response = await API.get(path)
            .then((response) => {
                setUserPosts(postOffset === 0 ? response.data.results : [...userPosts, ...response.data.results]);
                setPostOffset(postOffset + 10);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setPostOffset(0);
        getUserPosts();
        setRefreshing(false);
    }, [refreshing]);

    const renderItems = (item: { item: any }) => {
        return <Post post={item.item} navigation={navigation} is_edit={true} />;
    };

    useEffect(() => {
        getUserPosts();
    }, []);

    const memoizedPosts = useMemo(() => renderItems, [userPosts]);

    // return a loading indicator if posts have not been fetched yet
    if (loading) {
        return <LoadingIndicator></LoadingIndicator>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{'Your Posts'}</Text>
            <Text style={styles.subHeaderText}>{'Create a new post or edit existing posts!'}</Text>
            <View style={styles.list}>
                <FlatList
                    data={userPosts}
                    renderItem={memoizedPosts}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    onEndReached={() => {
                        if (postOffset === userPosts.length) {
                            getUserPosts();
                        }
                    }}
                    onEndReachedThreshold={0.3}
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.push('CreatePostScreen')}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            backgroundColor: '#0f4d92',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles.buttonText}>Create Post</Text>
                        <View style={{ padding: 5, backgroundColor: '#0f4d92' }}></View>
                        <FontAwesome name="plus-square-o" size={normalize(20)} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        marginTop: 10,
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 4,
    },
    headerText: {
        marginTop: 60,
        marginLeft: 20,
        fontWeight: 'bold',
        color: '#0f4d92',
        fontSize: normalize(24),
    },
    subHeaderText: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        color: '#000',
        fontWeight: '300',
        fontSize: normalize(15),
    },
    buttonText: {
        color: 'white',
        fontSize: normalize(20),
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0f4d92',
        padding: '5%',
        borderRadius: 5,
    },
});
