import { Image, Text, View, StyleSheet, Dimensions, Pressable, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import mock from './data/mock';
import React, { useState, useEffect, useContext } from 'react';
import { normalize, text_styles } from '../../components/TextNormalize';
import API from '../../api/ymarket_api';
import TextInput from '../../components/TextInput';
import ProfilePhoto from '../../components/ProfilePhoto';

import moment from 'moment';
import { FlatListSlider } from 'react-native-flatlist-slider';
import RenderImage from './renderImage';
import AppContext from '../AppContext';
const windowWidth = Dimensions.get('window').width;

export default function ViewPost({ route, navigation }: { route: any; navigation: any }) {
    // Identify post here:
    const { post } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const date_posted = moment(post.date_posted).utc();
    const myContext = useContext(AppContext);
    const userId = myContext.user;
    const [firstMsg, setFirstMsg] = useState({ value: '' });

    // Render images for the post:
    const renderPostContent = () => {
        if ('postimages' in post && post.postimages.length) {
            return (
                <FlatListSlider
                    data={post.postimages}
                    imageKey={'image_url'}
                    loop={false}
                    autoscroll={false}
                    width={windowWidth}
                    height={windowWidth}
                    indicatorActiveColor={'#0f4d92'}
                    component={<RenderImage item={post.postimages} imageKey={'image_url'} />}
                ></FlatListSlider>
            );
        }
    };

    const onConfirmPressed = async () => {
        const sendMessage = async () => {
            const response = await API.post('api/messages/thread/', {
                sender: userId,
                receiver: post.author.id,
                body: firstMsg.value,
                title: post.title,
            })
                .then((response) => {
                    setModalVisible(!modalVisible);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        Alert.alert(
            'Message sent!',
            '',
            [
                {
                    text: 'Done',
                    onPress: () => {
                        sendMessage();
                    },
                },
            ],
            {
                cancelable: true,
            },
        );
    };

    // Actual detailed view being returned
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {renderPostContent()}
                <View style={styles.postItemTitle}>
                    <Text style={[text_styles.xlarge, { fontWeight: '600', flex: 2 }]}>{post.title}</Text>
                    {post.price == null ? null : (
                        <Text style={[text_styles.xlarge, { textAlign: 'right', flex: 1 }]}> ${post.price} </Text>
                    )}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5, paddingHorizontal: 20 }}>
                    <View
                        style={[
                            styles.categoryContainer,
                            { paddingHorizontal: 0, marginHorizontal: 0, backgroundColor: '#fff' },
                        ]}
                    >
                        <Text style={[styles.postDate, { fontWeight: '700' }]}>Category: </Text>
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.postCategoryText}>{post.is_buy == false ? 'sell' : 'buy'}</Text>
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.postCategoryText}>{post.category}</Text>
                    </View>
                </View>
                <View style={styles.postItemContent}>
                    <Text style={[text_styles.medium]}>{post.content}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={[styles.postDateText, { fontWeight: '700' }]}>Posted On: </Text>
                    <Text style={styles.postDate}>
                        {date_posted.format('M')}/{date_posted.format('D')}/{date_posted.format('YYYY')}
                    </Text>
                </View>
                <View style={{ flex: 1, paddingVertical: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.buttonOld}
                        onPress={() => navigation.navigate('UserProfile', { id: post.author.id, is_post: true })}
                    >
                        <Text style={[text_styles.medium, { fontWeight: '600', color: '#fff' }]}>
                            {' '}
                            {post.is_buy == false ? 'View Seller Profile' : 'View Buyer Profile'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonOld} onPress={() => setModalVisible(true)}>
                        <Text style={[text_styles.medium, { fontWeight: '600', color: '#fff' }]}>
                            {' '}
                            {post.is_buy == false ? 'Contact Seller' : 'Contact Buyer'}{' '}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontWeight: '600', fontSize: 20, alignSelf: 'center', paddingBottom: 10 }}>
                            Start a Conversation
                        </Text>
                        <Text style={styles.paragraph}>
                            Send your first message to {post.author.first_name} {post.author.last_name}!
                        </Text>
                        <TextInput
                            style={{ height: 150, width: 335 }}
                            returnKeyType="next"
                            multiline={true}
                            value={firstMsg.value}
                            onChangeText={(text: any) => setFirstMsg({ value: text })}
                            description
                            blurOnSubmit={true}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Pressable style={[styles.button, styles.button]} onPress={() => onConfirmPressed()}>
                                <Text style={styles.textStyle}>Confirm </Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.button, { backgroundColor: '#cc0000' }]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    categoryContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 2,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#0f4d92',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        margin: 2,
        borderRadius: 16,
        elevation: 3,
        backgroundColor: 'black',
        width: '48%',
    },
    buttonOld: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        margin: 2,
        borderRadius: 16,
        elevation: 3,
        backgroundColor: 'black',
        width: '60%',
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    postItemTitle: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    category: {
        flexDirection: 'row',
        fontSize: normalize(17),
        textAlign: 'left',
    },
    postDateText: {
        flexDirection: 'row',
        fontSize: normalize(17),
        textAlign: 'left',
        paddingLeft: 20,
    },
    postDate: {
        flexDirection: 'row',
        fontSize: normalize(17),
        textAlign: 'left',
    },
    postItemContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    postItemImage: {
        minHeight: windowWidth,
        maxHeight: windowWidth,
        aspectRatio: 1,
    },
    postCategoryText: {
        fontSize: normalize(17),
        color: '#fff',
    },
    paragraph: {
        fontSize: normalize(15),
        textAlign: 'center',
    },
});
