import { RootTabScreenProps } from '../../types';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { RefreshControl, Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { normalize } from '../../components/TextNormalize';
import LoadingIndicator from '../../components/LoadingIndicator';

import Post from './Post';
import API from '../../api/ymarket_api';

const Feed = ({ navigation }: RootTabScreenProps<'PostStack'>) => {
    const [buyOffset, setBuyOffset] = useState<number>(0);
    const [sellOffset, setSellOffset] = useState<number>(0);
    const [buyPosts, setBuyPosts] = useState<Array<any>>([]);
    const [sellPosts, setSellPosts] = useState<Array<any>>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [postType, setPostType] = useState(false);
    const [loading, setLoading] = useState(true);
    const postTypeRef = useRef(false);

    const getPosts = async (isBuy: boolean) => {
        const path = `api/post/?is_buy=${isBuy}&limit=10&offset=${
            isBuy ? buyOffset : sellOffset
        }&ordering=-date_posted`;
        await API.get(path)
            .then((response) => {
                if (isBuy) {
                    setBuyPosts(buyOffset === 0 ? response.data.results : [...buyPosts, ...response.data.results]);
                    setBuyOffset(buyOffset + 10);
                } else {
                    setSellPosts(sellOffset === 0 ? response.data.results : [...sellPosts, ...response.data.results]);
                    setSellOffset(sellOffset + 10);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        postTypeRef.current ? setBuyOffset(0) : setSellOffset(0);
        getPosts(postTypeRef.current);
        setRefreshing(false);
    }, [refreshing]);

    const renderItems = (item: { item: any }) => {
        return <Post post={item.item} navigation={navigation} is_edit={false} />;
    };

    useEffect(() => {
        getPosts(false);
        getPosts(true);
    }, []);

    const memoizedPosts = useMemo(() => renderItems, [buyPosts, sellPosts]);

    // return a loading indicator if posts have not been fetched yet
    if (loading) {
        return <LoadingIndicator></LoadingIndicator>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{'Recent Listings'}</Text>
            <Text style={styles.subHeaderText}>{'Find the latest listings from all over campus here!'}</Text>
            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tabBtn, styles.buyBtn, postType === true && styles.tabActive]}
                    onPress={() => {
                        setPostType(true), (postTypeRef.current = true);
                    }}
                >
                    <Text style={[styles.tabLabel, postType === true && styles.tabLabelActive]}>Buy Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabBtn, styles.sellBtn, postType === false && styles.tabActive]}
                    onPress={() => {
                        setPostType(false), (postTypeRef.current = false);
                    }}
                >
                    <Text style={[styles.tabLabel, postType === false && styles.tabLabelActive]}>Sell Posts</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                <FlatList
                    data={postType ? buyPosts : sellPosts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={memoizedPosts}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    onEndReached={() => {
                        if (postTypeRef.current ? buyOffset === buyPosts.length : sellOffset === sellPosts.length) {
                            getPosts(postTypeRef.current);
                        }
                    }}
                    onEndReachedThreshold={0.3}
                />
            </View>
        </View>
    );
};

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
    tabBar: {
        display: 'flex',
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
    },
    tabText: {
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: '#d9d9d9',
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        },
    },
    tabBtn: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderColor: '#000',
        flex: 1,
        fontSize: 16,
        padding: 8,
    },
    buyBtn: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        marginRight: 0,
        marginLeft: 20,
    },
    sellBtn: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        marginLeft: 0,
        marginRight: 20,
    },
    tabActive: {
        backgroundColor: '#0f4d92',
        borderColor: '#0f4d92',
        borderRadius: 5,
    },
    tabLabel: {
        color: 'black',
        fontSize: normalize(15),
        textAlign: 'center',
        fontFamily: 'Arial',
    },
    tabLabelActive: {
        color: 'white',
        fontSize: normalize(15),
        textAlign: 'center',
        fontFamily: 'Arial',
    },
});

export default Feed;
